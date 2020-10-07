import { ParticipantModel } from 'common';
import { DBProvider } from '../dbprovider';


export class ParticipantDAO {

    private knex = DBProvider.getKnexConnection();

    // public async createParticipant(Participant: ParticipantModel) {
    //     const { name, startDate } = Participant;
    //     const [participantId] = await this.knex('participant').insert({
    //         name, startDate
    //     });
    //     return participantId;
    // }

    public async getParticipant(participantId: string | number, activityId: number) {
        const participant = await this.knex('participant').first('participantId', 'name').where({ activityId, participantId });
        if (!participant) { return null; }
        return ParticipantModel.fromJSON(participant);
    }

    public async getParticipants(activityId: number) {
        const participants = await this.knex('participant').select('participantId', 'name').where({ activityId });
        return participants.map(ParticipantModel.fromJSON);
    }

    public async createParticipant(participant: ParticipantModel, activityId: number) {
        const { name } = participant;
        const [participantId] = await this.knex('participant').insert({ name, activityId });
        return participantId;
    }
}
