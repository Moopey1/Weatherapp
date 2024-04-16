class weeklyWeather extends HTMLElement {
    // Constructor method to initialize new objects
    constructor(data, city, weatherNumber) {
        super();
        this.data = data;
        this.city = city;
        this.weatherNumber = weatherNumber;
        this.createCard();
        this.createList();
        this.insertData();
        this.logData(data, city, weatherNumber);
        this.numberToPNG(weatherNumber);
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

    get weatherNum() {
        return this.data[1];
    }

    createParElement(value) {
        const par = document.createElement('p');
        par.id = value + 'Id';
        par.innerText = value;
        return par;
    }

    changeDate(date) {
        const data = new Date(date);
        const arr = [];
        const daysOfWeek = [
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ];
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];


        const monthDay = data.getDate();
        const month = data.getMonth();
        const day = data.getDay();

        arr.push(monthDay, months[month], daysOfWeek[day]);

        const returnData = `${monthDay} ${months[month]} ${daysOfWeek[day]}`;

        console.log(returnData);

        return arr;
    }

    transformData() {
        const time = this.time[1];
        const temp = this.maxTemp[1];
        const number = this.weatherNum[1];

        const bundledData = time.map((item, index) => {
            return { date: item, temp: temp[index], num: number[index] };
        });

        return bundledData;
    }

    createList() {
        const ul = document.createElement('ul');
        ul.id = 'list';
        const wrapper = this.querySelector('#weeklyWrapper');
        for (let i = 0; i < 7; i++) {
            const li = document.createElement('li');
            li.id = i;
            ul.append(li);
        }
        wrapper.append(ul);
    }

    numberToPNG() {
        const number = this.weatherNum[1];
        const obj = this.weatherNumber;
        console.log(obj);
        const pictures = number.map((element) => {
            return element = obj[element].png;
        });
        return pictures;
    }

    createImgElement() {
        const numbers = this.numberToPNG();
        const images = numbers.map((element) => {
            const img = document.createElement('img');
            img.setAttribute('src', element);
            return img;
        });
        return images;
    }

    insertData() {
        const data = this.transformData();
        const items = this.querySelector('#list').childNodes;
        const pictures = this.createImgElement();

        data.forEach((element, index) => {
            items[index].append(pictures[index], this.createParElement(element.temp), this.changeDate(element.date))
        });

    }

    // Static method (callable on the class itself, not on instances of the class)
    static staticMethod() {
        console.log('Static method called');
    }
}

customElements.define('weekly-weather', weeklyWeather);
export { weeklyWeather }; 
