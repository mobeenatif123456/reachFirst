const repo = require('../../../object-repository/object-repo');
const profile = require('../../../config/profile');
const Util = require('../../../utils/utils');
const CustomCommand = require('../../../utils/custom-commands');

describe('groups',function() {

    // Author: Mobeen Atif
  // Total Test Cases: 07

  const email= ["load_user_628@load-testing-group.com","load_user_629@load-testing-group.com","load_user_630@load-testing-group.com","load_user_631@load-testing-group.com","load_user_632@load-testing-group.com","load_user_633@load-testing-group.com","load_user_634@load-testing-group.com","load_user_635@load-testing-group.com","load_user_636@load-testing-group.com","load_user_637@load-testing-group.com","load_user_638@load-testing-group.com","load_user_639@load-testing-group.com","load_user_640@load-testing-group.com","load_user_641@load-testing-group.com","load_user_642@load-testing-group.com","load_user_643@load-testing-group.com","load_user_644@load-testing-group.com","load_user_645@load-testing-group.com","load_user_646@load-testing-group.com","load_user_647@load-testing-group.com","load_user_648@load-testing-group.com","load_user_649@load-testing-group.com","load_user_650@load-testing-group.com"];

    it('public group creation and destruction', function(){

        for(let i=0; i< 90; i++)
        {
        CustomCommand.login(profile.url,email[i],'123456');
        Util.click(repo.clickHere, 20000, true);
        Util.waitForDisplayed(repo.whatsNew);

        Util.click(repo.everyoneGroup);

        Util.click(repo.elipsesInGroupView);
        Util.click(repo.groupSettingsInGroupViewElipsesMenu);
        Util.pause(2);

        Util.click(repo.notificationCenter);
        Util.click(repo.mobile);

        Util.click(repo.saveChangesButtonInGroupSettings);

        Util.click(repo.imageCircle);

        Util.click(repo.signOut);

        }
    });

});
    


 