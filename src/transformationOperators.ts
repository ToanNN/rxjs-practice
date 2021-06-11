import { take, map, exhaust, groupBy, mergeMap, reduce } from 'rxjs/operators';
//buffer - stores the values until another observable emits a value

import { fromEvent, interval, of } from 'rxjs';
import { buffer, bufferCount, bufferTime, concatMap } from 'rxjs/operators';

const clicks = fromEvent(document, 'click');
const intervalEvents = interval(1000);

// Generate the buffered values of interval events whenever a mouse is clicked

const intervalClearing$ = intervalEvents.pipe(buffer(clicks));
intervalClearing$.subscribe((x) => console.log(`Buffered ${x}`));

//Emit the last two click events as an array
const twoEventBuffered = clicks.pipe(bufferCount(2));
twoEventBuffered.subscribe((x) => console.log('Buffer count', x));

//bufferTime - Collects values from the past as an array, and emits those arrays periodically in time.
//every bufferTimeSpan milliseconds

//Every second emit an array of recent clicks
const bufferedByTime = clicks.pipe(bufferTime(1000));

//concatMap - map each element to an observable and then merge the output at the end

//every click turn to 5 number from 0 to 4 spaced 1 second
const concatMapped = clicks.pipe(
  concatMap((ev) => interval(1000).pipe(take(5)))
);
concatMapped.subscribe((x) => console.log('concat mapped ', x));

//exhaust - flattens an observable of observables like mergeAll, but ignore the next inner Observables if the current
//observable is till emitting elements

//Emit number from 0-4 one at the time, other clicks will be ignored
const higherOrder = clicks.pipe(map((ev) => interval(1000).pipe(take(5))));
const exhausted = higherOrder.pipe(exhaust());

exhausted.subscribe((x) => console.log('exhaust ', x));

//groupBy - group objects by id and returns an array
const tools = of(
  { id: 1, name: 'Javascript' },
  { id: 2, name: 'Parcel' },
  { id: 1, name: 'Webpack' },
  { id: 2, name: 'Typescript' }
);

tools
  .pipe(groupBy((p) => p.id))
  .pipe(
    mergeMap((grouped) =>
      grouped.pipe(reduce((acc, curr) => [...acc, curr], []))
    )
  )
  .subscribe((arr) => console.log('merge grouped elements', arr));

//array of [{id: 1, name 'Javascript', [id: 1, name: 'Webpack']}]
//array of [{id: 2, name 'Parcel', [id: 1, name: 'Typescript']}]

// example 2 get values by a key

const groupedValues = tools.pipe(
  groupBy(
    (x) => x.id,
    (x) => x.name
  )
);

const mergedGrouppedElementsToArray = groupedValues.pipe(
  mergeMap((gr) =>
    gr.pipe(reduce((acc, curr) => [...acc, curr], [`${gr.key}`]))
  )
);

const mappedToObjectWithKey = mergedGrouppedElementsToArray.pipe(
  map((arr) => ({
    id: parseInt(arr[0], 10),
    values: arr.slice(1),
  }))
);

mappedToObjectWithKey.subscribe((obj) => console.log(obj));
