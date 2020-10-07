
export class ParticipantModel {
    public participantId: number;
    public name: string;

    public static fromJSON(jsonParticipantModel: ParticipantModel) {
        const participantModel = new ParticipantModel;
        Object.assign(participantModel, jsonParticipantModel);
        return participantModel;
    }
}
