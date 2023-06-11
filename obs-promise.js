const { Observable } = require('rxjs');
const { filter } = require ('rxjs/operators');



const doSomething = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Hola 1');
    }, 1000);
  });
}

const doSomething$ = () => {
  return new Observable(observer => {
    observer.next('Valor 1 $');
    observer.next('Valor 2 $');
    observer.next('Valor 3 $');
    observer.next(null);
    setTimeout(() => {
      observer.next('Valor 4$ con retardo')
    }, 3000);
  });
}


(async () => {
  const rta = await doSomething();
  console.log(rta);
})();



(() => {
  const res$ = doSomething$();
  res$
  .pipe(
    filter(value => value !== null)
  )
  .subscribe(res => {
    console.log(res);
  })
})();
