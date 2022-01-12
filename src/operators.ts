import { interval, of } from 'rxjs';
import { map, first, debounceTime, take, throttleTime } from 'rxjs/operators';

map((x: number) => x * x)(of(1, 2, 3)).subscribe((v) =>
  console.log(`Mapped Value ${v}`)
);
first()(of(1, 2, 3)).subscribe((v: number) => console.log(`First value: ${v}`));



//debounceTime

const numbers = interval(1000).pipe(take(4));

let debouncedValues = numbers.pipe(debounceTime(2000));

//Debounce time only produces a value if the source observable does not emit any value after the time interval
debouncedValues.subscribe(x => console.log("debounced Time: " + x));

//throttle time

const numberGenerators = interval(1000);
const throttledValues = numberGenerators.pipe(throttleTime(1500)); //print 0 2 4 

let subscription = throttledValues.subscribe(x => console.log("throttled value: " + x));

//subscription.unsubscribe();


