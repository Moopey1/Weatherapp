class dailyWeather extends HTMLElement {
    // Constructor method to initialize new objects
    constructor(data, param2) {
        super();
        this.data = data;
        this.property2 = param2;
        this.method1();
        this.method2(data);
    }

    // Method 1
    method1() {
        this.className = 'dailyWeather';

        const wrapper = document.createElement('div');
        wrapper.id = 'weatherWrapper';

        const top = document.createElement('div');
        top.id = 'top';

        const bottom = document.createElement('div');
        bottom.id = 'bottom';

        wrapper.append(top, bottom);
        this.append(wrapper);
    }

    // Method 2
    method2(data) {
        data.forEach((array) => {
            console.log(`Type is: ${array[0]}`);
            console.log(`Data is: ${array[1]}`);
        })
    }

    // Static method (callable on the class itself, not on instances of the class)
    static staticMethod() {
        console.log('Static method called');
    }
}

customElements.define('daily-weather', dailyWeather);
export { dailyWeather }; 