function checkUser(token) {
    const url = `https://hcdti.savitechnig.com/account/logged_in_user`;
    let data = "";

    axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    }).then(response => {
      if (response.data) {
        data = response.data;
      }
    }).catch(e => {
      if (e.response) {
        console.log(e.response);
      }
    })

    // if (response.data) {
    //   data = response.data;
    // }
    
    // if (e.response) {
    //   console.log(e.response);
    // }

    return data;
}

function loginUser(email, password) {
  let getUser = "";

  const body = {
    email: email || null,
    password: password || null,
  };

  // const url = `${process.env.BACKEND_URL}/account/token/login`;
  const url = `https://hcdti.savitechnig.com/account/token/login`;

  axios.post(url, body)
    .then(response => {
      if (response.data) {
        console.log(response)
        getUser = checkUser(response.data.auth_token);

        if (getUser) {
          getUser.auth_token = response.data.auth_token;
        }
      }
    })
    .catch(e => {
      if (e.response) {
        console.log(e.response);
      }
    })

  // if (response.data) {
  //   getUser = await checkUser(response.data.auth_token);

  //   if (getUser) {
  //     getUser.auth_token = response.data.auth_token;
  //   }
  // }
  
  // if (e.response) {
  //   console.log(e.response);
  // }

  return getUser;
}

export {
    checkUser,
    loginUser,
}