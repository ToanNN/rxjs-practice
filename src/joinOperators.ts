import { interval, race, zip } from 'rxjs';
//combineLatest - combine the most recent values of each inner observables
import { combineLatest, of, forkJoin, timer, partition } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';

const weight = of(70, 72, 76, 80);
const height = of(1.65, 1.7, 1.8);

const bodyMassIndex = combineLatest(weight, height).pipe(
  map(([w, h]: [number, number]) => {
    console.log(`Weight ${w}, height ${h}`);
    const result = w / (h * h);
    return result;
  })
);

bodyMassIndex.subscribe((x) => console.log(`Body mass index ${x}`));

//concat creates an output Observable which sequentially emits all values from given Observable and then moves on to
// the next

//forkJoin - dictionary
const forkJoinDictionary = forkJoin({
  numbers: of(1, 3, 5, 7, 9),
  promise: Promise.resolve(100),
  timerVal: timer(4000),
});

forkJoinDictionary.subscribe({
  next: (val) => console.log(val),
  complete: () => console.log('The end'),
});
// { numbers: 4, promise: 8, timerVal: 0 } after 4 seconds

const numbers = of(1, 2, 3, 4, 5, 7);

const [even$, odd$] = partition(numbers, (value, index) => value % 2 == 0);

odd$.subscribe((x) => console.log('odds', x));

const obs1 = interval(1000).pipe(mapTo('fast one'));
const obs2 = interval(2000).pipe(mapTo('Slow one'));

race(obs1, obs2).subscribe((winner) => console.log(winner));

// zip - extra elements discarded
const age$ = of(10, 20, 30);
const name$ = of('Toan', 'Van');
zip(age$, name$, (age, name) => {
  return `${name} is ${age} years old`;
}).subscribe((val) => console.log(val));
