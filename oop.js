class Product {
    constructor(id, name, price) {
      this.id = id;
      this.name = name;
      this.price = price;
    }
  
    getDetails() {
      return `${this.name} - $${this.price}`;
    }
  }
  

  class ShoppingCartItem {
    constructor(product, quantity) {
      this.product = product;
      this.quantity = quantity;
    }
  
    getTotalPrice() {
      return this.product.price * this.quantity;
    }
  
    getDetails() {
      return `${this.product.getDetails()}, Quantity: ${this.quantity}, Total: $${this.getTotalPrice()}`;
    }
  
    updateQuantity(newQuantity) {
      this.quantity = newQuantity;
    }
  }
  

  class ShoppingCart {
    constructor() {
      this.items = [];
    }
  
    addItem(product, quantity) {
      let item = this.items.find(item => item.product.id === product.id);
      if (item) {
        item.updateQuantity(item.quantity + quantity);
      } else {
        this.items.push(new ShoppingCartItem(product, quantity));
      }
      this.updateDOM();
    }
  
    removeItem(productId) {
      this.items = this.items.filter(item => item.product.id !== productId);
      this.updateDOM();
    }
  
    getTotalItems() {
      return this.items.reduce((total, item) => total + item.quantity, 0);
    }
  
    getTotalPrice() {
      return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }
  
    displayCartItems() {
      return this.items.map(item => item.getDetails()).join('<br>');
    }
  
    updateDOM() {
      document.querySelector('.total').textContent = `${this.getTotalPrice()} $`;
      document.querySelector('#cart').innerHTML = this.displayCartItems();
    }
  }

  const basket = new Product(1, 'Baskets', 100);
  const socks = new Product(2, 'Socks', 20);
  const bag = new Product(3, 'Bag', 50);
  
  const cart = new ShoppingCart();

  document.querySelectorAll('.fa-plus-circle').forEach(button => {
    button.addEventListener('click', function() {
      const productCard = this.closest('.card');
      const productId = parseInt(productCard.dataset.productId);
      const quantity = parseInt(productCard.querySelector('.quantity').textContent) + 1;
      
      productCard.querySelector('.quantity').textContent = quantity;
      
      if (productId === 1) cart.addItem(basket, 1);
      if (productId === 2) cart.addItem(socks, 1);
      if (productId === 3) cart.addItem(bag, 1);
    });
  });
  
  document.querySelectorAll('.fa-minus-circle').forEach(button => {
    button.addEventListener('click', function() {
      const productCard = this.closest('.card');
      const productId = parseInt(productCard.dataset.productId);
      let quantity = parseInt(productCard.querySelector('.quantity').textContent);
  
      if (quantity > 0) {
        quantity--;
        productCard.querySelector('.quantity').textContent = quantity;
  
        if (productId === 1) {
          if (quantity === 0) cart.removeItem(basket.id);
          else cart.addItem(basket, -1);
        }
        if (productId === 2) {
          if (quantity === 0) cart.removeItem(socks.id);
          else cart.addItem(socks, -1);
        }
        if (productId === 3) {
          if (quantity === 0) cart.removeItem(bag.id);
          else cart.addItem(bag, -1);
        }
      }
    });
  });
  
  document.querySelectorAll('.fa-trash-alt').forEach(button => {
    button.addEventListener('click', function() {
      const productCard = this.closest('.card');
      const productId = parseInt(productCard.dataset.productId);
      
      if (productId === 1) cart.removeItem(basket.id);
      if (productId === 2) cart.removeItem(socks.id);
      if (productId === 3) cart.removeItem(bag.id);
      
      productCard.querySelector('.quantity').textContent = '0';
    });
  });
  document.querySelectorAll('.card').forEach(card => {
    const title = card.querySelector('.card-title').textContent;
    if (title === 'Baskets') card.dataset.productId = 1;
    if (title === 'Socks') card.dataset.productId = 2;
    if (title === 'Bag') card.dataset.productId = 3;
  });