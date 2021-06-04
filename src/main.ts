import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })
  app.enableCors()
  
  app.use(cookieParser());
  const SERVICE_PORT: number = +process.env.SERVICE_PORT || 8000
  const SERVICE_VERSION: string = `${process.env.SERVICE_VERSION}`
  const SERVICE_NAME: string = `${process.env.SERVICE_NAME}`
  const options = new DocumentBuilder()
    .setTitle(SERVICE_NAME)
    .setVersion(SERVICE_VERSION)
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)
  await app.listen(SERVICE_PORT)
  console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()