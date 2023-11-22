import { AiaoTypeormPlusModule } from '@aiao/nest-typeorm-plus';
import { Module } from '@nestjs/common';
import { typeormPlusConfig } from '../configs/typeorm-plus.config';
import { PhotoModule } from './photo/photo.module';

@Module({
  imports: [PhotoModule, AiaoTypeormPlusModule.forRoot({ ...typeormPlusConfig, entities: [] })]
})
export class AppModule {}
