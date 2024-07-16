import { Router } from 'express';
import { ProvidersController } from './cloud-providers.controller';


const router = Router();

router.get('/', ProvidersController.getProviders);

export default router;
