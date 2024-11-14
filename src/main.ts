import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { environment } from './environment/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(environment.port);

  const logger: Logger = new Logger('CSV-READER');
  logger.debug(
    `🚀 CSV-READER started is running on: http://localhost:${environment.port}/`,
  );
  app.enableShutdownHooks();
}
bootstrap();
