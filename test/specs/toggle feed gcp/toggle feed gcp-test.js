const repo = require('../../../object-repository/object-repo');
const profile = require('../../../config/profile');
const Util = require('../../../utils/utils');
const CustomCommand = require('../../../utils/custom-commands');
const utils = require('../../../utils/utils');

describe ('toggle feed', function () {

  // Author: Mobeen Atif
  // Total Test Cases: 19

      it ('verify that by default latest activity is selected for toggle feed', function () {
  
        CustomCommand.login(profile.url, profile.network7Admin1.email, profile.network7Admin1.password);
        Util.waitForDisplayed(repo.latestActivity);
      
      });

      it ('verify that latest activity of editing a post content shows that post on top of feed', function () {
  
        const timestamp = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network7Admin1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post to execute left panel test cases.`);
        Util.pause(2);
        Util.click(repo.noteShareButton);
        const sharedPostTitleXpath= `//div/a/span[contains(text(),"${timestamp}")]`;
        Util.waitForDisplayed(repo.sharedPostTitleXpath(timestamp));
        Util.takeScreenshot();

        const timestamp2 = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network7Admin1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp2}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp2} : This is a test post to execute left panel test cases.`);
        Util.pause(2);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitle2(timestamp2));
        Util.takeScreenshot();

        Util.click(repo.sharedPostTitleXpath(timestamp));
        Util.waitForDisplayed(repo.editButtonInPostDetailView);
        Util.click(repo.editButtonInPostDetailView);
        Util.setValue(repo.postEditor,"This post is edited now:");
        Util.click(repo.doneButtonInPostDetailView);
        browser.back();
        Util.takeScreenshot();

        Util.waitForDisplayed(repo.sharedPostTitleToggleFeed(timestamp));
      
      });

      it ('verify that latest activity of editing a comment shows that post on top of feed', function () {
  
        const timestamp = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network7Admin1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post to execute left panel test cases.`);
        Util.pause(2);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitleToggleFeed(timestamp));
        Util.takeScreenshot();
        Util.pause(2);
        Util.click(repo.commentOfFirstPost(timestamp));
        Util.pause(1);
        browser.keys(timestamp);
        browser.keys('Enter');
        Util.takeScreenshot();


        const timestamp2 = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network7Admin1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post ${timestamp2}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp2} : This is a test post to execute left panel test cases.`);
        Util.pause(2);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitleToggleFeed(timestamp2));
        Util.takeScreenshot();

        Util.click(repo.sharedPostTitleXpath(timestamp));
        Util.waitForDisplayed(repo.editButtonInPostDetailView);
        Util.moveTo(repo.commentInDetailView(timestamp));

        Util.click(repo.commentDropdownelipses(timestamp));
        Util.click(repo.editCommentLinkPostDetailView);
        Util.clearValue(repo.postCommentInputField);
        Util.pause(3);
        Util.click(repo.postCommentInputField, 20000, true);
        Util.setValue(repo.postCommentInputField, `Comment Edited: ${timestamp}`);
        Util.keys('Enter');
        Util.waitForDisplayed(repo.editedComment(timestamp));
        browser.back();
        
        Util.waitForDisplayed(repo.sharedPostTitleToggleFeed(timestamp));
        Util.takeScreenshot();
      
      });

      it ('verify that latest activity of modifying recepient list from detail view shows that post on top of feed', function () {
  
        const timestamp = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network7Admin1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post to execute left panel test cases.`);
        Util.pause(2);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitleXpath(timestamp));
        Util.takeScreenshot();

        const timestamp2 = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network7Admin1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post ${timestamp2}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp2} : This is a test post to execute left panel test cases.`);
        Util.pause(2);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitle2(timestamp2));
        Util.takeScreenshot();

        Util.click(repo.sharedPostTitleXpath(timestamp));
        Util.waitForDisplayed(repo.editButtonInPostDetailView);
        Util.click(repo.editButtonInPostDetailView);
        Util.pause(3);
        Util.setValue(repo.postEditor,`This post is edited now: @${profile.network7User1.firstName} ${profile.network7User1.lastName}`);
        Util.pause(3);
        browser.keys('Enter');
        Util.click(repo.doneButtonInPostDetailView);
        browser.back();
        Util.waitForDisplayed(repo.sharedPostTitleToggleFeed(timestamp));
        Util.takeScreenshot();
      
      });

      it ('verify that latest activity of new post is showing that post on top of feed', function () {
  
        const timestamp = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network7Admin1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post to execute left panel test cases.`);
        Util.pause(2);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitleToggleFeed(timestamp));
        Util.takeScreenshot();

        const timestamp2 = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network7Admin1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post ${timestamp2}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp2} : This is a test post to execute left panel test cases.`);
        Util.pause(2);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitleToggleFeed(timestamp2));
        Util.takeScreenshot();
      
      });

      it ('verify that latest activity of sharing post with others shows that post on top of feed', function () {
  
        const timestamp = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network7Admin1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post to execute left panel test cases.`);
        Util.pause(2);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitleXpath(timestamp));
        Util.takeScreenshot();

        
        const timestamp2 = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network7Admin1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post ${timestamp2}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp2} : This is a test post to execute left panel test cases.`);
        Util.pause(2);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitle2(timestamp2));
        Util.takeScreenshot();

        Util.pause(2);

        Util.click(repo.sharedPostElipses(timestamp));
        Util.pause(2);

        Util.click(repo.shareWithOthers);

        Util.setValue(repo.shareWithOthersInputField2, profile.network7User1.email);

        Util.pause(4);
        Util.click(repo.suggestedPostRecipient);
        Util.takeScreenshot();
        Util.click(repo.publish);
        Util.waitForDisplayed(repo.updatingSharingInfoSuccessMessage);

        Util.pause(2);

        Util.waitForDisplayed(repo.sharedPostTitleToggleFeed(timestamp));
      
      });

      it ('verify that latest activity of new comment on previous post is showing that previous post on top of feed', function () {
  
        const timestamp = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network7Admin1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post to execute left panel test cases.`);
        Util.pause(2);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitleXpath(timestamp));
        Util.takeScreenshot();

        Util.pause(2);
        Util.click(repo.commentOfFirstPost(timestamp));
        Util.pause(1);
        browser.keys(timestamp);
        browser.keys('Enter');

        Util.waitForDisplayed(repo.feedViewCreatedComment(timestamp));
        Util.takeScreenshot();


        const timestamp2 = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network7Admin1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post ${timestamp2}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp2} : This is a test post to execute left panel test cases.`);
        Util.pause(2);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitle2(timestamp2));
        Util.takeScreenshot();

        Util.pause(2);

        Util.click(repo.commentOfFirstPost(timestamp));
        Util.pause(1);
        browser.keys(timestamp);
        browser.keys('Enter');

        Util.pause(2);
        
        Util.waitForDisplayed(repo.sharedPostTitleToggleFeed(timestamp));
      
      });

      it ('verify that latest activity of reply to comment on previous post shows that previous post on top of feed', function () {
  
        const timestamp = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network7Admin1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post to execute left panel test cases.`);
        Util.pause(2);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitleXpath(timestamp));
        Util.takeScreenshot();

        Util.pause(2);

        Util.click(repo.commentOfFirstPost(timestamp));
        Util.pause(1);
        browser.keys(timestamp);
        browser.keys('Enter');

        Util.waitForDisplayed(repo.feedViewCreatedComment(timestamp));
        Util.takeScreenshot();


        const timestamp2 = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network7Admin1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post ${timestamp2}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp2} : This is a test post to execute left panel test cases.`);
        Util.pause(2);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitle2(timestamp2));
        Util.takeScreenshot();

        Util.click(repo.feedViewCreatedCommentReplyLink(timestamp));
        Util.keys(`${timestamp}: Reply From Second User.`);
        Util.keys('Enter');
        
        Util.waitForDisplayed(repo.sharedPostTitleToggleFeed(timestamp));
      
      });

      it('verify that latest post option exists in dropdown', function () {
  
        Util.click(repo.latestActivityDropdown);
        Util.waitForDisplayed(repo.latestPost);
      
      });

      it('verify that on app refresh, filter remains the latest post', function () {
  
        Util.pause(2);
        Util.click(repo.latestPost);
        Util.refresh();
        Util.waitForDisplayed(repo.latestPostFilter);

      });

      it ('verify that feed is bumping in case of new post with latest post filter', function () {

        Util.pause(3);
        const timestamp = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network7Admin1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post to execute left panel test cases.`);
        Util.pause(2);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitleToggleFeed(timestamp));
        Util.takeScreenshot();

        const timestamp2 = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network7Admin1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post ${timestamp2}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp2} : This is a test post to execute left panel test cases.`);
        Util.pause(2);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitleToggleFeed(timestamp2));

      });

      it ('verify that feed is not bumping in case of comment edit with latest post filter', function () {

        const timestamp = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network7Admin1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post to execute left panel test cases.`);
        Util.pause(2);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitleToggleFeed(timestamp));
        Util.takeScreenshot();
        Util.pause(2);
        Util.click(repo.commentOfFirstPost(timestamp));
        Util.pause(1);
        browser.keys(timestamp);
        browser.keys('Enter');
        Util.takeScreenshot();


        const timestamp2 = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network7Admin1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post ${timestamp2}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp2} : This is a test post to execute left panel test cases.`);
        Util.pause(2);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitleToggleFeed(timestamp2));
        Util.takeScreenshot();

        Util.click(repo.sharedPostTitleXpath(timestamp));
        Util.waitForDisplayed(repo.editButtonInPostDetailView);
        Util.moveTo(repo.commentInDetailView(timestamp));

        Util.click(repo.commentDropdownelipses(timestamp));
        Util.click(repo.editCommentLinkPostDetailView);
        Util.clearValue(repo.postCommentInputField);
        Util.pause(3);
        Util.click(repo.postCommentInputField, 20000, true);
        Util.setValue(repo.postCommentInputField, `Comment Edited: ${timestamp}`);
        Util.keys('Enter');
        Util.waitForDisplayed(repo.editedComment(timestamp));
        Util.takeScreenshot();
        browser.back();

        Util.waitForNotDisplayed(repo.sharedPostTitleToggleFeed(timestamp));

      });

      it ('verify that feed is not bumping in case of edit post with latest post filter', function () {

        const timestamp = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network7Admin1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post to execute left panel test cases.`);
        Util.pause(2);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitleXpath(timestamp));
        Util.takeScreenshot();

        const timestamp2 = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network7Admin1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post ${timestamp2}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp2} : This is a test post to execute left panel test cases.`);
        Util.pause(2);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitle2(timestamp2));
        Util.takeScreenshot();

        Util.click(repo.sharedPostTitleXpath(timestamp));
        Util.waitForDisplayed(repo.editButtonInPostDetailView);
        Util.click(repo.editButtonInPostDetailView);
        Util.setValue(repo.postEditor,"This post is edited now:");
        Util.click(repo.doneButtonInPostDetailView);
        browser.back();
        Util.waitForNotDisplayed(repo.sharedPostTitleToggleFeed(timestamp));

      });

      it ('verify that feed is not bumping in case of latest post modifying recepient with latest post filter', function () {

      
        const timestamp = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network7Admin1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post to execute left panel test cases.`);
        Util.pause(2);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitleToggleFeed(timestamp));

        Util.waitForDisplayed(repo.sharedPostTitleXpath(timestamp));
        Util.takeScreenshot();

        const timestamp2 = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network7Admin1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post ${timestamp2}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp2} : This is a test post to execute left panel test cases.`);
        Util.pause(2);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitleToggleFeed(timestamp2));
        Util.takeScreenshot();

        Util.pause(2);

        Util.click(repo.commentOfFirstPost(timestamp));
        Util.pause(1);

        browser.keys(`@${profile.network7User1.firstName} ${profile.network7User1.lastName}`);

        Util.pause(1);
        browser.keys('Enter');

        browser.keys('Enter');
        Util.takeScreenshot();

        Util.waitForNotDisplayed(repo.sharedPostTitleToggleFeed(timestamp));

      });

      it ('verify that feed is not bumping in case of latest post modifying recepient in detail view with latest post filter', function () {

      
        const timestamp = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network7Admin1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post to execute left panel test cases.`);
        Util.pause(2);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitleXpath(timestamp));
        Util.takeScreenshot();

        const timestamp2 = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network7Admin1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post ${timestamp2}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp2} : This is a test post to execute left panel test cases.`);
        Util.pause(2);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitle2(timestamp2));
        Util.takeScreenshot();

        Util.click(repo.sharedPostTitleXpath(timestamp));
        Util.waitForDisplayed(repo.editButtonInPostDetailView);
        Util.click(repo.editButtonInPostDetailView);
        Util.pause(3);
        Util.setValue(repo.postEditor,`This post is edited now: @${profile.network7User1.firstName} ${profile.network7User1.lastName}`);
        Util.pause(3);
        browser.keys('Enter');
        Util.click(repo.doneButtonInPostDetailView);
        browser.back();
        Util.waitForNotDisplayed(repo.sharedPostTitleToggleFeed(timestamp));
        

      });

      it ('verify that feed is not bumping in case of reply to comment on previous post with latest post filter', function () {


      
        const timestamp = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network7Admin1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post to execute left panel test cases.`);
        Util.pause(2);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitleXpath(timestamp));
        Util.takeScreenshot();

        Util.pause(2);

        Util.click(repo.commentOfFirstPost(timestamp));

        Util.pause(1);

        browser.keys(timestamp);
        browser.keys('Enter');

        Util.waitForDisplayed(repo.feedViewCreatedComment(timestamp));
        Util.takeScreenshot();


        const timestamp2 = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network7Admin1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post ${timestamp2}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp2} : This is a test post to execute left panel test cases.`);
        Util.pause(2);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitle2(timestamp2));
        Util.takeScreenshot();

        Util.click(repo.feedViewCreatedCommentReplyLink(timestamp));
        Util.keys(`${timestamp}: Reply From Second User.`);
        Util.keys('Enter');
        
        Util.waitForNotDisplayed(repo.sharedPostTitleToggleFeed(timestamp));
        

      });

      it ('verify that feed is not bumping on new comment on previous post with latest post filter', function () {

        const timestamp = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network7Admin1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post to execute left panel test cases.`);
        Util.pause(2);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitleXpath(timestamp));
        Util.takeScreenshot();

        Util.pause(2);

        Util.click(repo.commentOfFirstPost(timestamp));
        Util.pause(1);
        browser.keys(timestamp);
        browser.keys('Enter');

        Util.waitForDisplayed(repo.feedViewCreatedComment(timestamp));
        Util.takeScreenshot();


        const timestamp2 = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network7Admin1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post ${timestamp2}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp2} : This is a test post to execute left panel test cases.`);
        Util.pause(2);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitle2(timestamp2));
        Util.takeScreenshot();

        Util.pause(2);

        Util.click(repo.commentOfFirstPost(timestamp));
        browser.keys(timestamp);
        browser.keys('Enter');

        Util.pause(2);
        
        Util.waitForNotDisplayed(repo.sharedPostTitleToggleFeed(timestamp));
        

      });

      it ('verify that feed is not bumping in case of sharing with others with latest post filter', function () {

        const timestamp = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network7Admin1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post to execute left panel test cases.`);
        Util.pause(2);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitleXpath(timestamp));
        Util.takeScreenshot();

        
        const timestamp2 = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network7Admin1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post ${timestamp2}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp2} : This is a test post to execute left panel test cases.`);
        Util.pause(2);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitle2(timestamp2));
        Util.takeScreenshot();

        Util.pause(2);
        Util.pause(2);

        Util.click(repo.sharedPostElipses(timestamp));
        Util.pause(2);

        Util.click(repo.shareWithOthers);

        Util.setValue(repo.shareWithOthersInputField2, profile.network7User1.email);

        Util.pause(4);
        Util.click(repo.suggestedPostRecipient);
        Util.takeScreenshot();
        Util.click(repo.publish);
        Util.waitForDisplayed(repo.updatingSharingInfoSuccessMessage);

        Util.pause(2);
        Util.waitForNotDisplayed(repo.sharedPostTitleToggleFeed(timestamp));
        

      });

      it ('verify that latest post shows on top of feed', function () {

        const timestamp = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network7Admin1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post to execute left panel test cases.`);
        Util.pause(2);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitleXpath(timestamp));
        Util.takeScreenshot();

        
        const timestamp2 = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network7Admin1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post ${timestamp2}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp2} : This is a test post to execute left panel test cases.`);
        Util.pause(2);
        Util.click(repo.noteShareButton);
        
        const sharedPostTitle2 = `(//div[@class="title-text"])[1]/a/span[contains(text(),"${timestamp2}")]`;
        Util.waitForDisplayed(repo.sharedPostTitleToggleFeed(timestamp2));
        

      });



});