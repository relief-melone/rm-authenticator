import { expect } from "chai";
import {
  getCallbackPath,
  getCallbackURL
} from "../src/config/functions/getCallback";
import { Provider } from "../src/classes/interface.provider";

describe("getCallbackPath", () => {
  it("will return the correct default path when no env vars have been set", () => {
    let env = {};
    expect(getCallbackPath(Provider.google, env)).to.equal("/callback");
  });

  it("will add an / at the beginning if forgotten by the user", () => {
    let env = {
      GOOGLE_CALLBACK_PATH: "my-path"
    };

    expect(getCallbackPath(Provider.google, env)).to.equal("/my-path");
  });

  it("will leave the path as is when entered correctly", () => {
    let env = {
      GOOGLE_CALLBACK_PATH: "/my/path"
    };
    expect(getCallbackPath(Provider.google, env)).to.equal("/my/path");
  });
});

describe("getCallbackURL", () => {
  it("will return the default URL if no env vars have been set", () => {
    let env = {};
    expect(getCallbackURL(Provider.google, env)).to.equal(
      "http://localhost:8081/auth/google/callback"
    );
  });

  it("will return the correct URL if just the path has been set", () => {
    let env = {
      GOOGLE_CALLBACK_PATH: "/my/callback/path"
    };
    expect(getCallbackURL(Provider.google, env)).to.equal(
      "http://localhost:8081/auth/google/my/callback/path"
    );
  });

  it("will return the correct URL if just the host has been set", () => {
    let env = {
      AUTHENTICATOR_CALLBACK_HOST: "https://my-authenticator.com"
    };
    expect(getCallbackURL(Provider.google, env)).to.equal(
      "https://my-authenticator.com/auth/google/callback"
    );
  });

  it("will return the correct URL if host and path have been set", () => {
    let env = {
      AUTHENTICATOR_CALLBACK_HOST: "https://my-authenticator.com",
      GOOGLE_CALLBACK_PATH: "/my/callback/path"
    };
    expect(getCallbackURL(Provider.google, env)).to.equal(
      "https://my-authenticator.com/auth/google/my/callback/path"
    );
  });
});
