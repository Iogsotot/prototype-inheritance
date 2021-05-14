"use strict";

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

function Drink(type) {
  this.size = size;
  this.stuffing = stuffing;
};

Hamburger.prototype.calculatePrice = function () {
  var sizeCost = this.getSize().cost;
  var stuffingCost = this.getStuffing().reduce((acc, cur) => {
    return acc + cur.cost;
  }, 0);
  return sizeCost + stuffingCost;
};

Hamburger.prototype.calculateCalories = function () {
  var sizeKcal = this.getSize().kcal;
  var stuffingKcal = this.getStuffing().reduce((acc, cur) => {
    return acc + cur.kcal;
  }, 0);
  return sizeKcal + stuffingKcal;
};

var drink = new Hamburger(HAMBURGER.SIZE_SMALL, [HAMBURGER.STUFFING_CHEESE, HAMBURGER.STUFFING_POTATO]);

console.log(drink.calculateCalories());