import { LunarNewYearDetailer, type LunarNewYearDetails } from '@scripts/modules/details/global/lunarNewYear'
import { type User } from '@scripts/types/hg';
import { type QuestLunarNewYear } from '@scripts/types/quests';

describe('lunarNewYearDetailer', () => {
    describe('getDetails', () => {
        it('returns undefined when quest is undefined', () => {
            const detailer = new LunarNewYearDetailer()
            const user: User = {
                quests: {}
            } as User;

            expect(detailer.addDetails(null, user, user, null)).toBe(undefined);
        })

        it('calculates luck using post hunt quest', () => {
            const detailer = new LunarNewYearDetailer();

            const preQuest: QuestLunarNewYear = getDefaultQuest();
            preQuest.lantern_height = "142";
            const postQuest: QuestLunarNewYear = getDefaultQuest();
            postQuest.lantern_height = "255";

            const preUser = getUserWithLunarQuest(preQuest);
            const postUser = getUserWithLunarQuest(postQuest);

            const expected: LunarNewYearDetails = {
                is_lny_hunt: true,
                lny_luck: 25
            }

            expect(detailer.addDetails(null, preUser, postUser, null)).toStrictEqual(expected);
        });

        it('sets luck to 0 when latern is not active', () => {
            const detailer = new LunarNewYearDetailer();

            const postQuest: QuestLunarNewYear = {
                is_lantern_active: false,
                lantern_height: "144",
                lantern_status: ""
            };
            const postUser = getUserWithLunarQuest(postQuest);

            const expected: LunarNewYearDetails = {
                is_lny_hunt: true,
                lny_luck: 0
            }

            expect(detailer.addDetails(null, null!, postUser, null)).toStrictEqual(expected);
        });

        it('sets max luck to 50', () => {
            const detailer = new LunarNewYearDetailer();

            const quest = getDefaultQuest();
            quest.lantern_height = "1000";

            const expected: LunarNewYearDetails = {
                is_lny_hunt: true,
                lny_luck: 50
            }
            expect(detailer.addDetails(null, null!, { quests: { QuestLunarNewYear: quest } } as User, null))
                .toStrictEqual(expected);
        })
    })

    function getDefaultQuest(): QuestLunarNewYear {
        var lnyQuest: QuestLunarNewYear = {
            lantern_status: 'lantern',
            is_lantern_active: true,
            lantern_height: '0'
        }

        return lnyQuest;
    }

    function getUserWithLunarQuest(quest: QuestLunarNewYear): User {
        return {
            quests: {
                QuestLunarNewYear: quest
            }
        } as User;
    }
})
