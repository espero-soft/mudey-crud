/**
 * Generate with Mudey Formation (https://mudey.fr)
 * Created at : {date}
 */
import * as express from 'express';
const router = express.Router();
import * as {controllerName} from {controllerPath};

/*
 * GET
 */
router.get('/', {controllerName}.get{Name}s);

/*
 * GET
 */
router.get('/:id', {controllerName}.show{Name}ById);

/*
 * POST
 */
router.post('/', {controllerName}.create{Name});

/*
 * PUT
 */
router.put('/:id', {controllerName}.update{Name}ById);

/*
 * DELETE
 */
router.delete('/:id', {controllerName}.remove{Name}ById);

export = router;