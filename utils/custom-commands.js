const repo = require('./../object-repository/object-repo');
const Util = require('./../utils/utils');
const profile = require('./../config/profile');
const nodemailer = require("nodemailer");
const fs = require('fs');
const path = require('path');

class CustomCommand {

  login(url, email, password) {
    browser.maximizeWindow();
    browser.url(url);
    Util.setValue(repo.emailInputField, email);
    Util.setValue(repo.passwordInputField, password);
    Util.takeScreenshot();
    Util.click(repo.signInButton);
    Util.pause(10);
    Util.waitForDisplayed(repo.whatsNew);
    Util.waitForDisplayed(repo.privateGroupsDisplayed);
    return true;
  }

  getTimestamp() {
    return new Date().getTime().toString();
  }

  createPrivateGroup(groupName, emailOfInvitedUserInGroup) {

    // This function will create a private group and verify whether private group post is created and shown in feed view.
    // If inviteUserInGroupEmail field value is provided then that user will be invited during group creation.

    Util.click(repo.addGroupIcon);
    Util.click(repo.groupTypePrivateGroup);
    Util.click(repo.groupCreationNextButton);
    Util.setValue(repo.groupNameInputField, groupName);
    Util.click(repo.groupCreationNextButton);


    if (emailOfInvitedUserInGroup) {

      Util.waitForDisplayed(repo.usersListInGroup);
      Util.click(repo.inviteTeammatesToGroupInputLinkDuringGroupCreation);
      Util.keys(emailOfInvitedUserInGroup);
      Util.click(repo.userSuggestionForGroup(emailOfInvitedUserInGroup));
    }

    Util.click(repo.createGroupButton);
    Util.pause(10);
    Util.click(repo.crossIconOninvitationSentModalForInviteUsersInGroup, 100000, true);
    Util.waitForDisplayed(repo.createGroupLinkInSharedPost(groupName));
    Util.takeScreenshot();
    return groupName;
  }

  createTextPostAndGetItsPath(timestamp, recipient, postTitle, postBody) {

    Util.click(repo.inlineInsertTextField);

    let title = null;

    if (postTitle) {
      title = `${postTitle}`;
    } else {
      title = `Test Post: ${timestamp}`;
    }

    Util.setValue(repo.noteTitleInputField, title);

    let body = null;

    if (postBody) {
      body = `${postBody}`;
    } else {
      body = `${timestamp}: This is a test post by automation script. Please ignore it.`
    }

    Util.setValue(repo.noteBodyInputField, body);

    Util.pause(2);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, recipient);
    Util.click(repo.suggestedPostRecipient);
    Util.pause(2);
    Util.click(repo.noteShareButton);

    let sharedPostTitle = `//div/a/span[contains(text(), 'Test Post: ${timestamp}')]`;

    return sharedPostTitle;

  }

  signupUserOnNewNetworkWithoutProfilePicAndGroupCreation() {

    // The method will signup a network user having random email with mailpoof.com domain.
    const signupUserEmail = createFakeEmailAccount();

    const emailWindowHandle = Util.getCurrentWindowHandle();
    const convoWindowHandle = Util.openNewTabAndSwitch();

    browser.url(profile.url);

    Util.click(repo.signupNowLink);
    console.log('Signup Email:', signupUserEmail);
    Util.setValue(repo.signupEmailInputField, signupUserEmail);
    Util.click(repo.signupButton);
    Util.pause(2);

    for (let i = 0; i < 10; i++) {

      if (i === 10) { throw new Error('Verification code not received from convo.'); }

      Util.switchToWindow(emailWindowHandle);
      Util.pause(30);

      const mailPoofRefreshLink = `//span[text()='Refresh']`;
      Util.click({ mailPoofRefreshLink });

      let verificationCode = null;

      const emailSubject = `(//div[@id='mails']/div/div[@class='subject'])[1]`;
      try { verificationCode = Util.getText(emailSubject, 5000).match(/\d.*/g)[0]; } catch (error) { }

      if (verificationCode) {

        console.log('Verification Code:', verificationCode);
        Util.takeScreenshot();
        Util.switchToWindow(convoWindowHandle);
        Util.clearValue(repo.verificationCodeInputField);
        Util.setValue(repo.verificationCodeInputField, verificationCode);
        Util.click(repo.verifyButton);
        Util.takeScreenshot();

        try {
          Util.waitForDisplayed(repo.welcomeTitleForNewNetwork, 5000);
          console.log('Verification Code:', 'Correct');
          break;
        } catch (error) {
          console.log('Verification Code:', 'Not Correct');
          Util.click(repo.clickHereLinkToResendVerficationCodeEmail);
          Util.waitForDisplayed(repo.verificationCodeSentSuccessMessage);
          continue;
        }

      }

      if (!verificationCode) {
        console.log('Verification Code:', 'Not Received');
        Util.switchToWindow(convoWindowHandle);
        Util.click(repo.clickHereToResendLink);
        Util.waitForDisplayed(repo.verificationCodeSentSuccessMessage);
      }


    }

    // Continue signup after verification process.

    const signupUserFirstName = 'Automation';
    const signupUserLastName = 'Tester';
    const signupUserPosition = 'Load Tester';

    Util.setValue(repo.signupFirstNameInputField, signupUserFirstName);
    Util.setValue(repo.signupLastNameInputField, signupUserLastName);
    Util.setValue(repo.signupJobTitleInputField, signupUserPosition);
    Util.setValue(repo.signupPasswordInputField, '123456');

    Util.click(repo.signupNextButton);
    Util.click(repo.signupSkipThisForNowProfilePictureLink);
    Util.click(repo.signupSkipThisForNowGroupCreationLink);

    Util.click(repo.signupGetStartedLink);

    try { Util.click(repo.signupPolicyAcceptButton, 5000); } catch (error) { }

    Util.click(repo.signupCompletionScreenCrossIcon);
    Util.pause(5);
    Util.click(repo.signupClickHereLink);
    Util.pause(5);
    Util.waitForDisplayed(repo.signupConvoGettingStartedPlaylistPost);
    Util.takeScreenshot();

    return signupUserEmail;
  }

  signupUserOnExistingNetworkWithoutProfilePicAndGroupCreation() {

    // signup a new network user.

    const mailClientURL = 'https://mail.yahoo.com/';
    const mailClientUserId = 'qacheckconvo70@yahoo.com';
    const mailClientPassword = 'convosignuptest';

    const signupDomain = profile.signupDomain;

    Util.navigateToURL(profile.url);
    Util.click(repo.signupNowLink);

    const timestamp = this.getTimestamp();
    const networkDomainRegularExpression = new RegExp('@.+', 'g');
    const networkDomain = networkDomainRegularExpression.exec(profile.network6User1.email)[0];
    const signupUserEmail = timestamp + networkDomain;
    console.log('Signup Email:', signupUserEmail);

    Util.setValue(repo.signupEmailInputField, signupUserEmail);
    Util.click(repo.signupButton);
    Util.pause(2);
    Util.takeScreenshot();

    if (signupDomain == "guerrillamail.info") {

      Util.setValue(repo.verificationCodeInputField, '1111');
      Util.click(repo.verifyButton);

    }

    else {

      const signupWindowHandle = Util.getCurrentWindowHandle();

      const mailClientWindow = (() => {

        const yahooMailWindow = Util.openNewTabAndSwitch();
        Util.navigateToURL(mailClientURL);
        Util.click(repo.yahooSignInHomeButton, 90000, true);
        Util.setValue(repo.yahooUsernameInputField, mailClientUserId);
        Util.click(repo.yahooSigninNextButton);
        Util.setValue(repo.yahooPasswordInputField, mailClientPassword);
        Util.click(repo.yahooPasswordNextButton);

        if (Util.waitForDisplayed(repo.cancelButtonInYahoo, 30000, true)) {
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

        return yahooMailWindow;

      })();

      for (let step = 1; step <= 6; step++) {

        if (step === 6) { throw new Error('Verification code not received.'); }

        Util.pause(60);
        Util.refresh();

        const verificationCodeReceived = (() => {

          try {
            const verificationCodeEmailTimeout = 2000;
            Util.waitForDisplayed(repo.verificationCodeEmailSubject, verificationCodeEmailTimeout);
            const verificationCodeSubjectText = Util.getText(repo.verificationCodeEmailSubject);
            const verificationCode = verificationCodeSubjectText.substr(verificationCodeSubjectText.indexOf('is') + 3);
            Util.takeScreenshot();
            return verificationCode;
          } catch (error) { return null; }

        })();

        if (verificationCodeReceived) {

          const verificationCodeVerified = (() => {

            Util.switchToWindow(signupWindowHandle);
            Util.clearValue(repo.verificationCodeInputField);
            Util.setValue(repo.verificationCodeInputField, verificationCodeReceived);
            Util.pause(1);
            Util.click(repo.verifyButton);

            const signupButtonDisplayed = Util.waitForDisplayed(repo.signupNextButton, 3000, true);

            if (signupButtonDisplayed) {
              Util.takeScreenshot();
              console.log('INFO:', 'Verification Passed.');
              return true;
            }

          })();

          if (verificationCodeVerified) {
            break;
          } else {
            Util.click(repo.clickHereLinkToResendVerficationCodeEmail);
            Util.waitForDisplayed(repo.newVerificationCodeSentSuccessMessage);
            Util.switchToWindow(mailClientWindow);
          }

        } else {
          continue;
        }

      }

    }

    let getRandomString = (length) => {
      let randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      let result = '';
      for (let i = 0; i < length; i++) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
      }
      return result;
    }

    const signupUserFirstName = getRandomString(8);
    const signupUserLastName = getRandomString(8);
    const signupUserPosition = 'Load Tester';
    const signupUserPassword = '123456';

    Util.setValue(repo.signupFirstNameInputField, signupUserFirstName);
    Util.setValue(repo.signupLastNameInputField, signupUserLastName);
    Util.setValue(repo.signupJobTitleInputField, signupUserPosition);
    Util.setValue(repo.signupPasswordInputField, signupUserPassword);
    Util.click(repo.signupNextButton);
    Util.takeScreenshot();
    Util.click(repo.signupSkipThisForNowProfilePictureLink);
    Util.takeScreenshot();
    Util.pause(2);
    Util.click(repo.signupSkipThisForNowGroupCreationLink, 5000, true);
    Util.click(repo.signupGetStartedLink);
    Util.click(repo.signupPolicyAcceptButton, 5000, true);
    Util.click(repo.signupCompletionScreenCrossIcon);
    Util.pause(2);
    Util.click(repo.signupClickHereLink);
    Util.pause(2);
    Util.waitForDisplayed(repo.signupConvoGettingStartedPlaylistPost);
    Util.click(repo.upgradeNowButton, 5000, true);
    return { signupUserEmail, signupUserFirstName, signupUserLastName };

  }

  async sendEmailThroughGoogleMail(fromUserId, fromUserPassword, toUserId, toUserSubject, toUserText) {

    return new Promise(async (resolve, reject) => {

      try {

        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: { user: fromUserId, pass: fromUserPassword }
        });

        const info = await transporter.sendMail({
          from: fromUserId,
          to: toUserId,
          subject: toUserSubject,
          html: `<strong>${toUserText}</strong>`
        });

        console.log('Email Message Sent ID: %s', info.messageId);

        resolve(true);

      } catch (error) {

        console.error(error);
        reject(error);

      }

    });

  }


}


// Other Functions.

function createFakeEmailAccount() {

  // The method will signup a network user having random email with mailpoof.com domain.

  const mailPoofURL = `https://mailpoof.com/`;
  Util.navigateToURL(mailPoofURL);

  const timestamp = new Date().getTime().toString();
  const fakeEmail = timestamp + '@' + 'mailpoof.com';
  console.log('Fake Email:', fakeEmail);

  const mailPoofEmailIdInputField = `//input[@name='email']`;
  Util.click({ mailPoofEmailIdInputField });
  Util.clearValue({ mailPoofEmailIdInputField });

  Util.setValue({ mailPoofEmailIdInputField }, timestamp);

  const createInboxButton = `//input[@value='Create']`;
  Util.click({ createInboxButton });

  const emailIdInbox = `//input[@value='${fakeEmail}']`;
  Util.waitForDisplayed({ emailIdInbox });

  return fakeEmail;

}

module.exports = new CustomCommand();