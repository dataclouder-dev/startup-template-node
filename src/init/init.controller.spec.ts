import { GUARDS_METADATA } from '@nestjs/common/constants';
import { AdminGuard, AuthGuard } from '@dataclouder/nest-auth';
import { AppGuard } from '@dataclouder/nest-core';
import { InitController } from './init.controller';
import { AdminController } from '../admin/admin.controller';

describe('Admin-only route protection in Startup Template backend', () => {
  it('requires AppGuard + AuthGuard on InitController and AdminGuard on createFirstAdmin', () => {
    const classGuards = Reflect.getMetadata(GUARDS_METADATA, InitController) ?? [];
    expect(classGuards).toEqual(expect.arrayContaining([AppGuard, AuthGuard]));

    const methodGuards = Reflect.getMetadata(GUARDS_METADATA, InitController.prototype.createFirstAdmin) ?? [];
    expect(methodGuards).toContain(AdminGuard);
  });

  it('requires AppGuard + AuthGuard + AdminGuard on AdminController', () => {
    const classGuards = Reflect.getMetadata(GUARDS_METADATA, AdminController) ?? [];
    expect(classGuards).toEqual(expect.arrayContaining([AppGuard, AuthGuard, AdminGuard]));
  });
});
