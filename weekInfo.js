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

    createParElement(value, class_name) {
        const par = document.createElement('p');
        par.className = class_name;
        par.innerText = value;
        return par;
    }

    createTempElement(value) {
        const par = document.createElement('p');
        par.className = 'weeklyTemp';
        par.innerText = value + '˚C';
        return par;
    }
    // takes in the raw date and returns desired date
    changeDate(date) {
        const data = new Date(date);
        const monthDay = data.getDate();
        const month = data.getMonth();
        const day = data.getDay();
        const daysOfWeek = [
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ];
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const cardInfo = {
            dayAndMonth: monthDay + ' ' + months[month],
            weekDay: daysOfWeek[day]
        };
        return cardInfo;
    }
    // creates object with time, temp and weather number
    transformData() {
        const time = this.time[1];
        const temp = this.maxTemp[1];
        const number = this.weatherNum[1];

        const bundledData = time.map((item, index) => {
            return { date: item, temp: temp[index], num: number[index] };
        });

        return bundledData;
    }
    // creates the list for the information 
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
    // compares weatherNum with object key and returns the corresponding png's
    numberToPNG() {
        const number = this.weatherNum[1];
        const obj = this.weatherNumber;
        console.log(obj);
        const pictures = number.map((element) => {
            return element = obj[element].png;
        });
        return pictures;
    }
    // for every png, creates an img tag and returns it
    createImgElement() {
        const numbers = this.numberToPNG();
        const images = numbers.map((element) => {
            const img = document.createElement('img');
            img.setAttribute('src', element);
            return img;
        });
        return images;
    }
    // takes png's, loops over object and appends the png's, temperature and date
    insertData() {
        const data = this.transformData();
        console.log(data);
        const items = this.querySelector('#list').childNodes;
        const pictures = this.createImgElement();

        data.forEach((element, index) => {
            items[index].append(pictures[index], this.createTempElement(element.temp),
            this.createParElement(this.changeDate(element.date).dayAndMonth, 'dayAndMonth'), ' ',
            this.createParElement(this.changeDate(element.date).weekDay, 'weekDay'));
        });

    }

    // Static method (callable on the class itself, not on instances of the class)
    static staticMethod() {
        console.log('Static method called');
    }
}

customElements.define('weekly-weather', weeklyWeather);
export { weeklyWeather }; 
