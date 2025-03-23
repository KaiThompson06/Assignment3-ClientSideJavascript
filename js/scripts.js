const toppingsFieldset = document.getElementById('toppings');
const toppings = Array.from(toppingsFieldset.getElementsByTagName('input'));


const sauceTypeElem = document.getElementById('sauceType');
const toppingsElem = document.querySelectorAll('.toppings');
const pizzaSizeElem = document.getElementById('pizzaSize');
const pizzaShapeElem = document.getElementById('pizzaShape');

const studentId = document.getElementById('studentId');

const orderSummary = document.getElementById('orderSummary');
const pizzaImage = document.getElementById('pizzaImage');
const orderButton = document.getElementById('order');
orderButton.addEventListener('click', function(event) {
    event.preventDefault();
    let newPizza = getPizza();
    console.log(newPizza.pizzaSummary());
    GeneratePizzaImage(newPizza);
});

studentId.addEventListener('click', function() {
    studentId.textContent = 'Student ID: 1284787';
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

    let toppings = [];
    toppingsElem.forEach(topping => {
        if(topping.checked) {
            toppings.push(topping.value);
        }
    });

    let pizza1 = new pizza(sauceType, toppings, size, shape);
    return pizza1;
}


class pizza {

    sauceType;
    toppings;
    size;
    shape;
    constructor(sauceType, toppings, size, shape) {
        this.sauceType = sauceType;
        this.toppings = toppings;
        this.size = size;
        this.shape = shape;
    }

    pizzaSummary()
    {
        let summary = `Pizza Summary\n`;
        summary += `Sauce Type: ${this.sauceType}\n`;
        summary += `Toppings:\n`;
        this.toppings.forEach(topping => {
            summary += `Toppings: ${topping}\n`;
        });
        summary += `Size: ${this.size}\n`;
        summary += `Shape: ${this.shape}\n`;
        return summary;
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


    pizzaImage.appendChild(pizzaBase);


}