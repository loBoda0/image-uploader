import { Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { Res, UploadedFile } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { FileService } from './file.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private fileservice: FileService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Res() response,
  ): Promise<any> {
    console.log('on upload')
    const result = await this.fileservice.uploadPublicFile(
      file.buffer,
      file.originalname,
    );
    return result; 
  }
  
}
