class ProductController {
    constructor() {
        let $ = document.querySelector.bind(document);
        this._productList = new ProductList();
        this._pagination = new Pagianation();
        this._productView = new ProductView($('#product-view'));
        this._btnNextPage = $('#btn-next-page');
        this._productView.update(this._productList);
        this.getInit();
    }

    getInit() {
        this._getProduct()
            .then( response => {
                const {products, nextPage} = response;
                this._productList.addList(products);
                this._productView.update(this._productList);
                this._pagination.update(nextPage);
            })
            .catch(error=>{
                console.log('error', error);
            }).finally(()=>{
                this.setLoader(false);
            });
    }

    getNextPage(event) {
        this.setDisabledBtn();

        let path = this._pagination.nextPage.split("/");

        if(path.length < 0) throw new Error("Próxima página não encontrada.");
        
        this._getProductPage(path[1])
            .then( response => {
                const {products, nextPage} = response;
                this._productList.addList(products);
                this._productView.update(this._productList);
                this._pagination.update(nextPage);
            })
            .catch(error=>{
                console.log('error', error);
            }).finally(()=>{
                this.setDisabledBtn(false);
            });
    }

    async _getProduct() {
        let service = new ProductService();
        let response = await service.getProduct();
        return response;
    }

    async _getProductPage(url) {
        let service = new ProductService();
        let response = await service.getProductByPage(url);

        return response;
    }
    setDisabledBtn(status = true){
        if(status) {
            this._btnNextPage.classList.add("btn-blocked");
            this._btnNextPage.disabled = true;
        }
        else {
            this._btnNextPage.classList.remove("btn-blocked");
            this._btnNextPage.disabled = false;
        }
    }
}