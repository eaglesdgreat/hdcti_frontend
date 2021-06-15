import axios from 'axios'


const sendEmail = async ({ name, email, productName, message }) => {
  const body = {
    personalizations: [
      {
        to: [
          {
            email
          }
        ],
        subject: 'Brief About Your Product'
      }
    ],
    from: {
      email: process.env.EMAIL,
      name: 'Team Vasiti'
    },
    content: [
      {
        type: 'text/html',
        value: `Dear <b>${name}</b>,<br />
                <p>Your product <strong>${productName}</strong> was deleted with the following reasons:</p><br />
								 <p>${message}</p>
								`
      }
    ]
  }

  try {
    let request = await axios.post(
      process.env.SENDGRID_API,
      body,
      { headers: { Authorization: `Bearer ${process.env.SENDGRID_API_KEY}` } },
    )
      .then((res) => {
        return res
      })

    return request === 200 ? true : false
  } catch (e) {
    console.log(e)
  }
}

export { sendEmail }
