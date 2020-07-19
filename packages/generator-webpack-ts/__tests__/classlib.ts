import path = require("path");
import assert = require("yeoman-assert");
import helpers = require("yeoman-test");

describe("generator-webpack-ts:classlib", () => {
  it("creates files", (done) => {
    return helpers
      .run(path.join(__dirname, "../generators/classlib"))
      .withArguments(["CustomerInventoryItem"])
      .withPrompts({ wtf: false })
      .then(() => {
        assert.file([
          "__tests__/specs/customer-inventory-item.spec.ts",
          "src/scripts/customer-inventory-item.ts",
          "src/styles/customer-inventory-item.scss",
        ]);
        assert.fileContent(
          "src/scripts/customer-inventory-item.ts",
          "export class CustomerInventoryItem"
        );
        done();
      });
  });
});
