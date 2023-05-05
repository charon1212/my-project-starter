import { Result, ok } from "@charon1212/result";
import { MyCommandException, command } from "./command";
import { file } from "./file";
import { logger } from "./logger";

/**
 * @param url URLのフルパス (ex: http://example.com/some-resource)
 * @param path working directoryからの相対パス
 */
export const downloadFromUrl = async (url: string, path: string): Promise<Result<void, MyCommandException>> => {
  logger.mark3(`ダウンロード：${url}`);
  const result = await command.exec(`curl ${url}`);
  if (result.isEr) return result;
  logger.mark3(`配置：${path}`);
  file.add(path, result.ok);
  return ok();
};
