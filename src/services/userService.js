export const userService = {
  login,
  logout,
  getUser
};

function login(username, password) {
  console.log(
    "Receieved-> " +
      "Username:" +
      username +
      " password:" +
      password +
      " Inserting user into local storage"
  );
  const requestOptions = {
    method: "POST",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify({ username, password })
  };

  //   const requestOptions = {
  //     method: "POST",
  //     body: JSON.stringify({
  //       title: "foo",
  //       body: "bar",
  //       userId: 1
  //     }),
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8"
  //     }
  //   };

  return fetch(`https://jsonplaceholder.typicode.com/posts`, requestOptions)
    .then(handleResponse)
    .then(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    });

  // fetch request
}

function logout() {
  console.log("Remove user from local storage");
  localStorage.removeItem("user");
}

function getUser() {
  return null;
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      // call api and got error
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    const user = {
      username: "harrison",
      name: "harrison",
      token: "harrison"
    };
    return user;
  });
}
