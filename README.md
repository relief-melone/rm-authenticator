# RM-AUTHENTICATOR

rm-authenticator is aimed for the use as a Docker Container to make Authentication in Your application easy.
With one link to it the authenticator will take care of routing to the OAuth-Provers (like Google and Facebook),
handle the redirection and managing the Session. It's easy to configure with Environment Variables.

If you are using Node.js with Express as your packend, you might also want to look at https://github.com/relief-melone/rm-session-populator which is a middleware to easily populate your Request with a user Object containing all the user Information sent from this authenticator

## Use

### Configuration

As mentioned the Configuration is done by setting Environment Variables. You will also find the complete set in
**.vscode/.env.template** which can be renamed to .env to be used when testing with VSCode.

#### Main

In the Main section you set the Variables that apply to all providers (\* are required)

**AUTHENTICATOR_HOST\*:** Where this authenticator resides. This will be the host the OAuth Provider redirects to first.

**APPLICATION_CALLBACK_HOST\*:** Where your front-end resides. This will be the host the authenticator will redirect you to. It is also set automatically in the Repose Access-Control-Allowed-Origin header. Defaults to http://localhost:8080 so it's required if you want to use it for more than testing.

#### Google

The following section describes the Environment Variables to configure the Google. Required here only applies if you choose to enable Google.

**GOOGLE_ENABLED\*:** If set to true, Authentication with google is made possible. If not, Google will be disabled and the following Environment Variables get ignored

**GOOGLE_CLIENT_ID\*:** The ClientID provided by google.

**GOOGLE_CLIENT_SECRET\*:** The ClientSecret provided by google

**GOOGLE_APPLICATION_SUCCESS_CALLBACK_PATH:** The Path the Authenticator will redirect the user to after the login has been successfull. By default it's "/" so it will redirect to the main page of your frontend

**GOOGLE_APPLICATION_FAILURE_CALLBACK_PATH:** The Path the Authenticator will redirect the user to if the login fails. By default it's "/failure"

**GOOGLE_SCOPE:** The scope that will be used. By default the scopes profile, email and openid get requested

**GOOGLE_CALLBACK_PATH:** The path Google will redirect you to on this Authenticator. If your application does occupy this endpoint we suggest you leave it at it's default /callback so the redirect URL will be http://localhost:8081/auth/google/callback by default. As of this time /auth/google is fixed and cannot be changed

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