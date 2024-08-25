import { loadAppEnv } from "../../util/appEnv";

export const mode_99_test = async () => {
  console.log(process.cwd());
  console.log({ appEnv: loadAppEnv() });
};
