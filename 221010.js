
const a = []
let y;

function hoge(x) {
  console.log(x, y)
}

y = 1;
a.push(() => hoge(0))
y = 2
a.push(() => hoge(10))

a.forEach(f => f())

console.log(
hoge.toString(),
()=>hoge(111)
)

let o1=null
function outer(o2){
	inner()
	o1="o1"
  console.log("outer",o1)
  function inner(){
		console.log("inner",o1)
  }
  inner()
}

outer()
