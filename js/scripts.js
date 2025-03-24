
// constant to hold all of the elements on the page

// get the container of the toppings checkboxes
const toppingsFieldset = document.getElementById('toppings');
// use that to get the individual checkboxes and store them in an array
const toppings = Array.from(toppingsFieldset.getElementsByTagName('input'));

// get all of the other inputs from the page
const sauceTypeElem = document.getElementById('sauceType');
const pizzaSizeElem = document.getElementById('pizzaSize');
const pizzaShapeElem = document.getElementById('pizzaShape');
const sauceAmountElem = document.getElementById('sauceAmount');
const cheeseAmountElem = document.getElementById('cheeseAmount');

// get the display elements for the sauce and cheese amounts
const sauceAmountDisplayElem = document.getElementById('sauceAmountDisplay');
const cheeseAmountDisplayElem = document.getElementById('cheeseAmountDisplay');
// student id display element
const studentId = document.getElementById('studentId');
// other elements needed for output and ordering
const orderSummary = document.getElementById('orderSummary');
const pizzaImage = document.getElementById('pizzaImage');
const orderButton = document.getElementById('order');

// add an event listener to the order button
orderButton.addEventListener('click', function(event) 
{
    // buttons with the type submit refresh the page by default, preventing anything we do from showing up
    // this prevents that default behavior
    event.preventDefault();
    // get a new pizza object
    let newPizza = getPizza();
    // log the pizza object to the console
    console.log(newPizza.pizzaSummary());
    // set the order summary text to the pizza object's summary
    orderSummary.textContent = newPizza.pizzaSummary();
    // call the function to generate the pizza image
    GeneratePizzaImage(newPizza);
});

// Simple event listener to change the student ID when clicked
studentId.addEventListener('click', function() {
    studentId.textContent = 'Student ID: 1284787';
});
// event listeners for the sauce and cheese amount sliders

sauceAmountElem.addEventListener('change', function() 
{
    // get the value of the slider
    let sauceAmount = sauceAmountElem.value;
    // set the text of the display element based on the value of the slider
    if(sauceAmount <= 3) {
        sauceAmountDisplayElem.textContent = 'Light (' + sauceAmount + ')';
    }
    else if(sauceAmount <= 7) {
        sauceAmountDisplayElem.textContent = 'Normal (' + sauceAmount + ')';
    }
    else if(sauceAmount <= 10) {
        sauceAmountDisplayElem.textContent = 'Extra (' + sauceAmount + ')';
    }
    
});
// same fore cheese amount
cheeseAmountElem.addEventListener('change', function()
{
    let cheeseAmount = cheeseAmountElem.value;
    
    if(cheeseAmount <= 3) {
        cheeseAmountDisplayElem.textContent = 'Light (' + cheeseAmount + ')';
    }
    else if(cheeseAmount <= 7) {
        cheeseAmountDisplayElem.textContent = 'Normal (' + cheeseAmount + ')';
    }
    else if(cheeseAmount <= 10) {
        cheeseAmountDisplayElem.textContent = 'Extra (' + cheeseAmount + ')';
    }
    
});

// add a listener to the toppings fieldset to disable toppings if 3 are selected
toppingsFieldset.addEventListener('change', function() {
    // track number of selection toppings
    let numOfToppings = 0;
    // loop through the toppings and count how many are selected
    toppings.forEach(topping => 
    {
        if (topping.checked) {
            numOfToppings++;
        }
    });
    // Then if 3 or more are selected, disable the rest
    if(numOfToppings >= 3) {
    
        toppings.forEach(topping => {
            // if unchecked, disable the topping
            if(!topping.checked) {
                topping.disabled = true;
            }
        });
    }
    // otherwise, enable all toppings
    else {
        toppings.forEach(topping => {
            topping.disabled = false;
        });
    }
        
});

// this function grabs the values from the form and creates a new pizza object
function getPizza()
{

    // get values
    let sauceType = sauceTypeElem.value;
    let size = pizzaSizeElem.value;
    let shape = pizzaShapeElem.value;
    let sauceAmount = sauceAmountElem.value;
    let cheeseAmount = cheeseAmountElem.value;
    // create a toppings array and loop through the toppings checkboxes to see which are checked
    let toppingsArr = [];
    toppings.forEach(topping => {
        // if checked, add the value to the toppings array
        if(topping.checked) {
            toppingsArr.push(topping.value);
        }
    });
    // create a new pizza object with the values
    let pizza1 = new pizza(sauceType, toppingsArr, size, shape, sauceAmount, cheeseAmount);
    // return the pizza object
    return pizza1;
}

// the pizza class
class pizza {

    // propertie delcarations
    sauceType;
    toppings;
    size;
    shape;
    sauceAmount;
    cheeseAmount;

    // simple constructor to set the properties
    constructor(sauceType, toppings, size, shape, sauceAmount, cheeseAmount) {
        this.sauceType = sauceType;
        this.toppings = toppings;
        this.size = size;
        this.shape = shape;
        this.sauceAmount = sauceAmount;
        this.cheeseAmount = cheeseAmount;
    }

    // method to return a summary of the pizza
    pizzaSummary()
    {
        // create a summary string and add the summary
        let summary = `Thank you for your order!`;
        summary += ` You ordered a ${this.size} ${this.shape} pizza with ${this.getSauceAmount()} ${this.sauceType} sauce and ${this.getCheeseAmount()} cheese.`;
        summary += ` You also added ${this.toppings.length} toppings which `;
        // based on number to toppings add different text, loop and add if more than 1
        if(this.toppings.length == 1)
        {
            summary += 'was ' + this.toppings[0] + '.';
            return summary;
        }
        else {
            summary += 'were ';
        }
        for(let i = 0; i < this.toppings.length; i++)
        {
            if(i == this.toppings.length - 1)
            {
                summary += `and ${this.toppings[i]}.`;
            }
            else
            {
                summary += `${this.toppings[i]}, `;
            }
        }
        // return the summary
        return summary;
    }
    // function to get to get a string based on the sauce amount, used by the summary method
    getSauceAmount()
    {
        if(this.sauceAmount <= 3) {
            return 'Light';
        }
        else if(this.sauceAmount <= 7) {
            return 'Normal';
        }
        else if(this.sauceAmount <= 10) {
            return 'Extra';
        }
    }
    // same for cheese amount
    getCheeseAmount()
    {
        if(this.cheeseAmount <= 3) {
            return 'Light';
        }
        else if(this.cheeseAmount <= 7) {
            return 'Normal';
        }
        else if(this.cheeseAmount <= 10) {
            return 'Extra';
        }
    }

}

// function to generate the pizza image based on the pizza object
function GeneratePizzaImage(pizza)
{
    // clear the pizza image div
    pizzaImage.innerHTML = '';
    // create the pizza base, sauce, and cheese divs, and add the relevant classes
    let pizzaBase = document.createElement('div');
    pizzaBase.classList.add('crust');

    let pizzaSauce = document.createElement('div');
    pizzaSauce.classList.add('sauce');
    
    let pizzaCheese = document.createElement('div');
    pizzaCheese.classList.add('cheese');
    // then append the sauce and cheese to the base
    pizzaSauce.appendChild(pizzaCheese);
    pizzaBase.appendChild(pizzaSauce);

    // based on the selected values, change the pizza accordingly

    // based on the sauce type, change the color of the sauce
    if(pizza.sauceType == 'bbq')
    {
        pizzaSauce.style.backgroundColor = '#9d622f';
    }
    
    // based on the size, change the size of the pizza
    switch(pizza.size)
    {
        // if small, set the width and height to 200px
        case 'small':
            pizzaBase.style.width = '200px';
            pizzaBase.style.height = '200px';
            break;
        // if medium, set the width and height to 300px
        case 'medium':
            pizzaBase.style.width = '300px';
            pizzaBase.style.height = '300px';
            break;
        // if large, set the width and height to 400px
        case 'large':
            pizzaBase.style.width = '400px';
            pizzaBase.style.height = '400px';
            break;
    }
    
    // the default is a circle, so we only need to change the border radius if it's a square
    // if square, set the border radius to 5% (instead of 50% for a circle)
    if(pizza.shape == 'square')
    {
        pizzaBase.style.borderRadius = '5%';
        pizzaSauce.style.borderRadius = '5%';
        pizzaCheese.style.borderRadius = '5%';
    }


    // loop through the toppings and add them to the pizza
    pizza.toppings.forEach(topping => {
        // get a random number of toppings between 5 and 15
        let toppingsCount = Math.floor(Math.random() * 10) + 5;
        // loop through the number of toppings and create a div for each
        for(let i = 0; i < toppingsCount; i++)
        {
            let toppingDiv = document.createElement('div');
            // add topping class
            toppingDiv.classList.add('topping');
            // if the pizza is a circle, set the deviation number to 70, otherwise 80
            // this allows less deviation for a circle pizza, so it won't go off the edge
            let deviationNum = pizza.shape == 'circle' ? 70 : 80;
            // this math just gets a random number between 0 and the deviation number, then subtracts half of the deviation number and adds 40(which is what looked like the center of the pizza)
            // so basically it will get a random number from 5% to 75% for a circle, or 0% to 80% for a square
            toppingDiv.style.top = `${Math.floor(Math.random() * deviationNum)-(deviationNum/2)+40}%`;
            toppingDiv.style.left = `${Math.floor(Math.random() * deviationNum)-(deviationNum/2)+40}%`;
            // rotate the topping randomly between 0 and 360 degrees
            toppingDiv.style.transform = `rotate(${Math.floor(Math.random() * 360)}deg)`;
            // set the background image of the topping div to the image of the topping
            toppingDiv.style.backgroundImage = `url('images/${topping}.png')`;
            // append the topping div to the cheese div
            pizzaCheese.appendChild(toppingDiv);
        }
    });

    // set the size of the sauce and cheese divs based on the sauce and cheese amount
    // more sauce and cheese will be a larger div, less will be smaller
    // since the input takes a number from 1 - 10, with 5 being normal, we can just add 85% to the number to get a percentage (86% - 95%)
    pizzaSauce.style.height = ((parseInt(pizza.sauceAmount) + 85) + '%');
    pizzaSauce.style.width = ((parseInt(pizza.sauceAmount) + 85) + '%');

    // adjust the centering of to account for the size of the div
    pizzaSauce.style.top = ((15 - parseInt(pizza.sauceAmount))/2 + '%');
    pizzaSauce.style.left = ((15 - parseInt(pizza.sauceAmount))/2 + '%');

    // do the same for the cheese
    pizzaCheese.style.height = ((parseInt(pizza.cheeseAmount) + 85) + '%');
    pizzaCheese.style.width = ((parseInt(pizza.cheeseAmount) + 85) + '%');

    pizzaCheese.style.top = ((15 - parseInt(pizza.cheeseAmount))/2 + '%');
    pizzaCheese.style.left = ((15 - parseInt(pizza.cheeseAmount))/2 + '%');



    // finally, append the base to the pizza image div to display it

    pizzaImage.appendChild(pizzaBase);


}