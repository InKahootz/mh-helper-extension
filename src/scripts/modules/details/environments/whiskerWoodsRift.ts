import {type User} from '@scripts/types/hg';
import {type IEnvironmentDetailer} from '../details.types';

export class WhiskerWoodsRiftDetailer implements IEnvironmentDetailer {
    readonly environment: string = 'Whisker Woods Rift';

    /**
     * For Lactrodectus hunts, if MBW can be attracted (and is not guaranteed), record the rage state.
     */
    addDetails(message: any, userPre: User, userPost: User, journal: any): {} | undefined {
        if (message.cheese.id === 1646) {
            const zones = userPre.quests.QuestRiftWhiskerWoods.zones;
            const rage = {
                clearing: parseInt(zones.clearing.level, 10),
                tree: parseInt(zones.tree.level, 10),
                lagoon: parseInt(zones.lagoon.level, 10),
            };
            const total_rage = rage.clearing + rage.tree + rage.lagoon;
            if (total_rage < 150 && total_rage >= 75) {
                if (rage.clearing > 24 && rage.tree > 24 && rage.lagoon > 24) {
                    return Object.assign(rage, {total_rage});
                }
            }
        }
    }
}
