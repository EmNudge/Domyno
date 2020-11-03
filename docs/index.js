const input = document.querySelector('input');
if (input) input.addEventListener('input', e => {
    const text = input.value.toLowerCase();

    const funcEls = document.querySelectorAll('.fn-definition');
    for (const funcEl of funcEls) {
        const name = funcEl.querySelector('h2').textContent.trim();
        const isMatch = name.toLowerCase().includes(text);

        funcEl.style.display = isMatch ? 'block' : 'none';
    }
})

// only remove source by default when JS is enabled
const defEls = document.querySelectorAll('.fn-definition');

function showSource(e) {
    const defEl = e.target.parentElement;
    const sourceEl = defEl.querySelector('.fn-source');
    sourceEl.style.display = sourceEl.style.display === 'none'
        ? 'block'
        : 'none';
}
for (const defEl of defEls) {
    const sourceEl = defEl.querySelector('.fn-source');
    sourceEl.style.display = 'none';

    const button = document.createElement('button');
    button.textContent = 'Toggle Source';
    button.addEventListener('click', showSource);

    defEl.insertBefore(button, sourceEl);
    defEl.insertBefore(document.createElement('br'), sourceEl);
}


// toggle for Dark/Light mode
const label = document.createElement('label');
label.textContent = 'Toggle Dark/Light Mode';
label.style = `
    position: absolute; 
    top: 10px; 
    right: 10px;
    user-select: none;
`;

const checkbox = document.createElement('input');
checkbox.type = 'checkbox';

const pageStyles = window.getComputedStyle(document.body);
let isLight = pageStyles.getPropertyValue('--bg').includes('white');
checkbox.addEventListener('click', () => {
    const setVal = (...args) => document.body.style.setProperty(...args);
    setVal('--bg', isLight ? '#202026' : 'white');
    setVal('--color', isLight ? 'white' : 'black');
    isLight = !isLight;
})
label.appendChild(checkbox);

document.body.appendChild(label);

