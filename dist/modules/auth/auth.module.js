"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const typeorm_1 = require("@nestjs/typeorm");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const users_module_1 = require("../users/users.module");
const tenants_module_1 = require("../tenants/tenants.module");
const jwt_config_1 = require("../../config/jwt.config");
const super_admin_entity_1 = require("./super-admin.entity");
const user_entity_1 = require("../users/user.entity");
const super_admins_service_1 = require("./super-admins.service");
const super_admins_controller_1 = require("./super-admins.controller");
const password_reset_token_entity_1 = require("./password-reset-token.entity");
const email_service_1 = require("./email.service");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            tenants_module_1.TenantsModule,
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.register((0, jwt_config_1.jwtConfig)()),
            typeorm_1.TypeOrmModule.forFeature([super_admin_entity_1.SuperAdmin, user_entity_1.User, password_reset_token_entity_1.PasswordResetToken]),
        ],
        controllers: [auth_controller_1.AuthController, super_admins_controller_1.SuperAdminsController],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, super_admins_service_1.SuperAdminsService, email_service_1.EmailService],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map