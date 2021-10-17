import 'reflect-metadata';
import './hotfix-nestjs-rxjs-7';

import { config } from 'dotenv';
import { env } from 'process';
import { ConnectionOptions, Repository } from 'typeorm';

import { SequelizeRepository } from '@aiao/typeorm-plus';
import { Controller, INestApplication, Module } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { InjectRepository } from '@nestjs/typeorm';

import { AiaoTypeormPlusModule, InjectSequlizeRepository } from '../src';
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
  constructor(
    @InjectSequlizeRepository(Post) public post: SequelizeRepository<Post>,
    @InjectSequlizeRepository(PostCategory) public postCategory: SequelizeRepository<PostCategory>
  ) {}
}
@Controller()
export class TestDB2Service {
  constructor(
    @InjectSequlizeRepository(Post, 'db2') public post: SequelizeRepository<Post>,
    @InjectSequlizeRepository(PostCategory, 'db2') public postCategory: SequelizeRepository<PostCategory>
  ) {}
}

@Module({
  imports: [
    AiaoTypeormPlusModule.forFeature([Post, PostCategory]),
    AiaoTypeormPlusModule.forFeature([Post, PostCategory], 'db2')
  ],
  providers: [TestService, TestDB2Service]
})
export class DBModule {}

@Module({
  imports: [
    DBModule,
    AiaoTypeormPlusModule.forRoot({ ...baseOptions, entities: [Post, PostCategory] }),
    AiaoTypeormPlusModule.forRoot({ ...connectOptions, entities: [Post, PostCategory] })
  ]
})
export class AppModule {}

describe('typeormPlus 多库测试', () => {
  let app: INestApplication;
  let testService: TestService;
  let testDB2Service: TestDB2Service;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = module.createNestApplication();
    testService = app.get(TestService);
    testDB2Service = app.get(TestDB2Service);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it(`写入一对多关系 db default`, async () => {
    const postCat = await testService.postCategory.create({ name: 'cat' });
    await testService.post.create({
      name: 'post',
      categoryId: postCat.id
    });
    const post = await testService.post.findOne({ include: ['category'] });
    expect(post).toBeTruthy();
    expect(post!.name).toEqual('post');
    expect(post!.categoryId).toEqual(postCat.id);
  });

  it(`写入一对多关系 db2`, async () => {
    const postCat = await testDB2Service.postCategory.create({ name: 'cat2' });
    expect(postCat.name).toEqual('cat2');
  });
});
