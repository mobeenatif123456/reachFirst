const repo = require('../../../object-repository/object-repo');
const Util = require('../../../utils/utils');
const CustomCommand = require('../../../utils/custom-commands');
const profile = require('../../../config/profile');

describe('test', function() {

  it('first', function() {

  const result = browser.call(() => {
    return CustomCommand.sendEmailThroughGoogleMail(
      'shoaib.kiyani.convo2@gmail.com',
      'pakistani007009',
      'shoaib.kiyani.convo2@gmail.com',
      'Hello Master',
      'This is the body'
    );
  });

  console.log(result);

 });

});