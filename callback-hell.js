
const request = require("request");

//dato l'id preleva l'utente corrispondente dal JSONfile su internet se c'è un errore chiama il metodo callback con l'errore d
//altrimenti se la response è 200 (ok) allora restituisce il body contenente le info dell'utente
function getUser(id, callback) {
  request.get(
    `https://jsonplaceholder.typicode.com/users/${id}`,
    (err, response) => {
      if (err) {
        callback(err);
      } else {
        if (response.statusCode == 200) {
          let user = JSON.parse(response.body);
          callback(null, user);
        } else {
          callback("Invalid status code");
        }
      }
    }
  );
}

function getUserPosts(id, callback) {
  request.get(
    `https://jsonplaceholder.typicode.com/users/${id}/posts`,
    (err, response) => {
      if (err) {
        callback(err);
      } else {
        if (response.statusCode == 200) {
          let user = JSON.parse(response.body);
          callback(null, user);
        } else {
          callback("Invalid status code");
        }
      }
    }
  );
}

function getUserWithPosts(id, callback) {
  getUser(id, (err, user) => {
    if (err) {
      callback(err);
    } else {
      getUserPosts(id, (err, posts) => {
        if (err) {
          callback(err);
        } else {
          user.posts = posts;
          callback(null, user);
        }
      });
    }
  });
}

getUserWithPosts(1, (err, user) => {
  if (err) {
    console.error(err);
  } else {
    console.log("user with posts: ", user);
  }
});
