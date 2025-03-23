const toppingsFieldset = document.getElementById('toppings');
const toppings = Array.from(toppingsFieldset.getElementsByTagName('input'));


const sauceTypeElem = document.getElementById('sauceType');
const toppingsElem = document.querySelectorAll('.toppings');
const pizzaSizeElem = document.getElementById('pizzaSize');
const pizzaShapeElem = document.getElementById('pizzaShape');
const sauceAmountElem = document.getElementById('sauceAmount');
const cheeseAmountElem = document.getElementById('cheeseAmount');

const sauceAmountDisplayElem = document.getElementById('sauceAmountDisplay');
const cheeseAmountDisplayElem = document.getElementById('cheeseAmountDisplay');

const studentId = document.getElementById('studentId');

const orderSummary = document.getElementById('orderSummary');
const pizzaImage = document.getElementById('pizzaImage');
const orderButton = document.getElementById('order');

orderButton.addEventListener('click', function(event) {
    event.preventDefault();
    let newPizza = getPizza();
    console.log(newPizza.pizzaSummary());
    orderSummary.textContent = newPizza.pizzaSummary();
    GeneratePizzaImage(newPizza);
});

studentId.addEventListener('click', function() {
    studentId.textContent = 'Student ID: 1284787';
});

sauceAmountElem.addEventListener('change', function() 
{
    let sauceAmount = sauceAmountElem.value;
    
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


toppingsFieldset.addEventListener('change', function() {

    let numOfToppings = 0;
    toppings.forEach(topping => 
    {
        if (topping.checked) {
            numOfToppings++;
        }
    });
    
    if(numOfToppings >= 3) {
    
        toppings.forEach(topping => {
            if(!topping.checked) {
                topping.disabled = true;
            }
        });
    }
    else {
        toppings.forEach(topping => {
            topping.disabled = false;
        });
    }
        
});


function getPizza()
{

    let sauceType = sauceTypeElem.value;
    let size = pizzaSizeElem.value;
    let shape = pizzaShapeElem.value;
    let sauceAmount = sauceAmountElem.value;
    let cheeseAmount = cheeseAmountElem.value;

    let toppings = [];
    toppingsElem.forEach(topping => {
        if(topping.checked) {
            toppings.push(topping.value);
        }
    });

    let pizza1 = new pizza(sauceType, toppings, size, shape, sauceAmount, cheeseAmount);
    return pizza1;
}


class pizza {

    sauceType;
    toppings;
    size;
    shape;
    sauceAmount;
    cheeseAmount;

    constructor(sauceType, toppings, size, shape, sauceAmount, cheeseAmount) {
        this.sauceType = sauceType;
        this.toppings = toppings;
        this.size = size;
        this.shape = shape;
        this.sauceAmount = sauceAmount;
        this.cheeseAmount = cheeseAmount;
    }

    pizzaSummary()
    {
        let summary = `Thank you for your order!`;
        summary += ` You ordered a ${this.size} ${this.shape} pizza with ${this.getSauceAmount()} ${this.sauceType} sauce and ${this.getCheeseAmount()} cheese.`;
        summary += ` You also added ${this.toppings.length} toppings which `;
        
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
        return summary;
    }

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


function GeneratePizzaImage(pizza)
{
    pizzaImage.innerHTML = '';
    let pizzaBase = document.createElement('div');
    pizzaBase.classList.add('crust');

    let pizzaSauce = document.createElement('div');
    pizzaSauce.classList.add('sauce');
    
    let pizzaCheese = document.createElement('div');
    pizzaCheese.classList.add('cheese');
    pizzaSauce.appendChild(pizzaCheese);
    pizzaBase.appendChild(pizzaSauce);

    // sauceAmount;
    // sauceType;
    if(pizza.sauceType == 'bbq')
    {
        pizzaSauce.style.backgroundColor = '#9d622f';
    }
    // cheeseAmount;
    // toppings;
    // size;
    switch(pizza.size)
    {
        case 'small':
            pizzaBase.style.width = '200px';
            pizzaBase.style.height = '200px';
            break;
        case 'medium':
            pizzaBase.style.width = '300px';
            pizzaBase.style.height = '300px';
            break;
        case 'large':
            pizzaBase.style.width = '400px';
            pizzaBase.style.height = '400px';
            break;
    }
    // shape;

    if(pizza.shape == 'square')
    {
        pizzaBase.style.borderRadius = '5%';
        pizzaSauce.style.borderRadius = '5%';
        pizzaCheese.style.borderRadius = '5%';
    }


    pizza.toppings.forEach(topping => {

        let toppingsCount = Math.floor(Math.random() * 10) + 5;
        for(let i = 0; i < toppingsCount; i++)
        {
            let toppingDiv = document.createElement('div');
            toppingDiv.classList.add('topping');
            let deviationNum = pizza.shape == 'circle' ? 70 : 90;
            toppingDiv.style.top = `${Math.floor(Math.random() * deviationNum)-(deviationNum/2)+40}%`;
            toppingDiv.style.left = `${Math.floor(Math.random() * deviationNum)-(deviationNum/2)+40}%`;
            toppingDiv.style.transform = `rotate(${Math.floor(Math.random() * 360)}deg)`;
            toppingDiv.style.backgroundImage = `url('images/${topping}.png')`;

            pizzaCheese.appendChild(toppingDiv);
        }
    });

    pizzaSauce.style.height = ((parseInt(pizza.sauceAmount) + 85) + '%');
    pizzaSauce.style.width = ((parseInt(pizza.sauceAmount) + 85) + '%');

    pizzaSauce.style.top = ((15 - parseInt(pizza.sauceAmount))/2 + '%');
    pizzaSauce.style.left = ((15 - parseInt(pizza.sauceAmount))/2 + '%');

    pizzaCheese.style.height = ((parseInt(pizza.cheeseAmount) + 85) + '%');
    pizzaCheese.style.width = ((parseInt(pizza.cheeseAmount) + 85) + '%');

    pizzaCheese.style.top = ((15 - parseInt(pizza.cheeseAmount))/2 + '%');
    pizzaCheese.style.left = ((15 - parseInt(pizza.cheeseAmount))/2 + '%');




    pizzaImage.appendChild(pizzaBase);


}