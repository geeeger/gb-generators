import utils = require("../../utils");
import Generator = require("yeoman-generator");
import Case = require("case");
import path = require("path");

export default class extends Generator {
  constructor(args: string | string[], opts: object) {
    super(args, opts);
    this.argument("packageName", {
      description: "the name of the package",
      required: true,
      type: String,
    });
    this.argument("className", {
      description: "the name of the class",
      required: true,
      type: String,
    });
  }

  writing(): void {
    const pkgInfo = utils.getPackageInfo(this.options.packageName);
    const context = {
      folder: pkgInfo.name,
      className: Case.pascal(this.options.className),
      fileName: Case.kebab(this.options.className),
    };

    const pfn: (fname: string) => string = (fname) =>
      path.join("packages", context.folder, fname);
    this.fs.copyTpl(
      this.templatePath("__tests__/n.spec.ts.template"),
      this.destinationPath(
        pfn(`__tests__/${Case.kebab(this.options.className)}.spec.ts`)
      ),
      context
    );
    this.fs.copyTpl(
      this.templatePath("src/n.ts.template"),
      this.destinationPath(pfn(`src/${Case.kebab(this.options.className)}.ts`)),
      context
    );
  }
}
