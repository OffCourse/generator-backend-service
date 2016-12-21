var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('serviceName',  { type: String, required: true });
    this.argument('organization', { type: String, default: "offcourse"});
    this.argument('author',       { type: String, default: "Yeehaa"});
    this.destinationRoot(`${this.options.serviceName}`);
  }
  prompting() {
    return this.prompt([{
      type    : 'input',
      name    : 'serviceName',
      message : 'The name of this service',
      default : this.options.serviceName
    },{
      type    : 'input',
      name    : 'organization',
      message : 'The name of your organization',
      default : this.options.organization
    },{
      type    : 'input',
      name    : 'author',
      message : 'Your name',
      default : this.options.author
    }]).then((answers) => {
      this.serviceName = answers.serviceName;
      this.organization = answers.organization;
      this.author = answers.author;
      this.log('service name', this.serviceName);
      this.log('organization', this.organization);
    });
  }

  writing() {
    this.defaultOptions = {
      service: `${this.serviceName}`,
      organization: `${this.organization}`,
      author: `${this.author}`
    };

    this.fs.copyTpl(
      this.templatePath('_index.js'),
      this.destinationPath('index.js'),
      this.defaultOptions
    );

    this.fs.copyTpl(
      this.templatePath('_boot.properties'),
      this.destinationPath('boot.properties'),
      this.defaultOptions
    );

    this.fs.copyTpl(
      this.templatePath('_build.boot'),
      this.destinationPath('build.boot'),
      this.defaultOptions
    );

    this.fs.copyTpl(
      this.templatePath('_context.json'),
      this.destinationPath('context.json'),
      this.defaultOptions
    );

    this.fs.copyTpl(
      this.templatePath('_event.json'),
      this.destinationPath('event.json'),
      this.defaultOptions
    );

    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      this.defaultOptions
    );

    this.fs.copyTpl(
      this.templatePath('src/app/_core.cljs'),
      this.destinationPath(`src/${this.serviceName}/core.cljs`),
      this.defaultOptions
    );

    this.fs.copyTpl(
      this.templatePath('src/app/_specs.cljs'),
      this.destinationPath(`src/${this.serviceName}/specs.cljs`),
      this.defaultOptions
    );

    this.fs.copyTpl(
      this.templatePath('src/app/_mappings.cljs'),
      this.destinationPath(`src/${this.serviceName}/mappings.cljs`),
      this.defaultOptions
    );
  }

  install(){
    this.yarnInstall();
  }
};
