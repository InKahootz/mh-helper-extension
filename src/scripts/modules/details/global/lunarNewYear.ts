import type {User} from '@scripts/types/hg';
import type {IDetailer} from '../details.types';

export class LunarNewYearDetailer implements IDetailer {
    /**
     * Set a value for LNY bonus luck, if it can be determined. Otherwise flag LNY hunts.
     */
    addDetails(message: any, userPre: User, userPost: User, journal: any): LunarNewYearDetails | undefined {
        const quest = userPost.quests.QuestLunarNewYear;
        if (quest) {
            return {
                is_lny_hunt: true,
                lny_luck: (quest.lantern_status.includes("noLantern") || !quest.is_lantern_active)
                    ? 0
                    : Math.min(50, Math.floor(parseInt(quest.lantern_height, 10) / 10)),
            } as LunarNewYearDetails;
        }
    }
}

export type LunarNewYearDetails = {
    is_lny_hunt: boolean;
    lny_luck: number;
}
