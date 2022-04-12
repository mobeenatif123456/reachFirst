const repo = require('../../../object-repository/object-repo');
const profile = require('../../../config/profile');
const Util = require('../../../utils/utils');
const CustomCommand = require('../../../utils/custom-commands');

describe('note creation in group feed', function () {

  // Author: Mobeen Atif
  // Total Test Cases: 11

  
  it('verify note creation in group feed', function () {
    
    CustomCommand.login(profile.url, profile.network5Admin1.email, profile.network5Admin1.password);

    Util.setValue(repo.feedSearchInputField,`feedRenderingGroup`);

    Util.click(repo.searchedGroupSuggestionGroupforTest);

    let counter=651
    for(;;)
    {
    let timestamp = CustomCommand.getTimestamp();    
    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toinputFieldUpdated);
    Util.setValue(repo.typeintofieldUpdated, profile.network5User1.email);
    Util.click(repo.suggestedPostRecipient);
    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp} Counter: ${counter}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp} : This post will be shared to verify post context menu.`);
    Util.click(repo.noteShareButton);    
    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
    counter++;
    }
  
  });

});