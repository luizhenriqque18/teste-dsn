class ProductService {

    constructor(){
        this._http = new HttpService();
        this._url = 'https://frontend-intern-challenge-api.iurykrieger.vercel.app';
    }

    getProductByPage(page = 0) {
        
        return new Promise((resolve, reject) => {
            this._http
                .get(`${this._url}/products?page=${page}`)
                .then(response => {
                    let { products } = response;
                    
                    console.log('response', response);
                    resolve(products.map(product=> new Product(product)));
                })
                .catch(error => {
                    console.log('Error getProductByPage: ', error);
                    reject(`Não foi possivel carregar página ${page} com a lista de produtos.`);
                });
        });
    }

    getProduct() {
        return new Promise((resolve, reject) => {
            this._http
                .get(`${this._url}/products`)
                .then(response => {
                    let { products } = response;

                    //console.log('response', response);
                    resolve(products.map(product=> new Product(product)));
                })
                .catch(error => {
                    //console.log('Error getProduct: ', error);
                    reject('Não foi possivel carregar lista de produtos.');
                });
        });
    }
}