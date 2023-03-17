export default class View {
    constructor() {
        this.app = this.getElement('.app');
        this.menu = this.createElement('div', ['app__menu', 'btn-container']);
        this.modalContainer = this.createElement('div', ['app__modal-container']);
        this.handleClickOutside = (e) => {
            const modalContent = this.getElement('.modal-opened .modal__content');
            if (modalContent && !(modalContent.contains(e.target))) {
                this.closeCurrentModal();
            }
        };

        this.app.append(this.menu, this.modalContainer);
    }

    addHeader(header) {
        this.header = this.createElement('h1', ['app__header', 'menu']);
        this.header.textContent = header;
        this.app.prepend(this.header);
    }

    addButtons(modals) {
        modals.forEach((modal, index) => {
            this.menu.append(this.createButton(index, modal));
        });
    }

    addModals(modals) {
        const modalsCount = modals.length
        for (let index = 0; index < modalsCount; index++) {
            this.modalContainer.append(this.createModal(index, modals[index],
                modals[(index - 1 + modalsCount) % modalsCount],
                modals[(index + 1) % modalsCount]));
        }
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

    createModal(index, {type, title, text}, {title: prevTitle}, {title: nextTitle}) {
        const modal = this.createElement('div', ['app__modal', 'modal'], null, {type: type, index: index});
        const content = this.createElement('div', ['modal__content']);
        const textContainer = this.createElement('div', ['modal__text']);
        const titleContainer = this.createElement('h2', ['modal__title']);
        const closeBtnContainer = this.createElement('div', ['modal__btn-container--close', 'btn-container']);
        const closeBtn = this.createElement('button', ['modal__btn--close', 'btn-icon', 'btn']);
        const flipBtnsContainer = this.createElement('div', ['modal__btn-container--flip', 'btn-container']);
        const nextBtn = this.createElement('button', ['modal__btn--next', 'btn-main', 'btn']);
        const prevBtn = this.createElement('button', ['modal__btn--prev', 'btn-additional', 'btn']);

        textContainer.textContent = text;
        titleContainer.textContent = title;
        closeBtn.textContent = '✖';
        nextBtn.textContent = nextTitle;
        prevBtn.textContent = prevTitle;
        closeBtnContainer.append(closeBtn);
        flipBtnsContainer.append(prevBtn, nextBtn);
        content.append(closeBtnContainer, titleContainer, textContainer, flipBtnsContainer);
        modal.append(content);
        return modal;
    }

    createButton(index, {type, buttonName}) {
        const btn = this.createElement('button', ['menu__btn', 'btn'], null, {type: type, index: index});
        btn.textContent = buttonName;
        return btn;
    }

    closeModal(index) {
        this.modalContainer.children[index].classList.remove('modal-opened');
        document.removeEventListener('click', this.handleClickOutside);
    }

    closeCurrentModal() {
        const modalOpened = this.getElement('.modal-opened');
        if (modalOpened) {
            modalOpened.classList.remove('modal-opened');
            document.removeEventListener('click', this.handleClickOutside);
        }
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
}