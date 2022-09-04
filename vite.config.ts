import { AliasOptions, defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { resolve } from "path";
import { compilerOptions } from "./tsconfig.json";

function tsconfigPathsToAlias() {
    let alias: AliasOptions = {};

    const normalise = (string: string) => string.replace("*", "");

    for (const key in compilerOptions.paths) {
        const [path] = compilerOptions.paths[key];

        alias[normalise(key)] = resolve(__dirname, normalise(path));
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
