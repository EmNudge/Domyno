import typescript from '@rollup/plugin-typescript';
// import pkg from './package.json'

const npmOutput = (input, output) => ({
    input,
    output: { file: output, format: 'cjs' },
    plugins: [typescript()],
});

export default [
    npmOutput(
        'src/index.ts', 
        'build/npm/index.js'
    ),
    npmOutput(
        'src/pipeable/index.ts', 
        'build/npm/pipeable/index.js'
    ),
]
