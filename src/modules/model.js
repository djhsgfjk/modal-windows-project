export default class Model {
    constructor(modals) {
        this.state = {
            opened: false,
            currentModalIndex: null,
            loading: false,
            modals: [
                ...modals,
                //randomCoffeeImage
            ]
        };
    }

    startLoading() {
        this.state.loading = true;
    }

    stopLoading() {
        this.state.loading = false;
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

    setCoffeeImage(imageUrl) {
        this.getModal('randomCoffeeImage').error = null;
        this.getModal('randomCoffeeImage').imageUrl = imageUrl;
    }

    setCoffeeImageError(error) {
        this.getModal('randomCoffeeImage').imageUrl = null;
        this.getModal('randomCoffeeImage').error = error;
    }

    getCoffeeApiUrl() {
        return this.getModal('randomCoffeeImage').url;
    }

    getCoffeeImageUrl() {
        return this.getModal('randomCoffeeImage').imageUrl;
    }

    getCoffeeImageError() {
        return this.getModal('randomCoffeeImage').error;
    }

    getButtonNames() {
        return this.state.modals.map(({buttonName}) => buttonName);
    }

    getModalTypes() {
        return this.state.modals.map(({type}) => type);
    }

    getModals() {
        return this.state.modals;
    }

    getModal(type) {
        return this.state.modals.find(({type: modalType}) => modalType = type);
    }

    getCurrentType() {
        return this.getModalTypes()[this.state.currentModalIndex];
    }

    getCurrentIndex() {
        return this.state.currentModalIndex;
    }
}
