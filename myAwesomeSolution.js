"use strict";

function copyOwnPropertiesFrom(target, source, deep) {
  Object.getOwnPropertyNames(source)
    .forEach(function(propKey) {
      var desc = Object.getOwnPropertyDescriptor(source, propKey);
      Object.defineProperty(target, propKey, desc);
      if (deep && typeof desc.value === 'object') {
        target[propKey] = copyObject(source[propKey], deep);
      }
    });
  return target;
}

function copyObject(orig, deep) {
  // 1. copy has same prototype as orig
  var copy = Object.create(Object.getPrototypeOf(orig));

  // 2. copy has all of orig’s properties
  copyOwnPropertiesFrom(copy, orig, deep);

  return copy;
}

var HAMBURGER = {
  SIZE_SMALL: {
    cost: 50,
    kcal: 20,
  },
  SIZE_LARGE: {
    cost: 100,
    kcal: 40,
  },
  STUFFING_CHEESE: {
    cost: 10,
    kcal: 20,
  },
  STUFFING_SALAD: {
    cost: 20,
    kcal: 5,
  },
  STUFFING_POTATO: {
    cost: 15,
    kcal: 10,
  },
};

var SALAD = {
  CAESAR: {
    cost: 100,
    kcal: 20,
  },
  RUSSIAN_SALAD: {
    cost: 50,
    kcal: 80,
  },
};

var DRINKS = {
  COLA: {
    cost: 50,
    kcal: 40,
  },
  COFFEE: {
    cost: 80,
    kcal: 20,
  },
};
function SimpleFood(food) {
  this.food = copyObject(food)
};

SimpleFood.prototype.calculatePrice = function () {
  return this.food.cost;
};

SimpleFood.prototype.calculateCalories = function () {
  return this.food.kcal;
};

// inherit the Salad & Drinks classes from the SimpleFood class
function Salad(salad) {

};

function createSalad(type) {
  if (!type) return;

  function Salad(type) {
    SimpleFood.call(this, type)
  };
  Salad.prototype = Object.create(SimpleFood.prototype);
  Salad.prototype.constructor = Salad;

  return new Salad(type);
}


function createDrinks(type) {
  if (!type) return;

  function Drinks(type) {
    SimpleFood.call(this, type)
  };
  Drinks.prototype = Object.create(SimpleFood.prototype);
  Drinks.prototype.constructor = Drinks;

  return new Drinks(type);
}

function createHamburger(size, stuffing) {
  if (!size || !stuffing) return;

  function Hamburger(size, stuffing) {
    this.size = size;
    this.stuffing = stuffing;
  }

  Hamburger.prototype.getSize = function () {
    return this.size;
  };
  Hamburger.prototype.getStuffing = function () {
    return this.stuffing;
  };
  Hamburger.prototype.calculatePrice = function () {
    var sizeCost = this.getSize().cost;
    var stuffingCost = this.getStuffing().reduce(function(acc, cur) {
      return acc + cur.cost;
    }, 0);
    return sizeCost + stuffingCost;
  };
  Hamburger.prototype.calculateCalories = function () {
    var sizeKcal = this.getSize().kcal;
    var stuffingKcal = this.getStuffing().reduce(function(acc, cur) {
      return acc + cur.kcal;
    }, 0);
    return sizeKcal + stuffingKcal;
  };

  return new Hamburger(size, stuffing);
}
function Order() {
  this.dishes = {};
  this.paid = false;
};

Order.prototype.add = function (dish) {
  if (this.paid || !dish) return;

  // add simple 'hash'
  this.dishes[Date.now() + Math.random()] = dish;
};

Order.prototype.getDishHash = function () {
  return Object.keys(this.dishes);
};

Order.prototype.remove = function (hashKey) {
  if (this.paid) return;

  delete this.dishes[hashKey];
};

Order.prototype.getCostSummary = function () {
  var result = 0;

  for (var cur in this.dishes) {
    result += this.dishes[cur].calculatePrice();
  }

  return result;
};

Order.prototype.getKcalSummary = function () {
  var result = 0;

  for (var cur in this.dishes) {
    result += this.dishes[cur].calculateCalories();
  }

  return result;
};

Order.prototype.completed = function () {
  this.paid = true;
};

var order = new Order();

// we use the composition when creating an order. An example of such an order is below

order.add(createHamburger());
order.add(createHamburger(HAMBURGER.SIZE_SMALL, [HAMBURGER.STUFFING_CHEESE, HAMBURGER.STUFFING_POTATO]));
order.add(createSalad(SALAD.RUSSIAN_SALAD));
order.add(createDrinks(DRINKS.COFFEE));
// order.add(createSalad(SALAD.RUSSIAN_SALAD));

// "freeze" the Order object for changes (call the completed method, which switches the paid flag to false mode
// order.completed();
// order.add(createSalad(SALAD.RUSSIAN_SALAD));

// order.remove(order.getDishHash()[2]);
console.log(order);
// console.log(order.getCostSummary());
// console.log(order.getKcalSummary());
