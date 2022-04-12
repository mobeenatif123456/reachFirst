const repo = require('../../../object-repository/object-repo');
const profile = require('../../../config/profile');
const Util = require('../../../utils/utils');
const CustomCommand = require('../../../utils/custom-commands');
const { muteIconInPost } = require('../../../object-repository/object-repo');
const utils = require('../../../utils/utils');

describe('groups deletion', function() {

  it('verify that groups are getting deleted from group directory', function() {

    CustomCommand.login(profile.url, profile.network10Admin1.email, profile.network10Admin1.password);
    
    Util.click(repo.groupsDirectory);

    Util.click(repo.myGroupsTag);

    Util.pause(10);

    

    for (let i=1;i< 5000; i++)
    {

      if(i%2==0)
      {

        Util.click(repo.firstGroupDropdown);

        if(Util.waitForDisplayed(repo.deleteGroup, 5000, true))
        {

          Util.click(repo.deleteGroup);

        }

        else{

          Util.click(repo.firstGroupDropdown);
          Util.click(repo.deleteGroup);

        }

      }

      else
      {

        Util.click(repo.secondGroupDropdown);

        if(Util.waitForDisplayed(repo.deleteGroup, 5000, true))
        {

          Util.click(repo.deleteGroup);

        }

        else{

          Util.click(repo.secondGroupDropdown);
          Util.click(repo.deleteGroup);

        }

      }
        
        Util.click(repo.deleteGroupButtonInGroupDirectory);

        Util.pause(1);


    }

  });


});