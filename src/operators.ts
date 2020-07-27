import { of } from 'rxjs';
import { map, first } from 'rxjs/operators';

map((x: number) => x * x)(of(1, 2, 3)).subscribe((v) =>
  console.log(`Value ${v}`)
);
first()(of(1, 2, 3)).subscribe((v: number) => console.log(`value: ${v}`));
