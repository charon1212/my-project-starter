import { command } from '../../util/command';
import { logger } from '../../util/logger';

export const mode_03_nextjs = async () => {

  // create-next-appで、NextJSプロジェクトを構築する。
  const commandCreateNextApp = "npx --yes create-next-app ." // --yesの指定で、常にパッケージのインストールに同意
    + " --typescript"           // typescriptを利用する
    + " --no-eslint"            // ESLintを利用しない
    + " --no-tailwind"          // Tailwind CSSを利用しない
    + " --src-dir"              // 「src/」ディレクトリを利用する
    + " --app"                  // App Routerを利用する
    + " --import-alias @/*";  // Import Aliasの設定（デフォルト設定）
  logger.mark2(`[${commandCreateNextApp}] nextjsのテンプレートをインストール`);
  const result1 = await command.exec(commandCreateNextApp);
  if (result1.isEr) return;

};
