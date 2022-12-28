import { AliasOptions, defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { resolve } from "path";
import tsconfig from "./tsconfig.json";

function tsconfigPathsToAlias() {
    let alias: AliasOptions = {};

    for (const key in tsconfig.compilerOptions.paths) {
        const [path] = tsconfig.compilerOptions.paths[key];

        // remove glob characters as they are invalid in vite's aliasing
        const formattedKey = key.replace("*", "");
        const formattedPath = path.replace("*", "");

        alias[formattedKey] = resolve(__dirname, formattedPath);

        // if the unformatted path includes a trailing "*", the path is a directory,
        // and resolving a path will remove the trailing "/" which needs to be
        // re-added for vite's aliasing
        if (path.includes("*")) {
            alias[formattedKey] += "/";
        }
    }

    return alias;
}

export default defineConfig({
    plugins: [preact()],
    esbuild: {
        define: {
            this: "window",
        },
    },
    resolve: {
        alias: tsconfigPathsToAlias(),
    },
});
