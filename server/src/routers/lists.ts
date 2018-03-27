import { Router } from 'express';
import controllers from '../controllers/lists';
import complete from '../middleware/response.mw';

const router = Router();

router
    .get('/:listid', controllers.readById, complete)
    .get('/users/:userid', controllers.readByUser, complete)
    .post('/', controllers.create, complete)
    .post('/:listid', controllers.createListItem, complete)
    .delete('/', controllers.destroy, complete)
    .delete('/:listid', controllers.destroyFromList, complete);

export default router;