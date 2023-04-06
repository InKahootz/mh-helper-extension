import {type User} from '@scripts/types/hg';
import {type IEnvironmentDetailer} from '../details.types';

export class BristleWoodsRiftDetailer implements IEnvironmentDetailer {
    readonly environment: string = 'Bristle Woods Rift';

    /**
     * Track additional state for the Bristle Woods Rift
     */
    addDetails(message: any, userPre: User, userPost: User, journal: any): Record<PropertyKey, unknown> | undefined {
        const quest = userPre.quests.QuestRiftBristleWoods;
        const details: any = {
            has_hourglass: quest.items.rift_hourglass_stat_item.quantity >= 1,
            chamber_status: quest.chamber_status,
            cleaver_status: quest.cleaver_status,
        };
        // Buffs & debuffs are 'active', 'removed', or ""
        for (const [key, value] of Object.entries(quest.status_effects)) {
            details[`effect_${key}`] = value === 'active';
        }

        if (quest.chamber_name === 'Acolyte') {
            details.obelisk_charged = quest.obelisk_percent === 100;
            details.acolyte_sand_drained = details.obelisk_charged && quest.acolyte_sand === 0;
        }
        return details;
    }
}
