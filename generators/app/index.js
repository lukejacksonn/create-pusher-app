var Generator = require('yeoman-generator')
module.exports = class extends Generator {
  prompting() {
    return this.prompt([{
      type    : 'input',
      name    : 'name',
      message : 'Project name',
      default : this.appname.replace(/ /g,'-')
    },{
      type    : 'input',
      name    : 'desc',
      message : 'Project description',
      default : 'My awesome pusher feeds app'
    },{
      type    : 'input',
      name    : 'instance',
      message : 'Feeds Instance',
      default : 'v1:us1:3d33b2aa-4b66-4896-ae52-420befae4a13'
    },{
      type    : 'input',
      name    : 'feed',
      message : 'Feed Identifier',
      default : 'playground'
    }]).then(({ name, desc, instance, feed }) => {
      this.fs.copyTpl(
        this.templatePath('static/*.*'),
        this.destinationPath('static'),
        { name, desc }
      )
      this.fs.copy(
        this.templatePath('static/icons/*'),
        this.destinationPath('static/icons')
      )
      this.fs.copyTpl(
        this.templatePath('src/**/*'),
        this.destinationPath('src'),
        { name, desc, instance, feed }
      )
      this.fs.copyTpl(
        this.templatePath('*.*'),
        this.destinationRoot(),
        { name, desc }
      )
      this.fs.copyTpl(
        this.templatePath('.*'),
        this.destinationRoot(),
        { name, desc }
      )
    })
  }
}
