class weeklyWeather extends HTMLElement {
    // Constructor method to initialize new objects
    constructor(data, city, weatherNumber) {
        super();
        this.data = data;
        this.city = city;
        this.weatherNumber = weatherNumber;
        this.createCard();
        this.logData(data, city, weatherNumber);
        this.insertData();
    }
    // creates the 'card' to show the information in
    createCard() {
        console.log('Setting card...');
        const wrapper = document.createElement('div');
        this.className = 'weeklyWeather';
        wrapper.id = 'weeklyWrapper';
        this.append(wrapper);
    }

    logData(data, city, weatherNumber) {
        console.log(data, city, weatherNumber);
    }

    get time() {
        return this.data[0];
    }

    get maxTemp() {
        return this.data[2];
    }

    insertData() {
        const time = this.time[1];
        const temp = this.maxTemp[1];
        const test = [time, temp];

        test.forEach((array) => {
            array.forEach((element, index) => {
                if(index == 0) {
                    console.log(element);
                }
                console.log(element);
            });
        });
        // todo
        // elke waarde in de array's in object doen
        // bijvoorbeeld element 0 van time en temp bij elkaar 
    }

    // Static method (callable on the class itself, not on instances of the class)
    static staticMethod() {
        console.log('Static method called');
    }
}

customElements.define('weekly-weather', weeklyWeather);
export { weeklyWeather }; 