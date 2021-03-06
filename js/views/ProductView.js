class ProductView extends View {
  template(model) {
    let products = model._productList;

    let result = products
      .map(
        (product) =>
          `<li class="product-item flex-item-3">
                <figure class="">
                    <img src="http://${product.image}" alt="${product.name}">
                    <figcaption>${product.name}</figcaption>
                </figure>
                <div>
                    <p>${product.description}</p>
                    <span>De: ${this.convertForPTBR(product.oldPrice)} </span>
                    <span><b>Por: ${this.convertForPTBR(
                      product.price
                    )}</b></span>
                    <span>
                      ou ${ product.installments.count}x de ${this.convertForPTBR(product.installments.value)}
                    </span>
                    <button>Comprar</button>
                </div>
            </li>`
      )
      .join("");

    if (result.length === 0) {
      result = `
            <li class="flex-item-3">
                <h1 style="text-align: center;">Lista de produtos vazia!!!</h1>
            </li>
            `;
    }

    return result;
  }

  convertForPTBR(value = 0.0) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }
}
