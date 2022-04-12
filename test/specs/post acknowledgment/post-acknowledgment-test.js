const repo = require('../../../object-repository/object-repo');
const profile = require('../../../config/profile');
const Util = require('../../../utils/utils');
const CustomCommand = require('../../../utils/custom-commands');

describe('post acknowledgment', function () {

  // Author: Mobeen Atif
  // Total Test Cases: 21

  let sessionBrowser1 = null;
  let sessionBrowser2 = null;
  const browserSessions = [];

      it('verify ack type post display only title and other content is hidden', function () {

        CustomCommand.login(profile.url, profile.network5Admin1.email, profile.network5Admin1.password);
        const timestamp = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network5User1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post to execute post acknowledgment test cases.`);
        Util.pause(2);
        Util.click(repo.acknowledgmentCheckbox);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.ackPostCreated(timestamp));


        sessionBrowser1 = Util.getBrowserSession();
        browserSessions.push(sessionBrowser1);
        sessionBrowser2 = Util.openBrowser();
        browserSessions.push(sessionBrowser2);
    
        Util.switchToBrowser(sessionBrowser2);

        CustomCommand.login(profile.url, profile.network5User1.email, profile.network5User1.password);
        Util.waitForDisplayed(repo.ackPostCreated(timestamp));
        Util.waitForDisplayed(repo.acknowledge(timestamp));
        Util.waitForNotDisplayed(repo.acknowledgePostContent(timestamp));

        Util.switchToBrowser(sessionBrowser1);

      });

      it('verify copying link of the post from in feed menu isnt treated as acknowledgment', function () {

        const timestamp = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network5User1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post to execute post acknowledgment test cases.`);
        Util.pause(2);
        Util.click(repo.acknowledgmentCheckbox);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.ackPostCreated(timestamp));

        Util.switchToBrowser(sessionBrowser2);

        Util.waitForDisplayed(repo.ackPostCreated(timestamp));
        Util.waitForDisplayed(repo.acknowledge(timestamp));
        Util.pause(5);
        Util.click(repo.sharedPostElipsesAcknowledge(timestamp));
        Util.click(repo.copyLink);
        Util.pause(3);
        Util.waitForNotDisplayed(repo.acknowledgePostContent(timestamp));
        Util.switchToBrowser(sessionBrowser1);

      });

      it('verify default behaviour of toggle on opening inline insert for logged in user ', function () {

        const timestamp = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network5User1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post to execute post acknowledgment test cases.`);
        Util.pause(2);
        Util.waitForExist(repo.checkBoxForAck);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.ackPostCreated(timestamp));
      

      });

      it('verify editing and sharing ack type post with others is treated as acknowledgment on that post', function () {

        const timestamp = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network5User1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post to execute post acknowledgment test cases.`);
        Util.pause(2);
        Util.click(repo.acknowledgmentCheckbox);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.ackPostCreated(timestamp));

        Util.switchToBrowser(sessionBrowser2);

        Util.waitForDisplayed(repo.ackPostCreated(timestamp));
        Util.waitForDisplayed(repo.acknowledge(timestamp));
        Util.click(repo.sharedPostElipsesAcknowledge(timestamp));
        Util.click(repo.editPostLink);
        Util.pause(3);
        Util.waitForDisplayed(repo.doneButtonInPostDetailView);
        Util.click(repo.doneButtonInPostDetailView);
        Util.waitForDisplayed(repo.editButtonInPostDetailView);
        browser.back();
        Util.waitForDisplayed(repo.acknowledgePostContent(timestamp));
        Util.waitForNotDisplayed(repo.acknowledge(timestamp));

        Util.switchToBrowser(sessionBrowser1);
      

      });

      it('verify muting of the post isnt treated as acknowledgment', function () {

        const timestamp = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network5User1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post to execute post acknowledgment test cases.`);
        Util.pause(2);
        Util.click(repo.acknowledgmentCheckbox);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.ackPostCreated(timestamp));

        Util.switchToBrowser(sessionBrowser2);

        Util.waitForDisplayed(repo.ackPostCreated(timestamp));
        Util.waitForDisplayed(repo.acknowledge(timestamp));
        Util.click(repo.sharedPostElipsesAcknowledge(timestamp));
        Util.click(repo.muteNotifications);
        Util.pause(3);
        Util.waitForNotDisplayed(repo.acknowledgePostContent(timestamp));
        Util.waitForDisplayed(repo.acknowledge(timestamp));

        Util.switchToBrowser(sessionBrowser1);
      

      });

      it('verify opening of ack type post is treated as acknowledgment on that post', function () {

        const timestamp = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network5User1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post to execute post acknowledgment test cases.`);
        Util.pause(2);
        Util.click(repo.acknowledgmentCheckbox);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.ackPostCreated(timestamp));

        Util.switchToBrowser(sessionBrowser2);

        Util.waitForDisplayed(repo.ackPostCreated(timestamp));
        Util.waitForDisplayed(repo.acknowledge(timestamp));
        Util.click(repo.sharedPostElipsesAcknowledge(timestamp));
        Util.click(repo.openPostLinkInPostContextMenu);
        Util.pause(3);
        browser.back();
        Util.waitForDisplayed(repo.acknowledgePostContent(timestamp));
        Util.waitForNotDisplayed(repo.acknowledge(timestamp));

        Util.switchToBrowser(sessionBrowser1);
      

      });

      it('verify starring of the post from in feed menu isnt treated as acknowledgment', function () {

        const timestamp = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network5User1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post to execute post acknowledgment test cases.`);
        Util.pause(2);
        Util.click(repo.acknowledgmentCheckbox);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.ackPostCreated(timestamp));
       
        Util.switchToBrowser(sessionBrowser2);

        Util.waitForDisplayed(repo.ackPostCreated(timestamp));
        Util.waitForDisplayed(repo.acknowledge(timestamp));
        Util.pause(5);
        Util.click(repo.sharedPostElipsesAcknowledge(timestamp));
        Util.click(repo.starThisPostLinkInPostContextMenu);
        Util.pause(3);
        Util.waitForNotDisplayed(repo.acknowledgePostContent(timestamp));
        Util.waitForDisplayed(repo.acknowledge(timestamp));

        Util.switchToBrowser(sessionBrowser1);

      });

      it('verify that for ack type post, the content appears blurred in feed for text', function () {

        const timestamp = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network5User1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post to execute post acknowledgment test cases.`);
        Util.pause(2);
        Util.click(repo.acknowledgmentCheckbox);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.ackPostCreated(timestamp));

        Util.switchToBrowser(sessionBrowser2);

        Util.waitForDisplayed(repo.ackPostCreated(timestamp));
        Util.waitForDisplayed(repo.acknowledgePost(timestamp));

        Util.switchToBrowser(sessionBrowser1);

      });

      it('verify that when logged in user clicks on Acknowledge, post content is shown', function () {

        
        const timestamp = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network5User1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post to execute post acknowledgment test cases.`);
        Util.pause(2);
        Util.click(repo.acknowledgmentCheckbox);
        Util.click(repo.noteShareButton);
        const ackPostCreated = `//div/a/span[contains(text(), "Test Post ${timestamp}")]`;
        Util.waitForDisplayed(repo.ackPostCreated(timestamp));

        Util.switchToBrowser(sessionBrowser2);

        Util.waitForDisplayed(repo.ackPostCreated(timestamp));

        Util.waitForDisplayed(repo.acknowledge(timestamp));
        Util.waitForNotDisplayed(repo.acknowledgePostContent(timestamp));

        Util.click(repo.acknowledge(timestamp));
        Util.waitForDisplayed(repo.acknowledgePostContent(timestamp));

        Util.switchToBrowser(sessionBrowser1);


      });

      it('verify that when logged in user clicks on ACK button on post , the view count is updated', function () {

        
        const timestamp = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network5User1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post to execute post acknowledgment test cases.`);
        Util.pause(2);
        Util.click(repo.acknowledgmentCheckbox);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.ackPostCreated(timestamp));

        Util.switchToBrowser(sessionBrowser2);

        Util.waitForDisplayed(repo.ackPostCreated(timestamp));

        Util.waitForDisplayed(repo.acknowledge(timestamp));
        Util.waitForNotDisplayed(repo.acknowledgePostContent(timestamp));
        Util.click(repo.acknowledge(timestamp));
        Util.waitForDisplayed(repo.acknowledgePostContent(timestamp));
        Util.waitForDisplayed(repo.acknowledgedpostView(timestamp));

        Util.switchToBrowser(sessionBrowser1);

      });

      it('verify the count on list of View by clicking it', function () {

        const timestamp = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network5User1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post to execute post acknowledgment test cases.`);
        Util.pause(2);
        Util.click(repo.acknowledgmentCheckbox);
        Util.click(repo.noteShareButton);
        const ackPostCreated = `//div/a/span[contains(text(), "Test Post ${timestamp}")]`;
        Util.waitForDisplayed(repo.ackPostCreated(timestamp));

        Util.switchToBrowser(sessionBrowser2);

        Util.waitForDisplayed(repo.ackPostCreated(timestamp));
        Util.waitForDisplayed(repo.acknowledge(timestamp));
        Util.waitForNotDisplayed(repo.acknowledgePostContent(timestamp));
        Util.click(repo.acknowledge(timestamp));
        Util.waitForDisplayed(repo.acknowledgePostContent(timestamp));
        Util.waitForDisplayed(repo.acknowledgedpostView(timestamp));

        Util.click(repo.acknowledgedpostView(timestamp));

        Util.waitForDisplayed(repo.likeInfoWrapper);
        
        var count= Util.waitForDisplayed(repo.likeInfoWrapper).getSize();
        console.log(count);
      
        Util.click(repo.crossButton);

        Util.switchToBrowser(sessionBrowser1);

      });

      it('verify that ack post shared in group when acknowledged in feed gets acknowledge in group', function () {

        Util.pause(3);
        Util.click(repo.createNewGroup);
        Util.click(repo.privateGroup);
        Util.click(repo.nextButton);
        const groupName = CustomCommand.getTimestamp();
        Util.setValue(repo.grpName,`${groupName}`);
        Util.pause(2);
        Util.click(repo.nextButtonForGrpCreation);
        Util.pause(2);
        let subdomain= profile.network5Admin1.email;
        console.log(subdomain);
        let newdomain=subdomain.substring(subdomain.indexOf('@') + 1);
        console.log(newdomain);
        let domain= `name@${newdomain}`;

        console.log(domain);
        let teammate= `teammate@${newdomain}`;
        console.log(teammate);

        Util.waitForDisplayed(repo.usersListInGroup);

        Util.click(repo.searchField(domain,teammate));
        Util.setValue(repo.importUser(domain),profile.network5User1.email);
        Util.click(repo.suggestionList);
        Util.pause(3);
        Util.click(repo.createGroup);
        Util.pause(3);
        Util.click(repo.invitationCross);
        Util.waitForDisplayed(repo.grpPost(groupName));
        Util.pause(5);
        Util.click(repo.grpPost(groupName));
        Util.pause(10);

        Util.waitForDisplayed(repo.groupEmailHeading);

        const timestamp = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post to execute post acknowledgment test cases.`);
        Util.pause(2);
        Util.click(repo.acknowledgmentCheckbox);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.ackPostCreated(timestamp));
        Util.click(repo.myFeed);
        Util.switchToBrowser(sessionBrowser2);

        Util.waitForDisplayed(repo.acknowledge(timestamp));
        Util.click(repo.acknowledge(timestamp));
        Util.waitForDisplayed(repo.acknowledgePostContent(timestamp));
        Util.click(repo.grpPost(groupName));
        Util.waitForDisplayed(repo.acknowledgePostContent(timestamp));
        Util.click(repo.myFeed);

        Util.switchToBrowser(sessionBrowser1);

        Util.waitForDisplayed(repo.grpPost(groupName));
        Util.click(repo.grpPost(groupName));

        Util.click(repo.groupToggleDropdown(groupName));

        Util.pause(3);
        Util.click(repo.deleteGroup);
        Util.pause(1);
        Util.takeScreenshot();
        Util.click(repo.deleteButton);
        Util.pause(3);

        
      });

      it('verify that ack post shared in group when acknowledged in group gets acknowledge in feed', function () {

        Util.pause(3);
        Util.click(repo.createNewGroup);
        Util.click(repo.privateGroup);
        Util.click(repo.nextButton);
        const groupName = CustomCommand.getTimestamp();
        Util.setValue(repo.grpName,`${groupName}`);
        Util.pause(2);
        Util.click(repo.nextButtonForGrpCreation);
        Util.pause(2);
        let subdomain= profile.network5Admin1.email;
        console.log(subdomain);
        let newdomain=subdomain.substring(subdomain.indexOf('@') + 1);
        console.log(newdomain);
        let domain= `name@${newdomain}`;
        let teammate= `teammate@${newdomain}`;
        Util.waitForDisplayed(repo.usersListInGroup);
        Util.click(repo.searchField(domain,teammate));
        Util.setValue(repo.importUser(domain),profile.network5User1.email);
        Util.click(repo.suggestionList);
        Util.pause(3);
        Util.click(repo.createGroup);
        Util.pause(3);
        Util.click(repo.invitationCross);
        Util.waitForDisplayed(repo.grpPost(groupName));
        Util.pause(5);
        Util.click(repo.grpPost(groupName));
        Util.pause(10);

        Util.waitForDisplayed(repo.groupEmailHeading);

        const timestamp = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post to execute post acknowledgment test cases.`);
        Util.pause(2);
        Util.click(repo.acknowledgmentCheckbox);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.ackPostCreated(timestamp));
        Util.click(repo.myFeed);

        Util.switchToBrowser(sessionBrowser2);

        Util.waitForDisplayed(repo.acknowledge(timestamp));
        Util.click(repo.grpPost(groupName));
        Util.waitForDisplayed(repo.acknowledge(timestamp));
        Util.click(repo.acknowledge(timestamp));
        Util.waitForDisplayed(repo.acknowledgePostContent(timestamp));
        Util.click(repo.myFeed);
        
        Util.switchToBrowser(sessionBrowser1);

        Util.waitForDisplayed(repo.grpPost(groupName));
        Util.click(repo.grpPost(groupName));

        Util.click(repo.groupToggleDropdown(groupName));

        Util.pause(3);
        Util.click(repo.deleteGroup);
        Util.pause(1);
        Util.takeScreenshot();
        Util.click(repo.deleteButton);
        Util.pause(3);



      });

      it('verify opening of ack type post from notification is treated as acknowledgment on that post', function () {

        const timestamp = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network5User1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post to execute post acknowledgment test cases.`);
        Util.pause(2);
        Util.click(repo.acknowledgmentCheckbox);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.ackPostCreated(timestamp));

        Util.switchToBrowser(sessionBrowser2);

        Util.waitForDisplayed(repo.ackPostCreated(timestamp));
        Util.waitForDisplayed(repo.acknowledge(timestamp));
        Util.click(repo.bellIcon);
        Util.waitForDisplayed(repo.acknowledgePostInNotification(timestamp));
        Util.click(repo.acknowledgePostInNotification(timestamp));
        Util.pause(3);
        browser.back();
        Util.waitForNotDisplayed(repo.acknowledge(timestamp));
        Util.waitForDisplayed(repo.acknowledgePostContent(timestamp));

      });

      it('admin mode behavior', function () {

        const timestamp = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network5Admin1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post to execute post acknowledgment test cases.`);
        Util.pause(2);
        Util.click(repo.acknowledgmentCheckbox);
        Util.click(repo.noteShareButton);

        Util.waitForDisplayed(repo.ackPostCreated(timestamp));

        Util.switchToBrowser(sessionBrowser1);

        Util.waitForDisplayed(repo.acknowledge(timestamp));

        Util.click(repo.profileImageDropdown);

        Util.click(repo.enterAdminMode);

        Util.waitForDisplayed(repo.exitAdminMode);

        Util.pause(5);

        Util.click(repo.exitAdminMode);

      });

      it('verify if post creator edit post then option Recipients must acknowledge to view the post should not appear in edit view', function () {

        const timestamp = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network5User1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post to execute post acknowledgment test cases.`);
        Util.pause(2);
        Util.click(repo.acknowledgmentCheckbox);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.ackPostCreated(timestamp));

        Util.pause(2);
        Util.click(repo.sharedPostElipses(timestamp));
        Util.takeScreenshot();
        Util.click(repo.editPostLinkInPostContextMenu);
        Util.pause(2);

        Util.waitForNotDisplayed(repo.receipientsMustAckLabel);

        browser.back();

      });

      it('Verify like unlike button for gallery items', function () {

        const imageUploadFileName = 'mario.jpg';

        const timestamp = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network5User1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        

        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp}: This post will have an image file attachment.`);
        Util.pause(2);

        Util.uploadFile(repo.feedFileUploadInputField, Util.getResourcePath(imageUploadFileName));
        Util.waitForDisplayed(repo.fileUploadAndConversionSuccess);

        Util.pause(2);
        Util.click(repo.acknowledgmentCheckbox);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.ackPostCreated(timestamp));

        Util.switchToBrowser(sessionBrowser2);

        Util.waitForDisplayed(repo.acknowledge(timestamp));

        Util.click(repo.acknowledge(timestamp));

        Util.click(repo.sharedPostWithImageFileAttachment(timestamp));
        expect(Util.getText(repo.galleryViewFileName)).toBe(imageUploadFileName);

        Util.waitForDisplayed(repo.likeButtonInPostDetailView);
        Util.click(repo.likeButtonInPostDetailView);

        Util.waitForDisplayed(repo.unlikeButton);

        browser.back();

      });

      it('verify location is also hidden under blur image', function () {

        Util.switchToBrowser(sessionBrowser1);

        const timestamp = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network5User1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        

        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp}: This post will have an image file attachment.`);
      
        Util.pause(2);
        Util.click(repo.acknowledgmentCheckbox);

        Util.waitForDisplayed(repo.locationIcon);
        Util.click(repo.locationIcon);
        Util.pause(3);
        Util.waitForDisplayed(repo.fetchedLocationAckPost);

        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.ackPostCreated(timestamp));

        Util.switchToBrowser(sessionBrowser2);

        Util.waitForDisplayed(repo.acknowledge(timestamp));

        Util.waitForNotDisplayed(repo.ackPostWithLocation(timestamp));

        Util.click(repo.acknowledge(timestamp));

        Util.waitForDisplayed(repo.ackPostWithLocation(timestamp));

        Util.switchToBrowser(sessionBrowser1);

  
      });


      it('Verify that logged in user can share a note with ack option disabled', function () {

        const timestamp = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network5User1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        

        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp}: This post will have an image file attachment.`);
        Util.pause(2);

        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.ackPostCreated(timestamp));

        Util.switchToBrowser(sessionBrowser2);
        Util.waitForNotDisplayed(repo.acknowledge(timestamp));

        Util.switchToBrowser(sessionBrowser1);

  
      });


      it('verify that logged in user can share a note with ack option enabled', function () {

        const timestamp = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network5User1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        

        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp}: This post will have an image file attachment.`);
        Util.pause(2);

        Util.pause(2);
        Util.click(repo.acknowledgmentCheckbox);

        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.ackPostCreated(timestamp));

        Util.switchToBrowser(sessionBrowser2);

        Util.waitForDisplayed(repo.acknowledge(timestamp));

        Util.switchToBrowser(sessionBrowser1);

  
      });


      it('verify that this option appears in draft view of a post on opening it in edit mode', function () {

        const timestamp = CustomCommand.getTimestamp();    
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network5User1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2);
        

        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp}: This post will have an image file attachment.`);
        Util.pause(2);

        Util.waitForDisplayed(repo.savedInDrafts);
        Util.click(repo.draftsLink);
        Util.waitForDisplayed(repo.draftAckPost(timestamp));

        Util.click(repo.draftAckPost(timestamp));

        Util.waitForDisplayed(repo.publishPost);

        Util.pause(5);

        browser.back();

        Util.click(repo.myFeed);

        Util.switchToBrowser(sessionBrowser2);

        Util.closeBrowser();

        Util.switchToBrowser(sessionBrowser1);

    
      });

      after(function() {
        if (this.currentTest.state === 'failed') {
          browserSessions.forEach((browserSession) => {
            try {
              Util.switchToBrowser(browserSession);
              browser.deleteSession();
              console.log('INFO:', 'Closing browser due to failure of test case.');  
            } catch (error) {}
          });
        }
      });


});
