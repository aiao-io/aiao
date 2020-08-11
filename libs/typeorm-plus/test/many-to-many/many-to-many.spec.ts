import { Connection, ConnectionOptions, createConnection, Repository } from 'typeorm';

import { SequelizeRepository, TypeormPlus } from '../../src';
import { baseOptions } from '../test-helper';
import { PostImage } from './post-image.entity';
import { Post } from './post.entity';

describe('many-to-many', () => {
  let connection: Connection;
  let typeormPlus: TypeormPlus;

  let postRepository: Repository<Post>;
  let postSequelizeRepository: SequelizeRepository<Post>;

  beforeAll(async () => {
    const options: ConnectionOptions = { ...baseOptions, entities: [Post, PostImage] };
    connection = await createConnection(options);
    postRepository = connection.getRepository(Post);
    typeormPlus = new TypeormPlus(options, connection);
    typeormPlus.init();
    postSequelizeRepository = typeormPlus.sequelize.model('Post') as any;
  });

  describe('get', () => {
    let id: number;
    beforeAll(async () => {
      const data = await postRepository.save({
        name: 'post',
        images: [{ name: 'cat' }]
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
      const d1 = await postRepository.findOne({ where: { id }, relations: ['images'] });
      const d2 = await postSequelizeRepository.findOne({ where: { id }, include: ['images'] });
      expect(d1!.images[0].name).toEqual(d2!.images[0].name);
    });
  });
});
