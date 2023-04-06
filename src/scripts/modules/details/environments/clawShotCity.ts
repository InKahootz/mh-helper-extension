import {type User} from '@scripts/types/hg';
import {type IEnvironmentDetailer} from '../details.types';

export class ClawShotCityDetailer implements IEnvironmentDetailer {
    readonly environment: string = 'Claw Shot City';

    /**
     * Track the poster type. Specific available mice require information from `treasuremap.php`.
     */
    addDetails(message: any, userPre: User, userPost: User, journal: any): {} | undefined {
        const map = userPre.quests.QuestRelicHunter.maps.filter((m: any) => m.name.endsWith("Wanted Poster"))[0];
        if (map && !map.is_complete) {
            return {
                poster_type: map.name.replace(/Wanted Poster/i, "").trim(),
                at_boss: (map.remaining === 1),
            };
        }
    }
}
