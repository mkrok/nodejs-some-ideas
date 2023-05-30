import { Request, Response, Router } from 'express';

const pingController = () => {
  const router: Router = Router();
  router.get('/', (req: Request, res: Response) => {
    return res.send('pong\n\n');
  });
  return router;
};

export default pingController;
