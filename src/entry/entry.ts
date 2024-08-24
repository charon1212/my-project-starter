import { mode_01_electron } from "../mode/01_electron/mode_01_electron";
import { mode_03_nextjs } from "../mode/03_nextjs/mode_03_nextjs";
import { mode_99_test } from "../mode/99_test/mode_99_test";
import { menu } from "../util/menu";

export const entry = async () => {
  const selectedMenu = await menu<() => unknown>([
    { id: 1, title: 'electron', desc: 'create typescript-electron project template.', value: mode_01_electron, },
    { id: 3, title: 'nextjs', desc: 'create nextjs-react-typescript project template.', value: mode_03_nextjs, },
    { id: 99, title: 'test', desc: 'test for debug', value: mode_99_test, },
    { id: 999, title: 'quit', desc: 'quit', value: () => { }, },
  ]);
  await selectedMenu.value();
};
