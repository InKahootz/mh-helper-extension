export interface BaseIntakeMessage {
    uuid: string;
    extension_version: number;
    hunter_id_hash: string;
    entry_timestamp: number; // seconds
}

export interface IntakeMessage extends BaseIntakeMessage {
    entry_id: number;
    location: ComponentEntry | null;
    shield: boolean;
    total_power: number;
    total_luck: number;
    attraction_bonus: number;
    stage?: unknown;
    trap: ComponentEntry;
    base: ComponentEntry;
    cheese: ComponentEntry;
    charm: ComponentEntry | null;
    caught: number;
    attracted: number;
    mouse: string;
    loot?: Loot[];
    // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
    hunt_details: {[key: PropertyKey]: string | number | boolean}
}

/**
 * An object with an numbered id and string name.
 */
// This may need to be ComponentEntry<TId, TName> if id needs to be not a number
export interface ComponentEntry {
    id: number;
    name: string;
}

interface Loot {
    id: number;
    name: string;
    amount: number;
    lucky: boolean;
    plural_name: string;
}

/**
 * An object opened (convertible) or recieved (convertible contents)
 */
export interface HgItem {
    /** HitGrab's ID for the id */
    id: number
    /** HitGrab's display name for the item */
    name: string;
    /** The number of items opened or recieved */
    quantity: number;
}
