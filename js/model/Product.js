class Product {

    /* constructor(id, name, description, image, oldPrice, price, installments) { */
    constructor(dto) {
        this._id = dto.id;
        this._name = dto.name;
        this._price =  dto.price;
        this._image = dto.image;
        this._oldPrice = dto.oldPrice;
        this._description = dto.description;
        this._installments = dto.installments;
        Object.freeze(this);
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get price() {
        return this._price;
    }

    get image() {
        return this._image;
    }
    
    get oldPrice() {
        return this._oldPrice
    }

    get description() {
        return this._description;
    }

    get installments() {
        return this._installments;
    }
}