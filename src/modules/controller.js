import WatchJS from 'melanke-watchjs';

const { watch } = WatchJS;

export default class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.addHeader('Welcome to my page!');
        this.view.addButtons(this.model.state.modals);
        this.view.addModals(this.model.state.modals);

        this.view.bindOpenModal((e) => {
            this.model.openModal(parseInt(e.target.dataset.index, 10));
        });
        this.view.bindCloseModal(() => { this.model.closeModal(); });
        this.view.bindOpenNextModal(() => { this.model.openNextModal(); });
        this.view.bindOpenPrevModal(() => { this.model.openPrevModal(); });

        watch(this.model.state, 'currentModalIndex', (prop, action, difference, oldvalue) => {
            if (this.model.state.opened === true) {
                this.view.openModal(this.model.state.currentModalIndex);
                if (oldvalue != null) {
                    this.view.closeModal(oldvalue);
                }
            } else {
                this.view.closeCurrentModal();
            }
        });
    }
}
