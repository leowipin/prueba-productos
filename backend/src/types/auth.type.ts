import { UserRole } from "./user.type";

export interface TokenPayload {
    id: string;
    role: UserRole;
    username: string;
    iat: number;
    exp: number;
}