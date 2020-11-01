// TODO: run `npm build`, copy package.json and README.md into npm-build, and then `npm publish` in that directory
const {exec} = require('child_process');
const {promisify} = require('util')
const {copyFile} = require('fs').promises;
const {generateDocs} = require('./docs.js');

const executeCmd = promisify(exec);

async function main() {
    const args = process.argv.slice(2);

    for (const arg of args) {
        if (arg.includes('docs')) {
            await generateDocs();
            console.log('Docs generated successfully!');
        }
        if (arg.includes('test')) {
            await executeCmd('npm test');
            console.log('Tests ran successfully!');
        }
    }

    await executeCmd('rollup -c');
    await copyFile('package.json', 'npm-build/package.json');
    await copyFile('README.md', 'npm-build/README.md');

    // actually publishing requires the user to manually cd and publish themselves
}

main();
