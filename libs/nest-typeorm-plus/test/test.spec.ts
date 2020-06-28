import { env } from 'process';
import { ConnectionOptions } from 'typeorm';

import { SequelizeRepository } from '@aiao/typeorm-plus';
import { Controller, INestApplication, Module } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AiaoTypeormPlusModule } from '../src';
import { InjectSequlizeRepository } from '../src/lib/decorators';
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
export class TestService {
  constructor(
    @InjectSequlizeRepository(Post) public post: SequelizeRepository<Post>,
    @InjectSequlizeRepository(PostCategory) public postCategory: SequelizeRepository<PostCategory>,
    @InjectSequlizeRepository(Post, 'test2') public post2: SequelizeRepository<Post>,
    @InjectSequlizeRepository(PostCategory, 'test2') public postCategory2: SequelizeRepository<PostCategory>
  ) {}
}
@Module({
  imports: [AiaoTypeormPlusModule.forFeature([Post, PostCategory])],
  providers: [TestService]
})
export class DBModule {}

@Module({
  imports: [
    DBModule,
    AiaoTypeormPlusModule.forRoot({
      ...baseOptions,
      entities: []
    }),
    AiaoTypeormPlusModule.forRoot({
      ...baseOptions,
      name: 'test2',
      dropSchema: false,
      database: 'test2',
      entities: []
    })
  ]
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

  fit(`test`, async () => {
    const postCat = await testService.postCategory.create({ name: 'cat' });
    await testService.post.create({
      name: 'post',
      categoryId: postCat.id
    });
    const post = await testService.post.findOne({ include: ['category'] });
    expect(post.name).toEqual('post');
    expect(post.categoryId).toEqual(postCat.id);
  });

  it(`test2`, async () => {
    const postCat = await testService.postCategory2.create({ name: 'cat2' });
    await testService.post2.create({
      name: 'post2',
      categoryId: postCat.id
    });
    const post = await testService.post2.findOne({ include: ['category2'] });
    expect(post.name).toEqual('post2');
    expect(post.categoryId).toEqual(postCat.id);
  });
});
