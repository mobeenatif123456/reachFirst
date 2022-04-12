const repo = require('../../../object-repository/object-repo');
const profile = require('../../../config/profile');
const Util = require('../../../utils/utils');
const CustomCommand = require('../../../utils/custom-commands');

describe('integrations', function () {

  // Author: Mobeen Atif
  // Total Test Cases: 1

  let email = profile.network10Admin1.email;
  let password = profile.network10Admin1.password;
  let twitterUsername = 'mobeenatif4';
  let twitterPassword = 'Kabul@123';
  let grpName = null;

  it('verify twitter integration is working', function () {

    CustomCommand.login(profile.url, email, password);
    Util.click(repo.networkDropdown);

    Util.click(repo.manageIntegrations);

    Util.click(repo.allIntegrations);

    Util.waitForDisplayed(repo.twitterIntegrationInSetupIntegration);

    Util.click(repo.twitterIntegrationInSetupIntegration);

    Util.waitForDisplayed(repo.twitterIntegrations);

    const currentConvoWindow = Util.getCurrentWindowHandle();
    console.log('Current Window');


    if (Util.waitForDisplayed(repo.change, 10000, true)) {

      Util.click(repo.change);

    }

    else {

      Util.click(repo.connectToTwiiterAccount, 5000, true);

    }


    Util.pause(2);

    const integrationWindows = Util.getWindowHandles();

    console.log('Twitter integration windows handles', integrationWindows);

    Util.pause(5);

    Util.switchToWindow(integrationWindows[1]);

    //  browser.switchWindow('Twitter / Authorize an application');

    browser.maximizeWindow();

    Util.pause(3);

    Util.setValue(repo.twitterUserName, twitterUsername);
    Util.setValue(repo.twitterPassword, twitterPassword);

    Util.click(repo.authorizeApp);

    Util.pause(3);

    console.log('Before issue');
    console.log('Convo Window Already Created', currentConvoWindow);
    console.log('Get current windows again', Util.getWindowHandles());

    browser.switchWindow('Add Twitter Integration - Convo');

    Util.waitForDisplayed(repo.labelGetTweets);

    Util.setValue(repo.getTweets, '@mobeenatif4');

    Util.click(repo.addNewGroup);

    Util.click(repo.privateGroupIntegration);

    Util.click(repo.nextButtonIntegration);


    grpName = CustomCommand.getTimestamp();

    Util.setValue(repo.grpName, grpName);

    Util.click(repo.createGroupNextButton);

    Util.click(repo.createPrivateGroup);

    Util.waitForDisplayed(repo.twitterGroupName(grpName));

    Util.clearValue(repo.integrationNameForTwitter);

    const twitterName = CustomCommand.getTimestamp();

    Util.setValue(repo.integrationNameForTwitter, twitterName);

    Util.click(repo.saveButtonForTwitter);

    Util.waitForDisplayed(repo.verifyIsTwitterIntegrationGetCreated(twitterName));

    Util.takeScreenshot();

    Util.click(repo.verifyIsTwitterIntegrationGetCreated(twitterName));

    Util.pause(5);

    Util.refresh();

    Util.waitForDisplayed(repo.whatsNew);

    Util.waitForDisplayed(repo.privateGroupsDisplayed);

    Util.waitForDisplayed(repo.verifyIntegrationTitle(twitterName));

    Util.waitForDisplayed(repo.twitterGroupVerification(grpName));

    Util.pause(20);

    const twitterWindow = Util.openNewTabAndSwitch();

    browser.url('https://www.twitter.com');

    if (Util.waitForDisplayed(repo.loginButtonForTwitter, 5000, true)) {

      Util.click(repo.loginButtonForTwitter);

      Util.keys(twitterUsername);

      Util.setValue(repo.passwordInputFieldForTwitter, twitterPassword);

      Util.waitForDisplayed(repo.twitterLoginButton);

      Util.click(repo.twitterLoginButton);

      if (Util.waitForDisplayed(repo.keepAccountSafe, 5000, true)) {

        Util.setValue(repo.textFieldForPhoneNo, '+923335369801');

        Util.click(repo.submit);

      }
    }

    const tweetPost = CustomCommand.getTimestamp();

    Util.setValue(repo.divPostEditor, tweetPost)

    Util.click(repo.tweetButton);

    Util.waitForDisplayed(repo.Tweet(tweetPost));
    Util.takeScreenshot();

    Util.switchToWindow(currentConvoWindow);

    try {

      Util.pause(60);

      Util.waitForDisplayed(repo.tweetPostInConvo(tweetPost));

      Util.takeScreenshot();

      console.log("This is try block");

      Util.click(repo.networkDropdown);

      Util.click(repo.manageIntegrations);

      Util.waitForDisplayed(repo.verifyIsTwitterIntegrationGetCreated(twitterName));

      Util.waitForDisplayed(repo.integrationDropdownTwitter(twitterName));

      Util.click(repo.integrationDropdownTwitter(twitterName));

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


    }
    catch (error) {

      console.log("This is catch block");

      Util.click(repo.networkDropdown);

      Util.click(repo.manageIntegrations);

      Util.waitForDisplayed(repo.verifyIsTwitterIntegrationGetCreated(twitterName));

      Util.waitForDisplayed(repo.integrationDropdownTwitter(twitterName));

      Util.click(repo.integrationDropdownTwitter(twitterName));

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

      throw new Error('Test Case failed because it could not find tweet post in convo.');


    }



  });


});


