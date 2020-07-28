import { empty, from, interval, of, iif } from 'rxjs';
import { startWith, take } from 'rxjs/operators';

//create an empty observable and then complete immediately
const emptyresult = empty().pipe(startWith(10));

// print 7
emptyresult.subscribe((val) => console.log(val));

//from convert any object to an observable
const arr = [10, 20, 30];
const obs = from(arr);

obs.subscribe((val) => console.log(`from ${val}`));

//convert an infinite iterable to an observable

function* generateDoubles(seed: number) {
  let i = seed;
  while (true) {
    yield i;
    i = i + 1;
  }
}

const iterator = generateDoubles(1);
const obsFromIterator = from(iterator).pipe(take(10));

obsFromIterator.subscribe((x) => console.log(`iterator ${x}`));

//Generate sequential elements with a specific interval

const numbers = interval(1000);
const takeFirst4 = numbers.pipe(take(4));

takeFirst4.subscribe((x) => `Take first ${x}`);

// of convert arguments to an observables
of(1, 3, 7).subscribe(
  (next) => console.log('next:', next),
  (err) => console.log('error:', err),
  () => console.log('the end')
);

//iff Decides at subscription time which Observable will actually be subscribed.

let accessGranted: boolean;
const runIfYouHaveAccess = iif(
  () => accessGranted,
  of('You have access'),
  of('You don"t have access')
);

accessGranted = true;
runIfYouHaveAccess.subscribe(
  (value) => console.log(value),
  (err) => {},
  () => console.log('the end')
);

accessGranted = false;
accessGranted = true;
runIfYouHaveAccess.subscribe(
  (value) => console.log(value),
  (err) => {},
  () => console.log('the end')
);
