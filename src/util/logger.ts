import * as fs from 'fs';

const logFilePath = 'C:/charon1212-starter.log';

export const logger = {
  mark1: (content: string) => log(`■ ■ ■ ${content}`),
  mark2: (content: string) => log(`■ ■ ${content}`),
  mark3: (content: string) => log(`■ ${content}`),
  log: (content: string) => log(content),
};

const log = (content: string) => {
  console.log(content);
  if (logFilePath) fs.writeFileSync(logFilePath, `${content}\r\n`, { flag: 'a' });
};
