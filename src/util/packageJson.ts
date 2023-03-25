import { file } from "./file";

export const packageJson = (path: string, update: (before: any) => any) => {
  file.update(path, (source) => JSON.stringify(update(JSON.parse(source))));
};
