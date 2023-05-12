import {type User} from '@scripts/types/hg';
import {type IntakeMessage} from '@scripts/types/mhct';
import {type IStager} from '../stages.types';

export class BountifulBeanstalkStager implements IStager {
    readonly environment: string = 'Bountiful Beanstalk';

    addStage(message: IntakeMessage, userPre: User, userPost: User, journal: unknown): void {
        const quest = userPre.quests.QuestBountifulBeanstalk;

        if (!quest) {
            throw new Error('QuestBountifulBeanstalk is undefined');
        }

        if (quest.in_castle) {
            const castle = quest.castle;

            // Good Test Name Floor => Good Test Name
            const floor = castle.current_floor.name
                .replace(/\sFloor$/, '');

            message.stage = floor;

            if (castle.is_boss_encounter) {
                message.stage += " Giant";
            }
        } else {
            message.stage = "Beanstalk";

            if (quest.beanstalk.is_boss_encounter) {
                message.stage += " Boss";
            }
        }
    }
}