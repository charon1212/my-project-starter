import { Result, ok, er } from '@charon1212/result';
import { exec, ExecException } from 'child_process';
import { logger } from './logger';

export type MyCommandException = { error: { errorObject: ExecException, stderr: string, } };
export const command = {
  exec: (command: string) => {
    return new Promise<Result<string, MyCommandException>>((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          logger.mark1('★ERROR:');
          logger.log(JSON.stringify({ error: { errorObject: error, stderr } }));
          resolve(er({ error: { errorObject: error, stderr } }));
        }
        else {
          logger.log(stdout);
          resolve(ok(stdout));
        }
      });
    });
  },
}
