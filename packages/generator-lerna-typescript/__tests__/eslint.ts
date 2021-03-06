import path = require("path");
import assert = require("yeoman-assert");
import helpers = require("yeoman-test");

describe("generator-lerna-typescript:eslint", () => {
  it("creates files", (done) => {
    helpers
      .run(path.join(__dirname, "../generators/eslint"))
      .withPrompts({ someAnswer: true })
      .then(() => {
        assert.file(["package.json", ".eslintrc.js", ".eslintignore"]);
        done();
      });
  });
});
