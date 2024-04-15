class currentWeather extends HTMLElement {
    // Constructor method to initialize new objects
    constructor(data, city, weatherCode) {
        super();
        this.data = data;
        this.city = city;
        this.weatherCode = weatherCode;
        this.createCard();
        this.logData(data);
        this.insertCurrentData();
    }
    // creates the 'card' to show the information in
    createCard() {
        const wrapper = document.createElement('div');
        const top = document.createElement('div');
        const bottom = document.createElement('div');

        this.className = 'currentWeather';
        wrapper.id = 'currentWrapper';
        top.id = 'topCurrent';
        bottom.id = 'bottomCurrent';

        wrapper.append(top, bottom);
        this.append(wrapper);
    }

    logData(data, city) {
        // console.log(city);
        data.forEach((array) => {
            console.log(array);
        })
    }

    createDiv(ID) {
        const newDiv = document.createElement('div');
        newDiv.id = ID;
        return newDiv;
    }
    // gets the weather data of today
    get current() {
        return this.data[8][1];
    }
    
    get temp() {
        return this.data[8][1].temperature_2m;
    }

    get weatherNumber() {
        return this.data[8][1].weather_code;
    }
    // takes the weather number and outputs the corresponding weather alert and png
    todayCode(weatherCode) {
        let code = this.weatherNumber;
        let arr = [];
        let png;
        png = weatherCode[code].png;
        code = weatherCode[code].code || code;
        arr.push(code, png);
        return arr;
    }
    
    createWeatherNumberElement() {
        const num = this.todayCode(this.weatherCode);
        const pNum = document.createElement('p');
        pNum.id = 'currentNum';
        pNum.innerText = num[0];
        return pNum;
    }

    createWeatherPng() {
        const num = this.todayCode(this.weatherCode);
        const img = document.createElement('img');
        img.setAttribute('src', num[1]);
        return img;
    }

    createTempElement() {
        const temp = this.temp;
        const newTemp = document.createElement('p');
        newTemp.id = 'currentTemp';
        newTemp.innerText = temp + '˚C';
        return newTemp;
    }

    createCityElement(city) {
        console.log(city);
        const cityPar = document.createElement('p');
        cityPar.id = 'currentCity';
        cityPar.innerText = city;
        return cityPar;
    }

    formatDate() {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const d = new Date();
        const newDate = document.createElement('p');
        newDate.id = 'newDate';
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
        newDate.innerText = `${day} ${month} ${year} ${hour}:${minute}`;
        return newDate;
    }

    insertCurrentData() {
        const top = this.querySelector('#topCurrent');
        const bottom = this.querySelector('#bottomCurrent');
        const topWrapper = this.createDiv('topCurrentWrapper');
        const bottomWrapper =this.createDiv('bottomCurrentWrapper');

        const tempElement = this.createTempElement();
        const weatherNum = this.createWeatherNumberElement();
        const weatherPNG = this.createWeatherPng();
        const cityElement = this.createCityElement(this.city);
        const time = this.formatDate();

        topWrapper.append(weatherPNG, tempElement, weatherNum);
        top.append(topWrapper);

        bottomWrapper.append(cityElement, time);
        bottom.append(bottomWrapper);
    }

    // Static method (callable on the class itself, not on instances of the class)
    static staticMethod() {
        console.log('Static method called');
    }
}

customElements.define('current-weather', currentWeather);
export { currentWeather }; 