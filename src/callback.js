
// function wave(name, callback) {
//   callback();
//   console.log(name + ' integet a kezével');
// }

// const a = function () {
//   console.log('hello');
// };

// wave('Peter', a);

function a() {
  console.log('hello');
}

setTimeout(a, 3000);

console.log('world');