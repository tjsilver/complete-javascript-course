// function constructor
/*
var Person = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person.prototype.calculateAge = function() {
    console.log(2018-this.yearOfBirth);
}

Person.prototype.lastName = 'Smith';


// 1. 'new' operator causes a new, empty object to be created
// 2. the constructor function (in this case, Person) is called with the specified arguments
// 3. the 'this' variable of the function points to the new empty object
// if the constructor function doesn't return anything, then the result is the new empty object 
//     with the properties we defined


var john = new Person('John', 1990, 'teacher');
var jane = new Person('Jane', 1969, 'designer');
var mark = new Person('Mark', 1948, 'retired');

john.calculateAge();
jane.calculateAge();
mark.calculateAge();

// The calculateAge method is not in the constructor but we can still use it
// This is because it is in the *prototype property* of the function constructor
// More common to add methods than properties although can add properties to prototype
// property also.

console.log(john.lastName);
console.log(jane.lastName);
console.log(mark.lastName);
*/

// Object.create
/*
// first create object that will act as prototype

var personProto = {
    calculateAge: function() {
        console.log(2018 - this.yearOfBirth);
    }
};

var john = Object.create(personProto);

john.name = 'John';
john.yearOfBirth = 1990;
john.job = 'teacher';

var jane = Object.create(personProto, {
    name: { value: 'Jane'}, 
    yearOfBirth: {value: 1969 },
    job: { value: 'designer' }
});

// Object.create allows us to implement more complex inheritance structures than function constructor.
// But most popular is function constructor
*/

// Primitives vs Objects
/*
// primitives
var a = 23;
var b = a;
a = 46;
console.log(a);
console.log(b);
// each primititve variable holds own copy of the data

// objects
var obj1 = {
    name: 'John',
    age: 26
};
var obj2 = obj1;
obj1.age = 30;
console.log(obj1.age, obj2.age);

// functions
var age = 27;
var obj = {
    name: 'Jonas',
    city: 'Lisbon'
};
function change(a, b) {
    a = 30; // a simple copy is created - won't affect variable on outside
    b.city = 'San Francisco'; // ref to object is passed - so change reflected outside function
}
change(age, obj);
console.log(age, obj.city);
// can get unexpected results if not aware of this.
*/

///////////////////////////////////////////
// Lecture: Passsing functions as arguments
/*
var years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn) {
    var arrRes = [];
    for (var i=0; i<arr.length; i++) {
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

// callback functions
function calculateAge(el) {
    return 2018 - el;
}
function isFullAge(el) {
    return el >= 18;
}
function maxHeartRate(el) {
    if (el >= 18 && el <=81) {
        return Math.round(206.9 - (0.67 * el));
    }
    return -1;    
}
var ages = arrayCalc(years, calculateAge);
console.log(ages);

var fullAges = arrayCalc(ages, isFullAge);
console.log(fullAges);

var rates = arrayCalc(ages, maxHeartRate);
console.log(rates);
*/

////////////////////////////////////////
// Lecture: Functions returning functions
/*
function interviewQuestion(job) {
    if (job === 'designer') {
        return function(name) { // anonymous function
            console.log(name + ', can you please explain what UX design is?');
        }
    } else if (job === 'teacher') {
        return function(name) {
            console.log('What subject do you teach, ' + name + '?');
        }
    } else {
        return function(name) {
            console.log('hello ' + name + ' what do you do?');
        }
    }
}

var teacherQuestion = interviewQuestion('teacher');
teacherQuestion('John');

var designerQuestion = interviewQuestion('designer');
designerQuestion('Jane');
designerQuestion('Mark');

interviewQuestion('teacher')('Mariella');

interviewQuestion('artist')('TJ');
*/

////////////////////////////////////
// Lecture IIFE
/*
function game() {
    var score = Math.random() * 10;
    console.log(score >= 5);
}

game();

// better to use a IIFE - Immediately Invoked Function Expression

(function(goodLuck) {
    var score = Math.random() * 10;
    console.log(score >= 5 - goodLuck);
})(3);

(function () {
    console.log('hello I\'m an IIFE!');
})();
*/

//////////////////////////////////
// Lecture: Closures
/*
function retirement(retirementAge) {
    var a = ' years left until retirement.';
    return function(yearOfBirth) {
        var age = 2018 - yearOfBirth;
        console.log(retirementAge - age + a);
    };
}

var retirementUS = retirement(66);
retirementUS(1990);
var retirementGermany = retirement(65);
var retirementIceland = retirement(67);

retirementUS(1990);
retirementGermany(1990);
retirementIceland(1990);

// re-write of function above using closures.
function interviewQuestion(job) {
    return function(name) {
        if (job === 'teacher') {
            console.log('What subject do you teach, ' + name + '?');
        } else if (job === 'designer') {
            console.log(name + ', can you please explain what UX design is?');
        } else {
            console.log('hello ' + name + ' what do you do?');
        }
    }
}

interviewQuestion('designer')('TJ');
interviewQuestion('teacher')('DJ');
interviewQuestion('driver')('LJ');
*/

/////////////////////////////////
// Lecture: Bind, call and apply

var john = {
    name: 'John',
    age: 28,
    job: 'teacher',
    presentation: function(style, timeOfDay) {
        if (style === 'formal') {
            console.log('Good ' + timeOfDay + ' Ladies and Gentlemen! I\'m ' + this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old.');
        } else if (style === 'friendly') {
            console.log('Hey! What\'s up? I\'m ' + this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old. Have a nice ' + timeOfDay + '.');
        }
    }
};

john.presentation('formal', 'morning');

var emily = {
    name: 'Emily',
    age: 38,
    job: 'designer'
};

// method borrowing
john.presentation.call(emily, 'friendly', 'afternoon'); // allows you to set 'this' as first argument

//john.presentation.apply(emily, ['formal', 'evening']); // same as .call but accepts other arguments as an array - won't work in this case

// bind returns a function - it allows you to create a copy of a function but with preset argument(s)
var johnFriendly = john.presentation.bind(john, 'friendly'); // creates a copy 

johnFriendly('night');
johnFriendly('moonbeam');

var emilyFormal = john.presentation.bind(emily, 'formal');

emilyFormal('morning');
emilyFormal('day');

var years = [1990, 1965, 1937, 2005, 2000];

function arrayCalc(arr, fn) {
    var arrRes = [];
    for (var i=0; i<arr.length; i++) {
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

// callback functions
function calculateAge(el) {
    return 2018 - el;
}
function isFullAge(limit, el) {
    return el >= limit;
}

var ages = arrayCalc(years, calculateAge);
var fullJapan = arrayCalc(ages, isFullAge.bind(this, 20));
console.log(ages);
console.log(fullJapan);