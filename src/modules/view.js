export default class View {
    constructor() {
        this.app = this.getElement('.app');
        this.menu = this.createElement('div', ['app__menu', 'btn-container']);
        this.modalContainer = this.createElement('div', ['app__modal-container']);
        this.app.append(this.menu, this.modalContainer);
    }

    createElement(tag, classes, atrs, dataset) {
        const element = document.createElement(tag);
        if (classes) {
            element.classList.add(...classes);
        }
        if (atrs) {
            Object.keys(atrs).forEach((type) => {
                element.element.setAttribute(type, atrs[type]);
            });
        }
        if (dataset) {
            Object.keys(dataset).forEach((type) => {
                element.dataset[type] = dataset[type];
            });
        }
        return element;
    }

    getElement(selector) {
        return document.querySelector(selector);
    }

    getAllElements(selector) {
        return document.querySelectorAll(selector);
    }

    addHeader(header) {
        this.header = this.createElement('h1', ['app__header', 'menu']);
        this.header.textContent = header;
        this.app.prepend(this.header);
    }

    addButtons(btns) {
        btns.forEach((buttonName, index) => {
            this.menu.append(this.createButton(index, buttonName));
        });
    }

    addModals(modals) {
        const modalsCount = modals.length
        for (let index = 0; index < modalsCount; index++) {
            this.modalContainer.append(this.createModal(modals[index].type, index, modals[index]));
        }
    }

    createModal(type, ...atr) {
        if (type === 'randomCoffeeImage') {
            return this.createCoffeeImageModal(...atr);
        } else if (type === 'text') {
            return this.createTextModal(...atr);
        }
    }

    createCoffeeImageModal(index, {
        type,
        title,
        imageUrl,
        error,
    }) {
        const modal = this.createElement('div', ['app__modal', 'modal'], null, {type: type, index: index});
        const content = this.createElement('div', ['modal__content']);
        const mainContainer = this.createElement('div', ['modal__main'])
        const titleContainer = this.createElement('h2', ['modal__title']);
        const topBtns = this.createElement('div', ['modal__btn-container', 'btn-container']);
        const closeBtn = this.createElement('button', ['modal__btn--close', 'btn-icon', 'btn']);
        const nextBtn = this.createElement('button', ['modal__btn--next', 'btn-icon', 'btn']);
        const prevBtn = this.createElement('button', ['modal__btn--prev', 'btn-icon', 'btn']);
        const image = this.createElement('img', ['modal__image', 'coffee-image']);
        const imageContainer= this.createElement('div', ['modal__image-container']);
        const errorContainer = this.createElement('div', ['modal__text--error', 'coffee-error']);
        const bottomBtns = this.createElement('div', ['modal__btn-container--content-manage', 'btn-container']);
        const getAnotherImage = this.createElement('button', ['modal__btn--get-another-image', 'btn'])

        image.setAttribute('alt', "Can't load image.");
        if (imageUrl) {
            image.setAttribute('src', imageUrl);
            errorContainer.style.display = 'none';
        } else {
            errorContainer.textContent = error;
            image.style.display = 'none';
        }
        imageContainer.append(image)
        titleContainer.textContent = title;
        mainContainer.append(titleContainer, imageContainer, errorContainer)
        closeBtn.textContent = '✖';
        nextBtn.textContent = '>';
        prevBtn.textContent = '<';
        topBtns.append(prevBtn, nextBtn, closeBtn);
        getAnotherImage.textContent = 'Get another image';
        bottomBtns.append(getAnotherImage)
        content.append(topBtns, mainContainer, bottomBtns);
        modal.append(content);
        return modal;
    }

    changeCoffeeImage(imageUrl) {
        const errorContainer = this.getElement('.coffee-error');
        const image = this.getElement('.coffee-image');

        errorContainer.style.display = 'none';
        image.style.display = 'block';
        image.setAttribute('src', imageUrl);
    }

    setCoffeeError(error) {
        const errorContainer = this.getElement('.coffee-error');
        const image = this.getElement('.coffee-image');

        errorContainer.style.display = 'block';
        errorContainer.textContent = error;
        image.style.display = 'none';
    }

    createButton(index, buttonName) {
        const btn = this.createElement('button', ['menu__btn', 'btn'], null, {index: index});
        btn.textContent = buttonName;
        return btn;
    }

    disable() {
        this.getElement('.modal__btn--get-another-image').setAttribute('disabled', '');
    }

    enable() {
        this.getElement('.modal__btn--get-another-image').removeAttribute('disabled');
    }

    closeModal(index) {
        this.modalContainer.children[index].classList.remove('modal-opened');
        document.removeEventListener('click', this.handleClickOutside);
    }

    openModal(index) {
        this.modalContainer.children[index].classList.add('modal-opened');
        document.addEventListener('click', this.handleClickOutside);
    }

    bindOpenModal(handler) {
        this.getAllElements('.menu__btn').forEach((btn) => {
            btn.addEventListener('click', handler);
        });
    }

    bindCloseModal(handler) {
        this.getAllElements('.modal__btn--close').forEach((btn) => {
            btn.addEventListener('click', handler);
        });

        this.handleClickOutside = (e) => {
            const modalContent = this.getElement('.modal-opened .modal__content');
            if (modalContent && !(modalContent.contains(e.target))) {
                handler();
            }
        };
    }

    bindOpenNextModal(handler) {
        this.getAllElements('.modal__btn--next').forEach((btn) => {
            btn.addEventListener('click', handler);
        });
    }

    bindOpenPrevModal(handler) {
        this.getAllElements('.modal__btn--prev').forEach((btn) => {
            btn.addEventListener('click', handler);
        });
    }

    bindGetAnotherImage(handler) {
        this.getAllElements('.modal__btn--get-another-image').forEach((btn) => {
            btn.addEventListener('click', handler);
        });
    }

    bindCoffeeImageLoading(handler) {
        this.getElement('.coffee-image').addEventListener('load', handler);
    }
}