import {type User} from '@scripts/types/hg';
import {type IEnvironmentDetailer} from '../details.types';

export class TableOfContentsDetailer implements IEnvironmentDetailer {
    readonly environment: string = 'Table Of Contents';

    /**
     * Track the current volume if we're in an Encyclopedia
     */
    addDetails(message: any, userPre: User, userPost: User, journal: any): {} | undefined {
        const quest = userPre.quests.QuestTableOfContents;
        if (quest && quest.current_book.volume > 0) {
            return {
                volume: quest.current_book.volume,
            };
        }
    }
}
