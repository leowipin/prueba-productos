import { UserRole } from "./user.type";

declare global {
  namespace Express {
    export interface Request {
      user?: {
        id: string;
        role: UserRole;
        username: string;
      };
    }
  }
}