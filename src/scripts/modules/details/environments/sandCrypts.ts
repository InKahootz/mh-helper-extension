import {type User} from '@scripts/types/hg';
import {type IEnvironmentDetailer} from '../details.types';

export class SandCryptsDetailer implements IEnvironmentDetailer {
    readonly environment: string = 'Sand Crypts';

    /**
     * Track the grub salt level
     */
    addDetails(message: any, userPre: User, userPost: User, journal: any): {} | undefined {
        const quest = userPre.quests.QuestSandDunes;
        if (quest && !quest.is_normal && quest.minigame && quest.minigame.type === 'grubling') {
            if (["King Grub", "King Scarab"].includes(message.mouse)) {
                return {
                    salt: quest.minigame.salt_charms_used,
                };
            }
        }
    }
}
