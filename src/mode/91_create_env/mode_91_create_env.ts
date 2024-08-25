import { createAppEnvFile } from '../../util/appEnv';
import { logger } from '../../util/logger';

export const mode_91_create_env = async () => {

  const result = createAppEnvFile(true);
  if (result.isOk) {
    logger.log(`環境変数ファイルを作成。パス：${result.ok}`);
  } else {
    logger.log("ファイル作成に失敗しました。");
  }

};
