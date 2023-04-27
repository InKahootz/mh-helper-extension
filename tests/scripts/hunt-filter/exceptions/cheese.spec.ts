import {IntakeRejectionEngine} from '@scripts/hunt-filter/engine';
import {User} from '@scripts/types/hg';
import {LoggerService} from '@scripts/util/logger';
import {getDefaultUser} from '../common';


describe('Cheese Exemption', () => {
    let logger: LoggerService;
    let target: IntakeRejectionEngine;

    beforeEach(() => {
        logger = {} as LoggerService;
        target = new IntakeRejectionEngine(logger);

        logger.debug = jest.fn();
    });

    describe('validateUser', () => {
        let preUser: User;
        let postUser: User;

        beforeEach(() => {
            preUser = getDefaultUser();
            postUser = getDefaultUser();
        });

        it('should reject when cheese runs out', () => {
            preUser = {...preUser, ...baitResponses.toc.pre};
            postUser = {...postUser, ...baitResponses.toc.post} as unknown as User; // TODO: Almost fields need to be 'string | number' to remove casting
            const valid = target.validateUser(preUser, postUser);

            expect(valid).toBe(false);
        });
    });

    const baitResponses = {
        toc: {
            pre: {
                bait_item_id: 3458,
                bait_name: "Final Draft Derby Cheese",
                bait_quantity: 1,
            },
            post: {
                bait_item_id: 0,
                bait_name: 0,
                bait_quantity: 0,
            },
        },
    };
});
