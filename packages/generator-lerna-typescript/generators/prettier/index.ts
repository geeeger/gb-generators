import Generator = require("yeoman-generator");

export default class extends Generator {
  writing(): void {
    const pkgJson = {
      devDependencies: {
        prettier: "^2.0.0",
      },
      scripts: {
        format: `prettier --write "**/*.ts"  "!**/lib/**"`,
      },
    };

    this.fs.extendJSON(this.destinationPath("package.json"), pkgJson);
    this.fs.copy(
      this.templatePath("_prettierrc"),
      this.destinationPath(".prettierrc")
    );
  }

  install(): void {
    this.npmInstall();
  }
}
