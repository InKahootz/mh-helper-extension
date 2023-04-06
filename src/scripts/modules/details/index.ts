import type {IDetailer, IEnvironmentDetailer} from './details.types';

import {BristleWoodsRiftDetailer} from './environments/bristleWoodsRift';
import {ClawShotCityDetailer} from './environments/clawShotCity';
import {FieryWarpathDetailer} from './environments/fieryWarpath';
import {FortRoxDetailer} from './environments/fortRox';
import {HarbourDetailer} from './environments/harbour';
import {IceFortressDetailer} from './environments/iceFortress';
import {SandCryptsDetailer} from './environments/sandCrypts';
import {TableOfContentsDetailer} from './environments/tableOfContents';
import {ValourRiftDetailer} from './environments/valourRift';
import {WhiskerWoodsRiftDetailer} from './environments/whiskerWoodsRift';
import {ZokorDetailer} from './environments/zokor';
import {ZugzwangsTowerDetailer} from './environments/zugzwangsTower';

import {SpringEggHuntDetailer} from './global/springEggHunt';
import {HalloweenDetailer} from './global/halloween';
import {LuckyCatchDetailer} from './global/luckyCatch';
import {LunarNewYearDetailer} from './global/lunarNewYear';
import {PillageDetailer} from './global/pillage';

// Detailer for specific location
const environmentDetailerModules: IEnvironmentDetailer[]  = [
    new BristleWoodsRiftDetailer(),
    new ClawShotCityDetailer(),
    new FieryWarpathDetailer(),
    new FortRoxDetailer(),
    new HarbourDetailer(),
    new IceFortressDetailer(),
    new SandCryptsDetailer(),
    new TableOfContentsDetailer(),
    new ValourRiftDetailer(),
    new WhiskerWoodsRiftDetailer(),
    new ZokorDetailer(),
    new ZugzwangsTowerDetailer(),
];

// Detailers that don't match on location (LNY, Halloween)
const globalDetailerModules: IDetailer[] = [
    new SpringEggHuntDetailer(),
    new HalloweenDetailer(),
    new LuckyCatchDetailer(),
    new LunarNewYearDetailer(),
    new PillageDetailer(),
];

export {environmentDetailerModules, globalDetailerModules};
