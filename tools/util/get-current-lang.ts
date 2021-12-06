import { env } from 'process';

export const systemLang: string = env.LANG || 'zh_CN';
