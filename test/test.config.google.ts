import { expect, assert } from "chai";
import {
  getApplicationFailureCallbackPath,
  getApplicationFailureCallbackURL,
  getApplicationSuccessCallbackPath,
  getApplicationSuccessCallbackURL,
  getCallbackURL,
  getClientId,
  getClientSecret
} from "../src/config/config.google";

describe("Functions from Google Config", () => {
  it("getClientId: will fail if no env var is set", () => {
    try {
      getClientId();
      assert.fail();
    } catch (err) {
      expect(err).to.exist;
    }
  });
});
