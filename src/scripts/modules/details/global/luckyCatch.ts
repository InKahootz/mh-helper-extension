import type {JournalMarkup, User} from '@scripts/types/hg';
import type {IDetailer} from '../details.types';

export class LuckyCatchDetailer implements IDetailer {
    /**
     * Track whether a catch was designated "lucky" or not.
     */
    addDetails(message: any, userPre: User, userPost: User, journal: JournalMarkup): LuckyCatchDetails | undefined {
        if (message.caught) {
            return {
                is_lucky_catch: journal.render_data.css_class.includes("luckycatchsuccess"),
            } as LuckyCatchDetails;
        }
    }
}

export type LuckyCatchDetails = {
    is_lucky_catch: boolean;
}
