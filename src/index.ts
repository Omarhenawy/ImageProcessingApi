import express, { Application } from 'express';
import routes from './routes';

const app : Application = express();
const port : number = 3000;

app.use('/api', routes);

app.listen(port, () => {
  console.log(`server is running on localhost ${port}`);
});

export default app;
