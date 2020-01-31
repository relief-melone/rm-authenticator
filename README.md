# RM-AUTHENTICATOR
## Easy Authentication and Single Sign on in a Container

rm-authenticator is aimed for the use as a Docker Container to make Authentication in Your application easy.
With one link to it the authenticator will take care of routing to the OAuth-Provers (like Google and Facebook),
handle the redirection and managing the Session. You are also able to connect multiple Frontends and use rm-authenticator as a single sign on system.

It's easy to configure with just a few Environment Variables.

If you are using Node.js with Express as your packend, you might also want to look at https://github.com/relief-melone/rm-session-populator which is a middleware to easily populate your Request with a user Object containing all the user Information sent from this authenticator

## Currently supported Providers
- Google
- Facebook
- LinkedIn

## CallbackUris
If you register your callback URI for the Authenticator with your OAuth Provider use the following schema

[your-hosted-authenticator.com]/auth/[provider]/callback

where providers are all lowercase google, facebook, etc.

## Configuration

As mentioned the Configuration is done by setting Environment Variables. You will also find the complete set in
**.vscode/.env.template** which can be renamed to .env to be used when testing with VSCode.


### Running with multiple Domains

It is important to know that by default the Authenticator works just with Cookies. This is completely fine as long as you just want to get user information and handle the login. It will also work if you access Backends implementing the Authenticator (with [rm-session-populator](https://www.npmjs.com/package/rm-session-populator)) and serve it under the same domain. Howeer if you use different domains for the Authenticator and the Backends you want to connect to make sure you configure the Authenticator to use JSON Web Tokens (See section for JWT Environment Variables). This will also increase the performance of your backend as it won't have to revalidate your cookie with the Authenticator on every request because the user information is already present in the token. 

### Main

In the Main section you set the Variables that apply to all providers (\* are required)

**AUTHENTICATOR_HOST\*:** Where this authenticator resides. This will be the host the OAuth Provider redirects to first.

**APPLICATION_CALLBACK_HOST\*:** Where your front-end resides. This will be the host the authenticator will redirect you to. It is also set automatically in the Repose Access-Control-Allowed-Origin header. Defaults to http://localhost:8080 so it's required if you want to use it for more than testing.

**ALLOWED_REDIRECT_HOSTS:** Hosts you may redirect to. So let's assume you want to be able to redirect to your localhost for testing as well as to my-site.com. That would mean the Var would look like *localhost,my-site.com*. Remember that you also need to include the host of your default application callback host in var. See the chapters Usage from Frontend to see how to use the custom redirecting. If you just need to redirect to the application callback host you can leave this out as it will be set automatically. 

Allowed Redirect Hosts will also be set as Access-Control-Allow-Origin Header for CORS. Except if you have set NODE_ENV to 'development'. In this case the Header will be set to whatever the origin of the request was.

**APPLICATION_LOGOUT_PATH\*:** This is the path the Authenticator will redirect you to when the user logs out. Defaults to /logout

### Google

The following section describes the Environment Variables to configure the Google. Required here only applies if you choose to enable Google.

**GOOGLE_ENABLED\*:** If set to true, Authentication with google is made possible. If not, Google will be disabled and the following Environment Variables get ignored

**GOOGLE_CLIENT_ID\*:** The ClientID provided by google.

**GOOGLE_CLIENT_SECRET\*:** The ClientSecret provided by google

**GOOGLE_APPLICATION_SUCCESS_CALLBACK_PATH:** The Path the Authenticator will redirect the user to after the login has been successfull. By default it's "/" so it will redirect to the main page of your frontend

**GOOGLE_APPLICATION_FAILURE_CALLBACK_PATH:** The Path the Authenticator will redirect the user to if the login fails. By default it's "/failure"

**GOOGLE_APPLICATION_LOGOUT_CALLBACK_PATH:** The Path the Authenticator will redirect the user to if he logs out. By default it's "/logout"

**GOOGLE_SCOPE:** The scope that will be used. By default the scopes are "https://www.googleapis.com/auth/userinfo.profile" and "https://www.googleapis.com/auth/userinfo.email" get requested. Enter without space separated by ;

**GOOGLE_CALLBACK_PATH:** The path Google will redirect you to on this Authenticator. If your application does occupy this endpoint we suggest you leave it at it's default /callback so the redirect URL will be http://localhost:8081/auth/google/callback by default. As of this time /auth/google is fixed and cannot be changed, so if you set this to /my/callback/path the redirect will go to localhost:8081/auth/google/my/callback/path

### Facebook

Facebook uses the same Environment Variables just with the provider name FACEBOOK instead of GOOGLE. So e.g. FACEBOOK_ENABLED, FACEBOOK_CLIENT_ID etc.

### LinkedIn
See Settings for Google and Facebook

### MongoDB

If you want to attach a MongoDB to persist your user data just configure these Environment variables. If you use persistant storing of your User Data you will also have access to storing additional Data (Described further down)

**MONGODB_ENABLED:** Decide if you want to enable MongoDB Connection. To do this set it to true
**MONGODB_HOST:** Host of your MongoDB (e.g. something.mlab.com)
**MONGODB_PORT:** Port of your Database. Defaults to 27017
**MONGODB_DB:** Name of your database
**MONGODB_USER:** Username for the connection (Only protected MongoDB connections are supported)
**MONGODB_PASSWORD:** Password for that user

### Data Endpoint

If you enable persistent storage you will also be able to store and retrieve additional data you are using in your application. E.g. you can store Preferences for the user and so on. Basically all Object types of JSON Objects are supported. It will only work if the user is already signed in. To set data just use this (I'll be using axios for this example)

```js
axios.post(
  "//authenticator-url.com/auth/data/yourKey",
  {
    foo: "Bar"
  },
  { withCredentials: true }
);
```

If you want to retrieve that data from the user later just use

```js
axios.get("//authenticator-url.com/auth/data/yourKey", {
  withCredentials: true
});
```

### JSON Web Tokens

**JWT_ENABLE:** true if you want to enable JSON Web tokens. If enabled the /auth/jwt endpoint will be available and you can get a JWT with a simple get request as an authenticated user. So e.g.

```js
axios.get("//authenticator-url.com/auth/jwt", {
  withCredentials: true
});
```

**JWT_MODE:** can be set to direct (default value) or key. If set to direct the secret to sign and verify the web token will be taken directly from the environment variable JWT_SECRET. If set to key instead it will read the private key from a location on the file system (/data/private_key.pem as default)

**JWT_SECRET:** Secret to sign and verify the json web tokens. Will be ignored if mode is set to key

**JWT_KEY_LOCATION:** If you use key as mode this will be the direction where your private key is. /data/private_key.pem by default. The algorithm used is RSA SHA256. To create a private public key pair use openssl like this

```sh
openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048
openssl rsa -pubout -in private_key.pem -out public_key.pem
```

You will then use the public key in your backend to verify the tokens. How is descibed in the Docs of [rm-session-populator](https://www.npmjs.com/package/rm-session-populator))

**JWT_EXPIRES_IN:** Expiration time for the Web Token. Uses same syntax as described in [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken). Default Value is "1h"

### Use directly

If you don't want to start a Dockercontainer you can also start this locally. In the Repos root folder just do.

```
npm install
npm run build

npm start
```

Remeber that the Environment variables have to be set on the host system. Alternativly you can run it with VSCode and use the configuration provided under ./.vscode/launch.json

### Start Docker Container

```sh
docker run \
  -e AUTHENTICATOR_HOST=http://localhost:8081 \
  -e APPLICATION_CALLBACK_HOST=http://localhost:8080 \
  -e GOOGLE_ENABLED=true \
  -e GOOGLE_CLIENT_ID=my.secret.id \
  -e GOOGLE_CLIENT_SECRET=my.super.secret \
  -p 8081:8081
  reliefmelone/rm-authenticator:latest
```

### Usage from Front-End

After the Authenticator has been Started you can use it from your frontend. E.g. for the Google Provider, just create a link to login

```html
<a href="http://localhost:8081/auth/google">Login</a>
```

The Authenticator will handle everything from here on and at the end redirect you to your Website. In this case the one you specified for your APPLICATION_CALLBACK_HOST. You can also override your redirect URLs so let's assume you want to return to my-site.com for success or my-site.com/error in case of an error. This would mean your login link would look like

```html
<a href="http://localhost:8081/auth/google?successRedirect=mysite.com&failureRedirect=my-site.com/error">Login</a>
```

After you got redirected you will find the connect.sid Cookie (if you did not rename it with the env var). Now to get the UserInfo behind that session just make a call to the API (i will use axios in this example). Every Frontend that's hostname is in ALLOWED_REDIRECT_HOSTS will automatically be able to retrieve that userinfo (remember to fill the variable if you want to connect multiple front ends). There will be ne no need for users to sign on multiple times on different Frontends

```js
axios
  .get("http://localhost:8081/auth/userinfo", { withCredentials: true })
  .then(res => {
    // Your Application Logic
  });
```

To logout simply create a Link to the logout endpoint.

```html
<a href="http://localhost:8081/auth/logout"> Logout </a>
```

As with login you can also change the redirection after logout like this
```html
<a href="http://localhost:8081/auth/logout?logoutRedirect=http://my-site.com/logout"> Logout </a>
```

Like before you will need to include that host in the ALLOWED_REDIRECT_HOSTS Environment Variable

### To Do

As of now this Authenticator is still in Beta. Planned to be implemented in the near future is

- Implementation of more scopes for google and facebook (as of now, the default ones work. Others have not been properly tested)
- Implementation of further Providers (Twitter, Instagram)

While adding these features my goal is to still make every feature optional so there only is configuration to do when its a functionality you really want to use
