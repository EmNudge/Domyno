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
