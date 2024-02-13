document.addEventListener("DOMContentLoaded", function () {
    const accordions = document.querySelectorAll(".accordion");

    accordions.forEach(function (accordion) {
        accordion.addEventListener("click", function () {
            const panel = this.nextElementSibling;
            this.classList.toggle("active");
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    });

    const inneraccordions = document.querySelectorAll(".inner-accordion");

    inneraccordions.forEach(function (inneraccordion) {
        inneraccordion.addEventListener("click", function (event) {
            event.stopPropagation(); // Prevent the click event from propagating
            const outerPanel = this.closest('.food-description').querySelector('.panel');
            const panel = this.nextElementSibling;
            this.classList.toggle("active");
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
                outerPanel.style.maxHeight = outerPanel.scrollHeight + "px"; // Adjust outer panel height
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
                outerPanel.style.maxHeight = (outerPanel.scrollHeight + panel.scrollHeight) + "px"; // Adjust outer panel height
            }
        });
    });

    const addToMealPlanButtons = document.querySelectorAll(".add-to-meal-plan");

    addToMealPlanButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            const priceString = this.dataset.price; // Get the price as a string from the data-price attribute
            const price = parseFloat(priceString); // Convert the price string to a floating-point number
            const dishName = this.parentElement.querySelector("li").textContent;
            
            // Add the dish to the meal plan
            addToMealPlan(dishName, price);
        });
    });

    // Function to add the dish to the meal plan and update the total cost
    function addToMealPlan(dishName, price) {
        const mealPlan = document.querySelector(".meal-plan");
        const totalCostElement = document.querySelector(".total-cost h5");

        // Create a new list item for the dish
        const newDish = document.createElement("li");
        newDish.textContent = dishName;
        
        // Create a remove button for the dish
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-from-meal-plan");
        newDish.appendChild(removeButton);

        // Append the dish to the meal plan
        mealPlan.appendChild(newDish);

        // Update the total cost
        let totalCost = parseFloat(totalCostElement.textContent.replace("Total Cost: $", ""));
        totalCost += price;
        totalCostElement.textContent = "Total Cost: $" + totalCost.toFixed(2); // Format the total cost to two decimal places

        // Check if totalCost is NaN
        if (isNaN(totalCost)) {
            totalCostElement.textContent = "Total Cost: $0.00";
        }
    }

    function removeFromMealPlan(dishElement) {
        const priceString = dishElement.dataset.price; // Get the price as a string from the data-price attribute
        const price = parseFloat(priceString); // Convert the price string to a floating-point number
        
        const totalCostElement = document.querySelector(".total-cost h5");
        let totalCost = parseFloat(totalCostElement.textContent.replace("Total Cost: $", ""));
        
        // Check if there are remaining instances of the removed item in the meal plan
        const remainingItems = Array.from(document.querySelectorAll(".meal-plan li"))
            .filter(item => item.textContent === dishElement.textContent);
    
        if (remainingItems.length === 1) { // If it's the last instance, set total cost to 0.00
            totalCost = 0.00;
        } else { // If there are remaining instances, subtract the price of the removed item
            totalCost -= price;
        }
    
        // Update the total cost
        totalCostElement.textContent = "Total Cost: $" + totalCost.toFixed(2); // Format the total cost to two decimal places
    
        // Check if totalCost is NaN
        if (isNaN(totalCost)) {
            totalCostElement.textContent = "Total Cost: $0.00";
        }
        
        // Remove the dish from the meal plan
        dishElement.remove();
    }
    

    // Add event listener to the meal plan to handle remove buttons
    const mealPlan = document.querySelector(".meal-plan");
    mealPlan.addEventListener("click", function (event) {
        const clickedElement = event.target;
        if (clickedElement.classList.contains("remove-from-meal-plan")) {
            const dishElement = clickedElement.parentElement;
            removeFromMealPlan(dishElement);
        }
    });
});
