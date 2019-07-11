import { expect, assert } from "chai";
import {
  getApplicationFailureCallbackPath,
  getApplicationFailureCallbackURL,
  getApplicationSuccessCallbackPath,
  getApplicationSuccessCallbackURL,
  getGoogleCallbackURL,
  getGoogleClientId,
  getGoogleClientSecret,
  getGoogleEnabled,
  getGoogleCallbackPath
} from "../src/config/config.google";

describe("CONFIG.GOOGLE.ts", () => {
  describe("getGoogleEnabled", () => {
    it("will return false if env has not been set", () => {
      expect(getGoogleEnabled()).to.equal(false);
    });
    it("will return true if var has been set", () => {
      expect(
        getGoogleEnabled({
          GOOGLE_ENABLED: "true"
        })
      ).to.equal(true);
    });
  });

  describe("getClientId", () => {
    it("will fail if no env var is set", () => {
      try {
        getGoogleClientId();
        assert.fail();
      } catch (err) {
        expect(err).to.exist;
      }
    });

    it("will return the correct ClientID if set", () => {
      const expectedClientId = "030818521";
      expect(
        getGoogleClientId({
          GOOGLE_CLIENT_ID: expectedClientId
        })
      ).to.equal(expectedClientId);
    });
  });

  describe("getClientSecret", () => {
    it("will fail if no env var is set", () => {
      try {
        getGoogleClientSecret();
        assert.fail();
      } catch (err) {
        expect(err).to.exist;
      }
    });
    it("will return the correct ClientSecret if set", () => {
      const expectedClientSecret = "310868423";
      expect(
        getGoogleClientSecret({
          GOOGLE_CLIENT_SECRET: expectedClientSecret
        })
      ).to.equal(expectedClientSecret);
    });
  });

  describe("getGoogleCallbackPath", () => {
    it("will return the default path if no env var has been set", () => {
      expect(getGoogleCallbackPath({})).to.equal("/callback");
    });
    it("will return the correct path if the env var has been set", () => {
      const expectedPath = "/some/other/callback";
      expect(
        getGoogleCallbackPath({
          GOOGLE_CALLBACK_PATH: expectedPath
        })
      ).to.equal(expectedPath);
    });
  });

  describe("getGoogleCallbackURL", () => {
    it("will return the correct default url if no env var has been set", () => {
      expect(getGoogleCallbackURL()).to.equal(
        "http://localhost:8081/auth/google/callback"
      );
    });

    it("will return the correct url with a default path and custom url", () => {
      expect(
        getGoogleCallbackURL({
          AUTHENTICATOR_CALLBACK_HOST: "https://my-website.com/authenticator"
        })
      ).to.equal("https://my-website.com/authenticator/auth/google/callback");
    });

    it("will return the correct url with path and host overwritten", () => {
      expect(
        getGoogleCallbackURL({
          AUTHENTICATOR_CALLBACK_HOST: "https://my-site.com",
          GOOGLE_CALLBACK_PATH: "my-callback/"
        })
      ).to.equal("https://my-site.com/auth/google/my-callback/");
    });
  });
});
