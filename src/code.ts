import { Observable } from 'rxjs';
import './operators';
import './creationOperators.ts';
var observable = Observable.create((subscriber: any) => {
  try {
    subscriber.next(100);
    subscriber.next(200);

    setInterval(() => {
      subscriber.next(300);
    }, 1000);
  } catch (error) {
    subscriber.error(error);
  }
});

var subscription = observable.subscribe((next: any) => console.log(next));
console.log('After subscription');

subscription.unsubscribe();
