import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load root .env in local development
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('FlowPilot AI API')
    .setDescription('Modular monolith REST API for FlowPilot AI workspace')
    .setVersion('0.1.0')
    .addTag('Health', 'System and persistence health verification')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.API_PORT || 4000;
  await app.listen(port);
  console.log(`[FlowPilot API] Server running at http://localhost:${port}`);
  console.log(`[FlowPilot API] Swagger documentation at http://localhost:${port}/api/docs`);
}

bootstrap().catch((err) => {
  console.error('[FlowPilot API] Startup error:', err);
  process.exit(1);
});
