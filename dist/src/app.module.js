"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = exports.THROTTLER_LIMIT = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const throttler_1 = require("@nestjs/throttler");
const auth_module_1 = require("./modules/auth/auth.module");
const guards_1 = require("./modules/auth/guards");
const user_module_1 = require("./modules/user/user.module");
const shortened_url_module_1 = require("./modules/shortened-url/shortened-url.module");
exports.THROTTLER_LIMIT = 10;
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            throttler_1.ThrottlerModule.forRoot([
                {
                    limit: exports.THROTTLER_LIMIT,
                    ttl: 30000,
                },
            ]),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
            }),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            shortened_url_module_1.ShortenedUrlModule,
        ],
        providers: [{ provide: core_1.APP_GUARD, useClass: guards_1.AtGuard }],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map