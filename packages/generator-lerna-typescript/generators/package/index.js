"use strict";
const utils = require("../../utils");
const Generator = require("yeoman-generator");
const path = require("path");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument("packageName", {
      desc: "the name of the package",
      required: true,
      type: String,
    });
  }

  writing() {
    const pkgInfo = utils.getPackageInfo(this.options.packageName);
    const context = {
      folder: pkgInfo.name,
      packageName: pkgInfo.scope
        ? `@${pkgInfo.scope}/${pkgInfo.name}`
        : pkgInfo.name,
    };

    const lernaJson = this.fs.readJSON("lerna.json", {
      version: "independent",
    });

    const packageJson = {
      author: "",
      description: "",
      devDependencies: {
        typescript: "^3.7.2",
      },
      files: ["lib"],
      keywords: [],
      license: "ISC",
      main: "lib/index.js",
      name: context.packageName,
      private: false,
      scripts: {
        build: "tsc --pretty",
        prepare: "npm run build",
      },
      typings: "lib/index.d.ts",
      version:
        lernaJson.version === "independent" ? "0.0.0" : lernaJson.version,
    };

    const pfn = (fname) => path.join("packages", context.folder, fname);
    this.fs.copyTpl(
      this.templatePath("__tests__/index.spec.ts.template"),
      this.destinationPath(pfn("__tests__/index.spec.ts")),
      context
    );
    this.fs.copyTpl(
      this.templatePath("src/index.ts.template"),
      this.destinationPath(pfn("src/index.ts")),
      context
    );

    this.fs.extendJSON(pfn("package.json"), packageJson);

    this.fs.copyTpl(
      this.templatePath("_tsconfig.json"),
      this.destinationPath(pfn("tsconfig.json")),
      context
    );
  }
};
