const Templates = require('./templates');

module.exports = class Renderer {
  constructor () {}

  save (params, flag) {

    let template;

    if (flag) {
      template = Templates.item;
    } else {
      template = Templates.save;
    }

    for (let prop in params) {
      template = template.replace(`{{${prop}}}`, params[prop]);
    }

    return template;
  }

  myDebts (params) {
    let template = Templates.myDebts;
    let output = template.title;

    for (let item of params) {
      output += this.save(item, false);
    }

    return output;
  }

  debtsForMe (params) {
    let template = Templates.debtsForMe;
    let output = template.title;

    for (let item of params) {
      output += this.save(item, true);
    }

    return output;
  }
}
