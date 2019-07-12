import { expect } from "chai";
import { getClientInfo } from "../src/config/functions/getClient";
import { Provider } from "../src/interfaces/interface.provider";

describe("getClientInfo", () => {
  it("will throw an error if no ClientID has been provided", () => {
    let env = {};
    expect(() => getClientInfo(Provider.google, "id", env)).to.throw(
      "GOOGLE_CLIENT_ID has to be set!"
    );
  });

  it("will throw if no Client Secret has been set", () => {
    let env = {};
    expect(() => getClientInfo(Provider.google, "secret", env)).to.throw(
      "GOOGLE_CLIENT_SECRET has to be set!"
    );
  });

  it("will return the ClientId if it has been set properly", () => {
    let env = {
      FACEBOOK_CLIENT_ID: "030818123520021"
    };
    expect(getClientInfo(Provider.facebook, "id", env)).to.equal(
      env.FACEBOOK_CLIENT_ID
    );
  });

  it("will return the ClientSecret if it has been set properly", () => {
    let env = {
      FACEBOOK_CLIENT_SECRET: "030818123520021"
    };
    expect(getClientInfo(Provider.facebook, "secret", env)).to.equal(
      env.FACEBOOK_CLIENT_SECRET
    );
  });
});
