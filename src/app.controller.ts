import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private logger: Logger = new Logger('CSV-READER-CONTROLLER');

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('saveCsv')
  readAndSaveCsv(@Body() payload) {
    try {
      this.logger.log(
        `Handling request to save password with payload, ${JSON.stringify(
          payload,
        )}`,
      );

      return this.appService.readAndSaveCsv();
    } catch (err) {
      this.logger.debug(
        `Save password request failed with an error message,${err.message}`,
      );
      return err;
    }
  }
}
