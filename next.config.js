const dotenv = require('dotenv');
const path = require("path")

dotenv.config();

// const aliasPathsToResolve = [
//   { name: 'components', path: path.resolve(__dirname, './components') },
//   { name: 'Common', path: path.resolve(__dirname, '../../common/react/') },
// ]

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

  // webpack:(config, { defaultLoaders }) => {
  //   config.module.rules.push({
  //     test: /\.(js|jsx)$/,
  //     include: [path.resolve(__dirname, '../../common/react/')],
  //     use: [defaultLoaders.babel],
  //   })

  //       /** Resolve aliases */
  //   aliasPathsToResolve.forEach((module) => {
  //     config.resolve.alias[module.name] = module.path
  //   })

  //   return config
  // }

  // async redirects() {
  //   return [
  //     {
  //       source: '/dashboard',
  //       destination: '/dashboard/all',
  //       permanent: true,
  //     },
  //   ]
  
  // },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/account/:path*',
  //       destination: 'https://hcdti.savitechnig.com/:path*',
  //     },
  //   ]
  // },
}
