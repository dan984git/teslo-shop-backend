import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
    uploadImage(file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('Make sure that the file is an image');
        }
        return file.filename;
    }

    getStaticProductImage(imageName: string) {
        const path = join(__dirname, '../../static/products', imageName);
        if (!existsSync(path)) {
            throw new BadRequestException('No product found with image');
        }
        return path;
    }
}
