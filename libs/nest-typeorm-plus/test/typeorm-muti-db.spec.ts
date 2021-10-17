import 'reflect-metadata';
import './hotfix-nestjs-rxjs-7';

import { config } from 'dotenv';
import { env } from 'process';
import { ConnectionOptions, Repository } from 'typeorm';

import { Controller, INestApplication, Module } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';

import { InjectSequlizeRepository } from '../src';
import { PostCategory } from './post-category.entity';
import { Post } from './post.entity';

config();

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

export const connectOptions: ConnectionOptions = {
  name: 'db2',
  ...baseOptions,
  database: 'test2'
};

@Controller()
export class TestService {
  constructor(@InjectRepository(Post) public post: Repository<Post>) {}
}
@Module({
  imports: [TypeOrmModule.forFeature([Post, PostCategory]), TypeOrmModule.forFeature([ PostCategory], 'db2')],
  providers: [TestService]
})
export class DBModule {}

@Module({
  imports: [
    DBModule,
    TypeOrmModule.forRoot({ ...baseOptions, entities: [Post, PostCategory] }),
    TypeOrmModule.forRoot({ ...connectOptions, entities: [Post, PostCategory] })
  ]
})
export class AppModule {}

describe('typeorm 多库测试', () => {
  let app: INestApplication;
  let testService: TestService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = module.createNestApplication();
    testService = app.get(TestService);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it(`写入一对多关系`, async () => {
    const postCat = await testService.post.create({ name: 'cat' });
    console.log(postCat);
    expect(postCat).toBeTruthy();
  });
});
