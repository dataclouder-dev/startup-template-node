import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { DecodedIdToken, getAuth } from 'firebase-admin/auth';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import config from 'src/config/environment';
import { AppException } from './app-exception';
import { AppAuthClaims } from 'src/dc-claims-module/clams.class';

/**
 * Service for Firebase authentication and user management
 * Provides methods for token verification, user management, and custom claims
 */
@Injectable()
export class FirebaseService {
  constructor(
    private httpService: HttpService,
    @Inject(config.KEY) private configService: ConfigType<typeof config> // private configService: ConfigType<typeof environment>,
  ) {
    console.log('Initializing Firebase App');
    initializeApp({ credential: applicationDefault() });
  }

  /**
   * Verifies and decodes a Firebase ID token
   * @param token - The Firebase ID token to verify
   * @returns Promise resolving to the decoded token data
   */
  public async getTokenData(token: string): Promise<DecodedIdToken> {
    const tokenData: DecodedIdToken = await getAuth().verifyIdToken(token);
    return tokenData;
  }

  /**
   * Retrieves a user by their email address
   * @param email - The email address of the user to retrieve
   * @returns Promise resolving to the user data
   */
  public async getUserByEmail(email: string): Promise<any> {
    return await getAuth().getUserByEmail(email);
  }

  /**
   * Deletes a Firebase user by their user ID
   * @param userId - The ID of the user to delete
   * @returns Promise resolving when the user has been deleted
   */
  public async deleteUser(userId: string): Promise<any> {
    await getAuth().deleteUser(userId);
  }

  /**
   * Sets custom claims for a Firebase user
   * @param userId - The ID of the user to set claims for
   * @param claims - The custom claims to set
   * @returns Promise resolving when the claims have been set
   */
  public async setClaims(userId: string, claims: AppAuthClaims): Promise<any> {
    await getAuth().setCustomUserClaims(userId, claims);
  }

  /**
   * Updates custom claims for a user identified by email
   * @param email - The email of the user to update claims for
   * @param appClaims - The custom claims to set
   * @returns Promise resolving when the claims have been updated
   */
  public async updateClaimsByEmail(email: string, appClaims: AppAuthClaims): Promise<any> {
    const user = await getAuth().getUserByEmail(email);
    return await this.setClaims(user.uid, appClaims);
  }

  /**
   * Retrieves custom claims for a user identified by email
   * @param email - The email of the user to get claims for
   * @returns Promise resolving to the user's custom claims
   * @throws AppException if the user is not found
   */
  public async getClaimsByEmail(email: string): Promise<AppAuthClaims> {
    try {
      const user = await getAuth().getUserByEmail(email);
      const claims = (user.customClaims || {}) as AppAuthClaims;
      return claims;
    } catch (error: any) {
      console.log('error', error);
      throw new AppException({ error_message: 'User not found', explanation: 'No se encontró el usario o sus permisos' });
    }
  }

  /**
   * Retrieves custom claims for a user identified by ID
   * @param id - The ID of the user to get claims for
   * @returns Promise resolving to the user's custom claims
   */
  public async getClaimsById(id: string): Promise<AppAuthClaims> {
    const user = await getAuth().getUser(id);
    const claims = (user.customClaims || {}) as AppAuthClaims;
    return claims;
  }

  /**
   * Creates a super admin token for a user identified by email
   * @param email - The email of the user to create a token for
   * @returns Promise resolving to the created ID token
   */
  public async createTokenSuperAdmin(email: string): Promise<string> {
    const user = await getAuth().getUserByEmail(email);
    const customToken = await getAuth().createCustomToken(user.uid);
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=' + this.configService.firebase.key;
    const data = { token: customToken, returnSecureToken: true };
    const token = await firstValueFrom(this.httpService.post(url, data));
    return token.data.idToken;
  }
}
