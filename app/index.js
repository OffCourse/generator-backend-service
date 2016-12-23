var Generator = require('yeoman-generator');
var _ = require('lodash');

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);
    this.argument('serviceName',  { type: String, default: "echo"});
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
      message : 'your name',
      default : this.options.author
    },{
      type    : 'input',
      name    : 'bucket',
      message : 'The s3 bucket in which you want to store your artifacts',
      default : 'offcourse-bootstrap'
    }]).then((answers) => {
      this.serviceName = answers.serviceName;
      this.organization = answers.organization;
      this.author = answers.author;
      this.bucketName = answers.bucket;
      this.log('service name', this.serviceName);
      this.log('organization', this.organization);
    });
  }

  _copyTemplate(fileName, overrides){
    this.fs.copyTpl(
      this.templatePath(`_${fileName}`),
      this.destinationPath(fileName),
      overrides ? _.merge(this.defaultOptions, overrides) : this.defaultOptions
    );
  }

  _copyTemplates(fileNames, overrides){
    _.each(fileNames, (fileName) => this._copyTemplate(fileName, overrides));
  }

  _automation(){
    let overrides = {outputTemplate: `${this.serviceName}.yml`,
                     bucketName: this.bucketName,
                     functionName: `${_.upperFirst(this.serviceName)}Function`};

    this._copyTemplates(["package.json" , "boot.properties", "build.boot", "build.yml"], overrides);
  }

  _lambda(){
    this._copyTemplates(["index.js" , "context.json", "event.json"]);
  }

  _app() {
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


  writing() {
    this.defaultOptions = {
      service: `${this.serviceName}`,
      organization: `${this.organization}`,
      author: `${this.author}`
    };

    this._automation();
    this._lambda();
    this._app();
  }

  install(){
    let deps = ["atob@2.0.3",
                "btoa@1.1.2",
                "dynamodb-marshaler@2.0.0",
                "aws-sdk@2.6.4",
                "js-yaml@3.6.1",
                "fstream@1.0.10",
                "jsonwebtoken@7.1.9",
                "node-lambda@0.8.11",
                "path@0.12.7",
                "request@2.75.0",
                "unzipper@0.7.2"];
    this.yarnInstall(deps, {'exact': true});
  }
};
