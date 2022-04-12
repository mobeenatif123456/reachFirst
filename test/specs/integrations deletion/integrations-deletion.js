const repo = require('../../../object-repository/object-repo');
const profile = require('../../../config/profile');
const Util = require('../../../utils/utils');
const CustomCommand = require('../../../utils/custom-commands');
const { muteIconInPost } = require('../../../object-repository/object-repo');
const utils = require('../../../utils/utils');

describe('integrations deletion', function() {

  it('verify that integrations are deleted from integrations', function() {

    CustomCommand.login(profile.url, profile.network10Admin1.email, profile.network10Admin1.password);
    
    Util.click(repo.networkDropdown);

    Util.click(repo.manageIntegrations);

    Util.pause(120);

    

    for (let i=1;i< 50000; i++)
    {

      if(i%2==0)
      {

        Util.click(repo.firstIntegrationDeletion);

        if(Util.waitForDisplayed(repo.removeThisIntegration, 5000, true))
        {

          Util.click(repo.removeThisIntegration);

        }

        else{

          Util.click(repo.firstIntegrationDeletion);
          Util.click(repo.removeThisIntegration);

        }

      }

      else
      {

        Util.click(repo.secondIntegrationDeletion);

        if(Util.waitForDisplayed(repo.removeThisIntegration, 5000, true))
        {

          Util.click(repo.removeThisIntegration);

        }

        else{

          Util.click(repo.secondIntegrationDeletion);
          Util.click(repo.removeThisIntegration);

        }

      }
        
        Util.click(repo.buttonOk);


    }

  });


});