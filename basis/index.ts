
// 对象类型
interface Person { // 接口(首字母大写)
  readonly name: string // 只读属性, 赋值后不允许修改
  age: number
  isBoy?: boolean // 可选属性
  [propName: string]: string | number | boolean // 任意属性, 类型必须包含此接口其他类型

}
let tom: Person = {
  name: 'Tom',
  age: 18,
  height: '180cm'
}

// tom.name = 'zhangsan'




// 数组类型
// let fibonacci: number[] = [1, 1, 2, 3, 5]
// let fibonacci: Array<number> = [1, 1, 2, 3, 5] // 泛型

// 接口描述数组
interface NumberArray {
  [index: number]: number
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5]

interface Args {
  [index: number]: number
  length: number
  callee: Function
}
// 类数组
function sum1() {
  // let args: number[] = arguments
  let args: IArguments = arguments
}
sum1()


// 函数的类型
function sum2(x: number, y: number): number { // 声明函数
  return x + y
}

let mySum2: (x: number, y: number) => number = function (x: number, y: number): number { // 函数表达式
  return x + y
}

// 接口定义函数类型
interface SearchFunc {
  (source: string, subString: string): boolean
}
let mySearch: SearchFunc = function (source: string, subString: string) {
  return source.search(subString) !== 1
}

// 可选参数(可选参数和扩展运算符放必选参数后面, 默认参数无限制)
function buildName(firstName: string, lastName: string = 'cat', ...items: Array<any>) {
  if (lastName) {
    return firstName + '' + lastName
  } else {
    return firstName
  }
}
let tomcat = buildName('tom', 'cat', '123', 456)
let tomName = buildName('tom')
// console.log(tomcat)

// 重载
function reverse(x: number): number
function reverse(x: string): string
function reverse(x: number | string): number | string | void {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''))
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('')
  }
}
// console.log(reverse('1234560'))


// 类型断言
// 将一个联合类型断言为其中一个类型
interface Cat {
  name: string
  run(): void
}

interface Fish {
  name: string
  swim(): void
}

function isFish(animal: Cat | Fish) {
  return typeof (animal as Fish).swim === 'function'
}

let tom3: Cat = {
  name: 'Tom',
  run: () => (console.log('run'))
}
// console.log(isFish(tom3))

// 将父类断言成具体的子类
// class ApiError extends Error {
//   code: number = 0
// }

// class HttpError extends Error {
//   statusCode: number = 200
// }

// function isApiError(error: Error) {
//   // return typeof (error as ApiError).code === 'number'
//   return error instanceof ApiError
// }

interface ApiError extends Error {
  code: number
}

interface HttpError extends Error {
  statusCode: number
}

function isApiError(error: Error) {
  return typeof (error as ApiError).code === 'number'
}


// 将任何类型断言为any
// window.foo = 1
// (window as any).foo = 1

// 将any断言为具体的类型
function getCatchData(key: string): any {
  return (window as any).catch[key]
}

interface Cat1 {
  name: string
  run(): void
}
const tom4 = getCatchData('tom') as Cat1

// 双重断言
interface Cat2 {
  run(): void
}
interface Fish2 {
  swim(): void
}
function testCat(cat: Cat) {
  return (cat as any as Fish)
}


// 类型别名
type Name = string
type NameResolver = () => string
type NameOrResolver = Name | NameResolver
function getName(n: NameOrResolver): Name {
  if (typeof n === 'string') return n
  return n()
}

// 字符串字面量别名
type EventName = 'click' | 'scroll' | 'mousemove'
function handleEvent(ele: Element, event: EventName) {
  // do someting
}

// 元祖
