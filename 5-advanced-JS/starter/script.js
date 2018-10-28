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
*/

/////////////////////////////
// CODING CHALLENGE


/*
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)
 
2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).
function checkQuestion(questionObj, ans) {
    return ans === questionObj.correctAnswer;
}

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).
*/

// first answers here

//Immediately Invoked Function Expression (IIFE) gives privacy to code (point 7 above). Creates a new scope for all the functions. Prevents code being overriden in future by someone else writing variable with same name. That is the main goal of using an IIFE. IIFE also known as self-executing anonymous function.
/*
(function() {
    function Question(question, answers, correctAnswer) {
        this.question = question;
        this.answers = answers;
        this.correctAnswer = parseInt(correctAnswer);
        this.instruction = 'Choose your answer:';
    }
    
    Question.prototype.printQuestion = function () {
        console.log(this.question);
        console.log(this.instruction);
        for (let i=0; i<this.answers.length; i++) {
            console.log(i + ": " + this.answers[i]);
        } 
    }
    
    Question.prototype.checkAnswer = function(ans) {
        if (ans === this.correctAnswer) {
            console.log('Correct!');
            return true;
        } else {
            console.log('Wrong answer!');
            return false;
        }
    }

    let q1 = new Question(
        'What food do cats like best?',
        ['meat biscuits', 'apples', 'carrots'],
    0);
    let q2 = new Question(
        'What is Javascript?',
        ['a cheese', 'a framework', 'a programming language used on the web', 'an elephant\'s nose'],
    2);
    let q3 = new Question(
        'What sound do cats make?',
        ['woof!', 'miaow'],
    1);
    
    let q4 = new Question(
        'How noisy is Streatham?',
        ['deathly quiet', 'a few background noises', 'I can\'t hear myself think'],
    2);
    
    let questionArray = [q1, q2, q3, q4];
    
    let rand = Math.floor(Math.random() * (questionArray.length));

    questionArray[rand].printQuestion();
    
    let answer = parseInt(prompt('Please select the correct answer.'));
    
    questionArray[rand].checkAnswer(answer);
    
    
})();
*/

/*
--- Expert level ---

8. After you display the result, display the next random question, so that the game never ends (Hint: write a function for this and call it right after displaying the result)

9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' instead of the answer. In this case, DON'T call the function from task 8.

10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).

11. Display the score in the console. Use yet another method for this.
*/
(function() {
    function Question(question, answers, correctAnswer) {
        this.question = question;
        this.answers = answers;
        this.correctAnswer = parseInt(correctAnswer);
        this.instruction = 'Choose your answer:';
    }
    
    Question.prototype.printQuestion = function () {
        console.log(this.question);
        console.log(this.instruction);
        for (let i=0; i<this.answers.length; i++) {
            console.log(i + ": " + this.answers[i]);
        } 
    }
    
    Question.prototype.checkAnswer = function(ans, callback) {
        let sc;
        if (ans === this.correctAnswer) {
            console.log('Correct!');
            sc = callback(true);
        } else {
            console.log('Wrong answer!');
            sc = callback(false);
        }
        this.displayScore(sc);
    }    

    Question.prototype.displayScore = function(score) {
        console.log('Your current score is: ' + score);
        console.log('----------------------');

    }
    
    let q1 = new Question(
        'What food do cats like best?',
        ['meat biscuits', 'apples', 'carrots'],
    0);
    let q2 = new Question(
        'What is Javascript?',
        ['a cheese', 'a framework', 'a programming language used on the web', 'an elephant\'s nose'],
    2);
    let q3 = new Question(
        'What sound do cats make?',
        ['woof!', 'miaow'],
    1);
    
    let q4 = new Question(
        'How noisy is Streatham?',
        ['deathly quiet', 'a few background noises', 'I can\'t hear myself think'],
    2);
    
    let questionArray = [q1, q2, q3, q4];

    function score() {
        let sc = 0;
        return function(correct) {
            if (correct) {
                sc++;
            }
            return sc;
        }
    }

    let keepScore = score();

    function nextQuestion() {
    
        let rand = Math.floor(Math.random() * (questionArray.length));
    
        questionArray[rand].printQuestion();
        
        let answer = prompt('Please select the correct answer or type \'exit\' into the box.');
                
        if (answer !== 'exit') {
            questionArray[rand].checkAnswer(parseInt(answer), keepScore);
            nextQuestion();
        }
    }
    
    nextQuestion();
    
})();
