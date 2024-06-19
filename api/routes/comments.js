import express from 'express';
import { addComment, getComments, deleteComment, updateComment, } from '../controllers/comments.js';

const router = express.Router();

router.get('/:postid', getComments); 
router.post('/:id', addComment); 
router.delete('/:id', deleteComment); 
router.put('/:id', updateComment); 

export default router;