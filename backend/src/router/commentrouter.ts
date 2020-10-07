import { CommentModel } from 'common';
import { Router } from 'express';
import { CommentDAO } from '../dao/commentdao';
import { wrap } from '../util';
import { participantRouter } from './participantrouter';

const commentRouter = Router();
const commentDAO = new CommentDAO;

commentRouter.use('/:commentId', wrap(async (req, res, next) => {
    const comment = await commentDAO.getComment(parseInt(req.params.commentId));
    if (comment === null) { return res.sendStatus(404); }
    req.comment = comment;

    return next();
}));

commentRouter.get('/', wrap(async (_req, res) => {
    const comments = await commentDAO.getComments();
    return res.send(comments);
}));

commentRouter.get('/:commentId', wrap(async (req, res) => {
    return res.send(req.comment);
}));

commentRouter.post('/', wrap(async (req, res) => {
    const comment = CommentModel.fromJSON(req.body);
    const commentId = await commentDAO.createComment(comment);
    return res.send(await commentDAO.getComment(commentId));
}));

commentRouter.put('/:commentId', wrap(async (req, res) => {
    const updated = CommentModel.fromJSON(req.body);
    updated.commentId = req.comment.commentId;
    await commentDAO.updateComment(updated);
    return res.send(await commentDAO.getComment(req.comment.commentId));
}));

commentRouter.delete('/:commentId', wrap(async (req, res) => {
    await commentDAO.deleteComment(req.comment.commentId);
    return res.sendStatus(204);
}));

commentRouter.use('/:commentId/participant', participantRouter);

export { commentRouter };
