import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
import { v4 as uuidv4 } from 'uuid';

// Learned how to upload images to API from youtube video (https://www.youtube.com/watch?v=f-URVd2OKYc)
@Controller('timestamp')
export class TimestampController {
  @Post('upload')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './upload/timestampFiles',
        filename: (req, file, cb) => {
          const filename: string =
            path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
          const extension: string = path.parse(file.originalname).ext;
          cb(null, `${filename}${extension}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    const fileNames = [];
    files.forEach((file) => {
      fileNames.push(file.filename);
    });
    const imagesString = fileNames.join(',');
    return imagesString;
  }
  //   GET FOR DISPLAYING IMAGE
  @Get('product-image/:imagename')
  findProductImage(@Param('imagename') imagename, @Res() res) {
    return res.sendFile(
      join(process.cwd(), '/upload/productImages/' + imagename),
    );
  }
}
