/**********************************
* Variables and data types

console.log('Hello World!!!');

var firstName = 'John';
console.log(firstName);

var lastName = 'Smith';
var age = 28;

var fullAge = true;
console.log(fullAge);

var job;
console.log(job);

job = 'Teacher';
console.log(job);

// all variables must start with _ or $ or a letter
// can't use symbols within lastName
// can't use reserved JS keywords
var _3years = 3;
var $3years = 3;
var johnMark = 'John and Mark';*/


/*********************************
* Variable mutation and type coercion
*/

/*
var firstName = 'John';
var age = 28;

// Type coercion
console.log(firstName + ' ' + age); // this works because of type coercion - js automatically converted the number to a string

// other programming languages are not like this.

// declaring multiple variables in one line
var job, isMarried;
job = 'teacher';
isMarried = false;

console.log(firstName + ' is a ' + age + ' year old ' + job + '. Is he married? ' + isMarried);

// Variable mutation
age = 'twenty eight';
job = 'driver';

/* Popups - note that browser keeps loading until popup is closed.

alert(firstName + ' is a ' + age + ' year old ' + job + '. Is he married? ' + isMarried);

// prompts to get value for variable
var lastName = prompt('What is his last name?');
console.log(firstName + ' ' + lastName);
*/


/*******************************
* Basic operators
*

var year, yearJohn, yearMark
year = 2020;
var yearJohn = year - 28;
var yearMark = year - 33;
console.log(yearJohn, yearMark);

*/

/******************************
* If / else statements


var firstName = 'John';
var civilStatus = 'single';

if (civilStatus === 'married') {
  console.log(firstName + ' is married!');
} else {
  console.log(firstName + ' will hopefully marry soon :)');
}

var isMarried = false;

if(isMarried) {
  console.log(firstName + ' is married!');
} else {
  console.log(firstName + ' will hopefully marry soon :)');
}

*/

/******************************
* Boolean logic


firstName = 'John';
var age = 20;

if (age < 13) {
  console.log(firstName + ' is a boy.');
} else if (age >= 13 && age < 20) {
  console.log(firstName + ' is a teenager.');
} else if (age >=20 && age < 30) {
  console.log(firstName + ' is a young man.')
}
else {
  console.log(firstName + ' is a man.');
}
*/

/*******************************
* Ternary operator and switch statements
*

// Ternary operator
var firstName = 'John';
var age = 16;

age >= 18 ? console.log(firstName + ' drinks beer.') : console.log(firstName + ' drinks juice.');

var drink = age >= 18 ? 'beer' : 'juice';
console.log(drink);

// Switch statement
var job = 'teacher';
switch(job) {
    case 'teacher':
      console.log(firstName + ' teaches kids how to code.');
      break;
    case 'driver':
      console.log(firstName + ' drives an Uber in Lisbon.');
      break;
    default:
        console.log(firstName + ' does something else.');
}

switch(true) {
  case age < 13:
  console.log(firstName + ' is a boy.');
  break;
  case age > 13 && age < 20:
  console.log(firstName + ' is a teenager');
  break;
  case age >=20 && age < 30:
  console.log(firstName + ' is a young man');
  break;
  default:
  console.log(firstName + ' is a man.');
}

*/

/*****************************
* Truthy and Falsy values and equality operators


// falsy values: undefined, null, 0, '', NaN
// truthy values: NOT falsy values

var height = 0;
if (height || height === 0) {
  console.log('Variable is defined.');
} else {
  console.log('Variable has NOT been defined.')
}

// Equality operators
height = 23;
if (height == '23') {
  console.log('The == operator does type coercion!');
}


var scoreJohn = (89 + 120 + 103) / 3;
var scoreMike = (116 + 94 + 123) / 3;
var scoreMary = (97 + 134 + 105) / 3;
console.log(scoreJohn, scoreMike, scoreMary);

if (scoreJohn > scoreMike && scoreJohn > scoreMary) {
  console.log ('John\'s team wins with ' + scoreJohn + ' points');
} else if (scoreMike > scoreJohn && scoreMike > scoreMary) {
  console.log('Mike\'s team wins with ' + scoreMike + ' points.');
} else if (scoreMary > scoreJohn && scoreMary > scoreMike) {
  console.log('Mary\'s team wins with ' + scoreMary + ' points.');
} else {
  console.log('Draw.');
}
/*
if (scoreJohn > scoreMike) {
  console.log ('John\'s team wins with ' + scoreJohn + ' points');
} else if (scoreMike > scoreJohn) {
  console.log('Mike\'s team wins with ' + scoreMike + ' points.');
} else {
  console.log('There is a draw.');
}
*/

/**************************
* Functions


function calculateAge(birthYear) {
  return 2018 - birthYear;
}

var ageJohn = calculateAge(1990);
var ageMike = calculateAge(1948);
var ageJane = calculateAge(1969);

console.log(ageJohn, ageMike, ageJane);

function yearsUntilRetirement(birthYear, firstName) {
  var age = calculateAge(birthYear);
  var retirement = 65 - age;
  if (retirement > 0) {
      console.log(firstName  + ' retires in ' + retirement + ' years.');
  } else {
    console.log(firstName + ' is already retired.');
  }
  return false;
}

console.log(yearsUntilRetirement(1990, 'John'));
console.log(yearsUntilRetirement(1948, 'Mike'));
console.log(yearsUntilRetirement(1969, 'Jane'));

*/

/**************************
* Function statements and expressions
*

// Function declaration
// function whatDoYouDo(job, firstName) {}

// Function expression
var whatDoYouDo = function(job, firstName) {
  switch(job) {
    case 'teacher':
      return firstName + ' teaches kids how to code.';
    case 'driver':
      return firstName + ' drives a cab in Lisbon.';
    case 'designer':
      return firstName + ' designs beautiful websites.';
    default:
      return firstName + ' does something else.';
  }
}

console.log(whatDoYouDo('teacher', 'John'));
console.log(whatDoYouDo('driver', 'Mark'));
console.log(whatDoYouDo('designer', 'Jane'));

*/

/**************************
* Arrays
*

// Initialise new array
var names = ['John', 'Mary', 'Jane'];
var years = new Array(1990, 1969, 1948);

console.log(names[0]);
console.log(names.length);

// Mutate array data
names[1] = 'Beatrice';
console.log(names);
names[5] = 'Susan';
console.log(names);
names[names.length] = 'Cameron';
console.log(names);

// Different data types
var jane = ['Jane', 'Smith', 1990, 'teacher', false];
jane.push('blue');
console.log(jane);
jane.unshift('Mx');
jane.pop();
console.log(jane);
jane.shift();
console.log(jane);
console.log(jane.indexOf(1992));

var isDesigner = jane.indexOf('designer') === -1 ? 'Jane is NOT a designer' : 'Jane IS a designer';
console.log(isDesigner);
*/

/***********************
* Coding challenge 2
*

let bills = [124, 48, 268];

function tipCalc(bills) {
  tips = [];
  billTips = [];
  len = bills.length;

  for (let i = 0; i<len; i++) {
    let tip;
    let bill = bills[i];
    console.log('bill:', bill);
    switch(true) {
      case bill > 0 && bill < 50:
        tip = bill * 0.2;
        break;
      case bill >= 50 && bill <= 200:
        tip = bill * 0.15;
        break;
      case bill > 200:
        tip = bill * 0.1;
        break;
      default:
        tip = 0;
    }
    tips.push(tip);
    billTips.push(bill[i] + tip);
  }

  console.log('tips', tips);
  for (let i = 0; i<len; i++) {
    billTips[i] = bills[i] + tips[i];
  }
  console.log('billTips', billTips);
  return [tips, billTips];
}

console.log(tipCalc(bills));
*/

/***********************
* Objects and properties
*

var jane = {
  firstName: 'Jane',
  lastName: 'Smith',
  birthYear: 1990,
  family: ['John', 'Maru', 'Emily', 'Chala'],
  job: 'teacher',
  isMarried: false
};

console.log(jane);
console.log(jane['lastName']);
var x = 'birthYear';
console.log(jane[x]);
console.log(jane[x]);

jane.job = 'designer';
jane['isMarried'] = true;
console.log(jane);

var sarah = new Object();
sarah.name = 'Sarah';
sarah.birthYear = 1968;
sarah['lastName'] = 'Smith';
console.log(sarah);

/***********************
* Objects and methods
*

var jane = {
  firstName: 'Jane',
  lastName: 'Smith',
  birthYear: 1990,
  family: ['John', 'Maru', 'Emily', 'Chala'],
  job: 'teacher',
  isMarried: false,
  calcAge: function() {
    this.age = 2018 - this.birthYear;
  }
};


jane.calcAge();
console.log(jane);

/***********************
* Coding challenge 4
*

let mark = {
  fullName: 'Markela Durd',
  mass: 160,
  height: 1.3,
  calcBMI: function() {
    this.bmi = this.mass / this.height * this.height;
    return this.bmi;
  }
};

let john = {
  fullName: 'John Trumpting',
  mass: 280,
  height: 1.9,
  calcBMI: function() {
    this.bmi = this.mass / this.height * this.height;
    return this.bmi;
  }
};

let highest;
mark.calcBMI();
john.calcBMI();
console.log(mark.bmi, john.bmi);
if (mark.bmi === john.bmi) {
  console.log(mark.fullName + ' and ' + john.fullName + ' have the same BMI!');
} else {
  highest = mark.bmi > john.bmi ? mark : john;
  console.log(highest.fullName + ' has the highest BMI of ' + highest.bmi);
}


/***********************
* Loops and iteration
*/
