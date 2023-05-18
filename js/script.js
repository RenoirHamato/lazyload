/* BUTTON-ALL */
const buttonMore = document.querySelector('.preview__button');
const list = document.querySelector('.preview__list');
const preloader = document.querySelector('.preview__preloader');
const helper = document.querySelector('.preview__helper');

buttonMore.addEventListener('click', loadData);

const options = {
    root: null,
    threshold: 0.9,
};
const observer = new IntersectionObserver(entries => {
    const entry = entries[0];
    if (entry.isIntersecting) {
        loadData();
    }
}, options);
observer.observe(helper);

function loadData() {
    preloader.style.removeProperty('display');
    buttonMore.style.display = 'none';
    helper.style.display = 'none';

    setTimeout(() => {
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                preloader.style.display = 'none';
                data.forEach(el => {
                    const item = drawItem(el.src);
                    list.appendChild(item);
                });
            });
    }, 3000);
}

function drawItem(src) {
    const item = document.createElement('li');
    item.classList.add('preview__item');
    const img = document.createElement('img');
    img.classList.add('preview__image');
    img.alt = 'Картинка';
    img.src = src;
    item.appendChild(img);
    return item;
}
