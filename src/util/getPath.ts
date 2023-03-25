const currentWorkDirectory = process.cwd();

export const getPath = (rel: string) => `${currentWorkDirectory}/${rel}`;
