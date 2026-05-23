"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConfig = jwtConfig;
function jwtConfig() {
    return {
        secret: process.env.JWT_SECRET || 'super-secret-key-change-in-production',
        signOptions: {
            expiresIn: '8h',
        },
    };
}
//# sourceMappingURL=jwt.config.js.map