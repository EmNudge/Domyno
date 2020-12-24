/// @ts-check
import ts from "rollup-plugin-typescript2";
import path from "path";

/**
 * @type { (input: string, output: string) => import('rollup').RollupOptions}
 */
const npmOutput = (input, output) => ({
  input,
  treeshake: true,
  output: { file: output, format: "cjs" },
  plugins: [
    ts({
      check: true,
      useTsconfigDeclarationDir: input.includes('src/index.ts'),
      tsconfig: path.resolve(__dirname, "tsconfig.json"),
      tsconfigOverride: {
        compilerOptions: {
          declarationDir: "./types",
          rootDir: 'src',
          sourceMap: input.includes('src/index.ts'),
          declaration: input.includes('src/index.ts'),
          declarationMap: input.includes('src/index.ts'),
        },
        exclude: ["tests/"]
      },
    }),
  ],
});

export default [
  npmOutput("src/index.ts", "npm-build/index.js"),
  npmOutput("src/pipeable/index.ts", "npm-build/pipeable/index.js"),
];
