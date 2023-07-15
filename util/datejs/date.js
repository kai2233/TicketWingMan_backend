class DateJs {
    // example : 2023-08-02T09:05+08:00
    constructor(timeString = '') {
        if (!timeString || timeString == '') {
            timeString = new Date().toISOString();
            console.log(timeString)
        }

        const timeStringArray = timeString.split('T');
        
        const dateTimeSplit = timeStringArray[0].split('-');
        const date_t = {
            year : parseInt(dateTimeSplit[0]),
            month : parseInt(dateTimeSplit[1]),
            day : parseInt(dateTimeSplit[2]),
        };

        var spliter = timeStringArray[1].lastIndexOf('+') === -1 ? '-' : '+';
        const timeSplitArray = timeStringArray[1].split(spliter);
        const origintime = timeSplitArray[0].split(':');
        var times_t = {
            originTime : {
                time : timeSplitArray[0],
                hour : parseInt(origintime[0]),
                minutes : parseInt(origintime[1])
            }
        }

        if (timeSplitArray.length == 2) {
            const convertTimeArray = timeSplitArray[1].split(':');
            times_t.consvertTime = {
                time : timeSplitArray[1],
                hour : parseInt(convertTimeArray[0]),
                minutes : parseInt(convertTimeArray[1])
            }

            times_t.consverter = spliter;
        } 

        this.date = date_t;
        this.times = times_t;
    }

    month() {
        return this.date.month;
    }

    day() {
        return this.date.day;
    }

    year() {
        return this.date.year;
    }
}

module.exports = DateJs;
