import { Inject } from '@nestjs/common';

import { getSequelizeRepositoryToken, NEST_TYPEORM_PLUS } from './interface';

export const InjectSequlizeRepository = (entity: any) => Inject(getSequelizeRepositoryToken(entity));

export const InjectTypeormPlus = () => Inject(NEST_TYPEORM_PLUS);
