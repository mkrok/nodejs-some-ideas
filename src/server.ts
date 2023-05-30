import bodyParser from 'body-parser';
import express from 'express';
import pingController from './controllers/pingController';
import heavyComputationController from './controllers/heavyComputationController';

const app: express.Application = express();
const staticPath = __dirname + '/';

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send(err);
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(staticPath));
app.use('/ping', pingController());
app.use('/heavy', heavyComputationController());

app.get('/', (req, res) => {
  res.status(200).send('<h1>Hello there!</h1>');
});

app.listen(9591, () => {
  console.log('Server running on :9591');
});
