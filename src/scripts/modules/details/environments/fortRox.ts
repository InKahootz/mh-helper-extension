import {type User} from '@scripts/types/hg';
import {type IEnvironmentDetailer} from '../details.types';

export class FortRoxDetailer implements IEnvironmentDetailer {
    readonly environment: string = 'Fort Rox';

    /**
     * Categorize the available buffs that may be applied on the hunt, such as an active Tower's
     * auto-catch chance, or the innate ability to weaken all Weremice.
     */
    addDetails(message: any, userPre: User, userPost: User, journal: any): {} | undefined {
        const quest = userPre.quests.QuestFortRox;
        const ballista_level = parseInt(quest.fort.b.level, 10);
        const cannon_level = parseInt(quest.fort.c.level, 10);
        const details: any = {};
        if (quest.is_night) {
            Object.assign(details, {
                weakened_weremice:      (ballista_level >= 1),
                can_autocatch_weremice: (ballista_level >= 2),
                autocatch_nightmancer:  (ballista_level >= 3),

                weakened_critters:      (cannon_level >= 1),
                can_autocatch_critters: (cannon_level >= 2),
                autocatch_nightfire:    (cannon_level >= 3),
            });
        }
        // The mage tower's auto-catch can be applied during Day and Dawn phases, too.
        const tower_state = quest.tower_status.includes("inactive")
            ? 0
            : parseInt(quest.fort.t.level, 10);
        details.can_autocatch_any = (tower_state >= 2);

        return details;
    }
}
