import { Observable } from 'rxjs';

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

var subscription = observable.subscribe((next: any) => console.log("subscriber: " + next));


subscription.unsubscribe();

// import './operators';
// import './creationOperators.ts';

// console.log('JOIN OPERATORS');
// import './joinOperators.ts';

// import './usingThis';

//import './transformationOperators.ts';
import './operators';

