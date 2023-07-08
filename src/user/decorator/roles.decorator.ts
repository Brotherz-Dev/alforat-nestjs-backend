import { SetMetadata } from "@nestjs/common";
import { UserRole } from "../role.enum";

export const ROLES_KEY = 'roles';

export const HasRoles = (...roles : UserRole[]) => SetMetadata(ROLES_KEY, roles);