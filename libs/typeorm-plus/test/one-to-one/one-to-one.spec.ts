import { Connection, ConnectionOptions, createConnection, Repository } from 'typeorm';

import { SequelizeRepository, TypeormPlusNew } from '../../src';
import { baseOptions, sleep } from '../test-helper';
import { Profile } from './profile.entity';
import { User } from './user.entity';

describe('one-to-one', () => {
  let connection: Connection;
  let typeormPlus: TypeormPlusNew;

  let userRepository: Repository<User>;
  let userSequelizeRepository: SequelizeRepository<User>;

  beforeAll(async () => {
    const options: ConnectionOptions = { ...baseOptions, entities: [User, Profile] };
    connection = await createConnection(options);
    userRepository = connection.getRepository(User);
    typeormPlus = new TypeormPlusNew();
    typeormPlus.addConnection(options, connection);
    typeormPlus.init();
    userSequelizeRepository = typeormPlus.getSequelizeRepository(User);
    await sleep(1000);
  });

  afterAll(async () => {
    await connection.close();
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
