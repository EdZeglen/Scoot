
/*
Scoot Time

The MIT License (MIT)

Copyright (c) 2016,2017 Edward C. Zeglen III

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/
if (typeof (window.Scoot) !== 'undefined') {

    Scoot.time = function () {

        _time = {};
        
        _time.parse = function (timestring) {

            /*

            time.parse("12:00 AM"); // {hh:  0, mm: 0}
            time.parse("12:00 PM"); // {hh: 12, mm: 0}
            time.parse("12:00PM");  // {hh: 12, mm: 0}
            time.parse("12:00pm");  // {hh: 12, mm: 0}
            time.parse("01:00 PM"); // {hh: 13, mm: 0}
            time.parse("23:00");    // {hh: 23, mm: 0}

            */

            var part = timestring.match(/(\d+):(\d+)(?: )?(am|pm)?/i);
            var hh = parseInt(part[1], 10);
            var mm = parseInt(part[2], 10);
            var ap = part[3] ? part[3].toUpperCase() : null;
            if (ap === "AM") {
                if (hh == 12) {
                    hh = 0;
                }
            }
            if (ap === "PM") {
                if (hh != 12) {
                    hh += 12;
                }
            }
            return { hh: hh, mm: mm };

        }
        
        _time.diff = function (start, end) {
            
            // from here: http://stackoverflow.com/questions/1787939/check-time-difference-in-javascript
            // use a constant date (e.g. 2000-01-01) and the desired time to initialize two dates

            var date1 = new Date(2000, 0, 1, start.hh, start.mm); // 9:00 AM
            var date2 = new Date(2000, 0, 1, end.hh, end.mm); // 5:00 PM

            // the following is to handle cases where the times are on the opposite side of
            // midnight e.g. when you want to get the difference between 9:00 PM and 5:00 AM

            if (date2 < date1) {
                date2.setDate(date2.getDate() + 1);
            }

            var diff = date2 - date1;

            // 28800000 milliseconds (8 hours)

            var msec = diff;
            var hh = Math.floor(msec / 1000 / 60 / 60);
            msec -= hh * 1000 * 60 * 60;
            var mm = Math.floor(msec / 1000 / 60);
            msec -= mm * 1000 * 60;
            var ss = Math.floor(msec / 1000);
            msec -= ss * 1000;
            // diff = 28800000 => hh = 8, mm = 0, ss = 0, msec = 0

            return { hh: hh, mm: mm, ss: ss, msec: msec }

        }

        return (_time);

    }(Scoot);

}