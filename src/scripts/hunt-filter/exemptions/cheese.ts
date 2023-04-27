import {IntakeMessage} from "@scripts/types/mhct";
import {IMessageExemption} from "../interfaces";

/**
 * Provides an exemption on 'cheese' iff the user had a bait equipped and the quanity
 * decreased from 1 to 0
 */
class OutOfCheeseExemption implements IMessageExemption {
    readonly description = 'Equipped bait quantity decreased from 1 to 0';
    readonly property = 'cheese';

    getExemptions(pre: IntakeMessage, post: IntakeMessage): (keyof IntakeMessage)[] | null {
        if (pre.cheese)
    }

}
