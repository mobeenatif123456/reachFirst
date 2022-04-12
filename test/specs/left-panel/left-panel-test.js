let repo = require('../../../object-repository/object-repo');
let profile = require('../../../config/profile');
let Util = require('../../../utils/utils');
let CustomCommand = require('../../../utils/custom-commands');

describe('left panel', function () {

  // Author: Mobeen Atif
  // Total Test Cases: 05

      it('verify deletion of post moves it to trash', function () {

        CustomCommand.login(profile.url, profile.network1Admin1.email, profile.network1Admin1.password);
        const timestamp = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network1Admin1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post to execute left panel test cases.`);
        Util.pause(2);
        Util.takeScreenshot();
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
        Util.pause(2);
        Util.takeScreenshot();
        Util.pause(2);
        Util.click(repo.sharedPostElipses(timestamp));
        Util.click(repo.deletePostLinkInPostContextMenu);
        Util.pause(1);
        Util.waitForNotDisplayed(repo.sharedPostTitle(timestamp));
        Util.takeScreenshot();
        Util.click(repo.trashFeed);
        Util.takeScreenshot();
        Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
        Util.click(repo.myFeed);
        Util.pause(4);

      });

      it('verify mentions functionality is working', function () {

        const timestamp = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network1Admin1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post to execute left panel test cases.`);
        Util.pause(2);
        Util.takeScreenshot();
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
        Util.pause(2);
        Util.click(repo.mentions);
        Util.takeScreenshot();
        Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
        Util.click(repo.myFeed);
        Util.pause(2);

      });

      it('verify permanently deleted post functionality is working', function () {

        const timestamp = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network1Admin1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post to execute left panel test cases.`);
        Util.pause(2);
        Util.takeScreenshot();
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
        Util.pause(2);
        Util.pause(2);
        Util.click(repo.sharedPostElipses(timestamp));
        Util.click(repo.deletePostLinkInPostContextMenu);
        Util.pause(1);
        Util.waitForNotDisplayed(repo.sharedPostTitle(timestamp));
        Util.takeScreenshot();
        Util.click(repo.trashFeed);
        Util.takeScreenshot();
        Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
        Util.click(repo.sharedPostElipses(timestamp));
        Util.click(repo.deletePermanently);
        Util.waitForNotDisplayed(repo.sharedPostTitle(timestamp));
        Util.takeScreenshot();
        Util.click(repo.myFeed);
        Util.pause(3);


      });

      it('verify restore deleted post functionality is working', function () {

        const timestamp = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network1Admin1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post to execute left panel test cases.`);
        Util.pause(2);
        Util.takeScreenshot();
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
        Util.pause(2);
        Util.takeScreenshot();
        Util.click(repo.sharedPostElipses(timestamp));
        Util.click(repo.deletePostLinkInPostContextMenu);
        Util.pause(1);
        Util.waitForNotDisplayed(repo.sharedPostTitle(timestamp));
        Util.takeScreenshot();
        Util.click(repo.trashFeed);
        Util.takeScreenshot();
        Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
        Util.click(repo.sharedPostElipses(timestamp));
        Util.click(repo.restorePost);
        Util.takeScreenshot();
        Util.click(repo.myFeed);
        Util.pause(3);
        Util.takeScreenshot();
        Util.waitForDisplayed(repo.sharedPostTitle(timestamp));


      });

      it('verify starring post functionality is working', function () {

        const timestamp = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network1Admin1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post to execute left panel test cases.`);
        Util.pause(2);
        Util.takeScreenshot();
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
        Util.pause(2);
        Util.click(repo.sharedPostElipses(timestamp));
        Util.takeScreenshot();
        Util.click(repo.starThisPost);
        Util.pause(1);
        Util.click(repo.starred);
        Util.pause(3);
        Util.takeScreenshot();
        Util.waitForDisplayed(repo.sharedPostTitle(timestamp));


      });

});