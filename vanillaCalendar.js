{
    class Time {
        constructor(hh, mm) {
            this.h = hh;
            this.m = mm;
            this.mins = hh * 60 + mm;
        }
    }

    let myCalendar = new VanillaCalendar({
        selector: "#myCalendar",
        pastDates: false,
        onSelect: (data, elem) => {

        function add(t1, t2) {
            let totalMins = t1.mins + t2.mins;
            return new Time(Math.floor(totalMins / 60), totalMins % 60);
        }

        function roundOf(t, n) {
            if (t.mins % 60 < n && (t.m != 15 || t.m != 30 || t.m != 0 || t.m != 45)) {
                if (t.m < 15)
                    t.m = 15;
                else if (t.m < 30)
                    t.m = 30;
                else if (t.m < 45)
                    t.m = 45;
                else {
                    t.m = 0;
                    t.h++;
                }
            }
            t.mins = t.h * 60 + t.m;
            return t;
        }

        let avlTime = [
            [new Time(8, 50), new Time(9, 00)],
            [new Time(14, 00), new Time(16, 00)]
        ];

        let slots = [],
            interval = new Time(1, 00),
            duration = new Time(00, 10),
            n = avlTime.length;

        for (let i = 0; i < n; i++) {
            avlTime[i][0] = roundOf(avlTime[i][0], duration.mins);
            while (avlTime[i][1].mins - avlTime[i][0].mins >= duration.mins) {
                let newTime = add(avlTime[i][0], duration);
                slots.push([avlTime[i][0], newTime]);
                avlTime[i][0] = newTime;
            }
        }
        n = slots.length;
        let possible = [];

        let curr = slots[0];
        possible.push(curr);
        for (let i = 1; i < n; i++) {
            if (slots[i][0].mins - curr[0].mins >= interval.mins) {
                curr = slots[i];
                possible.push(curr);
            }
        }

        let events = document.querySelector('.events')
        n = possible.length;

        for (let i = 0; i < n; i++) {
            let a = document.createElement('button');
            a.classList.add('block');
            a.innerText = possible[i][0].h + ":" + possible[i][0].m;
            a.setAttribute('id', i);
            events.appendChild(a);
        }

        let buttons = document.querySelectorAll('.block');
        console.log(buttons);

        buttons.forEach(i => {
            i.addEventListener('click', () => {
                possible.splice(i.id, 1);
                console.log(possible);
                i.remove()
            })
        })
    }
    })
}