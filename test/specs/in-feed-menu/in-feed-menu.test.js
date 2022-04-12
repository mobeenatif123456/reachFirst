const repo = require('../../../object-repository/object-repo');
const profile = require('../../../config/profile');
const Util = require('../../../utils/utils');
const CustomCommand = require('../../../utils/custom-commands');

describe('in feed menu', function () {

  // Author: Mobeen Atif
  // Total Test Cases: 11

  
  it('open post link', function () {
    
    CustomCommand.login(profile.url, profile.network5Admin1.email, profile.network5Admin1.password);
    let timestamp = CustomCommand.getTimestamp();    
    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network5Admin1.email);
    Util.click(repo.suggestedPostRecipient);
    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp} : This post will be shared to verify post context menu.`);
    Util.click(repo.noteShareButton);    
    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
    Util.pause(2);
    Util.click(repo.sharedPostElipses(timestamp));
    Util.takeScreenshot();
    Util.click(repo.openPostLinkInPostContextMenu);
    Util.waitForDisplayed(repo.uploadLinkInPostDetailView);
  
  });

  it('edit post link', function () {

    Util.click(repo.networkLogo);
    let timestamp = CustomCommand.getTimestamp();    
    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network5Admin1.email);
    Util.click(repo.suggestedPostRecipient);
    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp} : This post will be shared to verify post context menu.`);
    Util.click(repo.noteShareButton);
    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
    Util.pause(2);
    Util.click(repo.sharedPostElipses(timestamp));
    Util.takeScreenshot();
    Util.click(repo.editPostLinkInPostContextMenu);
    Util.pause(2);
    Util.click(repo.doneButtonInPostDetailView);
    Util.waitForDisplayed(repo.editButtonInPostDetailView);

  });

  it('can edit and comment permission', function () {

    Util.click(repo.networkLogo);
    let timestamp = CustomCommand.getTimestamp();    
    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network5Admin1.email);
    Util.click(repo.suggestedPostRecipient);
    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp} : This post will be shared to verify post context menu.`);
    Util.takeScreenshot();
    Util.click(repo.noteShareButton);    
    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
    Util.takeScreenshot();
    Util.pause(2);
    Util.click(repo.sharedPostElipses(timestamp));
    Util.moveTo(repo.permissionsLinkInPostContextMenu);
    Util.pause(3);
    Util.click(repo.canEditAndCommentLinkInPostContextMenu);
    Util.waitForDisplayed(repo.permissionsUpdatedSuccessMessage);
    Util.takeScreenshot();
  
  });

  it('comment only permission', function () {

    let timestamp = CustomCommand.getTimestamp();    
    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network5Admin1.email);
    Util.click(repo.suggestedPostRecipient);
    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp} : This post will be shared to verify post context menu.`);
    Util.takeScreenshot();
    Util.click(repo.noteShareButton);   
    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
    Util.takeScreenshot();
    Util.pause(2);
    Util.click(repo.sharedPostElipses(timestamp));
    Util.moveTo(repo.permissionsLinkInPostContextMenu);
    Util.pause(3);
    Util.click(repo.commentOnlyLinkInPostContextMenu);
    Util.waitForDisplayed(repo.permissionsUpdatedSuccessMessage);
    Util.takeScreenshot();

  });

  it('view only permission', function () {

    let timestamp = CustomCommand.getTimestamp();    
    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network5Admin1.email);
    Util.click(repo.suggestedPostRecipient);
    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp} : This post will be shared to verify post context menu.`);
    Util.takeScreenshot();
    Util.click(repo.noteShareButton);   
    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
    Util.takeScreenshot();
    Util.pause(2);
    Util.click(repo.sharedPostElipses(timestamp));
    Util.moveTo(repo.permissionsLinkInPostContextMenu);
    Util.pause(3);
    Util.click(repo.viewOnlyLinkInPostContextMenu);
    Util.waitForDisplayed(repo.permissionsUpdatedSuccessMessage);
    Util.takeScreenshot();
  
  });

  it('mute notifications', function () {

    let timestamp = CustomCommand.getTimestamp();    
    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network5Admin1.email);
    Util.click(repo.suggestedPostRecipient);
    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp} : This post will be shared to verify post context menu.`);
    Util.takeScreenshot();
    Util.click(repo.noteShareButton);  
    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
    Util.takeScreenshot();
    Util.pause(2);
    Util.click(repo.sharedPostElipses(timestamp));
    Util.pause(3);
    Util.click(repo.muteNotificationsLinkInPostContextMenu);
    Util.waitForDisplayed(repo.sharedPostMuteIcon(timestamp));
    Util.takeScreenshot();

  });

  it('unmute notifications', function () {

    let timestamp = CustomCommand.getTimestamp();    
    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network5Admin1.email);
    Util.click(repo.suggestedPostRecipient);
    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp} : This post will be shared to verify post context menu.`);
    Util.takeScreenshot();
    Util.click(repo.noteShareButton);  
    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
    Util.takeScreenshot();
    Util.pause(2);
    Util.click(repo.sharedPostElipses(timestamp));
    Util.pause(2);
    Util.click(repo.muteNotificationsLinkInPostContextMenu);
    Util.waitForDisplayed(repo.sharedPostMuteIcon(timestamp));
    Util.click(repo.sharedPostElipses(timestamp));
    Util.click(repo.unmuteNotificationsLinkInPostContextMenu);
    Util.waitForNotDisplayed(repo.sharedPostMuteIcon(timestamp));
    Util.takeScreenshot();
  
  });

  it('add tags', function () {

    let timestamp = CustomCommand.getTimestamp();
    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network5Admin1.email);
    Util.click(repo.suggestedPostRecipient);
    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp} : This post will be shared to verify post context menu.`);
    Util.takeScreenshot();
    Util.click(repo.noteShareButton);   
    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
    Util.takeScreenshot();
    Util.pause(2);
    Util.click(repo.sharedPostElipses(timestamp));
    Util.pause(2);
    Util.click(repo.addTagsLinkInPostContextMenu);
    Util.setValue(repo.tagInputFieldInTagThisPostModal, 'Database');
    Util.keys('Enter');
    Util.click(repo.doneButtonInTagThisPostModal);
    Util.takeScreenshot();
    Util.waitForDisplayed(repo.postUpdatedWithTag(timestamp));
    Util.takeScreenshot();
  
  });

  it('star this post', function () {

    let timestamp = CustomCommand.getTimestamp();
    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network5Admin1.email);
    Util.click(repo.suggestedPostRecipient);
    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp} : This post will be shared to verify post context menu.`);
    Util.takeScreenshot();
    Util.click(repo.noteShareButton);    
    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
    Util.takeScreenshot();
    Util.pause(2);
    Util.click(repo.sharedPostElipses(timestamp));
    Util.pause(2);
    Util.click(repo.starThisPostLinkInPostContextMenu);
    Util.waitForDisplayed(repo.sharedPostStarIcon(timestamp));
    Util.takeScreenshot();

  });

  it('unstar this post', function () {

    let timestamp = CustomCommand.getTimestamp();
    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network5Admin1.email);
    Util.click(repo.suggestedPostRecipient);
    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp} : This post will be shared to verify post context menu.`);
    Util.takeScreenshot();
    Util.click(repo.noteShareButton);  
    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
    Util.takeScreenshot();
    Util.pause(2);
    Util.click(repo.sharedPostElipses(timestamp));
    Util.pause(2);
    Util.click(repo.starThisPostLinkInPostContextMenu);
    Util.waitForDisplayed(repo.sharedPostStarIcon(timestamp));
    Util.takeScreenshot();
    Util.click(repo.sharedPostElipses(timestamp));
    Util.click(repo.unstarThisPostLinkInPostContextMenu);
    Util.waitForNotDisplayed(repo.sharedPostStarIcon(timestamp));
    Util.takeScreenshot();

  });

  it('share with others', function () {

    let timestamp = CustomCommand.getTimestamp();
    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network5Admin1.email);
    Util.click(repo.suggestedPostRecipient);
    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp} : This post will be shared to verify post context menu.`);
    Util.takeScreenshot();
    Util.click(repo.noteShareButton);    
    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
    Util.takeScreenshot();
    Util.pause(2);
    Util.click(repo.sharedPostElipses(timestamp));
    Util.pause(2);
    Util.click(repo.shareWithOthers);
    Util.setValue(repo.shareWithOthersInputField2, profile.network5User1.email);
    Util.pause(4);
    Util.click(repo.suggestedPostRecipient);
    Util.takeScreenshot();
    Util.click(repo.publish);
    Util.waitForDisplayed(repo.updatingSharingInfoSuccessMessage);
    Util.takeScreenshot();

  });

});