document.addEventListener("DOMContentLoaded", function () {

    const fetchWeatherApp = async (address) => {
        const result1 = document.querySelector("#result-1");
        const result2 = document.querySelector("#result-2");
        const result3 = document.querySelector("#result-3");
        const error1 = document.querySelector("#error-1");

        result1.textContent = '';
        result2.textContent = '';
        result3.textContent = '';
        error1.textContent = '';


        try {
            const response = await fetch(`/weather?address=${address}`)
            const data = await response.json();
            if(data.error) {
                error1.textContent = `Error: ${data.error}`;
            } else {
                result1.textContent = `Search Term: ${data.address}`;
                result2.textContent = `Place Name: ${data.placeName}`;
                result3.textContent = `Description: ${data.description}`;
            }
        } catch (error) {
            error1.textContent = `Error: ${error}`;
        }
    }

    var formElement = document.querySelector('form')
    formElement.addEventListener('submit', (e) => {
        e.preventDefault();
        const address = e.currentTarget.elements[0].value;
        if (!address) {
           return console.warn('Please proivde the address');
        }
        e.currentTarget.reset();
        fetchWeatherApp(address);
    })
});

