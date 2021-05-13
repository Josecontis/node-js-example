const { Observable, interval, from } = require("rxjs");
const { map, buffer, filter, flatMap, concatMap } = require("rxjs/operators");
const axios = require("axios");

// // //il $ viene usat per gli osservatori
// // let observable$ = new Observable((observable) => {
// //   let i = 0;
// //   let cancellationToken = setInterval(() => {
// //     observable.next(i);
// //     i++;
// //   }, 1000);
// //   setTimeout(() => {//questo metodo verrà eseguito dopo i 10 secondi
// //     clearInterval(cancellationToken); //pulisce l'intervallo
// //     observable.complete();
// //   }, 10000);
// // });

// observable$ = interval(1000).pipe( //pipe applica le modifiche allo stream
//   map((v) => v + 10),
//   filter((v) => v % 2 == 0), //assegna 10 solo ai numeri pari
//   buffer(interval(5000)) //restituisce il buffer contenente i numeri pari generati entro i 5 secondi
// ); //questo metodo fa la stessa cosa del precedente

// //il metodo subscribe prende in input 3 parametri: value,err e completed
// observable$.subscribe(
//   (value) => {
//     console.log(`Observable emitted value: ${value}`);
//   },
//   (err) => {
//     console.log("there has been an error: ", err);
//   },
//   (completed) => {
//     console.log("Observable completed ");
//   }
// );

//metodo per prelevare l'utente dall'id
function fetchUserName(id) {
  return from(
    axios.default.get(`https://jsonplaceholder.typicode.com/users/${id}`)
  ).pipe(
    map((response) => response.data),
    map((user) => user.name)
  );
}

//metodo per effettuare l'intersezione andando a prendere i post di un determinato utente
from(
  axios.default
    .get("https://jsonplaceholder.typicode.com/posts")
    .then((promises) => promises.data)
)
  .pipe(
    // metodo per l'intersezione
    flatMap((p) => p), // prende tutti i post
    concatMap(
      (post) => fetchUserName(post.userId), //preleva l'utente con un determinato id
      (post, username) => {
        post.username = username; //assegna lo username relativo al post matchato
        return post;
      }
    )
  )
  .subscribe((posts) => {
    console.log("Posts:", posts);
  });
