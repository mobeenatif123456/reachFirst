const repo = require('../../../object-repository/object-repo');
const profile = require('../../../config/profile');
const Util = require('../../../utils/utils');
const CustomCommand = require('../../../utils/custom-commands');
const utils = require('../../../utils/utils');

describe('imap integrations', function() {

  // Author: Mobeen Atif
  // Total Test Cases: 1

  let email = profile.network10Admin1.email;
  let password = profile.network10Admin1.password;

  let grpName= null;
 
  it('verify imap integration is working', function() {

    CustomCommand.login(profile.url, email, password);
    Util.waitForDisplayed(repo.networkDropdown);
    Util.click(repo.networkDropdown);

    Util.waitForDisplayed(repo.manageIntegrations);
    Util.click(repo.manageIntegrations);

    Util.waitForDisplayed(repo.allIntegrations);
    Util.click(repo.allIntegrations);

    Util.pause(30);

    Util.waitForDisplayed(repo.twitterIntegrationInSetupIntegration);

    Util.setValue(repo.searchforIntegrations,'Imap', 90000, true);

    Util.waitForDisplayed(repo.imapIntegrationInSetupIntegration);

    Util.click(repo.imapIntegrationInSetupIntegration);

    Util.waitForDisplayed(repo.imapIntegrations);

    Util.click(repo.selectDropdown);

    Util.click(repo.yahooOption);

    Util.setValue(repo.emailAddressforImap,'qacheckconvo70@yahoo.com');

    const mailClientURL = 'https://mail.yahoo.com';
    const mailClientUserId = 'qacheckconvo70@yahoo.com';
    const mailClientPassword = 'convosignuptest';

    const yahooMailWindow = Util.openNewTabAndSwitch();
    Util.navigateToURL(mailClientURL);
    Util.click(repo.yahooSignInHomeButton, 90000, true);
    Util.setValue(repo.yahooUsernameInputField, mailClientUserId);
    Util.click(repo.yahooSigninNextButton);
    Util.setValue(repo.yahooPasswordInputField, mailClientPassword);
    Util.click(repo.yahooPasswordNextButton);

    if(Util.waitForDisplayed(repo.cancelButtonInYahoo,30000, true))
    {
      Util.click(repo.cancelButtonInYahoo);
      Util.refresh();
      Util.pause(10);
      Util.setValue(repo.yahooUsernameInputField, mailClientUserId);
      Util.click(repo.yahooSigninNextButton);
      Util.pause(10);
      Util.setValue(repo.yahooPasswordInputField, mailClientPassword);
      Util.click(repo.yahooPasswordNextButton);


    }
    Util.waitForDisplayed(repo.yahooHomeButton);

    Util.moveTo(repo.userOption);

    Util.click(repo.accountInfo);

    const windowHandles = Util.getWindowHandles();
    Util.switchToWindow(windowHandles[2]);

    Util.click(repo.accountSecurityForYahoo);

    Util.pause(5);

    Util.click(repo.accessandSecurity);

    Util.keys('End');
    Util.keys('End');
    
    Util.pause(5);

    Util.click(repo.generateAppPasswords);

    Util.click(repo.getStarted, 2000, true);

    const customName = CustomCommand.getTimestamp();

    Util.setValue(repo.customValue, customName);

    Util.click(repo.generate);

    const passwordGenerated= Util.getText(repo.getPassword);
    console.log(passwordGenerated);

    Util.click(repo.doneButton);

    Util.switchToWindow(windowHandles[0]);

    Util.pause(3);

    Util.setValue(repo.passwordImap,passwordGenerated);

    Util.click(repo.authenticateButton);

    Util.click(repo.okButton);

    Util.waitForDisplayed(repo.addGroup);
    Util.click(repo.addGroup);

    Util.click(repo.privateGroupIntegration);

    Util.waitForDisplayed(repo.nextButtonIntegration);
    Util.click(repo.nextButtonIntegration);


    grpName = CustomCommand.getTimestamp();

    Util.setValue(repo.grpName,grpName);

    Util.waitForDisplayed(repo.createGroupNextButton);

    Util.click(repo.createGroupNextButton);

    Util.waitForDisplayed(repo.createPrivateGroup);

    Util.click(repo.createPrivateGroup);

    Util.waitForDisplayed(repo.imapGroupName(grpName));

    Util.click(repo.authenticate);

    Util.click(repo.enableReply);

    Util.clearValue(repo.integrationNameForImap);

    const imapName = CustomCommand.getTimestamp();

    Util.setValue(repo.integrationNameForImap,imapName);

    Util.waitForDisplayed(repo.saveButtonForImap);

    Util.click(repo.saveButtonForImap);

    Util.pause(20);

    if(Util.waitForDisplayed(repo.verifyIsIntegrationGetCreated(imapName),5000,true))
    {

      Util.waitForDisplayed(repo.verifyIsIntegrationGetCreated(imapName));
      Util.takeScreenshot();

      Util.click(repo.verifyIsIntegrationGetCreated(imapName));

      Util.pause(5);
      

    }
    else{

      Util.refresh();
      Util.waitForDisplayed(repo.backToIntegrations);
      Util.click(repo.backToIntegrations);
      Util.waitForDisplayed(repo.configuredIntegrations);
      Util.click(repo.configuredIntegrations);
      Util.waitForDisplayed(repo.verifyIsIntegrationGetCreated(imapName));
      Util.takeScreenshot();
      Util.click(repo.verifyIsIntegrationGetCreated(imapName));
      Util.pause(5);

      

    }
    

    Util.pause(10);

    Util.switchToWindow(windowHandles[1]);
    
    const timestampNew = CustomCommand.getTimestamp(); 
    Util.click(repo.composeButtonYahooMail);
    Util.setValue(repo.messageToFieldYahooMail, 'qacheckconvo70@yahoo.com');
    Util.setValue(repo.messageSubjectFieldYahooMail, 'From Mail Client: ' + timestampNew);
    Util.setValue(repo.messageBodyFieldYahooMail, 'This is a test email from yahoo mail to group email address');
    Util.click(repo.sendButtonYahooEmail);

    Util.switchToWindow(windowHandles[0]);

    try{

      Util.pause(250);

      Util.waitForDisplayed(repo.incomingNoteCreation(timestampNew));
      Util.takeScreenshot();

      console.log("This is try block");

      Util.click(repo.networkDropdown);

      Util.click(repo.manageIntegrations);

      Util.waitForDisplayed(repo.verifyIsIntegrationGetCreated(imapName));

      Util.waitForDisplayed(repo.integrationDropdown(imapName));

      Util.click(repo.integrationDropdown(imapName));

      Util.click(repo.removeThisIntegration);

      Util.click(repo.buttonOk);

      Util.waitForDisplayed(repo.integrationDeletedAlert);

      Util.click(repo.networkLogo);

      Util.pause(5);

      Util.waitForDisplayed(repo.myFeed);

      Util.setValue(repo.feedSearchInputField, grpName);
      Util.pause(2);
      Util.takeScreenshot();

      Util.click(repo.groupSuggestion(grpName));

      Util.click(repo.groupToggleDropdown(grpName));
      Util.pause(3);
      Util.click(repo.deleteGroup);
      Util.pause(1);
      Util.takeScreenshot();
      Util.click(repo.deleteButton);
      Util.pause(3);

      Util.pause(10);

      const newwindowHandles = Util.getWindowHandles();
      Util.switchToWindow(newwindowHandles[2]);

      Util.click(repo.accessandSecurity);

      Util.keys('End');
      Util.keys('End');
    
      Util.pause(5);

      Util.click(repo.generateAppPasswords);

      Util.click(repo.deleteConvoImap(customName));

      Util.pause(2);

      Util.click(repo.deleteButtoninImapYahoo);
      

    }
    catch(error)
    {

      console.log("This is catch block");

      Util.click(repo.networkDropdown);

      Util.click(repo.manageIntegrations);

      Util.waitForDisplayed(repo.verifyIsIntegrationGetCreated(imapName));

      Util.waitForDisplayed(repo.integrationDropdown(imapName));

      Util.click(repo.integrationDropdown(imapName));

      Util.click(repo.removeThisIntegration);

      Util.click(repo.buttonOk);

      Util.waitForDisplayed(repo.integrationDeletedAlert);

      Util.click(repo.networkLogo);

      Util.pause(5);

      Util.waitForDisplayed(repo.myFeed);

      Util.setValue(repo.feedSearchInputField, grpName);
      Util.pause(2);
      Util.takeScreenshot();

      Util.click(repo.groupSuggestion(grpName));

      Util.click(repo.groupToggleDropdown(grpName));
      Util.pause(3);
      Util.click(repo.deleteGroup);
      Util.pause(1);
      Util.takeScreenshot();
      Util.click(repo.deleteButton);
      Util.pause(3);

      Util.pause(10);

      const newwindowHandles = Util.getWindowHandles();
      Util.switchToWindow(newwindowHandles[2]);

      Util.click(repo.accessandSecurity);

      Util.keys('End');
      Util.keys('End');
    
      Util.pause(5);

      Util.click(repo.generateAppPasswords);

      Util.click(repo.deleteConvoImap(customName));

      Util.pause(2);

      Util.click(repo.deleteButtoninImapYahoo);

      throw new Error('Test Case failed because it could not find imap created note in convo.');

    }










  });

  
});


