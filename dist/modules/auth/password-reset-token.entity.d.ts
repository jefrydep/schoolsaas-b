import { User } from '../users/user.entity';
export declare class PasswordResetToken {
    id: string;
    email: string;
    token: string;
    expiresAt: Date;
    usedAt: Date | null;
    user: User | null;
    userId: string | null;
    createdAt: Date;
}
