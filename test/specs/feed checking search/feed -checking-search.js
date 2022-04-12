const repo = require('../../../object-repository/object-repo');
const profile = require('../../../config/profile');
const Util = require('../../../utils/utils');
const CustomCommand = require('../../../utils/custom-commands');

describe('note search in group feed', function () {

  // Author: Mobeen Atif
  // Total Test Cases: 11

  
  it('verify note search in main feed', function () {
    
    CustomCommand.login(profile.url, profile.network5Admin1.email, profile.network5Admin1.password);

    let counter=101
    for(;;)
    {
    Util.clearValue(repo.feedSearchInputField);
    Util.setValue(repo.feedSearchInputField,`Counter ${counter}`);
    Util.click(repo.searchIconInFeed);
    Util.pause(2);
    counter++;
    }
  
  });

});