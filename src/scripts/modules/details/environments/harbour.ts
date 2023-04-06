import {type User} from '@scripts/types/hg';
import {type IEnvironmentDetailer} from '../details.types';

export class HarbourDetailer implements IEnvironmentDetailer {
    readonly environment: string = 'Harbour';

    /**
     * Report whether certain mice were attractable on the hunt.
     */
    addDetails(message: any, userPre: User, userPost: User, journal: any): {} | undefined {
        const quest = userPre.quests.QuestHarbour;
        const details: any = {
            on_bounty: (quest.status === "searchStarted"),
        };
        quest.crew.forEach((mouse: any) => {
            details[`has_caught_${mouse.type}`] = (mouse.status === "caught");
        });
        return details;
    }
}
