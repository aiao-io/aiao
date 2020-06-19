import { env } from 'process';
import { ConnectionOptions } from 'typeorm';

import { TypeormPlus } from '@aiao/typeorm-plus';
import { Controller, INestApplication, Module } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';

import { AiaoTypeormPlusModule } from '../src';
import { InjectSequlizeRepository, InjectTypeormPlus } from '../src/lib/decorators';
import { PostCategory } from './post-category.entity';
import { Post } from './post.entity';

try {
  require('dotenv').config();
} catch {}

const {
  TYPEORM_PLUS_TEST_DB_TYPE,
  TYPEORM_PLUS_TEST_USERNAME,
  TYPEORM_PLUS_TEST_PASSWORD,
  TYPEORM_PLUS_TEST_DATABASE
} = env;

export const baseOptions: ConnectionOptions = {
  type: (TYPEORM_PLUS_TEST_DB_TYPE as any) || 'postgres',
  username: TYPEORM_PLUS_TEST_USERNAME,
  password: TYPEORM_PLUS_TEST_PASSWORD,
  database: TYPEORM_PLUS_TEST_DATABASE || 'test',
  synchronize: true,
  dropSchema: true
};

@Controller()
export class TestService {}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...baseOptions,
      entities: [Post, PostCategory]
    })
  ],
  providers: [TestService]
})
export class AppModule {}

describe('Error messages', () => {
  let server: any;
  let app: INestApplication;
  let testService: TestService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = module.createNestApplication();
    server = app.getHttpServer();
    testService = app.get(TestService);
    await app.init();
  });

  it(`/GET (Observable stream) `, () => {
    console.log('testService', testService);
  });
});
