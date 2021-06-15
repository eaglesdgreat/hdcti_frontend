const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    BACKEND_URL_DEV: process.env.BACKEND_URL_DEV,
    SENDGRID_API: process.env.SENDGRID_API,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    EMAIL: process.env.EMAIL,
    ACCESSKEYID: process.env.ACCESSKEYID,
    SECRETACCESS: process.env.SECRETACCESS
  },
  async redirects() {
    return [
      {
        source: '/products',
        destination: '/products/stats',
        permanent: true,
      },
    ]
  },
}
