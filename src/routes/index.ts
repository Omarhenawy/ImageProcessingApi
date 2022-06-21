import express from 'express'
import images from './api/images'
const routes = express.Router();

routes.get('/',(request: express.Request, response: express.Response): void => {
  response.send('main api route')
});
routes.use('/images', images)
export default routes;
routes ;