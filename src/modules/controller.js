import WatchJS from 'melanke-watchjs';

const {watch} = WatchJS;

export default class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.addHeader('Welcome to my page!');
        this.view.addButtons(this.model.getButtonNames());
        this.view.addModals(this.model.getModals());

        this.view.bindOpenModal((e) => {
            this.model.openModal(parseInt(e.target.dataset.index, 10));
        });
        this.view.bindCloseModal(() => {
            this.model.closeModal();
        });
        this.view.bindOpenNextModal(() => {
            this.model.openNextModal();
        });
        this.view.bindOpenPrevModal(() => {
            this.model.openPrevModal();
        });

        this.view.bindGetAnotherImage(() => {
            this.model.startLoading();
            this.getCoffeeImage();
        })

        this.view.bindCoffeeImageLoading(() => {
            this.model.stopLoading();
        })

        watch(this.model.state, 'currentModalIndex', (prop, action, difference, oldvalue) => {
            if (this.model.state.opened === true) {
                this.view.openModal(this.model.getCurrentIndex());
            }
            if (oldvalue != null) {
                this.view.closeModal(oldvalue);
            }

            if (this.model.getCurrentType() === 'randomCoffeeImage' && !this.model.getCoffeeImageUrl()) {
                this.model.startLoading();
                this.getCoffeeImage();
            }
        });

        watch(this.model.getModal('randomCoffeeImage'), 'imageUrl', () => {
            const error = this.model.getCoffeeImageError();
            if (error)
                this.view.setCoffeeError(error);
            else
                this.view.changeCoffeeImage(this.model.getCoffeeImageUrl());
        });

        watch(this.model.state, 'loading', () => {
            if(this.model.state.loading)
                this.view.disable();
            else
                this.view.enable();
        });

    }

    getCoffeeImage() {
        const url = this.model.getCoffeeApiUrl();
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then(({file}) => {
                console.log(file);
                this.model.setCoffeeImage(file);
            })
            .catch((error) => {
                console.log(error.code, error.status);
                this.model.setCoffeeImageError('Oops! Something went wrong.')
            })
    }
}
