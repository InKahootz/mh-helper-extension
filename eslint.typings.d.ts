declare module "eslint-plugin-import" {
    import type {
        ClassicConfig,
        Linter
    } from "@typescript-eslint/utils/ts-eslint";

    const exprt: {
        configs: {
            recommended: ClassicConfig.Config;
            errors: ClassicConfig.Config;
            warnings: ClassicConfig.Config;
            "stage-0": ClassicConfig.Config;
            react: ClassicConfig.Config;
            "react-native": ClassicConfig.Config;
            electron: ClassicConfig.Config;
            typescript: ClassicConfig.Config;
        };
        rules: NonNullable<Linter.Plugin["rules"]>;
    };
    export = exprt;
}


declare module "eslint-plugin-jest" {
    import type {
        ClassicConfig,
        Linter
    } from "@typescript-eslint/utils/ts-eslint";

    const exprt: {
        configs: {
            all: ClassicConfig.Config;
            recommended: ClassicConfig.Config;
            style: ClassicConfig.Config;
        };
        environments: {
            globals: {
                globals: ClassicConfig.EnvironmentConfig;
            };
        };
        rules: NonNullable<Linter.Plugin["rules"]>;
    };
    export = exprt;
}

declare module "eslint-plugin-simple-import-sort" {
    import type {Linter} from "@typescript-eslint/utils/ts-eslint";

    const exprt: {
        rules: NonNullable<Linter.Plugin["rules"]>;
    };
    export = exprt;
}
