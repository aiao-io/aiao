import { Connection, ConnectionOptions, createConnection, Repository } from 'typeorm';

import { SequelizeRepository, TypeormPlus } from '../../src';
import { baseOptions } from '../test-helper';
import { Profile } from './profile.entity';
import { User } from './user.entity';

describe('one-to-one', () => {
  let connection: Connection;
  let typeormPlus: TypeormPlus;

  let userRepository: Repository<User>;
  let userSequelizeRepository: SequelizeRepository<User>;

  beforeAll(async () => {
    const options: ConnectionOptions = { ...baseOptions, entities: [User, Profile] };
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
      expect(d1!.id).toEqual(d2!.id);
      expect(d1!.name).toEqual(d2!.name);
      expect(d1!.profileId).toEqual(d2!.profileId);
    });

    it('relation', async () => {
      const d1 = await userRepository.findOne({ where: { id }, relations: ['profile'] });
      const d2 = await userSequelizeRepository.findOne({ where: { id }, include: ['profile'] });
      expect(d1?.profile?.gender).toEqual(d2?.profile?.gender);
    });
  });
});
