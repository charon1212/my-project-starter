import { er, ok, Result } from '@charon1212/result';
import * as fs from 'fs';
import { z } from 'zod';

/** ■ ■ ■ ■ App環境変数定義 ■ ■ ■ ■ */
const zAppEnv = z.object({
  debug: z.boolean(),
});
export type AppEnv = z.infer<typeof zAppEnv>;

/** デフォルト環境変数。環境ファイルがなければこれを利用する。 */
const defaultAppEnv: AppEnv = {
  debug: false,
};

/** 環境変数ファイルのファイルパス */
const envFilePath = `${process.env['USERPROFILE'] || ''}/.charon1212/my-project-starter/env.json`;

/**
 * 環境変数ファイルから環境変数を読み込む。
 * 読み込みに失敗した場合、デフォルト環境変数を返却する。
 * @returns 環境変数オブジェクト
 */
export const loadAppEnv = (): AppEnv => {
  if (!fs.existsSync(envFilePath) || fs.statSync(envFilePath).isDirectory()) return defaultAppEnv;
  const bufEnvFile = fs.readFileSync(envFilePath);
  try {
    const appEnv = JSON.parse(bufEnvFile.toString());
    return zAppEnv.parse(appEnv);
  } catch (e) {
    // エラー発生時は何もせず、デフォルト環境変数を返却する。
    // エラーは、JSON.parse失敗時、またはzAppEnv.parse失敗時に発生する。
  }
  return defaultAppEnv;
};

/**
 * デフォルト環境変数で、環境変数ファイルを作成する。
 * @param overwrite trueを指定した場合、上書きする。
 * @returns 作成に成功した場合、ファイルパスを返却する。
 */
export const createAppEnvFile = (overwrite?: boolean): Result<string, void> => {
  if (!overwrite && fs.existsSync(envFilePath)) return er();
  try {
    fs.writeFileSync(envFilePath, JSON.stringify(defaultAppEnv));
    return ok(envFilePath);
  } catch (e) {
    return er();
  }
};
