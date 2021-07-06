import { Router } from 'express';
import sessionController from './controllers/SessionController';
import moduleController from './controllers/ModuleController';
import classController from './controllers/ClassController';

import adminAuthenticate from './middlewares/adminAuthenticate';

const routes = Router();

routes.post('/session', sessionController.store);
routes.get('/modules', moduleController.index);
routes.get('/classes/:module_id', classController.index);

routes.post('/modules', adminAuthenticate, moduleController.store);
routes.put('/modules/:module_id', adminAuthenticate, moduleController.update);
routes.delete('/modules/:module_id', adminAuthenticate, moduleController.destroy);


routes.post('/classes/:module_id', adminAuthenticate, classController.store);
routes.put('/classes/:class_id', adminAuthenticate, classController.update);
routes.delete('/classes/:class_id', adminAuthenticate, classController.destroy);


export default routes;