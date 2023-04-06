import {type User} from '@scripts/types/hg';
import {type IEnvironmentDetailer} from '../details.types';

export class FieryWarpathDetailer implements IEnvironmentDetailer {
    readonly environment: string = 'Fiery Warpath';

    /**
     * Log the mouse populations, remaining total, boss invincibility, and streak data.
     * MAYBE: Record usage of FW charms, e.g. "targeted mouse was attracted"
     * charm_ids 534: Archer, 535: Cavalry, 536: Commander, 537: Mage, 538: Scout, 539: Warrior
     *   540: S Archer, 541: S Cavalry, 542: S Mage, 543: S Scout, 544: S Warrior, 615: S Commander
     */
    addDetails(message: any, userPre: User, userPost: User, journal: any): {} | undefined {
        const attrs = userPre.viewing_atts.desert_warpath;
        const fw: any = {};
        if ([1, 2, 3].includes(parseInt(attrs.wave, 10))) {
            const asType = (name: string) => name.replace(/desert_|_weak|_epic|_strong/g, "");

            if (attrs.streak_quantity > 0) {
                fw.streak_count = parseInt(attrs.streak_quantity, 10),
                fw.streak_type = asType(attrs.streak_type),
                fw.streak_increased_on_hunt = (message.caught === 1 &&
                    fw.streak_type === asType(userPost.viewing_atts.desert_warpath.streak_type));
            }

            // Track the mice remaining in the wave, per type and in total.
            let remaining = 0;
            [
                "desert_warrior",
                "desert_warrior_weak",
                "desert_warrior_epic",
                "desert_scout",
                "desert_scout_weak",
                "desert_scout_epic",
                "desert_archer",
                "desert_archer_weak",
                "desert_archer_epic",
                "desert_mage",
                "desert_mage_strong",
                "desert_cavalry",
                "desert_cavalry_strong",
                "desert_artillery",
            ].filter(name => name in attrs.mice).forEach(mouse => {
                const q = parseInt(attrs.mice[mouse].quantity, 10);
                fw[`num_${asType(mouse)}`] = q;
                remaining += q;
            });
            const wave_total = ({1: 105, 2: 185, 3: 260} as Record<number, number>)[attrs.wave];
            // Support retreats when 10% or fewer total mice remain.
            fw.morale = remaining / wave_total;

            fw.has_support_mice = (attrs.has_support_mice === "active");
            if (fw.has_support_mice) {
                // Calculate the non-rounded `morale_percent` viewing attribute.
                fw.support_morale = (wave_total - remaining) / (.9 * wave_total);
            }
        } else if ([4, "4", "portal"].includes(attrs.wave)) {
            // If the Warmonger or Artillery Commander was already caught (i.e. Ultimate Charm),
            // don't record any hunt details since there isn't anything to learn.
            const boss = (message.stage === "Portal")
                ? attrs.mice.desert_artillery_commander
                : attrs.mice.desert_boss;
            if (parseInt(boss.quantity, 10) !== 1) {
                return;
            }
            // Theurgy Wardens are "desert_elite_gaurd". Yes, "gaurd".
            fw.num_warden = parseInt(attrs.mice.desert_elite_gaurd.quantity, 10);
            fw.boss_invincible = !!fw.num_warden;
        } else {
            //if (debug_logging) {window.console.warn({record: message, user, user_post, hunt});}
            throw new Error(`Unknown FW Wave "${attrs.wave}"`);
        }

        return fw;
    }
}
