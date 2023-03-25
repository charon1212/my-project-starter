import * as readline from "readline";

export const readFromCli = async (message: string, accept?: (input: string) => boolean): Promise<string> => {
  while (true) {
    const ans = await readFromCli2(message);
    if (!accept || accept(ans)) return ans;
  }
};

const readFromCli2 = async (message: string): Promise<string> => {
  const readlineInterface = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise<string>((resolve) => {
    readlineInterface.question(message, (ans) => {
      resolve(ans);
      readlineInterface.close();
    });
  });
};
