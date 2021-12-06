import { config } from 'dotenv';

import { SequelizeRepository } from '@aiao/typeorm-plus';
import { Controller, INestApplication, Module } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AiaoTypeormPlusModule, InjectSequlizeRepository } from '../src';
import { PostCategory } from './post-category.entity';
import { Post } from './post.entity';
import { baseOptions } from './test-helper';

config();

@Controller()
export class TestService {
  constructor(
    @InjectSequlizeRepository(Post) public post: SequelizeRepository<Post>,
    @InjectSequlizeRepository(PostCategory) public postCategory: SequelizeRepository<PostCategory>
  ) {}
}
@Module({
  imports: [AiaoTypeormPlusModule.forFeature([Post, PostCategory])],
  providers: [TestService]
})
export class DBModule {}

@Module({
  imports: [DBModule, AiaoTypeormPlusModule.forRoot({ ...baseOptions, entities: [] })]
})
export class AppModule {}

describe('单库测试', () => {
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
    const postCat = await testService.postCategory.create({ name: 'cat' });
    const postNew = await testService.post.create({
      name: 'post',
      categoryId: postCat.id
    });
    const post = await testService.post.findOne({ where: { id: postNew.id }, include: ['category'] });
    expect(post).toBeTruthy();
    expect(post!.name).toEqual('post');
    expect(post!.categoryId).toEqual(postCat.id);
  });
});
