import { Connection, ConnectionOptions, createConnection, Repository } from 'typeorm';

import { SequelizeRepository, TypeormPlusNew } from '../../src';
import { baseOptions, sleep } from '../test-helper';
import { PostCategory } from './post-category.entity';
import { Post } from './post.entity';

describe('one-to-many', () => {
  let connection: Connection;
  let typeormPlus: TypeormPlusNew;

  let postRepository: Repository<Post>;
  let postSequelizeRepository: SequelizeRepository<Post>;

  beforeAll(async () => {
    const options: ConnectionOptions = { ...baseOptions, entities: [Post, PostCategory] };
    connection = await createConnection(options);
    postRepository = connection.getRepository(Post);
    typeormPlus = new TypeormPlusNew();
    typeormPlus.addConnection(options, connection);
    typeormPlus.init();
    postSequelizeRepository = typeormPlus.getSequelizeRepository(Post);
    await sleep(1000);
  });

  afterAll(async () => {
    await connection.close();
  });

  describe('get', () => {
    let id: number;
    beforeAll(async () => {
      const data = await postRepository.save({
        name: 'post',
        category: { name: 'cat' }
      });
      id = data.id;
    });

    it('findOne/findByPk', async () => {
      const d1 = await postRepository.findOne(id);
      const d2 = await postSequelizeRepository.findByPk(id);
      expect(d1!.id).toEqual(d2!.id);
      expect(d1!.name).toEqual(d2!.name);
    });

    it('relation', async () => {
      const d1 = await postRepository.findOne({ where: { id }, relations: ['category'] });
      const d2 = await postSequelizeRepository.findOne({ where: { id }, include: ['category'] });
      expect(d1?.category?.name).toEqual(d2?.category?.name);
    });
  });
});
