import { Request, Response, Router } from 'express';
import fs from 'fs';
import { ChildProcess, fork } from 'child_process';

const heavyComputationController = () => {
  const router: Router = Router();

  router.get('/', (req: Request, res: Response) => {
    const file = fs.createWriteStream('./HugeFile.txt');
    console.time('Parent process');
    for (let i = 0; i < 1e7; i++) {
      file.write('Boom boom boom boom!\n');
    }

    file.end();
    console.timeEnd('Parent process');
    return res.send('Done!\n\n');
  });

  router.get('/fork', (req: Request, res: Response) => {
    const compute: ChildProcess = fork('./src/controllers/compute.ts');
    compute.send('start');
    compute.on('message', msg => {
      res.send(msg);
    });
  });

  return router;
};

export default heavyComputationController;
