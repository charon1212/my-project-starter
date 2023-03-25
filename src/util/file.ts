import * as fs from 'fs';
import { getPath } from './getPath';

export const file = {
  add: (path: string, content: string) => {
    fs.writeFileSync(getPath(path), content);
  },
  exist: (path: string) => fs.existsSync(getPath(path)),
  update: (path: string, update: (source: string) => string) => {
    const p = getPath(path);
    fs.writeFileSync(p, update(fs.readFileSync(p).toString()));
  },
};
