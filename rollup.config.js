import { terser } from "rollup-plugin-terser";
import typescript from '@rollup/plugin-typescript';

export default {
  input: "src/main.ts",
  output: [
    {
      file: "build/bundle.js",
      format: "cjs"
    },
    {
      file: "build/bundle.min.js",
      format: "cjs",
      name: "version",
      plugins: [terser()]
    }
  ],
  plugins: [typescript({ target: "es6" })]
};
