//buffer - stores the values until another observable emits a value

import { fromEvent, interval } from 'rxjs';
import { buffer, bufferCount, bufferTime } from 'rxjs/operators';

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
