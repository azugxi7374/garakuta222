//https://twitter.com/yumemiinc/status/1560086874303082497
const array1=[1,2,3,4,5,6]
const array2=array1.join("").split().flatMap(x=>
  Array.from(x*900914774.9446442+"").map(Number)
)

console.log(array2)
//=> [1, 1, 1, 2, 2, 3, 3, 3, 4, 4, 5, 5, 5, 6, 6]