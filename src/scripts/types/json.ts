export type JSONObject = { [key: string]: JSONValue };

export type JSONValue =
    | null
    | boolean
    | string
    | number
    | JSONValue[]
    | JSONObject;
