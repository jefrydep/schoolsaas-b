export declare class EmailService {
    private transporter;
    constructor();
    sendPasswordResetEmail(email: string, token: string): Promise<void>;
}
