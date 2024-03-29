import { DataSource, DataSourceOptions, Repository } from 'typeorm';

import { SequelizeRepository, TypeormPlus } from '../../src';
import { baseOptions } from '../test-helper';
import { Profile } from './profile.entity';
import { User } from './user.entity';

describe('one-to-one', () => {
  let dataSource: DataSource;
  let typeormPlus: TypeormPlus;

  let userRepository: Repository<User>;
  let userSequelizeRepository: SequelizeRepository<User>;

  beforeAll(async () => {
    const options: DataSourceOptions = { ...baseOptions, entities: [User, Profile] };
    dataSource = new DataSource(options);
    await dataSource.initialize();
    userRepository = dataSource.getRepository(User);
    typeormPlus = new TypeormPlus(options, dataSource);
    typeormPlus.init();
    userSequelizeRepository = typeormPlus.getSequelizeRepository(User);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  describe('get', () => {
    let id: number;
    beforeAll(async () => {
      const data = await userRepository.save({ name: '123', profile: { gender: 'male' } });
      id = data.id;
    });

    it('findOne/findByPk', async () => {
      const d1 = await userRepository.findOne({ where: { id } });
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
