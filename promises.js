const axios = require("axios");

//dato l'id preleva l'utente corrispondente dal JSONfile su internet e restituisce i dati con response.data solo dopo il get
async function getUser(id) {
  let response = await axios.default.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  //.then((response) => response.data); rendo await il get per aspettare la risposta
  return response.data;
}

async function getUserPosts(id) {
  let response = await axios.default.get(
    `https://jsonplaceholder.typicode.com/users/${id}/posts`
  );
  //.then((response) => response.data); rendo await il get per aspettare la risposta
  return response.data;
}

async function getUserWithPosts(id) {
  var currentUser = await getUser(id);
  var posts = await getUserPosts(id);
  return (currentUser.posts = posts);
  // with no await
  // var currentUser;
  //   return getUser(id)
  //     .then((user) => {
  //       currentUser = user;
  //       return getUserPosts(id);
  //     })
  //     .then((posts) => {
  //       currentUser.posts = posts;
  //       return currentUser;
  //     });
}

//qui viene utilizzata la arrow function perchè l'await può andare solo in un metodo async
(async () => {
  try {
    let user = await getUserWithPosts(1);
    console.log(user);
  } catch (err) {
    console.log("Something went wrong");
  }
})(); //questa sintassi indica che verrà eseguita all'esecuzione dell'intero programma

// with no await
// getUserWithPosts(1)
//   .then((user) => {
//     console.log("User: ", user);
//   })
//   .catch((err) => {
//     //catcha ogni tipo di errore emanato dalla catena di then in getUserWithPosts
//     console.log("Something went wrong");
//   });
