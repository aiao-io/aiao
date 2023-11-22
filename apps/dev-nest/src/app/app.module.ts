import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './photo/photo.entity';
import { PhotoModule } from './photo/photo.module';
import { AiaoTypeormPlusModule } from '@aiao/nest-typeorm-plus';

@Module({
  imports: [
    AiaoTypeormPlusModule.forRoot({ ...typeormPlusConfig, entities: [] }),

  ],
})
export class AppModule {}
