import { env } from 'process';
import { Connection, ConnectionOptions, createConnection, Repository } from 'typeorm';

import { SequelizeRepository, TypeormPlus } from '../../src';

import { Profile } from './profile.entity';
import { User } from './user.entity';

try {
  require('dotenv').config();
} catch {}

const {
  TYPEORM_PLUS_TEST_DB_TYPE,
  TYPEORM_PLUS_TEST_USERNAME,
  TYPEORM_PLUS_TEST_PASSWORD,
  TYPEORM_PLUS_TEST_DATABASE
} = env;

const options: ConnectionOptions = {
  type: (TYPEORM_PLUS_TEST_DB_TYPE as any) || 'postgres',
  username: TYPEORM_PLUS_TEST_USERNAME,
  password: TYPEORM_PLUS_TEST_PASSWORD,
  database: TYPEORM_PLUS_TEST_DATABASE || 'test',
  synchronize: true,
  dropSchema: true,
  entities: [User, Profile]
};

describe('one-to-one', () => {
  let connection: Connection;
  let typeormPlus: TypeormPlus;

  let userRepository: Repository<User>;
  let userSequelizeRepository: SequelizeRepository<User>;

  beforeAll(async () => {
    connection = await createConnection(options);
    userRepository = connection.getRepository(User);
    typeormPlus = new TypeormPlus(options, connection);
    typeormPlus.init();
    userSequelizeRepository = typeormPlus.sequelize.model('User') as any;
  });

  describe('get', () => {
    let id: number;
    beforeAll(async () => {
      const data = await userRepository.save({ name: '123', profile: { gender: 'male' } });
      id = data.id;
    });

    it('findOne/findByPk', async () => {
      const d1 = await userRepository.findOne(id);
      const d2 = await userSequelizeRepository.findByPk(id);
      expect(d1.id).toEqual(d2.id);
      expect(d1.name).toEqual(d2.name);
      expect(d1.profileId).toEqual(d2.profileId);
    });

    it('relation', async () => {
      const d1 = await userRepository.findOne({ where: { id }, relations: ['profile'] });
      const d2 = await userSequelizeRepository.findOne({ include: ['profile'], where: { id } });
      expect(d1.profile.gender).toEqual(d2.profile.gender);
    });
  });
});
