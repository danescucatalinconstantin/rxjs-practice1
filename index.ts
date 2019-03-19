// import { of } from 'rxjs'; 
// import { map } from 'rxjs/operators';


// const source = of('World').pipe(
//   map(x => `Hello ${x}!`)
// );

// source.subscribe(x => console.log(x));

import { from, fromEvent, interval, of, Subject, throwError, empty } from 'rxjs';
import { switchMap, takeUntil, catchError, mergeMap, concatMap, takeWhile, first, map, tap, switchMapTo } from 'rxjs/operators';

import './style.css';
// let myVar = null;

// function cancelRequest() {
//   if (myVar != null) {
//     clearTimeout(myVar);
//     console.log('cancel successed!');

//   } else {
//     console.log('cancel failed!');

//   }
// }

// function makeRequest() {
//   myVar = setTimeout(function makeRequest2() {
//     console.log('request complete!');
//     myVar = null;
//   }, 2000);
// }

// var requestBtn = document.getElementById('makeRequestBtn');
// requestBtn.addEventListener('click', makeRequest);

// var cancelBtn = document.getElementById('cancelRequestBtn');
// cancelBtn.addEventListener('click', cancelRequest);


const requestBtn = document.getElementById('makeRequestBtn');
const clickRequestObservable = fromEvent(requestBtn, 'click');

var cancelBtn = document.getElementById('cancelRequestBtn');
const cancelRequestObservable = fromEvent(cancelBtn, 'click');

let unsubscribe$;

let promiseObservable = of(null).pipe(
  switchMap(
    () => from(
      new Promise(
        (res) => setTimeout(
          () => res('Succes'), 3000
        )
      )
    )
  )
);

clickRequestObservable.pipe(
  tap(() => unsubscribe$ = new Subject()),
  switchMap(() => promiseObservable.pipe(takeUntil(unsubscribe$)))
).subscribe(val => { console.log(val); unsubscribe$ = null; });

cancelRequestObservable.subscribe(() => {
  if (unsubscribe$) {
    unsubscribe$.next();
    unsubscribe$.complete();
    unsubscribe$ = null;
    console.log('Cancel successed!')
  } else {
    console.log('Cancel failed!')
  }
}
)
