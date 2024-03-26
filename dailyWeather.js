class dailyWeather extends HTMLElement {
    // Constructor method to initialize new objects
    constructor(param1, param2) {
        super();
        this.property1 = param1;
        this.property2 = param2;
        this.method1();
    }

    // Method 1
    method1() {
        this.className = 'dailyWeather';
        
        const top = document.createElement('div');
        top.id = 'top';
        
        const bottom = document.createElement('div');
        bottom.id = 'bottom';

        this.append(top, bottom);
        console.log(`Method1 called: ${this.property1}`);
    }

    // Method 2
    method2() {
        console.log(`Method2 called: ${this.property2}`);
    }

    // Static method (callable on the class itself, not on instances of the class)
    static staticMethod() {
        console.log('Static method called');
    }
}

customElements.define('daily-weather', dailyWeather);
export { dailyWeather }; 