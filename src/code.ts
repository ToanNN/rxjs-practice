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

var subscription = observable.subscribe((next: number) => console.log(next));
console.log('After subscription');

subscription.unsubscribe();
