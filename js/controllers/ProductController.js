class ProductController {
    constructor() {
        let $ = document.querySelector.bind(document);
        this.getProduct();
    }

    getProduct() {
        let service = new ProductService();
        service.getProduct().then(response => {
            console.log('controller', response);
        });
    }
}