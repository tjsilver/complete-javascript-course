// BUDGET CONTROLLER - this is a standalone module 
let budgetController = (function() { // IIFE

   //some code

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

    let DOM = UICtrl.getDOMstrings(); // now have DOMstrings from UI controller

    let ctrlAddItem = function() {

        // 1. Get field input data

        let input = UICtrl.getInput();
        console.log(input);

        // 2. Add the item to the budget controller

        // 3. Add the new item to the UI

        // 4. Calculate the budget

        // 5. Display the bugdet on the UI

    }

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event) {
        // event listener can receive an event argument - 'event' - automatically passed in by browser

        if (event.keyCode === 13 || event.which === 13) {
            //event.which is used in older browsers
            ctrlAddItem();
        }



    })

})(budgetController, UIController);