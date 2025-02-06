import { ConfigType } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { Logger } from '@nestjs/common';
import envVariables from '../config/environment';

export const createMongooseOptions = async (configService: ConfigType<typeof envVariables>) => {
  const logger = new Logger('MongooseModule');
  const { dbName, host, password, user } = configService.mongo;
  const uri = `mongodb+srv://${user}:${password}@${host}/${dbName}?retryWrites=true&w=majority`;

  try {
    logger.log(`Attempting to connect to MongoDB at ${host}`);
    return {
      uri,
      connectionFactory: connection => {
        connection.on('connected', () => {
          logger.log('Successfully connected to MongoDB');
        });
        connection.on('disconnected', () => {
          logger.warn('Disconnected from MongoDB');
        });
        connection.on('error', error => {
          logger.error('MongoDB connection error:', error);
        });
        return connection;
      },
      // Add connection options for better reliability
      connectionErrorFactory: error => {
        logger.error('Failed to connect to MongoDB:', error);
        // Return null to prevent app from crashing
        return null;
      },
      // Add additional connection options
      options: {
        serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
        connectTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        retryWrites: true,
        retryReads: true,
        // Auto reconnect if connection is lost
        autoReconnect: true,
        // Number of reconnection attempts
        reconnectTries: 10,
        // Time between reconnection attempts
        reconnectInterval: 1000,
      },
    };
  } catch (error) {
    logger.error('Error configuring MongoDB connection:', error);
    // Return null configuration to prevent app from crashing
    return null;
  }
};
