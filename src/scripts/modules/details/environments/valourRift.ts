import {type User} from '@scripts/types/hg';
import {type IEnvironmentDetailer} from '../details.types';

export class ValourRiftDetailer implements IEnvironmentDetailer {
    readonly environment: string = 'Valour Rift';

    /**
     * Report active augmentations and floor number
     */
    addDetails(message: any, userPre: User, userPost: User, journal: any): {} | undefined {
        const attrs = userPre.environment_atts || userPre.enviroment_atts;
        // active_augmentations is undefined outside of the tower
        if (attrs.state === "tower") {
            return {
                floor: attrs.floor, // exact floor number (can be used to derive prestige and floor_type)
                // No compelling use case for the following 3 augments at the moment
                // super_siphon: !!attrs.active_augmentations.ss, // active = true, inactive = false
                // string_stepping: !!attrs.active_augmentations.sste,
                // elixir_rain: !!attrs.active_augmentations.er,
            };
        }
    }
}
