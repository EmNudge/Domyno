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
        'npm-build/index.js'
    ),
    npmOutput(
        'src/pipeable/index.ts', 
        'npm-build/pipeable/index.js'
    ),
]
