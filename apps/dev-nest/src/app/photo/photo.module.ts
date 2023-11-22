import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { Photo } from './photo.entity';
import { AiaoTypeormPlusModule } from '@aiao/nest-typeorm-plus';

@Module({
  imports: [AiaoTypeormPlusModule.forFeature([Photo])],
  providers: [PhotoService],
  controllers: [PhotoController]
})
export class PhotoModule {}
