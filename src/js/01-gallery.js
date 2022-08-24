// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

// Описан в документации
import SimpleLightbox from "simplelightbox";
// Дополнительный импорт стилей
import "simplelightbox/dist/simple-lightbox.min.css";



// получаем доступ к div где будет храниться коллекция
const galleryContainer = document.querySelector('.gallery');

// создаем переменую где будет храниться вся галерея
const galleryMarkup = createGalleryCardsMarkup(galleryItems);

// добавляем созданную галерею в разметку
galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

function createGalleryCardsMarkup(galleryItems) {
return galleryItems
    .map(({ preview, original, description }) => {
    return `
    
        <a class="gallery__item" href="${original}">
            <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
            />
        </a>`;
    })
    .join('');
}

galleryContainer.addEventListener("click", onModalMarkup);

function onModalMarkup(evt) {
    evt.preventDefault();
        if (!evt.target.classList.contains("gallery__image")) {
    return;
    }
}

// добавление свойств
const lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    captionsData: 'alt',
});

console.log(galleryItems);

