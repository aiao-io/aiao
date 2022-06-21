import { DataSource, DataSourceOptions, Repository } from 'typeorm';

import { TypeormPlus } from '../../src';
import { baseOptions } from '../test-helper';
import { Car, People } from './car';

describe('one-to-many', () => {
  let dataSource: DataSource;
  let typeormPlus: TypeormPlus;

  let peopleRepository: Repository<People>;
  let carRepository: Repository<Car>;

  beforeAll(async () => {
    const options: DataSourceOptions = { ...baseOptions, entities: [People, Car] };
    dataSource = new DataSource(options);
    await dataSource.initialize();
    peopleRepository = dataSource.getRepository(People);
    carRepository = dataSource.getRepository(Car);
    typeormPlus = new TypeormPlus(options, dataSource);
    typeormPlus.init();
    // postSequelizeRepository = typeormPlus.getSequelizeRepository(Post);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  describe('get', () => {
    let id: number;
    beforeAll(async () => {
      const data = await peopleRepository.save({ id: 1 });
      id = data.id;
      await carRepository.save({ name: 'honda', people: data });
    });

    it('findOne/findByPk', async () => {
      const d1 = await peopleRepository.findOne({ where: { id: 1 } });
      expect(d1!.id).toEqual(id);
    });
  });
});
