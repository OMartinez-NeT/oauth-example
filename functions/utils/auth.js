const simpleOauth = require('simple-oauth2')

const SITE_URL = process.env.URL || 'http://localhost:3000'

/* Auth values */
const TOKEN_HOST = 'https://api.netlify.com'
const TOKEN_URL =  'https://api.netlify.com/oauth/token'
const USER_PROFILE_URL = 'https://api.netlify.com/api/v1/user'
const AUTHORIZATION_URL = 'https://app.netlify.com/authorize'
const REDIRECT_URL = `https://bcf9-2800-300-8391-9560-dd5b-7e88-8cf7-982.ngrok-free.app/callback`


const config = {
  /* values set in terminal session or in netlify environment variables */
  clientId: 'oq-hXcEBlP2t9njGS6fhK_x2Mb4dMB3bJWgPrlMxL14',
  clientSecret: 'cLHtEw8lrHEFJrvP_2-LtWLr6P0_h894UnlpHQwaaqY',
  /* OAuth API endpoints */
  tokenHost: TOKEN_HOST,
  authorizePath: AUTHORIZATION_URL,
  tokenPath: TOKEN_URL,
  profilePath: USER_PROFILE_URL,
  /* redirect_uri is the callback url after successful signin */
  redirect_uri: REDIRECT_URL,
}

function authInstance(credentials) {
  if (!credentials.client.id) {
    throw new Error(`MISSING REQUIRED ENV VARS. Please set ${clientIdKey}`)
  }
  if (!credentials.client.secret) {
    throw new Error(`MISSING REQUIRED ENV VARS. Please set ${clientSecretKey}`)
  }
  const newCredentials = new simpleOauth.AuthorizationCode({
    client: {
      id: credentials.client.id,
      secret: credentials.client.secret
    },
    auth: {
      tokenHost: credentials.auth.tokenHost,
      tokenPath: credentials.auth.tokenPath,
      authorizePath: credentials.auth.authorizePath
    }
  })
  return newCredentials
}

module.exports = {
  /* Export config for functions */
  config: config,
  /* Create oauth2 instance to use in our functions */
  oauth: authInstance({
    client: {
      id: config.clientId,
      secret: config.clientSecret
    },
    auth: {
      tokenHost: config.tokenHost,
      tokenPath: config.tokenPath,
      authorizePath: config.authorizePath
    }
  })
}
