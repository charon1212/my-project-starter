import { arrayText } from '../../util/arrayText';
import { command } from '../../util/command';
import { file } from '../../util/file';
import { logger } from '../../util/logger';
import { packageJson } from '../../util/packageJson';

export const mode_01_electron = async () => {

  // typescript-reactのテンプレートをインストール
  logger.mark2('[npx create-react-app . --template typescript]typescript-reactのテンプレートをインストール');
  const result1 = await command.exec('npx create-react-app . --template typescript');
  if (result1.isEr) return;

  // .gitignore追加
  logger.mark2('gitignore追加');
  file.update('.gitignore', (source) => source + arrayText([
    '',
    '',
    '# add by https://github.com/charon1212/my-project-starter',
    '/dist',
    'package-lock.json',
  ]));

  // electronを追加
  logger.mark2('[npm i -D electron electron-builder electron-store]electronを追加');
  const result2 = await command.exec('npm i -D electron electron-builder electron-store');
  if (result2.isEr) return;

  // electronのテンプレートを追加
  logger.mark2('electronのテンプレートを追加');

  const directoryPathList = ['electron', 'src\\@types'];

  for (let directoryPath of directoryPathList) {
    logger.mark3(`ディレクトリ作成：${directoryPath}`);
    const result3 = await command.exec(`mkdir ${directoryPath}`);
    if (result3.isEr) return;
  }

  const filePathList = [
    'electron/electron.ts',
    'electron/electronInterProcessCommunication.ts',
    'electron/preload.ts',
    'electron/subscribeIpcMainHandler.ts',
    'electron/tsconfig.json',
    'src/App.tsx',
    'src/@types/electronInterProcessCommunication.ts',
    'src/@types/global.d.ts',
  ];

  for (let filePath of filePathList) {
    logger.mark3(`ダウンロード：${filePath}`);
    const result4 = await command.exec(`curl https://raw.githubusercontent.com/charon1212/template-electron-react-typescript/main/${filePath}`);
    if (result4.isEr) return;
    logger.mark3(`配置：${filePath}`);
    file.add(filePath, result4.ok);
  }

  // package.jsonの修正
  logger.mark2('package.jsonの修正');
  packageJson('package.json', (before) => {
    before['main'] = 'build/electron/electron.js';
    before['homepage'] = './';
    if (!before['scripts']) before['scripts'] = {};
    before['scripts']['electron:dev'] = 'tsc -p electron && electron .';
    before['scripts']['electron:prod'] = 'npm run build && tsc -p electron && electron-builder --win --x64 --dir';
    before['scripts']['electron:prod:install'] = 'npm run build && tsc -p electron && electron-builder --win --x64';
    if (!before['build']) before['build'] = {};
    before['build']['extends'] = null;
    before['build']['files'] = ['build/**/*'];
    before['build']['directories'] = { buildResources: 'assets' };
    return before;
  });

};
