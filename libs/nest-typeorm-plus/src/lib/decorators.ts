import { Inject } from '@nestjs/common';

import { getSequelizeRepositoryToken, NEST_TYPEORM_PLUS } from './interface';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

export const InjectSequlizeRepository = (entity: EntityClassOrSchema) => Inject(getSequelizeRepositoryToken(entity));

export const InjectTypeormPlus = () => Inject(NEST_TYPEORM_PLUS);
