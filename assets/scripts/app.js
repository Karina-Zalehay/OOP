const productList = {
    products: [{
            title: 'A Pillow',
            imgUrl: 'https://m.media-amazon.com/images/I/61Ab4L6fFOL._AC_SL1000_.jpg',
            price: 19.99,
            description: 'A soft pillow!'
        },
        {
            title: 'A Carpet',
            imgUrl: 'https://ae04.alicdn.com/kf/H8d8022a13ed64833863b29aa4662b000Y/-.jpg',
            price: 89.99,
            description: 'A carpet which you might like - or not!'
        }
    ],
    render() {
        const renderHook = document.getElementById('app');
        const prodList = document.createElement('ul');
        prodList.className = 'product-list';
        for (const prod of this.products) {
            const prodEl = document.createElement('li');
            prodEl.className = 'product-item';
            prodEl.innerHTML = `
            <div>
            <img src="${prod.imgUrl}" alt="${prod.title}">
            <div class="product-item__content">
            <h2>${prod.title}</h2>
            <h3>\$${prod.price}</h3>
            <p>${prod.description}</p>
            <button>Add to Cart</button>
            <div>
            <div>
            `;
            prodList.append(prodEl);
        }
        renderHook.append(prodList);
    }
};
productList.render();