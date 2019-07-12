import { expect, assert } from "chai";
import {
  getApplicationCallbackPath,
  getApplicationCallbackURL
} from "../src/config/functions/getApplicationCallback";
import { Provider } from "../src/interfaces/interface.provider";

describe("getApplicationCallbackPath", () => {
  it("will return the default paths if no env var has been set", () => {
    expect(getApplicationCallbackPath(Provider.google, "success", {})).to.equal(
      ""
    );
    expect(getApplicationCallbackPath(Provider.google, "failure", {})).to.equal(
      "/failure"
    );
    expect(getApplicationCallbackPath(Provider.google, "logout", {})).to.equal(
      "/logout"
    );
  });

  it("will return the path with an added / at the beginning if forgotten", () => {
    let env = {
      GOOGLE_APPLICATION_SUCCESS_CALLBACK_PATH: "my-path",
      GOOGLE_APPLICATION_FAILURE_CALLBACK_PATH: "my-failure/path",
      GOOGLE_APPLICATION_LOGOUT_CALLBACK_PATH: "my/logout/path"
    };
    expect(
      getApplicationCallbackPath(Provider.google, "success", env)
    ).to.equal("/my-path");
    expect(
      getApplicationCallbackPath(Provider.google, "failure", env)
    ).to.equal("/my-failure/path");
    expect(getApplicationCallbackPath(Provider.google, "logout", env)).to.equal(
      "/my/logout/path"
    );
  });

  it("will return the path as is when overwritten correctly", () => {
    let env = {
      GOOGLE_APPLICATION_SUCCESS_CALLBACK_PATH: "/my-path",
      GOOGLE_APPLICATION_FAILURE_CALLBACK_PATH: "/my-failure/path",
      GOOGLE_APPLICATION_LOGOUT_CALLBACK_PATH: "/my/logout/path"
    };
    expect(
      getApplicationCallbackPath(Provider.google, "success", env)
    ).to.equal("/my-path");

    expect(
      getApplicationCallbackPath(Provider.google, "failure", env)
    ).to.equal("/my-failure/path");

    expect(getApplicationCallbackPath(Provider.google, "logout", env)).to.equal(
      "/my/logout/path"
    );
  });
});

describe("getApplicationCallbackURL", () => {
  it("ill return the correct default URL if no environmemnt variables have been set by the user", () => {
    let env = {};
    expect(getApplicationCallbackURL(Provider.google, "success", env)).to.equal(
      "http://localhost:8080"
    );
    expect(getApplicationCallbackURL(Provider.google, "failure", env)).to.equal(
      "http://localhost:8080/failure"
    );
    expect(getApplicationCallbackURL(Provider.google, "logout", env)).to.equal(
      "http://localhost:8080/logout"
    );
  });

  it("will return the correct URLs when overwritten", () => {
    let env = {
      GOOGLE_APPLICATION_SUCCESS_CALLBACK_PATH: "/my-path",
      GOOGLE_APPLICATION_FAILURE_CALLBACK_PATH: "/my-failure/path",
      GOOGLE_APPLICATION_LOGOUT_CALLBACK_PATH: "/my/logout/path",
      APPLICATION_CALLBACK_HOST: "https://my-new-website.com"
    };

    expect(getApplicationCallbackURL(Provider.google, "success", env)).to.equal(
      "https://my-new-website.com/my-path"
    );
    expect(getApplicationCallbackURL(Provider.google, "failure", env)).to.equal(
      "https://my-new-website.com/my-failure/path"
    );
    expect(getApplicationCallbackURL(Provider.google, "logout", env)).to.equal(
      "https://my-new-website.com/my/logout/path"
    );
  });

  it("will return the correct URL when only the Path is overwritten", () => {
    let env = {
      GOOGLE_APPLICATION_SUCCESS_CALLBACK_PATH: "/my-path",
      GOOGLE_APPLICATION_FAILURE_CALLBACK_PATH: "/my-failure/path",
      GOOGLE_APPLICATION_LOGOUT_CALLBACK_PATH: "/my/logout/path"
    };

    expect(getApplicationCallbackURL(Provider.google, "success", env)).to.equal(
      "http://localhost:8080/my-path"
    );
    expect(getApplicationCallbackURL(Provider.google, "failure", env)).to.equal(
      "http://localhost:8080/my-failure/path"
    );
    expect(getApplicationCallbackURL(Provider.google, "logout", env)).to.equal(
      "http://localhost:8080/my/logout/path"
    );
  });

  it("will return the correct URL when only the Host is overwritten", () => {
    let env = {
      APPLICATION_CALLBACK_HOST: "https://my-new-website.com"
    };

    expect(getApplicationCallbackURL(Provider.google, "success", env)).to.equal(
      "https://my-new-website.com"
    );
    expect(getApplicationCallbackURL(Provider.google, "failure", env)).to.equal(
      "https://my-new-website.com/failure"
    );
    expect(getApplicationCallbackURL(Provider.google, "logout", env)).to.equal(
      "https://my-new-website.com/logout"
    );
  });
});
