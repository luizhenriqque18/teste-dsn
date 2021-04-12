class ProductList {

    constructor() {
        this._productList = [];
    }

    addList(products) {
       this._productList = [...this._productList, ...products]
    }

    get productList() {
        return this._productList;
    }   
}