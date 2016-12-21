var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('serviceName',  { type: String, required: true });
    this.argument('organization', { type: String, default: "offcourse"});
    this.argument('author',       { type: String, default: "Yeehaa"});
    this.destinationRoot(`${this.options.serviceName}`);
  }

  writing() {
    this.defaultOptions = {
      service: `${this.options.serviceName}`,
      organization: `${this.options.organization}`,
      author: `${this.options.author}`
    };

    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath('index.js'),
      this.defaultOptions
    );

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      this.defaultOptions
    );
  }

  install(){
    this.yarnInstall();
  }
};
