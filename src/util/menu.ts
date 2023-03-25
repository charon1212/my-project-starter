import { logger } from "./logger";
import { readFromCli } from "./readFromCli";

const getText = ({ id, title, desc, }: { id: number, title: string, desc?: string }) => `[${id}] - ${title}${desc ? `(${desc})` : ''}`;

export const menu = async <T>(options: { id: number, title: string, desc?: string, value: T }[]) => {
  console.log('** menus **');
  options.forEach((op) => console.log(`  ${getText(op)}`));
  const input = await readFromCli('SELECT MENU>', (input) => options.some(({ id }) => `${id}` === input));
  const selectOption = options.find(({ id }) => `${id}` === input)!;
  logger.mark1(`MENU SELECTED > ${getText(selectOption)}`);
  return selectOption;
};
