"use strict";

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

function Hamburger(size, stuffing) {
  this.size = size;
  this.stuffing = stuffing;
};

Hamburger.prototype.getSize = function () {
  return this.size;
};

Hamburger.prototype.getStuffing = function () {
  return this.stuffing;
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

var hamburg = new Hamburger(HAMBURGER.SIZE_SMALL, [HAMBURGER.STUFFING_CHEESE, HAMBURGER.STUFFING_POTATO]);

console.log(hamburg.calculateCalories());