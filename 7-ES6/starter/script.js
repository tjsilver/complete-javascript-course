// Lecture 104: let and const


/*
// ES5
var name5 = 'Jane Smith';
var age5 = 23;
name5 = 'Jane Miller';
console.log(name5);

// in ES6 we don't use var anymore, we use let and const

// ES6
const name6 = 'Jane Smith';
let age6 = 23;
name6 = 'Jane Miller';
console.log(name6);


// variables declared with var in ES5 are function scoped whereas variables declared with let and const in ES6 are block scoped.

// ES5
function driversLicence5(passedTest) {
    if (passedTest) {
        console.log(firstName); // hoisted and set to undefined
        var firstName = 'John';
        var yearOfBirth = 1990;
    }
    // the console log will pass because the variables declared with var are function scoped and thus available outside the if statement block.
    console.log(firstName + ', born in ' + yearOfBirth + ', is now officially allowed to drive a car.');
}
driversLicence5(true);

// ES6
function driversLicence6(passedTest) {
    if (passedTest) {
        let firstName = 'John';
        const yearOfBirth = 1990;
    }
    // the console log will fail because the variables declared with let and const are only available in the if statement block.
    /*
    console.log(firstName + ', born in ' + yearOfBirth + ', is now officially allowed to drive a car.');
    
}
driversLicence6(true);

// ES6 - v2
function driversLicence6(passedTest) {
    //console.log(firstName); // will get reference error that variable is not defined - so can't use it before it's declared
    // declare variables outside if block
    let firstName;
    // const needs to be initialised if declared outside the block
    const yearOfBirth = 1990;

    if (passedTest) {
        firstName = 'John';
        //yearOfBirth = 1990;
    }
    // the console log will fail because the variables declared with let and const are only available in the if statement block.
    
    console.log(firstName + ', born in ' + yearOfBirth + ', is now officially allowed to drive a car.');
    
}
driversLicence6(true);

let i = 23;
for (let i = 0; i < 5; i++) { // this i variable is completely separate from the i outside the loop
    console.log(i);
}
console.log(i);

// whereas i gets overwritten using var
var i = 23;
for (var i = 0; i < 5; i++) { 
    console.log(i);
}
console.log(i);


///////////////////////////////////////
// Lecture 105: Blocks and IIFEs

// previously we used IIFEs to achieve data privacy - but in ES6 all we have to do is use a block. 

// ES6
{
    const a = 1;
    let b = 2;
    var d = 3
}
// console.log(a + b); // error as variables a and b are block scoped
console.log(d); // variable d is function scoped so will work

// ES5 
(function() {
    var c = 3;
})();

//console.log(c); // error


///////////////////////////////////
// Lecture 106: Strings

let firstName = 'John';
let lastName = 'Smith';
const yearOfBirth = 1990;
function calcAge(year) {
    return 2018 - year;
}

// template literals

// ES5
console.log('This is ' + firstName + ' ' + lastName + '. He was born in ' + yearOfBirth + '. Today, he is ' + calcAge(yearOfBirth) + ' years old.');

// ES6 - template literals
// uses backticks
console.log(`This is ${firstName} ${lastName}. He was born in ${yearOfBirth}. Today he is ${calcAge(yearOfBirth)} years old.`);

// new string methods in ES6
const n = `${firstName} ${lastName}`;
console.log(n.startsWith('Jo'));
console.log(n.endsWith('th'));
console.log(n.includes(' Sm'));
console.log(`${firstName} \n`.repeat(5));


///////////////////////
// Lecture 107: Arrow functions

const years = [1990, 1965, 1982, 1937];

// ES5
var ages5 = years.map(function(el){
    return 2018 - el;
});
console.log(ages5);

// ES6

// 3 ways of writing arrow functions:

// 1. simple
let ages6 = years.map(el => 2018 - el);
console.log(ages6);

// 2. more than one parameter - enclose in brackets
ages6 = years.map((el, index) => `Age element ${index + 1}: ${2018 - el}.`);
console.log(ages6);

// 3. more than one line of code in function body - enclose in curly brackets and write return statement
ages6 = years.map((el, index) => {
    const now = new Date().getFullYear();
    const age = now - el;
    return `Age element ${index + 1}: ${age}.`
});
console.log(ages6);


///////////////////////
// Lecture 108: Arrow functions 2

// Arrow functions do not have a 'this' keyword, they use the 'this' keyword of the function that they're written in = 'lexical this' variable.

// ES5
var box5 = {
    color: 'green',
    position: 1,
    clickMe: function() {
        var self = this; // workaround as we get undefined otherwise because callback function doesn't have access to box object
        document.querySelector('.green').addEventListener('click', function() {
            var str = 'This is box number ' + self.position + ' and it is ' + self.color;
            alert(str);
        });
    }
}
//box5.clickMe();

// ES6
const box6 = {
    color: 'green',
    position: 1,
    clickMe: function() {
        document.querySelector('.green').addEventListener('click', () => {
            // using an arrow function preserves the value of 'this' keyword:
            let str = 'This is box number ' + this.position + ' and it is ' + this.color;
            alert(str);
        });
    }
}
//box6.clickMe();

// ES6
const box66 = {
    color: 'green',
    position: 1,
    clickMe: () =>  {
        // get same problem as ES5 example
        document.querySelector('.green').addEventListener('click', () => {
            // using an arrow function preserves the value of 'this' keyword:
            let str = 'This is box number ' + this.position + ' and it is ' + this.color;
            alert(str);
        });
    }
}
//box66.clickMe();

// function constructor
function Person(name) {
    this.name = name;
}
Person.prototype.myFriends5 = function(friends) {
    // 'this' points to window object again so need to use bind
    var arr = friends.map(function(el) {
        return this.name + ' is friends with ' + el;
    }.bind(this));
    console.log(arr);
}

var friends = ['Bob', 'Jane', 'Mark'];
new Person('John').myFriends5(friends);

// ES6
Person.prototype.myFriends6 = function(friends) {
    let arr = friends.map(el => `${this.name} is friends with ${el}`);
    console.log(arr);
}

var friends = ['Bob', 'Jane', 'Mark'];
new Person('Mike').myFriends6(friends);


/////////////////////////////////
// Lecture 109: Destructuring

// ES5
var john = ['John', 26];
var name5 = john[0];
var age5 = john[1];

// ES6
// creates 2 new constants that store the data out of the array
const [name6, age6] = ['John', 26];
console.log(name6);
console.log(age6);

const obj = {
    firstName: 'John',
    lastName: 'Smith'
}
// create 2 new constants that store data outside of the object
const {firstName, lastName} = obj;
console.log(firstName);
console.log(lastName);

const {firstName: a, lastName: b} = obj;
console.log(a,b);

function calcAgeRetirement(year) {
    const age = new Date().getFullYear() - year;
    return [age, 65-age];
}

const [age, retirement] = calcAgeRetirement(1990);
console.log(age, retirement);
*/

/////////////////////////////////
// Lecture 110 Arrays

const boxes = document.querySelectorAll('.box'); // returns a nodelist

// ES5 
var boxesArr5 = Array.prototype.slice.call(boxes);
//boxesArr5.forEach(function(cur) {
//    cur.style.backgroundColor = 'dodgerblue';
//});


// ES6 
// use new 'from' method
Array.from(boxes).forEach(cur => cur.style.backgroundColor = 'dodgerblue');

// loops
// ES5
/*
for (var i=0; i < boxesArr5.length; i++) {
    if (boxesArr5[i].className === 'box blue') {
        continue; // skip this iteration of loop, or:
        // break; // break from loop altogether
    }
    boxesArr5[i].textContent = 'I changed to blue!';
}
*/
/*

// ES6
// 'for of' loop
const boxesArr6 = Array.from(boxes);
for (const cur of boxesArr6) {
    if (cur.className.includes('blue')){
        continue;
    }
    cur.textContent = 'I changed to blue!';
}

// ES5 
var ages = [12, 17, 8 , 21, 14, 11];

var full = ages.map(function(cur){
    return cur >= 18;
});
console.log(full.indexOf(true));
console.log(ages[full.indexOf(true)]);

// ES6 
console.log(ages.findIndex(cur => cur >= 18));
console.log(ages.find(cur => cur >= 18));
*/

/////////////////////////////////
// Lecture 111 Spread operator

function addFourAges(a, b, c, d) {
    return a + b + c + d;
}

var sum1 = addFourAges(18, 30, 12, 21);
console.log(sum1);

// ES5
var ages = [18, 30, 12, 21];
// apply method receives an array and uses the elements of the array as args
var sum2 = addFourAges.apply(null, ages); // null specifies 'this' variable
console.log(sum2);

// ES6
const sum3 = addFourAges(...ages);
console.log(sum3);

const familySmith = ['John', 'Jane', 'Mark'];
const familyMiller = ['Mary', 'Bob', 'Ann'];
const bigFamily = [...familySmith, 'Lily', ...familyMiller];
console.log(bigFamily);

const h = document.querySelector('h1');
const boxes2 = document.querySelectorAll('.box');
const all = [h, ...boxes2];

Array.from(all).forEach(cur => cur.style.color = 'purple');
*/

/////////////////////////////////
// Lecture 112
