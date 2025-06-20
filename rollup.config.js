import typescript from "@rollup/plugin-typescript";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const pkg = require("./package.json");
const { dts } = require("rollup-plugin-dts");

export default [
    {
        input: "src/index.ts",
        output: [
            { file: pkg.main, format: "cjs" },
            ,
            { file: pkg.module, format: "es" },
        ],
        plugins: [typescript({ tsconfig: "./tsconfig.json" })],
    },
    {
        input: "build/index.d.ts",
        output: [{ file: "dist/index.d.ts", format: "cjs" }],
        plugins: [dts()],
    },
];
