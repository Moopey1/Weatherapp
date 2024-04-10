class dailyWeather extends HTMLElement {
    // Constructor method to initialize new objects
    constructor(data, city, weatherCode) {
        super();
        this.data = data;
        this.city = city;
        this.weatherCode = weatherCode;
        this.method1();
        this.logData(data, city);
        this.insertData(city);
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

    get weatherCodes() {
        return this.data[1];
    }

    get maxTemperature() {
        return this.data[2];
    }

    logData(data, city) {
        console.log(this.maxTemperature);
        console.log(city);
        data.forEach((array) => {
            console.log(array);
            console.log(`Type is: ${array[0]}`);
            console.log(`Data is: ${array[1]}`);
        })
    }

    todayCode(weatherCode) {
        const code = this.weatherCodes;
        let arr = [];
        let png;
        let today = code[1][0];
        png = weatherCode[today].png;
        today = weatherCode[today].code || today;
        arr.push(today, png);
        return arr;
    }

    insertData(city) {
        const maxTemp = this.maxTemperature;
        const maxTempToday = maxTemp[1][0];
        const todaysCode = this.todayCode(this.weatherCode);

        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const d = new Date();
        let day = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
        let hour = d.getHours();
        let minute; 

        if (d.getMinutes() < 10) {
            minute = "0" + d.getMinutes(); 
        } else {
            minute = d.getMinutes();
        }

        const top = this.querySelector('#top');
        const bottom = this.querySelector('#bottom');
        const topWrapper = document.createElement('div');
        const bottomWrapper = document.createElement('div');
        const cityTemp = document.createElement('div');

        const temp = document.createElement('p');
        temp.id = 'temp';
        const name = document.createElement('p');
        name.id = 'name';
        const code = document.createElement('p');
        code.id = 'code';
        const png = document.createElement('img');
        png.id = 'png';
        const date = document.createElement('p');
        date.id = 'date';

        topWrapper.id = 'topWrapper';
        bottomWrapper.id = 'bottomWrapper';
        cityTemp.id = 'cityTemp';
        name.innerText = city;
        temp.innerText = maxTempToday + '˚C';
        code.innerText = todaysCode[0];
        date.innerText = `${day} ${month} ${year} ${hour}:${minute}`;
        png.setAttribute('src', todaysCode[1]);

        cityTemp.append(png, temp, code);
        topWrapper.append(cityTemp);
        bottomWrapper.append(name, date);
        top.append(topWrapper);
        bottom.append(bottomWrapper);
    }

    // Static method (callable on the class itself, not on instances of the class)
    static staticMethod() {
        console.log('Static method called');
    }
}

customElements.define('daily-weather', dailyWeather);
export { dailyWeather }; 