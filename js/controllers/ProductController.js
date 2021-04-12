class ProductController {
    constructor() {
        let $ = document.querySelector.bind(document);
        this._productList = new ProductList();
        this._productView = new ProductView($('#productView'));
        this._productView.update(this._productList);
        this.getInit();
    }

    getInit() {
        this._getProduct()
            .then( response => {
                this._productList.addList(response);
                this._productView.update(this._productList);
            })
            .catch(error=>{
                console.log('error', error);
            });
    }

    async _getProduct() {
        let service = new ProductService();
        let response = await service.getProduct()

        return response;
    }
}