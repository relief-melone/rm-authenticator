# RM-AUTHENTICATOR

rm-authenticator is aimed for the use as a Docker Container to make Authentication in Your application easy.
With one link to it the authenticator will take care of routing to the OAuth-Provers (like Google and Facebook),
handle the redirection and managing the Session. It's easy to configure with Environment Variables.

If you are using Node.js with Express as your packend, you might also want to look at https://github.com/relief-melone/rm-session-populator which is a middleware to easily populate your Request with a user Object containing all the user Information sent from this authenticator

## Configuration

As mentioned the Configuration is done by setting Environment Variables. You will also find the complete set in
**.vscode/.env.template** which can be renamed to .env to be used when testing with VSCode.

### Main

In the Main section you set the Variables that apply to all providers (\* are required)

**AUTHENTICATOR_HOST\*:** Where this authenticator resides. This will be the host the OAuth Provider redirects to first.

**APPLICATION_CALLBACK_HOST\*:** Where your front-end resides. This will be the host the authenticator will redirect you to. It is also set automatically in the Repose Access-Control-Allowed-Origin header. Defaults to http://localhost:8080 so it's required if you want to use it for more than testing.

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
  "//authenticator-url:8081/auth/data/yourKey",
  {
    foo: "Bar"
  },
  { withCredentials: true }
);
```

If you want to retrieve that data from the user later just use

```js
axios.get("//authenticator-url:8081/auth/data/yourKey", {
  withCredentials: true
});
```

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

The Authenticator will handle everything from here on and at the end redirect you to your Website. Here you will find the connect.sid Cookie. Now to get the UserInfo behind that session just make a call to the API (i will use axios in this example)

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

### To Do

As of now this Authenticator is still in Beta. Planned to be implemented in the near future is

- Implementation of more scopes for google and facebook (as of now, the default ones work. Others have not been properly tested)
- Implementation of a basic username passwort login
- Implementation of further Providers (Twitter, Instagram)

While adding these features my goal is to still make every feature optional so there only is configuration to do when its a functionality you really want to use
