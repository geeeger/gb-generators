import Generator = require("yeoman-generator");
import chalk = require("chalk");
import Case = require("case");

interface Options {
  library: "jest" | "karma" | "none";
}

export default class extends Generator {
  constructor(args: string | string[], private opts: Options) {
    super(args, opts);
    this.argument("className", {
      description: "the name of the class",
      required: true,
      type: String,
    });
  }

  initializing(): void {
    this.log(chalk.gray(`${this.options.className} coming right up`));
  }

  writing(): void {
    interface TestDependencies {
      karma?: "OK";
      jest?: "OK";
      none?: "OK";
    }
    const devDependencies: TestDependencies = { [this.opts.library]: "OK" };
    const pkg = this.fs.readJSON(this.destinationPath("package.json"), {
      devDependencies,
    });

    const isJest = !!pkg.devDependencies.jest;
    const specPath = isJest ? "test" : "__tests__/specs";
    const context = {
      classFileName: Case.kebab(this.options.className),
      className: Case.camel(this.options.className),
      classTypeName: Case.pascal(this.options.className),
      genstamp: new Date().toString(),
    };
    this.fs.copyTpl(
      this.templatePath(`${specPath}/blueprint.spec.ts.template`),
      this.destinationPath(`${specPath}/${context.classFileName}.spec.ts`),
      context
    );
    this.fs.copyTpl(
      this.templatePath("src/scripts/blueprint.ts.template"),
      this.destinationPath(`src/scripts/${context.classFileName}.ts`),
      context
    );
    this.fs.copyTpl(
      this.templatePath("src/styles/blueprint.scss.template"),
      this.destinationPath(`src/styles/${context.classFileName}.scss`),
      context
    );
  }
}
