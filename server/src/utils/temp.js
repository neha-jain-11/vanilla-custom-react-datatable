const arr = [
  {
    "employeeId": 1,
    "name": "A",
    "gender": "M",
    "age": 23,
    "title": "DV",
    "location": "IND",
    "salary": 10000,
    "rating": 2,
    "progress": 20
  },
  {
    "employeeId": 2,
    "name": "C",
    "gender": "M",
    "age": 23,
    "title": "DV",
    "location": "IND",
    "salary": 12000,
    "rating": 5,
    "progress": 90
  },
  {
    "employeeId": 3,
    "name": "V",
    "gender": "M",
    "age": 25,
    "title": "DV",
    "location": "IND",
    "salary": 12000,
    "rating": 3,
    "progress": 60
  },
  {
    "employeeId": 4,
    "name": "F",
    "gender": "M",
    "age": 24,
    "title": "CS",
    "location": "IND",
    "salary": 9000,
    "rating": 1,
    "progress": 20
  },
  {
    "employeeId": 5,
    "name": "DS",
    "gender": "F",
    "age": 26,
    "title": "CS",
    "location": "IND",
    "salary": 14000,
    "rating": 4,
    "progress": 75
  },
  {
    "employeeId": 6,
    "name": "S",
    "gender": "F",
    "age": 25,
    "title": "CS",
    "location": "IND",
    "salary": 15000,
    "rating": 2,
    "progress": 30
  },
  {
    "employeeId": 7,
    "name": "A",
    "gender": "F",
    "age": 23,
    "title": "TT",
    "location": "IND",
    "salary": 11000,
    "rating": 3,
    "progress": 40
  },
  {
    "employeeId": 8,
    "name": "C",
    "gender": "F",
    "age": 30,
    "title": "TT",
    "location": "US",
    "salary": 9000,
    "rating": 3,
    "progress": 60
  },
  {
    "employeeId": 9,
    "name": "D",
    "gender": "F",
    "age": 30,
    "title": "MG",
    "location": "US",
    "salary": 40000,
    "rating": 5,
    "progress": 80
  },
  {
    "employeeId": 10,
    "name": "D",
    "gender": "M",
    "age": 27,
    "title": "BA",
    "location": "CAN",
    "salary": 25000,
    "rating": 3,
    "progress": 40
  },
  {
    "employeeId": 11,
    "name": "A",
    "gender": "F",
    "age": 28,
    "title": "BA",
    "location": "INDIA",
    "salary": 25000,
    "rating": 3,
    "progress": 60
  },
  {
    "employeeId": 12,
    "name": "V",
    "gender": "M",
    "age": 27,
    "title": "DV",
    "location": "CAN",
    "salary": 10000,
    "rating": 4,
    "progress": 75
  },
  {
    "employeeId": 13,
    "name": "D",
    "gender": "F",
    "age": 28,
    "title": "CS",
    "location": "US",
    "salary": 6000,
    "rating": 1,
    "progress": 20
  },
  {
    "employeeId": 14,
    "name": "B",
    "gender": "F",
    "age": 29,
    "title": "MG",
    "location": "CAN",
    "salary": 25000,
    "rating": 5,
    "progress": 90
  },
  {
    "employeeId": 15,
    "name": "Z",
    "gender": "F",
    "age": 23,
    "title": "CS",
    "location": "US",
    "salary": 30000,
    "rating": 3,
    "progress": 60
  },
  {
    "employeeId": 16,
    "name": "Z",
    "gender": "M",
    "age": 29,
    "title": "MG",
    "location": "INDIA",
    "salary": 30000,
    "rating": 2,
    "progress": 30
  },
  {
    "employeeId": 17,
    "name": "X",
    "gender": "M",
    "age": 31,
    "title": "BA",
    "location": "UK",
    "salary": 30000,
    "rating": 4,
    "progress": 75
  },
  {
    "employeeId": 18,
    "name": "Z",
    "gender": "M",
    "age": 23,
    "title": "TT",
    "location": "CAN",
    "salary": 10000,
    "rating": 3,
    "progress": 60
  },
  {
    "employeeId": 19,
    "name": "D",
    "gender": "F",
    "age": 31,
    "title": "DV",
    "location": "UK",
    "salary": 10000,
    "rating": 2,
    "progress": 30
  },
  {
    "employeeId": 20,
    "name": "G",
    "gender": "F",
    "age": 31,
    "title": "MG",
    "location": "INDIA",
    "salary": 15000,
    "rating": 2,
    "progress": 10
  }
];

const nextArr = [];
for(let i=0; i < arr.length; i++) {
  const tempArr = [];
  const obj = arr[i];
  for (let j in obj) {
    tempArr.push(obj[j]);
  }
  nextArr.push(tempArr);
}

console.log(nextArr);