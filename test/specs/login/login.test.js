const repo = require('../../../object-repository/object-repo');
const profile = require('../../../config/profile');
const Util = require('../../../utils/utils');
let CustomCommand = require('../../../utils/custom-commands');

describe ('login', function () {

  // Author: Mobeen Atif
  // Total Test Cases: 01
  
  it ('should be able to login to the application', function () {
  
    CustomCommand.login(profile.url, profile.network1Admin1.email, profile.network1Admin1.password);
    Util.takeScreenshot();
   
  });

});