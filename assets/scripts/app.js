class Product {
    // title = 'DEFAULT';
    // imgUrl;
    // description;
    // price;

    constructor(title, image, desc, price) {
        this.title = title;
        this.imgUrl = image;
        this.description = desc;
        this.price = price;
    }
}

class ElementAttribute {
    constructor(attrName, attrValue) {
this.name = attrName;
this.value = attrValue;
    }

}

class Component {
    constructor(renderHook, shouldRender = true) {
        this.hookId = renderHook;
        if (shouldRender) {
            this.render()
        }
    }
    render() {}

    createRootElement(tag, cssClassess, attributes) {
        const rootElement = document.createElement(tag);
        if (cssClassess) {
            rootElement.className = cssClassess;
        }
        if (attributes && attributes.length > 0) {
           for (const attr of attributes) {
               rootElement.setAttribute(attr.name, attr.value)
           }
        }
document.getElementById(this.hookId).append(rootElement);
        return rootElement;

    }
}

class ShoppingCart extends Component{
    items = [];

    set cartItems(value) {
        this.items = value;
        this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(2)}</h2>`;
    }

    get totalAmount() {
        const sum = this.items.reduce((prevValue, curItem) => prevValue + curItem.price, 0);
        return sum;
    }

    constructor(renderHookId) {
        super(renderHookId);    //call the constructor from parent class
    }

    addProduct(product) {
        const updatedItems = [...this.items];
        updatedItems.push(product);
        this.cartItems = updatedItems;
    }

    orderProducts() {
        console.log('Ordering ...');
        console.log(this.items)
    }

    render() {
       const cartEl = this.createRootElement('secion', 'cart');
        cartEl.innerHTML = `
        <h2>Total: \$${0}</h2>
        <button>Order Now!</button>`;
        const orderButton = cartEl.querySelector('button');
        orderButton.addEventListener('click', () => this.orderProducts())
        this.totalOutput = cartEl.querySelector('h2');
        return cartEl;
    }
}

class ProductItem extends Component{
    constructor(product, renderHookId) {
        super(renderHookId, false);
        this.product = product;
        this.render();
    }

    addToCart() {
        App.addProductToCart(this.product);
    }

    render() {

        const prodEl = this.createRootElement('li', 'product-item')
        prodEl.innerHTML = `
            <div>
            <img src="${this.product.imgUrl}" alt="${this.product.title}">
            <div class="product-item__content">
            <h2>${this.product.title}</h2>
            <h3>\$${this.product.price}</h3>
            <p>${this.product.description}</p>
            <button>Add to Cart</button>
            <div>
            <div>
            `;
        const addCartButton = prodEl.querySelector('button');
        addCartButton.addEventListener('click', this.addToCart.bind(this));
    }
}

class ProductList extends Component{
    #products = [];
    constructor(renderHookId) {
        super(renderHookId, false);
        this.render();
        this.fetchProducts();
    }

    fetchProducts() {
        this.#products =[
            new Product(
                'A Pillow',
                'https://m.media-amazon.com/images/I/61Ab4L6fFOL._AC_SL1000_.jpg',
                'A soft pillow!',
                19.99),
            new Product(
                'A Carpet',
                'https://ae04.alicdn.com/kf/H8d8022a13ed64833863b29aa4662b000Y/-.jpg',
                'A carpet which you might like - or not!',
                89.99)
        ];
        this.renderProducts();
    }

    renderProducts () {
        for (const prod of this.#products){
            const productItem = new ProductItem(prod, 'prod-list');
        }
    }

    render() {
        this.createRootElement('ul', 'product-list', [
            new ElementAttribute('id', 'prod-list')]);
        if (this.#products && this.#products.length > 0) {
            this.renderProducts();
        }
    }
}

class Shop {

    constructor() {
   this.render()
    }

    render() {
        this.cart = new ShoppingCart('app');
        const productList1 = new ProductList('app');

    }
}

class App {
    static cart;

    static init() {
        const shop = new Shop();
        this.cart = shop.cart;
    }

    static addProductToCart(product) {
        this.cart.addProduct(product);
    }
}


App.init();





