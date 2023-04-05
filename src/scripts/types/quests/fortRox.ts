export interface QuestFortRox {
    is_day: true | null
    is_night: true | null
    is_dawn: true | null
    is_lair: true | null
<<<<<<< HEAD
    current_stage: string | null // FortRoxStage
=======
    current_stage: string // FortRoxStage
    fort: Record<FortDefenseShort, FortDefense>;
>>>>>>> 1925dbb (Lint 'src' with --fix)
}

export const FortRoxStages = [ 'stage_one', 'stage_two', 'stage_three', 'stage_four', 'stage_five' ] as const;

export type FortRoxStage = typeof FortRoxStages[number];

type FortDefenseShort = 'w' | 'b' | 'c' | 'm' | 't';

interface FortDefense {
    level: number | string;
    status: string;
}
