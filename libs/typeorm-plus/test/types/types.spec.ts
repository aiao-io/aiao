import { Connection, ConnectionOptions, createConnection, Repository } from 'typeorm';

import { SequelizeRepository, TypeormPlusNew } from '../../src';
import { baseOptions, sleep } from '../test-helper';
import { PostgresType, SampleEnum } from './postgres-type.entity';

describe('one-to-one', () => {
  let connection: Connection;
  let typeormPlus: TypeormPlusNew;

  let postgresTypeRepository: Repository<PostgresType>;
  let postgresTypeSequelizeRepository: SequelizeRepository<PostgresType>;

  beforeAll(async () => {
    const options: ConnectionOptions = { ...baseOptions, entities: [PostgresType] };
    connection = await createConnection(options);
    postgresTypeRepository = connection.getRepository(PostgresType);
    typeormPlus = new TypeormPlusNew();
    typeormPlus.addConnection(options, connection);
    typeormPlus.init();
    postgresTypeSequelizeRepository = typeormPlus.getSequelizeRepository(PostgresType, connection);
    await sleep(500);
  });
  afterAll(async () => {
    await connection.close();
  });
  describe('get', () => {
    let uuid: string;
    beforeAll(async () => {
      const data = await postgresTypeRepository.save({
        date: new Date(1980, 11, 1),
        name: 'max 255 chars name',
        boolean: false,
        shortText: 'TJ',
        number: 1235,
        int: 1000000,
        smallint: 12345,
        bigint: 123456789012345,
        date2: new Date(),
        time: new Date(),
        timestamptz: new Date(),
        isBoolean: true,
        isSecondBoolean: false,
        simpleArray: ['hello', 'world', 'of', 'typescript'],
        json: [{ hello: 'olleh' }, { world: 'dlrow' }],
        enum: SampleEnum.one,
        jsonb: [{ a: 1 }],
        characterVarying: ['a', 'b', 'c']
      });
      uuid = data.uuid;
    });

    it('findOne/findByPk', async () => {
      expect(uuid).toBeTruthy();
      const d1 = await postgresTypeRepository.findOne(uuid);
      const d2 = await postgresTypeSequelizeRepository.findByPk(uuid);
      expect(d1!.uuid).toEqual(d2!.uuid);
    });
  });
});
