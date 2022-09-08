import { AliasOptions, defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { resolve } from "path";
import { compilerOptions } from "./tsconfig.json";

function tsconfigPathsToAlias() {
    let alias: AliasOptions = {};

    for (const key in compilerOptions.paths) {
        const [path] = compilerOptions.paths[key];

        // remove vite aliasing invalid characters
        const formattedKey = key.replace("*", "");
        const formattedPath = path.replace("*", "");

        alias[formattedKey] = resolve(__dirname, formattedPath);

        // if it includes a "*", the path is a directory,
        // and resolving a path will remove the trailing "/"
        // which needs to be re-added for vite's aliasing
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
        alias: {
            ...tsconfigPathsToAlias(),
            "@styling/": `${resolve(__dirname, "./src/styling/")}/`,
        },
    },
});
