import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Warehouse API')
    .setDescription('API documentation for the warehouse management system')
    .setVersion('1.0')
    .addTag('warehouse')
    .build();

    const document= SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('', app, document);


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
