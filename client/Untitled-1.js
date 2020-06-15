const data = [
  {
    name: "neha",
    age: 28
  },
  {
    name: "nalin",
    age: "28"
  }
];

function HashMap(data) {
  this.arr = data || [];
}

HashMap.prototype.set = function (key, val) {
  this.arr.push({ [key]: val });
};

HashMap.prototype.size = function () {
  return this.arr.length;
};

HashMap.prototype.has = function (key) {

  return this.arr[0].hasOwnProperty(key);
};

HashMap.prototype.enteries = function () {
  return Object.keys(this.arr[0]);
};

HashMap.prototype.values = function () {
  return Object.values(this.arr[0]);
};



const myMap = new HashMap(data);
console.log(myMap);
myMap.set("x", 20);
console.log(myMap);
console.log(myMap.size());

const myMap2 = new HashMap();
myMap2.set({
  name: "neha",
  age: 28
});
myMap2.set({
  name: "nalin",
  age: "28"
});
console.log(myMap2);
console.log(myMap2.has("name"));
console.log(myMap2.enteries());
console.log(myMap2.values());