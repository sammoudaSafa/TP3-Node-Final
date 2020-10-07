import { ParticipantModel } from 'common';
import { Router } from 'express';
import { ParticipantDAO } from '../dao/participantdao';
import { wrap } from '../util';

const participantRouter = Router();
const participantDAO = new ParticipantDAO;

participantRouter.use('/:participantId', wrap(async (req, res, next) => {
    const participant = await participantDAO.getParticipant(req.params.participantId, req.comment.commentId);
    if (participant === null) { return res.sendStatus(404); }
    req.participant = participant;

    return next();
}));

participantRouter.get('/', wrap(async (req, res) => {
    const participants = await participantDAO.getParticipants(req.comment.commentId);
    return res.send(participants);
}));

participantRouter.get('/:participantId', wrap(async (req, res) => {
    return res.send(req.participant);
}));

participantRouter.post('/', wrap(async (req, res) => {
    const participant = ParticipantModel.fromJSON(req.body);



    const participantId = await participantDAO.createParticipant(participant, req.comment.commentId);
    return res.send(await participantDAO.getParticipant(participantId, req.comment.commentId));
}));

export { participantRouter };
