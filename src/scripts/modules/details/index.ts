import type {IDetailer, IEnvironmentDetailer} from './details.types';
import {IceFortressDetailer} from './environments/iceFortress';
import {HalloweenDetailer} from './global/halloween';
import {SpringEggHuntDetailer} from './global/springEggHunt';
import {LuckyCatchDetailer} from './global/luckyCatch';
import {LunarNewYearDetailer} from './global/lunarNewYear';

// Detailer for specific location
const environmentDetailerModules: IEnvironmentDetailer[]  = [
    new IceFortressDetailer(),
];

// Detailers that don't match on location (LNY, Halloween)
const globalDetailerModules: IDetailer[] = [
    new HalloweenDetailer(),
    new SpringEggHuntDetailer(),
    new LuckyCatchDetailer(),
    new LunarNewYearDetailer(),
];

export {environmentDetailerModules, globalDetailerModules};
