import { Connection, ConnectionOptions, createConnection, Repository } from 'typeorm';

import { TypeormPlus } from '../../src';
import { baseOptions } from '../test-helper';
import { Car, People } from './car';

describe('one-to-many', () => {
  let connection: Connection;
  let typeormPlus: TypeormPlus;

  let peopleRepository: Repository<People>;
  let carRepository: Repository<Car>;

  beforeAll(async () => {
    const options: ConnectionOptions = { ...baseOptions, entities: [People, Car] };
    connection = await createConnection(options);
    peopleRepository = connection.getRepository(People);
    carRepository = connection.getRepository(Car);
    typeormPlus = new TypeormPlus(options, connection);
    typeormPlus.init();
    // postSequelizeRepository = typeormPlus.getSequelizeRepository(Post);
  });

  afterAll(async () => {
    await connection.close();
  });

  describe('get', () => {
    let id: number;
    beforeAll(async () => {
      const data = await peopleRepository.save({});
      id = data.id;
      await carRepository.save({ name: 'honda', people: data });
    });

    it('findOne/findByPk', async () => {
      const d1 = await peopleRepository.findOne(id);
      expect(d1!.id).toEqual(id);
    });
  });
});
