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

/////////////////////////////////
// Lecture 112 Rest parameters

/*
// ES5
function isFullAge5() {
    // arguments is an array-like structure (object)
    var argsArr = Array.prototype.slice.call(arguments);

    argsArr.forEach(function(cur) {
        console.log((2018-cur) >= 18);
    })
}

//isFullAge5(1990, 1999, 1965);
//isFullAge5(1990, 1999, 1965, 1983, 2001, 2015);

// ES6

function isFullAge6(...years) {
    years.forEach(cur => console.log((2018 - cur) >= 18));
}

isFullAge6(1990, 1999, 1965);
isFullAge6(1990, 1999, 1965, 1983, 2001, 2015);


// ES5
function isFullAge5(limit) {
    // arguments is an array-like structure (object)
    var argsArr = Array.prototype.slice.call(arguments, 1);
    console.log(argsArr);

    argsArr.forEach(function(cur) {
        console.log((2018-cur) >= limit);
    })
}

//isFullAge5(21, 1990, 1999, 1965);
//isFullAge5(1990, 1999, 1965, 1983, 2001, 2015);

// ES6

function isFullAge6(limit, ...years) {
    years.forEach(cur => console.log((2018-cur) >= limit));
}

//isFullAge6(1990, 1999, 1965);
isFullAge6(18, 1990, 1999, 1965, 1983, 2001, 2015);



/////////////////////////////////
// Lecture 113 Default parameters

// ES5
function SmithPerson5(firstName, yearOfBirth, lastName, nationality) {
    lastName  === undefined ? lastName = 'Smith' : lastName = lastName;
    nationality === undefined ? nationality = 'American' : nationality = nationality;

    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}

var john = new SmithPerson5('John', 1990);
var emily = new SmithPerson5('Emily', 1983, 'Diaz', 'Spanish');

// ES6
function SmithPerson6(firstName, yearOfBirth, lastName = 'Smith', nationality = 'American') {
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}

var jerry = new SmithPerson6('Jerry', 1990);
var emilia = new SmithPerson6('Emilia', 1983, 'Diaz', 'Spanish');


/////////////////////////////////
// Lecture 114 Maps
// Map is a new key-value data structure in ES6, can use any type of object as keys

const question = new Map();
question.set('question', 'What is the official name of the latest major Javascript version?');
question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');
question.set('correct', 3);
question.set(true, 'Correct answer :D');
question.set(false, 'Wrong, please try again!');

console.log(question.get('question'));
console.log(question.size);

if (question.has(4)) {
    //question.delete(4);
    console.log('Answer 4 is here');
}

//question.clear();

//question.forEach((value, key) => console.log(`This is ${key}, and it's set to ${value}`));

for (let [key, value] of question.entries()) {
    if (typeof(key) === 'number') {
        console.log(`Answer ${key}: ${value}`);
    }
}

const ans = parseInt(prompt('Write the correct answer'));

console.log(question.get(ans === question.get('correct')));



/////////////////////////////////
// Lecture 115 Classes

// Classes are syntactical sugar

// ES5 
var Person5 = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person5.prototype.calculateAge = function() {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
}

var john5 = new Person5('John', 1990, 'teacher');

// ES6

class Person6 {
    // NB no separating punctuation required in a class

    constructor (name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    calculateAge() {
        let age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
    }

    // static methods are not inherited by instances of a class
    static greeting() {
        console.log('Hey there');
    }
}

const john6 = new Person6('John', 1990, 'teacher');

Person6.greeting();

// classes
// can only add methods, not properties to classes
// classes are not hoisted so need to be declared before use


/////////////////////////////////
// Lecture 116 Classes with subclasses

// ES5 
var Person5 = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person5.prototype.calculateAge = function() {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
}

var Athlete5 = function(name, yearOfBirth, job, olympicGames, medals) {
    Person5.call(this, name, yearOfBirth, job);
    this.olympicGames = olympicGames;
    this.medals = medals;
}

Athlete5.prototype = Object.create(Person5.prototype);

Athlete5.prototype.wonMedal = function() {
    this.medals++;
    console.log(this.medals);
}

var johnAthlete5 = new Athlete5('John', 1990, 'swimmer', 3, 10);
johnAthlete5.calculateAge();
johnAthlete5.wonMedal();

// ES6

class Person6 {

    constructor (name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    calculateAge() {
        let age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
    }
}

class Athlete6 extends Person6 {
    constructor(name, yearOfBirth, job, olympicGames, medals) {
        super(name, yearOfBirth, job);
        this.olympicGames = olympicGames;
        this.medals = medals;
    }

    wonMedal() {
        this.medals++;
        console.log(this.medals);
    }
}

const johnAthlete6 = new Athlete6('John', 1990, 'swimmer', 3, 10);

johnAthlete6.calculateAge();
johnAthlete6.wonMedal();

*/

/////////////////////////////////
// Lecture 117 - Coding challenge

///// Instructions /////
/* 
Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (formula: number of trees / park area)
2. Average age of each town's park (formula: sum of all ages / number of parks)
3. The name of the park that has more that 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.
*/

class TownElement {
    constructor(name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }

    calculateAge() {
        return new Date().getFullYear() - this.buildYear;
    }
}

class Park extends TownElement {
    constructor(name, buildYear, numTrees, area) {
        super(name, buildYear);
        this.numTrees = numTrees;
        this.area = area;
    }

    treeDensity() {
        return (this.numTrees/this.area).toFixed(2);
    }
}
    
class Street extends TownElement {
    constructor(name, buildYear, length, classification = 'normal') {
        super(name, buildYear);
        this.length = length;
        this.classification = classification;
    }
}

const street1 = new Street('Streatham High Road', 1739, 1023, 'huge');
const street2 = new Street('Babingdon Road', 1785, 323);
const street3 = new Street('Park Avenue', 1743, 28, 'tiny');
const street4 = new Street('Leigham Court Road', 1733, 423, 'big');

const park1 = new Park('Streatham Common', 1623, 432, 4);
const park2 = new Park('Tooting Common', 1593, 2329, 7);
const park3 = new Park('Clapham Common', 1777, 892, 2.8);

const streets = new Map();
streets.set(1, street1);
streets.set(2, street2);
streets.set(3, street3);
streets.set(4, street4);

const parks = new Map();
parks.set(1, park1);
parks.set(2, park2);
parks.set(3, park3);

//1. Tree density of each park in the town (formula: number of trees / park area)
parks.forEach((value, key) => console.log(`The tree density of park ${key}: ${value.name} is ${value.treeDensity()} trees per square km.`));
//2. Average age of each town's park (formula: sum of all ages / number of parks)
const parkAges = [];
parks.forEach(value => parkAges.push(value.calculateAge()));
const avAge = (parkAges.reduce((prev, cur) => prev + cur)/parkAges.length).toFixed(2); 
console.log(`The average age of the parks is ${avAge} years.`);
//3. The name of the park that has more that 1000 trees
function over1000(parks) {
    parks.forEach(cur => cur.numTrees >= 1000 ? console.log(`${cur.name} has ${cur.numTrees} trees which is a lot of trees!`): null);
}
over1000(parks);
//4. Total and average length of the town's streets
const lengths = [];
streets.forEach(cur => lengths.push(cur.length));
const total = lengths.reduce((prev, cur) => prev + cur);
const avLen = (total/streets.size).toFixed(2);
console.log(`The total length of the town's streets is ${total}m and the average length is ${avLen}m.`);

//5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

streets.forEach((value, key) => console.log(`Street number ${key} is called ${value.name} and is classified ${value.classification}`));