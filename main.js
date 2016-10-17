var Event = Event || {};

function Event(startHours, startMinutes, endHours, endMinutes) {
    this.startTime = new Date();
    this.startTime.setHours(startHours);
    this.startTime.setMilliseconds(0);
    this.startTime.setMinutes(startMinutes);
    this.endTime = new Date();
    this.endTime.setHours(endHours);
    this.endTime.setMilliseconds(0);
    this.endTime.setMinutes(endMinutes);
    this.intervalCalculated = Math.round((Math.round((this.endTime - this.startTime) / 60000)) / 30);
}

Event.prototype.layOutCalendar = function () {
    var startTime = this.startTime;
    var endTime = this.endTime;
    var startCounter = 0;
    var eventTable = document.getElementById("eventView");
    var intervals = this.intervalCalculated;
    for (var i = 0; i <= intervals; i++) {
        var tableRow = eventTable.insertRow(i);
        var cellInfo = tableRow.insertCell(0);
        cellInfo.className = "timeLabel";
        cellInfo.innerHTML = getTimeFormatted(startTime.toString(), startCounter);
        startCounter += 30;
    }
}

Event.prototype.layOutEvents = function (events) {
    if (events.length > 0) {
        for (var i = 0; i < events.length; i++) {
            var rowToBePlottedStartPoint = Math.round(events[i].start / 30);
            var rowToBePlottedEndPoint = Math.round(events[i].end / 30);
            var table = document.getElementById("eventView");
            var noOfCells = table.rows[rowToBePlottedStartPoint].cells.length;

            table.rows[rowToBePlottedStartPoint].insertCell(noOfCells).innerHTML = ("Events " + i);
            table.rows[rowToBePlottedStartPoint].className = "timeRow";
            table.rows[rowToBePlottedStartPoint].cells[noOfCells].setAttribute("rowspan", rowToBePlottedEndPoint - rowToBePlottedStartPoint);
            table.rows[rowToBePlottedStartPoint].cells[noOfCells].className = "eventPLot"
        }
    }
}


function layOutDay(events) {
    var event = new Event(9, 0, 21, 0);
    event.layOutCalendar();
    event.layOutEvents(events);
}

function formatAMPM(date) {
    var hours = date.split(':')[0];
    var minutes = date.split(':')[1];
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes == '00' ? '00' : (minutes < 10 ? '0' + minutes : minutes);
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

function getTimeFormatted(time, minutesToAdd) {
    function z(n) {
        return (n < 10 ? '0' : '') + n;
    }
    var timePart = time.split(' ')[4];
    var bits = timePart.split(':');
    var mins = bits[0] * 60 + (+bits[1]) + (+minutesToAdd);
    var timeAdded = z(mins % (24 * 60) / 60 | 0) + ':' + z(mins % 60);
    return formatAMPM(timeAdded);
}

eventsToBePlotted = [{
        start: 30,
        end: 150
            }, {
        start: 540,
        end: 600
            }, {
        start: 560,
        end: 620
            }, {
        start: 610,
        end: 670
            }, {
        start: 30,
        end: 150
            }, {
        start: 540,
        end: 600
            }, {
        start: 560,
        end: 620
            }, {
        start: 610,
        end: 670
            }
                    ];
 var event = new Event(9, 0, 21, 0);
    event.layOutCalendar();
    event.layOutEvents(eventsToBePlotted);
