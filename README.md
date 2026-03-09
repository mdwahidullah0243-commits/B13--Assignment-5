## What is the difference between var, let, and const?
### 1. var:
var is the old way to declare variables (before 2015).

#### Features:
- Function-scoped, var ignores block scope.
- Can be redeclared
- Can be reassigned
- Hoisted (moved to the top of the scope)

### 2. let:
var is the old way to declare variables (before 2015).

#### Features:
- Block-scoped
- Cannot be redeclared in the same scope
- Can be reassigned
- Hoisted but not initialized

### 3. const:
const is used for constants (values that should not change).

#### Features:
- Block-scoped
- Cannot be redeclared
- Cannot be reassigned
- Must be initialized when declared


## What is the spread operator (...)?

Idea: The spread operator takes something grouped (array/object) and spreads it out.
It was introduced in ECMAScript 2015 (ES6). 
In JavaScript, the spread operator (...) is used to expand (spread) elements of an array, object, or iterable into individual elements.

- Copy an Array: You can create a copy of an array easily. Without spread, copying arrays was harder.
- Merge Arrays
- Copy an Object
- Merge Objects
- Update Object Without Changing Original


## What is the difference between map(), filter(), and forEach()?

In JavaScript, map(), filter(), and forEach() are array methods used to loop through arrays.
However, they behave differently depending on what they return and what they are used for.

### 1. map(): 
map() creates a new array by transforming each element.

#### Features: 
- Returns a new array
- Same length as the original array
- Used when you want to modify/transform data

### 2. filter(): 
filter() creates a new array containing only elements that pass a condition.

#### Features:
- Returns a new array
- Length may be smaller
- Used when you want to select specific elements

### 3. forEach(): 
forEach() loops through an array but does not return anything.

#### Features:
- Returns undefined
- Used for side effects (logging, updating variables, etc.)


## What is an arrow function?

In JavaScript, an arrow function is a shorter and modern way to write functions. 
An arrow function is a shorter way to write functions in JavaScript using the => syntax.
It was introduced in ECMAScript 2015 (ES6).

#### Features:
1. Shorter Syntax: Arrow functions make code cleaner and shorter.
2. No function Keyword: You don't need the function keyword.
3. Implicit Return: If there is only one expression, return is not needed.


## What are template literals?

In JavaScript, template literals are a modern way to create strings with embedded variables and expressions.
Template literals use backticks (` `) instead of single ' ' or double " " quotes.

#### Features:
1. String Interpolation (Insert Variables). Before ES6 we used string concatenation.
2. Multi-line Strings. Template literals allow multi-line strings without \n.
3. Expressions Inside Strings. You can run JavaScript expressions inside ${}.
4. Useful for HTML Templates. Very common when creating HTML dynamically.
