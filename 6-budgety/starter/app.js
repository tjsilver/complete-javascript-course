// BUDGET CONTROLLER - this is a standalone module 
let budgetController = (function() { // IIFE

    // function constructor starts with capital letter
    let Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    let Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    let allExpenses = [];
    let allIncomes = [];
    let totalExpenses = 0;

    let data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    // public methods
    return {
        addItem: function(type, des, val) {
            let newItem, ID;

            // Explanation of creating new ID:
            // [1 2 3 4 5], next ID = 6
            // [1 2 4 6 8], next ID = 9
            // ID = last ID + 1

            // Create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
        

            // Create new item based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            // Push it into our data structure
            data.allItems[type].push(newItem);

            // Return the new element
            return newItem;            
        }, 

        testing: function() {
            console.log(data);
        }
    };

})();


// UI CONTROLLER - this is also a standalone module - 'separation of concerns'
let UIController = (function() {

    let DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    }

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },

        getDOMstrings: function() {
            return DOMstrings;
        }
    };

})();

// GLOBAL APP CONTROLLER - yet another standalone module
let controller = (function(budgetCtrl, UICtrl) {
    // pass information to controller about other two modules
    // could just use the modules in here but bad practice

    let setupEventListeners = function() {
        let DOM = UICtrl.getDOMstrings(); // now have DOMstrings from UI controller
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event) {
            // event listener can receive an event argument - 'event' - automatically passed in by browser    
            if (event.keyCode === 13 || event.which === 13) {
                //event.which is used in older browsers
                ctrlAddItem();
            }
        });
    };

    let ctrlAddItem = function() {
        let input, newItem;
        // 1. Get field input data

        input = UICtrl.getInput();
        console.log(input);

        // 2. Add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        // 3. Add the new item to the UI

        // 4. Calculate the budget

        // 5. Display the bugdet on the UI

    };

    return {
        init: function() {
            console.log('Application has started.');
            setupEventListeners();
        }
    }

    
})(budgetController, UIController);

// only line of code that will be placed outside the modules
controller.init();