class dailyWeather extends HTMLElement {
    // Constructor method to initialize new objects
    constructor(data, city) {
        super();
        this.data = data;
        this.city = city;
        this.method1();
        this.logData(data, city);
        this.insertData(data, city);
    }

    // Method 1
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

    // Method 2
    logData(data, city) {
        console.log(city);
        data.forEach((array) => {
            console.log(array);
            console.log(`Type is: ${array[0]}`);
            console.log(`Data is: ${array[1]}`);
        })
    }

    insertData(data, city) {
        const top = this.querySelector('#top');
        const topWrapper = document.createElement('div');
        const cityTemp = document.createElement('div');
        const name = document.createElement('h2');

        topWrapper.id = 'topWrapper';
        cityTemp.id = 'cityTemp';
        name.innerText = city;
        
        cityTemp.append(name);
        topWrapper.append(cityTemp);
        top.append(topWrapper);
    }

    // Static method (callable on the class itself, not on instances of the class)
    static staticMethod() {
        console.log('Static method called');
    }
}

customElements.define('daily-weather', dailyWeather);
export { dailyWeather }; 