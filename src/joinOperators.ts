//combineLatest - combine the most recent values of each inner observables
import { combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';

const weight = of(70, 72, 76, 80);
const height = of(1.65, 1.7, 1.8);

const bodyMassIndex = combineLatest(weight, height).pipe(
  map(([w, h]: [number, number]) => {
    console.log(`Weight ${w}, height ${h}`);
    const result = w / (h * h);
    return result;
  })
);
