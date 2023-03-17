export default class Model {
    constructor(modals) {
        this.state = {
            opened: false,
            currentModalIndex: null,
            modals: [...modals],
        };
    }

    openModal(index) {
        this.state.opened = true;
        this.state.currentModalIndex = index;
    }

    openNextModal() {
        this.state.currentModalIndex = (this.state.currentModalIndex + 1)
            % this.state.modals.length;
    }

    openPrevModal() {
        this.state.currentModalIndex = (this.state.modals.length + this.state.currentModalIndex - 1)
            % this.state.modals.length;
    }

    closeModal() {
        this.state.opened = false;
        this.state.currentModalIndex = null;
    }
}
