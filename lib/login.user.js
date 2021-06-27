async function checkUser(token) {
    const url = `https://hcdti.savitechnig.com/account/logged_in_user`;
    let data = "";

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });

      if (response.data) {
        data = response.data;
      }
    } catch (e) {
      if (e.response) {
        console.log(e.response);
      }
    }

    return data;
}

async function loginUser(email, password) {
  let getUser = "";

  const body = {
    email: email || null,
    password: password || null,
  };

  // const url = `${process.env.BACKEND_URL}/account/token/login`;
  const url = `https://hcdti.savitechnig.com/account/token/login`;

  try {
    const response = await axios.post(url, body);
    // console.log(response)

    if (response.data) {
      getUser = await checkUser(response.data.auth_token);

      if (getUser) {
        getUser.auth_token = response.data.auth_token;
      }
    }
  } catch (e) {
    if (e.response) {
      console.log(e.response);
    }
  }

  return getUser;
}

export {
    checkUser,
    loginUser,
}