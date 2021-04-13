/**
 * class responsible for managing operations in html and javascript
 */
class ProductController {
  constructor() {
    let $ = document.querySelector.bind(document);
    this._productList = new ProductList();
    this._pagination = new Pagianation();
    this._productView = new ProductView($("#product-view"));
    this._btnNextPage = $("#btn-next-page");
    this._loader = $("#loader");
    this.getInit();
  }

  /**
   * method starts product listing operations
   *
   * @returns {void};
   */
  getInit() {
    this.setLoader();
    this._getProduct()
      .then((response) => {
        const { products, nextPage } = response;
        this._productList.addList(products);
        this._productView.update(this._productList);
        this._pagination.update(nextPage);
      })
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => {
        this.setLoader(false);
      });
  }

  /**
   * method starts operation to search for new product list
   *
   * @returns {void};
   */
  getNextPage(event) {
    this.setLoader();
    this.setDisabledBtn();

    let path = this._pagination.nextPage.split("/");

    if (path.length < 0) throw new Error("Próxima página não encontrada.");

    this._getProductPage(path[1])
      .then((response) => {
        const { products, nextPage } = response;
        this._productList.addList(products);
        this._productView.update(this._productList);
        this._pagination.update(nextPage);
      })
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => {
        this.setLoader(false);
        this.setDisabledBtn(false);
      });
  }

  /**
   * Wrapping method request products
   *
   * @returns {Promise}
   */
  async _getProduct() {
    let service = new ProductService();
    let response = await service.getProduct();
    return response;
  }

  /**
   * Wrapping method request next products
   *
   * @returns {Promise}
   */
  async _getProductPage(url) {
    let service = new ProductService();
    let response = await service.getProductByPage(url);

    return response;
  }

  /**
   * Loader state managed
   *
   * @param {*} status
   *
   * @returns {void}
   */
  setLoader(status = true) {
    if (status) this._loader.classList.add("loader");
    else this._loader.classList.remove("loader");
  }

  /**
   * Disabled button state managed
   *
   * @param {*} status
   *
   * @returns {void}
   */
  setDisabledBtn(status = true) {
    if (status) {
      this._btnNextPage.classList.add("btn-blocked");
      this._btnNextPage.disabled = true;
    } else {
      this._btnNextPage.classList.remove("btn-blocked");
      this._btnNextPage.disabled = false;
    }
  }
}
