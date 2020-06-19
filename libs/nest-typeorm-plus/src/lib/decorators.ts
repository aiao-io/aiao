import { Inject } from '@nestjs/common';

import { EntityClassOrSchema, getSequelizeRepositoryToken, NEST_TYPEORM_PLUS } from './interface';

export const InjectSequlizeRepository = (entity: EntityClassOrSchema) => Inject(getSequelizeRepositoryToken(entity));

export const InjectTypeormPlus = () => Inject(NEST_TYPEORM_PLUS);
