import { Connection, ConnectionOptions } from 'typeorm';

import { EntityType, SequelizeRepository } from './interface';
import { TypeormSequelizeHelper } from './typeorm-sequelize.helper';

export class TypeormPlusNew {
  #connectionMap: Map<Connection, TypeormSequelizeHelper> = new Map();

  addConnection(options: Partial<ConnectionOptions>, connection: Connection) {
    if (connection && !this.#connectionMap.has(connection)) {
      const helper = new TypeormSequelizeHelper(options, connection);
      this.#connectionMap.set(connection, helper);
    }
  }

  getRepository<Entity>(entity: EntityType, connection?: Connection): SequelizeRepository<Entity> {
    const connectionArr = Array.from(this.#connectionMap);
    let back: SequelizeRepository<Entity> | undefined;

    for (let i = 0; i < connectionArr.length; i++) {
      const [conn, helper] = connectionArr[i];
      if (connection) {
        if (conn === connection) {
          back = helper.getRepository(entity);
          break;
        }
      } else {
        back = helper.getRepository(entity);
        if (back) {
          break;
        }
      }
    }

    if (!back) {
      throw new Error(`entity not found: ${entity}`);
    }
    return back;
  }

  init() {
    this.#connectionMap.forEach(helper => helper.init());
  }
}
