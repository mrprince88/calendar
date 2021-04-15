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

            function roundOf(t1, n) {
                let t = new Time(t1.h, t1.m);
                if (t.m != 15 && t.m != 30 && t.m != 0 && t.m != 45) {
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
                    t.mins = t.h * 60 + t.m;
                }
                if ((t.mins - t1.mins) % n == 0)
                    t = t1;
                return t;
            }

            let avlTime = [
                [new Time(8, 50), new Time(23, 00)],
            ];

            let slots = [],
                interval = new Time(00, 10),
                duration = new Time(00, 5),
                n = avlTime.length;

            for (let i = 0; i < n; i++) {
                avlTime[i][0] = roundOf(avlTime[i][0], duration.mins);
                while (avlTime[i][1].mins - avlTime[i][0].mins >= duration.mins) {
                    let newTime = add(avlTime[i][0], duration);
                    slots.push([avlTime[i][0], newTime]);
                    avlTime[i][0] = add(avlTime[i][0], interval);
                }
            }

            let events = document.querySelector('.events')

            n = slots.length;

            for (let i = 0; i < n; i++) {
                let a = document.createElement('button');
                a.classList.add('block');
                a.innerText = slots[i][0].h + ":" + slots[i][0].m;
                a.setAttribute('id', i);
                events.appendChild(a);
            }

            let buttons = document.querySelectorAll('.block');

            function flattenList() {
                if (slots.length == 0)
                    return slots;

                let flat = [],
                    prev = [new Time(slots[0][0].h, slots[0][0].m), new Time(slots[1][1].h, slots[1][1].m)];
                flat.push(slots);
                for (let i = 1; i < slots.length; i++) {
                    let curr = [new Time(slots[i][0].h, slots[i][0].m), new Time(slots[i][1].h, slots[i][1].m)];

                    if (prev[1].mins - curr[0].mins >= 0)
                        prev[1] = curr[1];
                    else {
                        flat.push(curr);
                        prev = curr;
                    }
                }
                return flat;
            }

            buttons.forEach(i => {
                i.addEventListener('click', () => {
                    i.remove();
                })
            })
        }
    })
}