class currentWeather extends HTMLElement {
    // Constructor method to initialize new objects
    constructor(data, city, weatherCode) {
        super();
        this.data = data;
        this.city = city;
        this.weatherCode = weatherCode;
        this.method1();
    }

    method1() {
        const wrapper = document.createElement('div');
        const top = document.createElement('div');
        const bottom = document.createElement('div');

        this.className = 'dailyWeather';
        wrapper.id = 'weatherWrapper';
        top.id = 'top';
        bottom.id = 'bottom';

        wrapper.append(top, bottom);
        this.append(wrapper);
    }

    logData(data, city) {
        console.log(city);
        data.forEach((array) => {
            console.log(array);
            console.log(`Type is: ${array[0]}`);
            console.log(`Data is: ${array[1]}`);
        })
    }

    // Static method (callable on the class itself, not on instances of the class)
    static staticMethod() {
        console.log('Static method called');
    }
}

customElements.define('current-weather', currentWeather);
export { currentWeather }; 