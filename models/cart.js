module.exports = function Cart(oldCart) {
    this.items = oldCart.items;
    this.totalQuantity = oldCart.totalQuantity;
    this.totalPrice = oldCart.totalPrice;

    this.add = function(item, id) {
      storedItem = this.items[id];
      if (!storedItem) {
        storedItem = this.items[id] = {item: item, qty: 0, price: 0};
      }
      storedItem.qty++;
      storedItem.price = storedItem.item.price * storedItem.qty;
      this.totalQuantity++;
      this.totalPrice += storedItem.price
    }
    this.generateArray = function() {
      var arr = [];
      for (var id in this.items) {
        arr.push(this.items[id]);
      }
      return arr;
    };
};
