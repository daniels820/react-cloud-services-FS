import { Router } from 'express';
import scanRouter from './scan';
import providersRouter from './cloud-privder';


const router = Router();

router.use('/scans', scanRouter);
router.use('/providers', providersRouter);

export default router;
