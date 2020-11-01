const {existsSync} = require('fs');
const {writeFile, readdir, readFile, stat, mkdir} = require('fs').promises;
const {join} = require('path');
const {highlight} = require('highlight.js');

async function main() {
    const rootPath = join(__dirname, '../src');

    const functionsMap = await getFiles(new Map(), rootPath)

    const folderPath = join(__dirname, '..', 'docs');
    const htmlFile = await readFile(join(folderPath, 'template.html'), 'utf8');

    const filledHTML = htmlFile
        .replace('%main-content%', getMainSectionHTML(functionsMap))
        .replace('%nav-content%', getNavSectionHTML(functionsMap));

    await writeFile(join(folderPath, 'index.html'), filledHTML);
}

main();

exports.generateDocs = main;

function getTypeScriptHTML(tsCode, className) {
    const tokenized = highlight('ts', tsCode.replace(/\t/g, ' '.repeat(4))).value;
    return `
        <code class="${className}">
            <pre>${tokenized}</pre>
        </code>
    `;
}

function getNavSectionHTML(functionsMap, nameStack = []) {
    const htmlEls = [];

    for (const [name, obj] of functionsMap) {
        if (obj instanceof Map) nameStack.push(name);
        else nameStack.push(obj.name);

        htmlEls.push('<a ' +
            `href="#${nameStack.join('-')}"` +
            ` style="padding-left: ${(nameStack.length - 1) * 10}px"` +
            `>${name}</a>`);

        if (obj instanceof Map) {
            htmlEls.push(getNavSectionHTML(obj, [...nameStack]));
        }
        nameStack.pop();
    }

    return htmlEls.join('\n');
}

function getMainSectionHTML(functionsMap, nameStack = []) {
    const htmlEls = [];

    for (const [name, obj] of functionsMap) {
        if (obj instanceof Map) {
            nameStack.push(name);

            const num = nameStack.length;
            htmlEls.push(`<h${num} id="${nameStack.join('-')}">${name}</h${num}>`);
            htmlEls.push(getMainSectionHTML(obj, [...nameStack]));
        } else {
            const {name, description, header, source, isPipeable} = obj;
            nameStack.push(name);

            htmlEls.push(
                `<div class="fn-definition" id="${nameStack.join('-')}">\n` +
                `<h2>${name}</h2>\n` +
                `${getTypeScriptHTML(header, 'fn-header')}\n` +
                `<p>${description}</p>\n` +
                `${getTypeScriptHTML(source, 'fn-source')}\n` +
                '</div>'
            );
        }

        nameStack.pop();
    }

    return htmlEls.join('\n')
}

async function getFiles(fileMap, currPath) {
    const dir = await readdir(currPath);

    for (const fileName of dir) {
        const filePath = join(currPath, fileName)

        const info = await stat(filePath);
        const isFile = info.isFile();

        // skip index.ts files
        if (isFile && /^index/.test(fileName)) continue;

        if (isFile) {
            const fileContents = await readFile(filePath, "utf8");
            // extract info from file
            const file = parseTSFile(fileContents, filePath);

            fileMap.set(fileName, file);
            continue;
        }

        const childFileMap = await getFiles(new Map(), filePath);
        fileMap.set(fileName, childFileMap);
    }

    return fileMap;
}

function parseTSFile(source, filePath) {
    const commentRes = source.matchAll(/\/\/\/ *(.+)/g);
    const description = [...commentRes].map(c => c[1]).join('');

    const headerRes = source.match(/(?:\n|^)(function(?:.|\n)+?){/);

    if (!headerRes || !headerRes[1]) {
        throw new Error(
            'Could not find function header for function\n' +
            `for file of path: ${filePath}`
        );
    }

    const header = headerRes[1];

    const nameRes = header.match(/(?:\n|^)function\*? +(\w+)/);
    const name = nameRes[1];

    return {
        name,
        description,
        isPipeable: filePath.includes('pipeable'),
        header: headerRes[1],
        source
    };
}

