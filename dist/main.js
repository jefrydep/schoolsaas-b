"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api/v1');
    app.enableCors({
        origin: process.env.CORS_ORIGIN || '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        credentials: true,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('VibeCoding API')
        .setDescription('API documentation for the VibeCoding backend')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    common_1.Logger.log(`Application running on http://localhost:${port}/api/v1`, 'Bootstrap');
    common_1.Logger.log(`Swagger docs available at http://localhost:${port}/api/docs`, 'Bootstrap');
}
bootstrap();
//# sourceMappingURL=main.js.map