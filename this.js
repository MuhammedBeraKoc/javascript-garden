console.clear()
// This "this" will show the global object (Windows object)
console.log(this)
// When a function is called it always points out to the 
// global object
function f(args) {
	console.log(this)
	console.log('Function @f invoked with arguments:', args)
}
f()
// When a method used "this" always refers to the caller object
const o = { name: '@RandomObject'}
o.present = function() {
	console.log(this.name)
}

o.present()
// Calling constructors has the same affect as
// invoking a method
// They are always bound to the object they create
/*
// Old version of creating objects
function NativeObject() {
	this.name = '@NativeObject'
}

const nativeObject = new NativeObject()
*/
// Syntactic Sugar for Classes
// Brand new version of creating objects
class NativeObject {
	constructor() {
		this.name = '@NativeObject'
	}

	introduce() {
		console.log(this)
	}
}

const nativeObject = new NativeObject()
nativeObject.introduce()
// We can set this explicitly using 3 methods
// => call, apply, bind
// Those methods are defined in Function 
// Since all functions and methods emerges from Function
// We can use all of these three methods on every function or method
// PS: Methods are just functions related with an object
// Like call() method above since it is bound to nativeObject 
// Let's first talk about call and apply
// Those two binds the given object as the "this" of 
// the function which has called these methods
// They immidiately invoke the method
// The only difference is that apply takes the argument
// one by one whereas call takes them as an array
// Let's use the first function we have created to bind it our object
// Since it takes args as one I will use apply 
f.call(nativeObject, ['JavaScript', 'is', 'awesome'])
// Now the downside of this approach is that 
// It works only once
// What if we want to call it again and again?
// That is where bind kicks in
// bind basically works the same as apply
// Except that it doesn't invoke the function
// Instead it returns the modified function
const fModified = f.bind(nativeObject, 'Augmented @f()')
fModified()
// Since Function has an empty implementation
// We cannot see any results when we invoke it
// However it binds itself to the nativeObject like below
const NativeFunction = Function.prototype.bind(nativeObject)
console.log({NativeFunction})
// Let's look a different case
// You may except to see the object itself in this
// But unfortunately you will see the global object
const strangeObject = { property: this }
console.log(strangeObject)
// Common Pitfalls
// Code below will print global object instead of 
// Our object. That is because all functions instead of 
// methods points the global object as "this"
const enhancedObject = {}
enhancedObject.method = function() {
	function logThis() {
		console.log(this)
	}
	logThis()
}

enhancedObject.method()
// How to fix this?
// Well the straightforward solution is 
// to assign the object reference in method
// in a variable and use it inside function
enhancedObject.modifiedMethod = function() {
	const self = this
	function logThis() {
		console.log(self)
	}
	logThis()
}

enhancedObject.modifiedMethod()
// Another solution is to use bind
// with an anonymous function
enhancedObject.anotherMethod = function() {
	const logThis = function() {
		console.log(this)
	}.bind(this)
	logThis()
}

enhancedObject.anotherMethod()
// Assigning methods to variables
// makes them lose their context
// So that they become plain functions
const copiedMethod = enhancedObject.anotherMethod
copiedMethod()
// To solve this bind can be used
// However prototypes inheritance is an optimal
// way to solve it
// Hint: I will create a script for Prototype-based programming in JS
const copiedMethodWithBind = enhancedObject.anotherMethod.bind(enhancedObject)
copiedMethodWithBind()