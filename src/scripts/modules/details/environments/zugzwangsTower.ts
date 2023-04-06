import {type User} from '@scripts/types/hg';
import {type IEnvironmentDetailer} from '../details.types';

export class ZugzwangsTowerDetailer implements IEnvironmentDetailer {
    readonly environment: string = 'Zugzwang\'s Tower';

    /**
     * Report the progress on Technic and Mystic pieces. Piece progress is reported as 0 - 16 for each
     * side, where 0-7 -> only Pawns, 8/9 -> Pawns + Knights, and 16 = means King caught (only Pawns + Rooks available)
     */
    addDetails(message: any, userPre: User, userPost: User, journal: any): {} | undefined {
        const attrs = userPre.viewing_atts;
        const zt: any = {
            amplifier: parseInt(attrs.zzt_amplifier, 10),
            technic: parseInt(attrs.zzt_tech_progress, 10),
            mystic: parseInt(attrs.zzt_mage_progress, 10),
        };
        zt.cm_available = (zt.technic === 16 || zt.mystic === 16) && message.cheese.id === 371;
        return zt;
    }
}

