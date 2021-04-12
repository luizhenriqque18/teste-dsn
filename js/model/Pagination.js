class Pagianation {

    constructor() {
        this._nextPage = '';
    }

    update(nextPage) {
        this._nextPage = nextPage;
    }

    get nextPage() {
        return this._nextPage;
    }

}