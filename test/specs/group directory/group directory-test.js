const repo = require('../../../object-repository/object-repo');
const profile = require('../../../config/profile');
const Util = require('../../../utils/utils');
const CustomCommand = require('../../../utils/custom-commands');

describe('group directory', function () {

  // Author: Mobeen Atif
  // Total Test Cases: 02

  let firstprivateGroup = null;
  
  
  it('group creation via group directory', function () {

    CustomCommand.login(profile.url, profile.network2Admin1.email, profile.network2Admin1.password);
    
    Util.waitForDisplayed(repo.groupsDirectory);

    Util.click(repo.groupsDirectory);

    firstprivateGroup= CustomCommand.getTimestamp();

    Util.waitForDisplayed(repo.createGroupInDirectory);

    Util.click(repo.createGroupInDirectory);

    Util.click(repo.privateGroup);

    Util.click(repo.nextButton);

    Util.setValue(repo.grpName,`${firstprivateGroup}`);

    Util.pause(2);
    Util.click(repo.nextButtonForGrpCreation);
    Util.pause(2);
    Util.waitForDisplayed(repo.usersListInGroup);

    Util.click(repo.createGroup);

    Util.pause(5);

    Util.waitForNotDisplayed(repo.groupNameHeadingInGroupDirectory());

    Util.pause(60);


  });

  it('searching a group from group directory', function () {

    
    Util.setValue(repo.grpSearch,firstprivateGroup);
    Util.waitForDisplayed(repo.searchedGrp(firstprivateGroup));
    browser.back();

    Util.waitForDisplayed(repo.grpPost(firstprivateGroup));
    Util.click(repo.grpPost(firstprivateGroup));
    Util.click(repo.groupToggleDropdown(firstprivateGroup));
    Util.pause(3);
    Util.click(repo.deleteGroup);
    Util.pause(1);
    Util.click(repo.deleteButton);
    Util.pause(3);
    Util.click(repo.myFeed);


  });

});