import * as fs from 'fs';
import { loadAppEnv } from './appEnv';

// 環境変数
const appEnv = loadAppEnv();

const replaceUserprofileEnv = (str: string): string => {
  return str.replace(/%USERPROFILE%/g, process.env['USERPROFILE'] || '');
};
const logDirPath = replaceUserprofileEnv('%USERPROFILE%/.charon1212/my-project-starter');
const logFilePath = `${logDirPath}/my-project-starter.log`;

export const logger = {
  mark1: (content: string) => log(`■ ■ ■ ${content}`),
  mark2: (content: string) => log(`■ ■ ${content}`),
  mark3: (content: string) => log(`■ ${content}`),
  log: (content: string) => log(content),
  debug: (content: string) => log(content, true),
};

const log = (content: string, debug?: boolean) => {
  if (!debug || appEnv.debug) {
    console.log(content);
    if (!fs.existsSync(logDirPath)) fs.mkdirSync(logDirPath, { recursive: true });
    fs.writeFileSync(logFilePath, `${content}\r\n`, { flag: 'a' });
  }
};
