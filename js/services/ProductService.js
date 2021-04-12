class ProductService {

    constructor(){
        this._http = new HttpService();
        this._url = 'https://frontend-intern-challenge-api.iurykrieger.vercel.app';
    }

    getProductByPage(path) {
        
        return new Promise((resolve, reject) => {
            this._http
                .get(`${this._url}/${path}`)
                .then(response => {
                    let { products, nextPage } = response;
                    resolve({
                        nextPage,
                        products: products.map(product=> new Product(product))
                    });
                })
                .catch(error => {
                    reject(`Não foi possivel carregar página ${page} com a lista de produtos.`);
                });
        });
    }

    getProduct() {
        return new Promise((resolve, reject) => {
            this._http
                .get(`${this._url}/products`)
                .then(response => {
                    let { products, nextPage } = response;
                    resolve({
                        nextPage,
                        products: products.map(product=> new Product(product))
                    });
                })
                .catch(error => {
                    reject('Não foi possivel carregar lista de produtos.');
                });
        });
    }
}