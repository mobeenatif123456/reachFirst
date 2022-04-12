const repo = require('../../../object-repository/object-repo');
const profile = require('../../../config/profile');
const Util = require('../../../utils/utils');
const CustomCommand = require('../../../utils/custom-commands');

describe('convo chat', function () {

  // Author: Shoaib Arslan Kiyani
  // Total Test Cases: 16

  const browserSessions = [];
  let sessionBrowser1 = null;
  let sessionBrowser2 = null;
  const timestamp = CustomCommand.getTimestamp();

  it('green filled circle shown', function () {

    CustomCommand.login(profile.url, profile.network8Admin1.email, profile.network8Admin1.password);
    Util.waitForDisplayed(repo.greenChatActiveIcon);
    Util.takeScreenshot();

  });

  it('new chat', function () {
    const userName = `${profile.network8User2.firstName} ${profile.network8User2.lastName}`;
    Util.click(repo.greenChatActiveIcon);
    Util.waitForDisplayed(repo.newChatIcon);
    Util.click(repo.newChatIcon);
    Util.pause(3);
    Util.keys(userName);
    Util.pause(5);
    Util.click(repo.suggestedUserEmail1(userName));
    Util.pause(3);
    Util.click(repo.firstChatWindowInputField);
    const chatMessage = `${timestamp}:  Chat Message.`; 
    Util.keys(chatMessage);
    Util.pause(1);
    Util.keys('Enter');
    Util.waitForDisplayed(repo.sentChatMessage(chatMessage));
    Util.takeScreenshot();
    Util.click(repo.crossIconForChatClose);

  });
  
  it('to verify chat status is busy', function () {

    Util.click(repo.chatListSettingsGearIcon);
    Util.waitForDisplayed(repo.chatStatusDropdown);
    Util.waitForDisplayed(repo.availableStatusForChat);
    Util.waitForDisplayed(repo.busyStatusForChat);
    Util.waitForDisplayed(repo.turnOnChatNotification);
    Util.waitForDisplayed(repo.turnOnChatSound);
    Util.click(repo.busyStatusForChat);
    Util.waitForDisplayed(repo.redChatActiveIcon);
    sessionBrowser1 = Util.getBrowserSession();
    browserSessions.push(sessionBrowser1);

    sessionBrowser2 = Util.openBrowser();
    browserSessions.push(sessionBrowser2);

    Util.switchToBrowser(sessionBrowser2);
    const userName1 = `${profile.network8Admin1.firstName}`;
    CustomCommand.login(profile.url, profile.network8User1.email, profile.network8User1.password);
    
    Util.click(repo.greenChatActiveIcon);

    Util.setValue(repo.chatSearchInputField, `${profile.network8Admin1.email}`);
    Util.click(repo.searchedChatUserSuggestion);
    Util.waitForDisplayed(repo.userChatStatusText(userName1));
    Util.click(repo.crossIconForChatClose);
    Util.switchToBrowser(sessionBrowser1);
    Util.click(repo.chatListSettingsGearIcon);
    Util.click(repo.availableStatusForChat);
    Util.waitForDisplayed(repo.greenChatActiveIcon);
    
 });
  it('to verify chat status is idle', function () {

    const userName1 = `${profile.network8Admin1.firstName}`;
    Util.pause(300);
    Util.switchToBrowser(sessionBrowser2);
    Util.pause(5);
    Util.setValue(repo.chatSearchInputField, `${profile.network8Admin1.email}`);
    Util.click(repo.searchedChatUserSuggestion);
    Util.waitForDisplayed(repo.userChatIdleStatusText(userName1));
    Util.closeBrowser();
   
  });

  it('search user from chat window', function () {
    Util.switchToBrowser(sessionBrowser1);
    Util.setValue(repo.chatSearchInputField, `${profile.network8User1.email}`);
    Util.keys('Enter');
    Util.pause(2);
    Util.takeScreenshot();
    
  });

  it('peer to peer chat', function () {
    
  //  Util.click(repo.searchedChatUserSuggestion);
    
    const timestamp = CustomCommand.getTimestamp();
    const chatMessage = `${timestamp}: P2P Chat Message.`; 
    Util.keys(chatMessage);
    Util.pause(1);
    Util.keys('Enter');

    Util.waitForDisplayed(repo.sentChatMessage(chatMessage));
    Util.takeScreenshot();

    sessionBrowser1 = Util.getBrowserSession();
    browserSessions.push(sessionBrowser1);

    sessionBrowser2 = Util.openBrowser();
    browserSessions.push(sessionBrowser2);

    Util.switchToBrowser(sessionBrowser2);
    
    CustomCommand.login(profile.url, profile.network8User1.email, profile.network8User1.password);
    
    Util.click(repo.greenChatActiveIcon);

    Util.setValue(repo.chatSearchInputField, `${profile.network8Admin1.email}`);
    Util.click(repo.searchedChatUserSuggestion);
    
    Util.waitForDisplayed(repo.receivedChatMessage(chatMessage));
    Util.takeScreenshot();
    Util.click(repo.firstChatWindowCrossButton);
    Util.click(repo.greenChatActiveIcon);

    Util.switchToBrowser(sessionBrowser1);

  });

  it('mute chat', function () {
    
    Util.moveTo(repo.p2pChatSettingsGearIcon);
    Util.click(repo.p2pChatSettingsGearIcon);

    if(Util.waitForDisplayed(repo.p2pUnMuteChatSetting,5000,true))
    {

      Util.click(repo.p2pUnMuteChatSetting);
      Util.pause(4);
      Util.moveTo(repo.p2pChatSettingsGearIcon);
      Util.click(repo.p2pChatSettingsGearIcon);
      Util.click(repo.p2pMuteChatSetting);
      Util.takeScreenshot();

    }
    else{

      Util.click(repo.p2pMuteChatSetting);
    }
    
    Util.switchToBrowser(sessionBrowser2);
   
    Util.click(repo.greenChatActiveIcon);
    Util.setValue(repo.chatSearchInputField, `${profile.network8Admin1.email}`);
    Util.pause(2);

    Util.click(repo.searchedChatUserSuggestion);
    
    const timestamp = CustomCommand.getTimestamp();
    
    const chatMessage = `${timestamp}: P2P Chat Message.`; 
    Util.keys(chatMessage);
    Util.pause(1);
    Util.keys('Enter');

    Util.waitForDisplayed(repo.sentChatMessage(chatMessage));
    Util.takeScreenshot();
    
    Util.switchToBrowser(sessionBrowser1);

    Util.waitForDisplayed(repo.receivedChatMessage(chatMessage));
    Util.takeScreenshot();

    const secondNetworkUserFullName = `${profile.network8User1.firstName} ${profile.network8User1.lastName}`;

  //  const chatMuteIcon = `//div[@class='chatListTitle' and text()='${secondNetworkUserFullName}']/../div/i`;
  //  Util.waitForDisplayed(chatMuteIcon);

    Util.moveTo(repo.p2pChatSettingsGearIcon);
    Util.click(repo.p2pChatSettingsGearIcon);
    Util.pause(2);
    Util.click(repo.p2pUnMuteChatSetting);
    Util.pause(4);
    Util.click(repo.firstChatWindowCrossButton);

    Util.switchToBrowser(sessionBrowser2);

    const chatMessage2 = `${timestamp + 1}: P2P Chat Message.`; 
    Util.keys(chatMessage2);
    Util.pause(1);
    Util.keys('Enter');

    Util.waitForDisplayed(repo.sentChatMessage(chatMessage2));
    Util.takeScreenshot();

    Util.switchToBrowser(sessionBrowser1);

    Util.waitForDisplayed(repo.unreadChatCount(secondNetworkUserFullName));
    Util.takeScreenshot();

    Util.waitForDisplayed(repo.receivedChatMessage(chatMessage2));
    Util.takeScreenshot();

  });

  it('open big chat from p2p chat window', function () {
    
    Util.click(repo.firstChatWindowInputField);
    Util.pause(1);
    Util.click(repo.activeChatExpandIconP2PChat);
    Util.pause(3);
    const windowHandles = Util.getWindowHandles();
    Util.switchToWindow(windowHandles[1]);
    Util.waitForDisplayed(repo.expandSettingsButton);
    Util.takeScreenshot();
    Util.closeTab();
    Util.pause(3);
    Util.switchToWindow(windowHandles[0]);
    
  });

  it('open big chat from list of chats window', function () {
    
    Util.click(repo.chatListExpandIcon);
    Util.pause(3);
    const windowHandles = Util.getWindowHandles();
    Util.switchToWindow(windowHandles[1]);
    Util.waitForDisplayed(repo.expandSettingsButton);
    Util.takeScreenshot();
    Util.closeTab();
    Util.pause(3);
    Util.switchToWindow(windowHandles[0]);

  });

  it('create group chat with participants', function () {
    Util.switchToBrowser(sessionBrowser1);
   //Util.waitForDisplayed(repo.greenChatActiveIcon);
   //Util.click(repo.greenChatActiveIcon);
    Util.setValue(repo.chatSearchInputField, `${profile.network8User1.email}`);
    Util.pause(5);
    Util.click(repo.searchedChatUserSuggestion);

    Util.pause(3);

    Util.click(repo.p2pAddToChatIcon);
    Util.keys(profile.network8User2.email);
    Util.pause(5);
    Util.keys('Enter');
    Util.pause(5);
    Util.click(repo.firstChatWindowInputField);
    Util.pause(5);
    Util.click(repo.firstChatWindowCrossButton);
    Util.pause(15);
    Util.click(repo.secondChatWindowInputField);
    Util.pause(5);

  });
  it('add more participant to group chat ', function () {
    const userName2 = `${profile.network8User3.firstName} ${profile.network8User3.lastName}`;
    const chatMessage = `${timestamp}:  Chat Message.`; 
    Util.keys(chatMessage);
    Util.pause(1);
    Util.keys('Enter');
    Util.waitForDisplayed(repo.sentChatMessage(chatMessage));
    Util.click(repo.p2pAddToChatIcon);
    Util.keys(profile.network8User3.email);
    Util.pause(5);
    Util.keys('Enter');
    Util.pause(5);
    Util.click(repo.addTeamMateToGroupChatButton);
    Util.waitForDisplayed(repo.UserInvitationText(userName2));
    Util.click(repo.secondChatWindowInputField);
    //Util.click(repo.p2pChatSettingsGearIcon);
    //Util.click(repo.participantInGroupSetting);
    //Util.waitForDisplayed(repo.participantListInGroupChat);
    //Util.waitForDisplayed(repo.userOneInParticipantList);
    //Util.waitForDisplayed(repo.userTwoInParticipantList);
    //Util.waitForDisplayed(repo.userThreeInParticipantList);
    


  });
  it('send plain text message in group chat', function () {

    const timestamp = CustomCommand.getTimestamp();

    const groupChatMessage = `${timestamp}: Group Chat Message.`; 
    Util.keys(groupChatMessage);
    Util.pause(1);
    Util.keys('Enter');

    Util.waitForDisplayed(repo.sentChatMessage(groupChatMessage));
    Util.takeScreenshot();

  });

  it('send attachments in group chat', function () {

    const fileName = 'data.csv';

    Util.uploadFile(repo.groupChatFileInputField, Util.getResourcePath(fileName));

    Util.waitForNotDisplayed(repo.progressLine);

    Util.pause(2);

    const imageAttachment = 'mario.jpg';

    Util.uploadFile(repo.groupChatFileInputField, Util.getResourcePath(imageAttachment));

    Util.waitForNotDisplayed(repo.progressLine);

    Util.pause(2);

    const pdfAttachment = 'dummy-pdf-file.pdf';

    Util.uploadFile(repo.groupChatFileInputField, Util.getResourcePath(pdfAttachment));

    Util.waitForNotDisplayed(repo.progressLine);

    Util.pause(2);

    const docAttachment = 'word-document-file.doc';

    Util.uploadFile(repo.groupChatFileInputField, Util.getResourcePath(docAttachment));

    Util.waitForNotDisplayed(repo.progressLine);

    Util.pause(2);

    Util.takeScreenshot();



  });

  it('send emoji in group chat', function () {

    Util.pause(3);
    Util.click(repo.emoticonIcon);
    Util.pause(3);

    if(Util.waitForDisplayed(repo.peopleCategory, 20000, true))
    {
      Util.click(repo.firstEmoticonIcon);
      Util.keys('Enter');
      Util.pause(3);
    }
    else{

      Util.click(repo.emoticonIcon);
      Util.pause(3);
      Util.click(repo.firstEmoticonIcon);
      Util.keys('Enter');
      Util.pause(3);

    }

    Util.waitForDisplayed(repo.emojiGroupChatMessage);
    Util.takeScreenshot();

  });

  it('send gif in group chat', function () {

    Util.click(repo.gifIconInChatWindow);
    Util.click(repo.firstGifImage);
    Util.waitForExist(repo.sharedGifImage);
    Util.takeScreenshot();

  });

  it('rename group chat', function () {

    Util.click(repo.groupChatSettingsGearIcon);
    Util.click(repo.renameGroup);
    Util.pause(2);
    Util.clearValue(repo.renameGroupChatInputField);
    Util.click(repo.renameGroupChatInputField);
    Util.pause(2);
    Util.keys(timestamp.toString());
    Util.pause(3);
    Util.click(repo.groupChatRenameDoneButton);
    Util.pause(5);

    Util.waitForDisplayed(repo.renamedGroupChatMessage(timestamp));
    Util.takeScreenshot();

  });

  it('search group chat from list of chats', function () {

    Util.click(repo.firstChatWindowCrossButton);
    Util.setValue(repo.chatSearchInputField, timestamp.toString());

    Util.takeScreenshot();
    Util.click(repo.searchedGroupChatSuggestion(timestamp));

  });

  it('share group chat', function () {

    Util.click(repo.groupChatSettingsGearIcon);
    Util.click(repo.shareThisChat);
    
    Util.pause(2);
    
    Util.click(repo.secondChatWindow);

    Util.pause(2);

    Util.click(repo.toInputField);

    Util.pause(2);

    Util.setValue(repo.typeToInputField, profile.network8Admin1.email);
    Util.click(repo.suggestedPostRecipient);
    Util.click(repo.noteShareButton);

    Util.pause(5);

    Util.waitForDisplayed(repo.sharedChatInPost(timestamp));
    Util.takeScreenshot();
  
  });

  it('chat indexing', function () {

    const postTitle = `Chat with ${timestamp}`;

    Util.setValue(repo.feedSearchInputField, `"${postTitle}"`);
    Util.click(repo.searchIcon);

    Util.pause(3);
    
    for (let step = 0; step < 10; step++) {

      console.log('Current Loop Counter:', step);
      
      if(Util.waitForDisplayed(repo.sharedPostPathInSearchResults(timestamp), 20000,true))
      {
        break;
      }
      else{

        Util.pause(30);
        Util.click(repo.myFeed);
        Util.clearValue(repo.feedSearchInputField);
        Util.setValue(repo.feedSearchInputField, `"${postTitle}"`);
        Util.click(repo.searchIcon);

        Util.pause(3);

        if(step == 8)
        {

          console.log('inside if block');

          throw new Error('Test Case failed because indexing is not working');

        }

      }
      


    }


  });

  it('leave group chat', function () {

    Util.pause(2);

    Util.setValue(repo.chatSearchInputField, timestamp.toString());

    Util.pause(5);

    Util.click(repo.searchedGroupChatSuggestion(timestamp));

    Util.pause(2);

    Util.click(repo.groupChatSettingsGearIcon);

    Util.click(repo.leaveChat);

    Util.pause(2);

    Util.click(repo.leaveChatYesButton);

    Util.pause(3);

    Util.waitForDisplayed(repo.chatLeftMessage);

    Util.takeScreenshot();
    
  });

  it('create group chat from big chat', function () {

    Util.switchToBrowser(sessionBrowser2);
 
    Util.pause(3);

    Util.setValue(repo.chatSearchInputField, `${profile.network8Admin1.email}`);
    
    Util.pause(2);
    Util.click(repo.searchedChatUserSuggestion);

    Util.click(repo.activeChatExpandIconP2PChat);
    Util.pause(3);

    const windowHandles = Util.getWindowHandles();
    Util.switchToWindow(windowHandles[1]);
    Util.waitForDisplayed(repo.expandSettingsButton);

    Util.pause(5);
    Util.click(repo.createNewChatIcon);

    Util.pause(3);

    Util.keys(profile.network8Admin1.email);

    Util.pause(5);

    Util.click(repo.suggestedUserEmail1(profile.network8Admin1.email));

    Util.pause(3);

    Util.keys(profile.network8User2.email);
    Util.click(repo.suggestedUserEmail1(profile.network8User2.email));

    Util.pause(3);

    Util.click(repo.firstChatWindowInputField);
    
    const timestamp = CustomCommand.getTimestamp();

    const groupChatMessage = `${timestamp}: Group Chat Message.`; 
    Util.keys(groupChatMessage);
    Util.pause(1);
    Util.keys('Enter');
    Util.waitForDisplayed(repo.sentGroupChatMessage(groupChatMessage));
    Util.takeScreenshot();

    Util.closeTab();
    Util.pause(2);
   
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