///////////////////////////////////////
// Lecture: Hoisting
/*
// functions
calculateAge(1990);

function calculateAge(year) {
  console.log(2018-year);
}


// this is a function expression and hoisting doesn't work on this.
var retirement = function(year) {
  console.log(65-(2018-year));
}

retirement(1965);

// variables

console.log(age);
var age = 23;
console.log(age);

function foo() {
  console.log(age);
  var age = 63;
  console.log(age);
}
foo();
console.log(age);
*/

///////////////////////////////////////
// Lecture: Scoping


// First scoping example

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}
*/



// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d);
}
*/



///////////////////////////////////////
// Lecture: The this keyword
/*
console.log(this);

calculateAge(1985);
function calculateAge(year) {
  console.log(2018-year);
  console.log(this);
}
*/
var jane = {
  name: 'Jane',
  yearOfBirth: 1990,
  calculateAge: function() {
    console.log(this); // will be jane object
    console.log(2018-this.yearOfBirth);
    /*
    function innerFunction() {
      console.log(this); // will be Window object
    }
    innerFunction();
    */
  }
}

jane.calculateAge();


var michaela = {
  name: 'Miki',
  yearOfBirth: 1984
}
// variable borrowing (this becomes michaela object)
michaela.calculateAge = jane.calculateAge;
michaela.calculateAge();
