import '@clerk/remix';
import { UserRole } from '~/middleware/auth';

declare module '@clerk/remix' {
  interface PublicMetadata {
    role?: UserRole;
  }
}
