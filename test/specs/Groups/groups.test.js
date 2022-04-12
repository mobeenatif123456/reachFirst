const repo = require('../../../object-repository/object-repo');
const profile = require('../../../config/profile');
const Util = require('../../../utils/utils');
const CustomCommand = require('../../../utils/custom-commands');
const utils = require('../../../utils/utils');

describe('groups',function() {

    // Author: Mobeen Atif
  // Total Test Cases: 07

  let grpName = null;

    it('verify public group creation is working fine', function(){

        CustomCommand.login(profile.url,profile.network2Admin1.email,profile.network2Admin1.password);
        const timestamp = CustomCommand.getTimestamp();
        Util.pause(3);
        Util.waitForDisplayed(repo.createNewGroup);
        Util.click(repo.createNewGroup);
        Util.pause(3);
        Util.click(repo.nextButton);
        Util.setValue(repo.grpName,`${timestamp}`);
        Util.pause(2);
        Util.click(repo.nextButtonForGrpCreation);
        Util.pause(2);
        Util.waitForDisplayed(repo.usersListInGroup);
        Util.click(repo.createGroup);
        Util.pause(10);
        Util.waitForDisplayed(repo.grpPost(timestamp));
        Util.takeScreenshot();
        Util.pause(3);
        Util.click(repo.grpPost(timestamp));
        Util.pause(1);
        Util.click(repo.groupToggleDropdown(timestamp));
        Util.pause(3);
        Util.click(repo.deleteGroup);
        Util.pause(1);
        Util.takeScreenshot();
        Util.click(repo.deleteButton);
        Util.pause(3);
        Util.click(repo.grpPost(timestamp));
        Util.waitForDisplayed(repo.grpDeletionVerification);
        Util.click(repo.myFeed);
    });

    it('verify private group creation is working fine', function(){
        Util.pause(3);
        Util.click(repo.createNewGroup);
        Util.click(repo.privateGroup);
        Util.click(repo.nextButton);
        const timestamp = CustomCommand.getTimestamp();
        Util.setValue(repo.grpName,`${timestamp}`);
        Util.pause(2);
        Util.click(repo.nextButtonForGrpCreation);
        Util.pause(2);
        Util.waitForDisplayed(repo.usersListInGroup);
        Util.click(repo.createGroup);
        Util.pause(10);
        Util.waitForDisplayed(repo.grpPost(timestamp));
        Util.takeScreenshot();
        Util.click(repo.seeMorePrivate, 5000, true);
        Util.waitForDisplayed(repo.grpNameInLeftPanel(timestamp));
        Util.pause(3);
        Util.click(repo.grpPost(timestamp));
        Util.click(repo.groupToggleDropdown(timestamp));
        Util.pause(3);
        Util.click(repo.deleteGroup);
        Util.pause(1);
        Util.takeScreenshot();
        Util.click(repo.deleteButton);
        Util.pause(3);
        Util.click(repo.grpPost(timestamp));
        Util.waitForDisplayed(repo.grpDeletionVerification);
        Util.click(repo.myFeed);
    });

    it('create and open post in group feed', function(){
        Util.pause(3);
        Util.click(repo.createNewGroup);
        Util.click(repo.privateGroup);
        Util.click(repo.nextButton);
        const timestamp = CustomCommand.getTimestamp();
        Util.setValue(repo.grpName,`${timestamp}`);
        Util.pause(2);
        Util.click(repo.nextButtonForGrpCreation);
        Util.pause(2);
        Util.waitForDisplayed(repo.usersListInGroup);
        Util.click(repo.createGroup);
        Util.pause(10);
        Util.waitForDisplayed(repo.grpPost(timestamp));
        Util.takeScreenshot();
        Util.pause(3);
        Util.click(repo.grpPost(timestamp));
        Util.pause(2);
        Util.click(repo.inlineInsertTextField);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.pause(1);
        Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post.`);
        Util.pause(3);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
        Util.takeScreenshot();
        Util.pause(5);
        Util.click(repo.sharedPostTitle(timestamp));
        Util.pause(3);
        Util.waitForDisplayed(repo.editButton);
        Util.takeScreenshot();
        browser.back();
        Util.pause(2);
        Util.click(repo.groupToggleDropdown(timestamp));
        Util.pause(3);
        Util.click(repo.deleteGroup);
        Util.pause(1);
        Util.takeScreenshot();
        Util.click(repo.deleteButton);
        Util.pause(10);
        Util.click(repo.grpPost(timestamp));
        Util.waitForDisplayed(repo.grpDeletionVerification);
        Util.click(repo.myFeed);
    });

    it('do not allow creation of duplicated group name', function(){
        Util.pause(3);
        Util.click(repo.createNewGroup);
        Util.pause(3);
        Util.click(repo.nextButton);
        const timestamp = CustomCommand.getTimestamp();
        Util.setValue(repo.grpName,`${timestamp}`);
        Util.pause(2);
        Util.click(repo.nextButtonForGrpCreation);
        Util.pause(2);
        Util.waitForDisplayed(repo.usersListInGroup);
        Util.click(repo.createGroup);
        Util.pause(3);
        Util.waitForDisplayed(repo.grpPost(timestamp));
        Util.takeScreenshot();
        Util.pause(3);
        Util.click(repo.createNewGroup);
        Util.pause(3);
        Util.click(repo.nextButton);
        Util.setValue(repo.grpName,`${timestamp}`);
        Util.pause(2);
        Util.click(repo.nextButtonForGrpCreation);
        Util.waitForDisplayed(repo.groupDuplicationAlert);
        Util.takeScreenshot();
        Util.click(repo.closeIcon);
        Util.pause(3);
        Util.click(repo.grpPost(timestamp));
        Util.pause(2);
        Util.click(repo.groupToggleDropdown(timestamp));
        Util.pause(3);
        Util.click(repo.deleteGroup);
        Util.pause(1);
        Util.takeScreenshot();
        Util.click(repo.deleteButton);
        Util.pause(3);
        Util.click(repo.grpPost(timestamp));
        Util.waitForDisplayed(repo.grpDeletionVerification);
        Util.click(repo.myFeed);
    });

    it('pin and unpin content from top of group', function(){
        Util.pause(3);
        Util.click(repo.createNewGroup);
        Util.pause(3);
        Util.click(repo.nextButton);
        const timestamp = CustomCommand.getTimestamp();
        Util.setValue(repo.grpName,`${timestamp}`);
        Util.pause(2);
        Util.click(repo.nextButtonForGrpCreation);
        Util.pause(2);
        Util.waitForDisplayed(repo.usersListInGroup);
        Util.click(repo.createGroup);
        Util.pause(10);
        Util.click(repo.grpPost(timestamp));
        Util.takeScreenshot();
        Util.pause(3);
        Util.click(repo.groupToggleDropdown(timestamp));
        Util.pause(1);
        Util.click(repo.pinContentToTopOfgrpList);
        Util.setValue(repo.linkTo,"www.google.com");
        Util.pause(5);
        Util.takeScreenshot();
        Util.setValue(repo.textToDisplay,"Google");
        Util.pause(2);
        Util.click(repo.pinToGrp);
        Util.waitForDisplayed(repo.pinnedContentVerification);
        Util.takeScreenshot();
        Util.waitForDisplayed(repo.editOption);
        Util.click(repo.editOption);
        Util.pause(2);
        Util.click(repo.removeLink,20000, true);
        Util.takeScreenshot();
        Util.click(repo.saveChanges, 20000, true);
        Util.pause(2);
        browser.back();
        Util.waitForNotDisplayed(repo.pinnedContentVerification);
        Util.takeScreenshot();
        browser.refresh();
        Util.waitForDisplayed(repo.groupToggleDropdown(timestamp));
        Util.click(repo.groupToggleDropdown(timestamp));
        Util.pause(3);
        Util.click(repo.deleteGroup);
        Util.takeScreenshot();
        Util.pause(1);
        Util.click(repo.deleteButton);
        Util.pause(3);
        Util.click(repo.grpPost(timestamp));
        Util.waitForDisplayed(repo.grpDeletionVerification);
        Util.click(repo.myFeed);
    });

    it('verify group is getting searched', function(){
        Util.pause(3);
        Util.click(repo.createNewGroup);
        Util.pause(3);
        Util.click(repo.nextButton);
        const timestamp = CustomCommand.getTimestamp();
        Util.setValue(repo.grpName,`${timestamp}`);
        Util.pause(2);
        Util.click(repo.nextButtonForGrpCreation);
        Util.pause(2);
        Util.waitForDisplayed(repo.usersListInGroup);
        Util.click(repo.createGroup);
        Util.pause(10);
        Util.waitForDisplayed(repo.grpPost(timestamp));
        Util.takeScreenshot();

        Util.pause(120);
        
        Util.setValue(repo.feedSearchInputField,`${timestamp}`);
        Util.waitForDisplayed(repo.searchedGroupSuggestionGroup(timestamp));
        Util.takeScreenshot();
        Util.click(repo.searchedGroupSuggestionGroup(timestamp));
        Util.click(repo.groupToggleDropdown(timestamp));
        Util.pause(3);
        Util.click(repo.deleteGroup);
        Util.pause(1);
        Util.takeScreenshot();
        Util.click(repo.deleteButton);
        Util.pause(3);
        Util.click(repo.grpPost(timestamp));
        Util.waitForDisplayed(repo.grpDeletionVerification);
        Util.click(repo.myFeed);
    });

    it('pin and unpin group from top of group list', function(){
        Util.pause(3);
        Util.click(repo.createNewGroup);
        Util.pause(3);
        Util.click(repo.nextButton);
        const timestamp = CustomCommand.getTimestamp();
        Util.setValue(repo.grpName,`${timestamp}`);
        Util.pause(2);
        Util.click(repo.nextButtonForGrpCreation);
        Util.pause(2);
        Util.waitForDisplayed(repo.usersListInGroup);
        Util.click(repo.createGroup);
        Util.pause(10);
        Util.waitForDisplayed(repo.grpPost(timestamp));
        Util.takeScreenshot();
        Util.pause(3);
        Util.click(repo.grpPost(timestamp));
        Util.pause(3);
        Util.click(repo.groupToggleDropdown(timestamp));
        Util.pause(1);
        Util.click(repo.pinToTopOfgrpList);
        Util.waitForDisplayed(repo.topPinnedGrpVerification(timestamp));
        Util.takeScreenshot();
        Util.pause(1);
        Util.click(repo.groupToggleDropdown(timestamp));
        Util.pause(1);
        Util.click(repo.unpinToTopofgrpList);
        Util.pause(1);
        browser.refresh();
        Util.pause(5);
        Util.waitForNotDisplayed(repo.topPinnedGrpVerification(timestamp));
        Util.takeScreenshot();
        Util.click(repo.groupToggleDropdown(timestamp));
        Util.pause(3);
        Util.click(repo.deleteGroup);
        Util.pause(1);
        Util.takeScreenshot();
        Util.click(repo.deleteButton);
        Util.pause(3);
        Util.click(repo.grpPost(timestamp));
        Util.waitForDisplayed(repo.grpDeletionVerification);
        Util.click(repo.myFeed);
    });

    it('verify email in functionality is working', function () {

        Util.pause(5);
        Util.click(repo.createNewGroup);
        Util.pause(3);
        Util.click(repo.nextButton);
        grpName = CustomCommand.getTimestamp();
        Util.setValue(repo.grpName,`${grpName}`);
        Util.pause(2);
        Util.click(repo.nextButtonForGrpCreation);
        Util.pause(2);
        Util.waitForDisplayed(repo.usersListInGroup);
        Util.click(repo.createGroup);
        Util.pause(10);
        Util.waitForDisplayed(repo.grpPost(grpName));
        Util.takeScreenshot();
        Util.pause(3);
        Util.click(repo.grpPost(grpName));
        Util.pause(3);
    
        const groupEmail = Util.getText(repo.groupEmail);
        Util.takeScreenshot();


        const userEmail= 'shoaib.kiyani.convo2@gmail.com';
        const emailPassword= 'pakistani007009';
        const emailSubject = CustomCommand.getTimestamp(); 
        const emailBody = 'This is a test email from yahoo mail to group email address'


        const emailSuccess = browser.call(() => {
          // call your function here

          return CustomCommand.sendEmailThroughGoogleMail(
            userEmail,
            emailPassword,
             groupEmail,
             emailSubject,
             emailBody
          );

        });

        console.log("this is email success status", emailSuccess);
        
        if(emailSuccess){

        Util.pause(300);

        try{

        Util.waitForDisplayed(repo.postCreatedThroughGroupEmail(emailSubject));
        Util.takeScreenshot();

        Util.click(repo.groupToggleDropdown(grpName));
        Util.pause(3);
        Util.click(repo.deleteGroup);
        Util.pause(1);
        Util.takeScreenshot();
        Util.click(repo.deleteButton);
        Util.pause(3);

        }
        catch(error){

        Util.click(repo.groupToggleDropdown(grpName));
        Util.pause(3);
        Util.click(repo.deleteGroup);
        Util.pause(1);
        Util.takeScreenshot();
        Util.click(repo.deleteButton);
        Util.pause(3);

        throw new Error('Email in functionality is not working');

        }
        
        }
        else{

          Util.click(repo.groupToggleDropdown(grpName));
          Util.pause(3);
          Util.click(repo.deleteGroup);
          Util.pause(1);
          Util.takeScreenshot();
          Util.click(repo.deleteButton);
          Util.pause(3);

          throw new Error('Email in functionality is not working');



          
        }

        
    
      });


});
