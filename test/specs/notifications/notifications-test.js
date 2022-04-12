const repo = require('../../../object-repository/object-repo');
const profile = require('../../../config/profile');
const Util = require('../../../utils/utils');
const CustomCommand = require('../../../utils/custom-commands');

describe('notifications', function () {

  // Author: Mobeen Atif
  // Total Test Cases: 06
  
  let nameOfPrivateGroupWithGeolocation = null;

  let sessionBrowser1 = null;
  let sessionBrowser2 = null;

  const browserSessions = [];


  it('verify "comments on my post" notfication is working', function () {

    CustomCommand.login(profile.url, profile.network4Admin1.email, profile.network4Admin1.password);
    
    const timestamp = CustomCommand.getTimestamp();
    
    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network4User1.email);
    Util.click(repo.suggestedPostRecipient);
    
    Util.pause(2)

    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp}: This post will have an image file attachment.`);
    
    Util.pause(2);
  
    Util.click(repo.noteShareButton);
    
    Util.pause(2);

    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));

    Util.takeScreenshot();

    sessionBrowser1 = Util.getBrowserSession();
    browserSessions.push(sessionBrowser1);
    sessionBrowser2 = Util.openBrowser();
    browserSessions.push(sessionBrowser2);
    
    Util.switchToBrowser(sessionBrowser2);

    CustomCommand.login(profile.url, profile.network4User1.email, profile.network4User1.password);

    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));

    Util.click(repo.createdPostCommentLink(timestamp)); 

    const timestamp2 = CustomCommand.getTimestamp();

    Util.keys(`${timestamp2}: Comment With Emoji. `);

    Util.keys('Enter');

    Util.takeScreenshot();

    Util.switchToBrowser(sessionBrowser1);

    Util.pause(5);

    Util.click(repo.bellIcon);

    Util.waitForDisplayed(repo.createdCommentNotification(timestamp2));
    Util.takeScreenshot();

    
  });

  it('verify "comments on post shared with me" notification is working', function () {
    

    Util.switchToBrowser(sessionBrowser2);

    const timestamp = CustomCommand.getTimestamp();
    
    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network4Admin1.email);
    Util.click(repo.suggestedPostRecipient);
    
    Util.pause(2)

    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp}: This post will have an image file attachment.`);
    
    Util.pause(2);
  
    Util.click(repo.noteShareButton);
    
    Util.pause(2);

    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
    Util.takeScreenshot();

    Util.click(repo.createdPostCommentLink(timestamp));

    const timestamp2 = CustomCommand.getTimestamp();

    Util.keys(`${timestamp2}: Comment With Emoji. `);

    Util.keys('Enter');
    Util.takeScreenshot();

    Util.switchToBrowser(sessionBrowser1);

    Util.pause(5);

    Util.waitForDisplayed(repo.createdCommentNotification(timestamp2));
    Util.takeScreenshot();
   
    
  });

  it('verify notification for "mentioning user" is showing at the notification center', function () {
    
    Util.switchToBrowser(sessionBrowser2);

    const timestamp = CustomCommand.getTimestamp();
    
    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network4User1.email);
    Util.click(repo.suggestedPostRecipient);
    
    Util.pause(2);

    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp}: This post is addressed to @${profile.network4Admin1.firstName} ${profile.network4Admin1.lastName}`);
    
    Util.pause(2);

    const userFullName= profile.network4Admin1.firstName + ' ' + profile.network4Admin1.lastName;
    
    Util.click(repo.userNameSuggestion(userFullName));
       
    Util.pause(2); 
    Util.click(repo.noteShareButton);
    Util.pause(2);

    Util.switchToBrowser(sessionBrowser1);

    Util.pause(5);

    Util.waitForDisplayed(repo.createdCommentNotification(timestamp));
    Util.takeScreenshot();

  });

  it('verify "comments on post that i have commented on" notification is working', function () {
        
    Util.switchToBrowser(sessionBrowser2);

    const timestamp = CustomCommand.getTimestamp();
    
    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network4Admin1.email);
    Util.click(repo.suggestedPostRecipient);
    
    Util.pause(2)

    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp}: This post will have an image file attachment.`);
    
    Util.pause(2);
  
    Util.click(repo.noteShareButton);
    
    Util.pause(2);

    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
    Util.takeScreenshot();

    Util.switchToBrowser(sessionBrowser1);

    Util.click(repo.createdPostCommentLink(timestamp));

    const timestamp2 = CustomCommand.getTimestamp();

    Util.keys(`${timestamp2}: Comment With Emoji. `);

    Util.keys('Enter');

    Util.takeScreenshot();

    Util.switchToBrowser(sessionBrowser2);

    Util.pause(5);

    Util.click(repo.createdPostCommentLink(timestamp));

    const timestamp3 = CustomCommand.getTimestamp();

    Util.keys(`${timestamp3}: Comment With Emoji. `);

    Util.keys('Enter');

    Util.takeScreenshot();

    Util.closeBrowser();

    Util.switchToBrowser(sessionBrowser1);

    Util.pause(5);

    Util.click(repo.bellIcon);

    Util.waitForDisplayed(repo.createdCommentNotification(timestamp3));
    Util.takeScreenshot();

  });



});