
const submitButton = document.querySelector('button');

const day = document.getElementById('day');
const month = document.getElementById('month');
const year = document.getElementById('year');

const outputDay = document.getElementById('output-day');
const outputMonth = document.getElementById('output-month');
const outputYear = document.getElementById('output-year');



submitButton.addEventListener('click', function(event) {

    console.log("gotClicked")
    event.preventDefault();
   
    var state = true;
    const date = new Date();
    const daysInMonth = new Date(year.value, month.value, 0)
    const userInputDate = new Date(year.value, month.value-1, day.value);
    
    
    
// Handling Error


//DAY
if (day.value == "") {
    handleError(day, "This field is required");
    state = false;
} else if (day.value > 31 || day.value < 1) {
    handleError(day, "Must be a valid day");
    state = false;

}  else if (day.value > daysInMonth.getDate()){
    handleError(day, "Must be a valid date");
    state = false;
}

else {
    removeError(day);
};


//MONTH
if (month.value == "") {
    handleError(month, "This field is required");
    state = false;
} else if (month.value > 12 || month.value < 1) {
    handleError(month, "Must be a valid month");
    state = false;
} else {
    removeError(month);
};

//YEAR
if (year.value == "") {
    handleError(year, "This field is required");
    state = false;
} else if (userInputDate.getTime() > date.getTime()) {
    handleError(year, "Must be in the past");
    state = false;
} 
else if (year.value < 1000) {
    handleError(year, "Must be a valid year");
    state = false
}

else {
    removeError(year);
};


//CALCULATING...
if (state) {
    var years = date.getFullYear() - userInputDate.getFullYear()
    var months = date.getMonth() - userInputDate.getMonth();
    var days = date.getDate() - userInputDate.getDate();
    const daysInPreviousMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate(); // Checking the days in previous month
    const daysAfterThePreviousMonth = new Date(date.getFullYear(), date.getMonth()-1, 0).getDate(); 
    if (days < 0) { // If days are negative 
        months--;
        days += daysInPreviousMonth;
        if (days < 0) {
            months--;
            days +=daysAfterThePreviousMonth;
         }
    } if (months < 0) { // If months are negative 
        years--;
        months += 12;
    }

    display(years, months, days);
}

});

//Display
function display(years, months, days) {
    var y = 0;
    var m = 0;
    var d = 0;

    const interval = setInterval( function() {
        if (y <= years) {
            outputYear.innerText = y;
            y++;
        }
        if (m <= months) {
            outputMonth.innerText = m;
            m++;
        }
        
        if (d <= days) {
            outputDay.innerText = d;
            d++;
        }

        if((y==years) && (m==months) && (d==days)) {
            clearInterval(interval)
        }

    }, 35);
};


function handleError(errorElement, errorMessage) {
    const dateElement = errorElement.parentElement;
    dateElement.classList.add('error');
    dateElement.querySelector('p').innerText = errorMessage;

};

function removeError(errorElement) {
    const dateElement = errorElement.parentElement;
    dateElement.classList.remove('error');
    dateElement.querySelector('p').innerText = "";

};
