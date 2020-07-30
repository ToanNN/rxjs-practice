//buffer - stores the values until another observable emits a value

import { fromEvent, interval } from 'rxjs';
import { buffer } from 'rxjs/operators';

const clicks = fromEvent(document, 'click');
const intervalEvents = interval(1000);

// Generate the buffered values of interval events whenever a mouse is clicked

const intervalClearing$ = intervalEvents.pipe(buffer(clicks));
intervalClearing$.subscribe((x) => console.log(`Buffered ${x}`));
