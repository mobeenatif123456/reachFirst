const repo = require('../../../object-repository/object-repo');
const profile = require('../../../config/profile');
const Util = require('../../../utils/utils');
const CustomCommand = require('../../../utils/custom-commands');
const utils = require('../../../utils/utils');

describe('unified chat', function () {

  // Author: Mobeen Atif
  // Total Test Cases: 30

  const browserSessions = [];
  let sessionBrowser1 = null;
  let sessionBrowser2 = null;
  let sessionBrowser3 = null;

  let network1= 'Unified1';
  let network2= 'Unified2';
  let userEmail = profile.unifiedNetwork2Admin1.email;
  let userName = profile.unifiedNetwork2Admin1.firstName + " " + profile.unifiedNetwork2Admin1.lastName;
  let timestamp3 = null;
  let chatMessage3 = null;
  let timestamp5 = null;
  let chatMessage5 = null;


  it('green filled circle shown', function () {

    //admin@testsuite1.com
    CustomCommand.login(profile.url, profile.network1Admin1.email, profile.network1Admin1.password);
    Util.waitForDisplayed(repo.greenChatActiveIcon);
    Util.takeScreenshot();

  });

  it('verify that filter icon is showing in chat', function () {
    const userName = `${profile.network8User2.firstName} ${profile.network8User2.lastName}`;
    Util.click(repo.greenChatActiveIcon);
    Util.waitForDisplayed(repo.filterIconInUnifiedChat);
    Util.takeScreenshot();

  });
  
  it('verify that on clicking filter icon should show all networks the user is part of in list', function () {

    Util.click(repo.filterIconInUnifiedChat);
    Util.waitForDisplayed(repo.networksVerificationUnifiedChat(network1));
    Util.waitForDisplayed(repo.networksVerificationUnifiedChat(network2));
    Util.takeScreenshot();
    
 });

  it('verify that apply button should be disabled till any network is selected', function () {

    Util.waitForDisplayed(repo.disableApplyButton);
    Util.takeScreenshot();
   
  });

  it('should show search field and placeholder in list view', function () {

    Util.waitForDisplayed(repo.addnetworkPlaceholder);
    Util.takeScreenshot();
    
  });

  it('verify that add network search functionality is working', function () {

    Util.pause(2);
    Util.click(repo.addnetworkPlaceholder);
    Util.pause(2);
    Util.keys(`${network1}`);

    Util.waitForDisplayed(repo.networksVerificationUnifiedChat(network1));
    Util.waitForNotDisplayed(repo.networksVerificationUnifiedChat(network2));
    Util.takeScreenshot();

    Util.pause(3);

    Util.keys(['Control', 'a']);
    Util.pause(1);
    Util.keys('Backspace');

  });

  it('verify grey tick icon with the network name unselected', function () {

    Util.waitForDisplayed(repo.networksVerificationUnifiedChat(network2));
    Util.waitForDisplayed(repo.greytickIconUnselected(network1));
    Util.takeScreenshot();
    
  });

  it('verify tick turns blue on selection of network name', function () {
    
    Util.click(repo.greytickIconUnselected(network1));
    Util.waitForDisplayed(repo.bluetickSelected(network1));
    Util.takeScreenshot();

  });

  it('verify that apply button gets enabled after network selection', function () {
    
   Util.waitForDisplayed(repo.applyButtonEnabled);
   Util.takeScreenshot();

  });

  it('verify that multiple networks can be selected', function () {

    Util.waitForDisplayed(repo.greytickIconUnselected(network2));
    Util.click(repo.greytickIconUnselected(network2));
    Util.waitForDisplayed(repo.bluetickSelected(network2));
    Util.takeScreenshot();

  });

  it('verify that selected networks show in search field too', function () {
    
    Util.waitForDisplayed(repo.selectedNetworksVerificationInSearchField(network1));
    Util.waitForDisplayed(repo.selectedNetworksVerificationInSearchField(network2));
    Util.takeScreenshot();
    
  });

  it('verify that on clicking apply user is shown users of other network', function () {

    Util.click(repo.applyButtonEnabled);
    userName1 = `${profile.unifiedNetwork1Admin1.firstName} ${profile.unifiedNetwork1Admin1.lastName}`;
    Util.pause(5);
    Util.setValue(repo.chatSearchInputField, `${profile.unifiedNetwork1Admin1.email}`);
    Util.pause(2);
    

    Util.waitForDisplayed(repo.networkandUserchatVerification(network1,userName1));
    Util.takeScreenshot();

    userName2 = `${profile.unifiedNetwork2Admin1.firstName} ${profile.unifiedNetwork2Admin1.lastName}`;

    Util.click(repo.closeteammateIcon);

    Util.setValue(repo.chatSearchInputField, `${profile.unifiedNetwork2Admin1.email}`);
    Util.pause(2);
    Util.takeScreenshot();

    Util.waitForDisplayed(repo.networkandUserchatVerification(network2,userName2));
    Util.takeScreenshot();

  });

  it('verify user informaton of username network name and user email on hovering over the username', function () {

    Util.moveTo(repo.userInformationOnHovering(network2,userName2));
    Util.pause(5);

    var userProfileEmail= Util.getText(repo.userEmailOnHovering);
    console.log('User Profile Email is ', userProfileEmail);
    var userProfileEmail2= userProfileEmail.replace(/\s/g, '');
    console.log('Updated user profile is', userProfileEmail2);
    expect(userProfileEmail2).toEqual(userEmail);
    Util.takeScreenshot();


    var userProfileName= Util.getText(repo.userNameOnHovering);
    console.log('Updated user profile is', userProfileName);
    expect(userProfileName).toEqual(userName);
    Util.takeScreenshot();


    var networkDetails= Util.getText(repo.networkNameOnHovering);
    console.log('User Profile Email is ', networkDetails);
    var networkDetails2= networkDetails.replace(/\s/g, '');
    console.log('Updated user profile is', networkDetails2);
    expect(networkDetails2).toEqual(network2);
    Util.takeScreenshot();

  });

  it('send p2p chat to other network user', function () {

    sessionBrowser1 = Util.getBrowserSession();
    browserSessions.push(sessionBrowser1);

    sessionBrowser2 = Util.openBrowser();
    browserSessions.push(sessionBrowser2);

    Util.switchToBrowser(sessionBrowser2);

    //admin@unified1.com login
    CustomCommand.login(profile.url, profile.unifiedNetwork1Admin1.email, profile.unifiedNetwork1Admin1.password);
    Util.click(repo.greenChatActiveIcon);

    Util.setValue(repo.chatSearchInputField, `${profile.network1Admin1.email}`);
    Util.pause(2);
    Util.takeScreenshot();

    let userName1 = `${profile.network1Admin1.firstName} ${profile.network1Admin1.lastName}`;
    Util.pause(5);
    
    Util.waitForDisplayed(repo.userVerification(userName1));
    Util.click(repo.userVerification(userName1));

    Util.pause(3);
    Util.waitForDisplayed(repo.p2pChatSettingsGearIcon);
    Util.click(repo.p2pChatSettingsGearIcon);
    Util.takeScreenshot();

    if(Util.waitForDisplayed(repo.unblockthisUserOptioninSettings, 10000, true))
    {
      Util.click(repo.unblockthisUserOptioninSettings);
      Util.click(repo.unblockButton1);
    }

    //switch to testsuite1
    Util.switchToBrowser(sessionBrowser1);

    Util.click(repo.closeteammateIcon);
    Util.click(repo.crossSelectedNetwork(network1));
    Util.click(repo.crossSelectedNetwork(network2));

    Util.takeScreenshot();

    userName1 = `${profile.unifiedNetwork1Admin1.firstName} ${profile.unifiedNetwork1Admin1.lastName}`;

    //searching admin@unified1.com without any selection of network
    Util.setValue(repo.chatSearchInputField, `${profile.unifiedNetwork1Admin1.email}`);
    Util.pause(2);
    Util.takeScreenshot();

    //found admin@unified1.com here
    Util.waitForDisplayed(repo.networkandUserchatVerification(network1,userName1));
    Util.click(repo.networkandUserchatVerification(network1,userName1));

    Util.click(repo.p2pChatSettingsGearIcon);

    if(Util.waitForDisplayed(repo.unblockthisUserOptioninSettings, 10000, true))
    {
      Util.click(repo.unblockthisUserOptioninSettings);
      Util.click(repo.unblockButton1);
    }

    Util.click(repo.firstChatWindowInputField);
    const timestamp = CustomCommand.getTimestamp();
    const chatMessage = `${timestamp}: P2P Chat Message.`; 
    Util.keys(chatMessage);
    Util.pause(1);
    Util.keys('Enter');

    Util.waitForDisplayed(repo.sentChatMessage(chatMessage));
    Util.takeScreenshot();
    Util.click(repo.firstChatWindowCrossButton);

    // switch to admin@unified1.com and message verification
    Util.switchToBrowser(sessionBrowser2);
    Util.waitForDisplayed(repo.receivedChatMessage(chatMessage));
    Util.takeScreenshot();


  });

  it('block user from chat user settings and all aspects of it', function () {
    
    //switch to admin@testsuite1.com
    Util.switchToBrowser(sessionBrowser1);
    
    // launch user2@unified1.com
    sessionBrowser3 = Util.openBrowser();
    browserSessions.push(sessionBrowser3);
 
    // switch to user2@unified1.com
    Util.switchToBrowser(sessionBrowser3);
    CustomCommand.login(profile.url, profile.unifiedNetwork1User1.email, profile.unifiedNetwork1User1.password);
    Util.click(repo.greenChatActiveIcon);


    // if already blocked tou sab se pehle usse unblock kren ge. make sure k this user admin@testsuite1.com is not blocked.
    Util.setValue(repo.chatSearchInputField, `${profile.network1Admin1.email}`);
    
    Util.pause(2);
    Util.takeScreenshot();

    let userName1 = `${profile.network1Admin1.firstName} ${profile.network1Admin1.lastName}`;
    Util.pause(5);
    
    Util.waitForDisplayed(repo.userVerification(userName1));
    Util.click(repo.userVerification(userName1));

    Util.pause(5);
    Util.waitForDisplayed(repo.p2pChatSettingsGearIcon);
    Util.pause(5);
    Util.click(repo.p2pChatSettingsGearIcon);
    Util.pause(3);

    if(Util.waitForDisplayed(repo.unblockthisUserOptioninSettings, 5000, true))
    {
      Util.click(repo.unblockthisUserOptioninSettings);
      Util.pause(3);
      Util.click(repo.unblockButton1);
      Util.pause(3);
    }

    // switch to admin@testsuite1.com
    Util.switchToBrowser(sessionBrowser1);
    Util.pause(3);
    // searching for user2@unified1.com
    Util.setValue(repo.chatSearchInputField, `${profile.unifiedNetwork1User1.email}`);
    Util.pause(2);
    Util.takeScreenshot();

    userName1= `${profile.unifiedNetwork1User1.firstName} ${profile.unifiedNetwork1User1.lastName}`;
    Util.waitForDisplayed(repo.networkandUserchatVerification(network1,userName1));
    Util.pause(5);
    Util.click(repo.networkandUserchatVerification(network1,userName1));
    Util.pause(5);

    Util.click(repo.p2pChatSettingsGearIcon);
    Util.pause(3);

    if(Util.waitForDisplayed(repo.unblockthisUserOptioninSettings, 5000, true))
    {
      Util.click(repo.unblockthisUserOptioninSettings);
      Util.pause(1);
      Util.click(repo.unblockButton1);
      Util.pause(1);
    }

    Util.click(repo.firstChatWindowInputField);
    Util.pause(2);
    const timestamp = CustomCommand.getTimestamp();
    const chatMessage = `${timestamp}: P2P Chat Message.`; 
    Util.keys(chatMessage);
    Util.pause(1);
    Util.keys('Enter');

    Util.waitForDisplayed(repo.sentChatMessage(chatMessage));
    Util.takeScreenshot();

    // switch to user2@unified1.com
    Util.switchToBrowser(sessionBrowser3);
    Util.waitForDisplayed(repo.receivedChatMessage(chatMessage));
    Util.takeScreenshot();

    if(Util.waitForDisplayed(repo.blockButton, 20000, true))
    {
      Util.click(repo.continueButton);
    }

    Util.waitForDisplayed(repo.p2pChatSettingsGearIcon);
    Util.click(repo.p2pChatSettingsGearIcon);
    Util.pause(3);
    Util.click(repo.p2pChatSettingsGearIcon);
    Util.pause(2);
    Util.waitForDisplayed(repo.blockthisUser);
    Util.click(repo.blockthisUser);
    Util.waitForDisplayed(repo.blockConfirmationButton);
    Util.takeScreenshot();
    Util.click(repo.blockConfirmationButton);

    //admin@testsuite1.com got blocked here by user2@unified1.com
    Util.waitForDisplayed(repo.blockedUserMessage);


  });

  it('sender cant send message to blocked user', function (){

    Util.click(repo.blockedUserMessage);

    //trying to send message to blocked user.
    const timestamp2 = CustomCommand.getTimestamp();
    const chatMessage2 = `${timestamp2}: P2P Chat Message.`; 
    Util.keys(chatMessage2);
    Util.pause(1);
    Util.keys('Enter');

    //verification that user is blocked. try to unblock first. unblock button dialoge box verification
    Util.waitForDisplayed(repo.unblockButton1);
    Util.takeScreenshot();
    Util.click(repo.closeButtonInUnifiedChat);

  });

  it('for blocked user sender will be shown unblock this user option in chat settings', function (){

    Util.waitForDisplayed(repo.p2pChatSettingsGearIcon);
    Util.click(repo.p2pChatSettingsGearIcon);
    Util.waitForDisplayed(repo.unblockthisUserOptioninSettings);
    Util.takeScreenshot();

  });

  it('sender cant share chat with blocked user', function (){

    Util.waitForNotDisplayed(repo.shareThisChat);
    Util.takeScreenshot();

  });

  it('mute chat option will not be shown to sender for blocked user', function (){

    Util.waitForNotDisplayed(repo.p2pMuteChatSetting);
    Util.takeScreenshot();

  });

  it('blocked user cant be added as a participant in any group chat', function (){

    Util.waitForNotDisplayed(repo.p2pAddToChatIcon);
    Util.takeScreenshot();

  });

  it('sender cant send emoji to blocked user', function (){

    Util.click(repo.emoticonIcon);
    Util.pause(3);
    Util.waitForDisplayed(repo.unblockButton1);
    Util.takeScreenshot();
    Util.click(repo.closeButtonInUnifiedChat);

  });

  it('sender cant send gifs to blocked user', function (){

    Util.click(repo.gifIconInChatWindow);
    Util.pause(3);
    Util.waitForDisplayed(repo.unblockButton1);
    Util.takeScreenshot();
    Util.click(repo.closeButtonInUnifiedChat);

  });

  it('blocked user message will not be shown to the user who blocked him ', function (){

    Util.pause(2);
    // switch to admin@testsuite1.com
    Util.switchToBrowser(sessionBrowser1);
    Util.click(repo.firstChatWindowInputField);
    timestamp3 = CustomCommand.getTimestamp();
    chatMessage3 = `${timestamp3}: P2P Chat Message.`; 
    Util.keys(chatMessage3);
    Util.pause(1);
    Util.keys('Enter');

    Util.waitForDisplayed(repo.sentChatMessage(chatMessage3));
    Util.takeScreenshot();

    // switch to user2@unified1.com
    Util.switchToBrowser(sessionBrowser3);

    //can't receive any message from blocked user
    Util.waitForNotDisplayed(repo.receivedChatMessage(chatMessage3));
    Util.takeScreenshot();

  });

  it('verify that unblock functionality is working ', function (){

    Util.pause(2);
    // switch to admin@testsuite1.com
    Util.waitForDisplayed(repo.p2pChatSettingsGearIcon);
    Util.click(repo.p2pChatSettingsGearIcon);
    Util.waitForDisplayed(repo.unblockthisUserOptioninSettings);
    Util.click(repo.unblockthisUserOptioninSettings);
    Util.click(repo.unblockButton1);

    Util.waitForDisplayed(repo.receivedChatMessage(chatMessage3));
    Util.takeScreenshot();

    Util.click(repo.p2pChatSettingsGearIcon);
    Util.waitForDisplayed(repo.shareThisChat);
    Util.waitForDisplayed(repo.p2pMuteChatSetting);

    Util.waitForDisplayed(repo.blockthisUser);
    Util.waitForDisplayed(repo.reportthisUserOptioninSettings);
    Util.waitForDisplayed(repo.p2pAddToChatIcon);

    Util.click(repo.firstChatWindowInputField);

    Util.keys(['Control', 'a']);
    Util.keys('Backspace');

    timestamp4 = CustomCommand.getTimestamp();
    chatMessage4 = `${timestamp4}: P2P Chat Message.`; 
    Util.keys(chatMessage4);
    Util.pause(1);
    Util.keys('Enter');

    Util.waitForDisplayed(repo.sentChatMessage(chatMessage4));
    Util.takeScreenshot();

    Util.switchToBrowser(sessionBrowser1);
    Util.waitForDisplayed(repo.receivedChatMessage(chatMessage4));
    Util.takeScreenshot();


    Util.click(repo.firstChatWindowInputField);
    timestamp5 = CustomCommand.getTimestamp();
    chatMessage5 = `${timestamp5}: P2P Chat Message.`; 
    Util.keys(chatMessage5);
    Util.pause(1);
    Util.keys('Enter');

    Util.waitForDisplayed(repo.sentChatMessage(chatMessage5));
    Util.takeScreenshot();

    Util.switchToBrowser(sessionBrowser3);

    //can't receive any message from blocked user
    Util.waitForDisplayed(repo.receivedChatMessage(chatMessage5));
    Util.takeScreenshot();


  });

  it('verify that report this user functionality is working ', function (){

    Util.click(repo.p2pChatSettingsGearIcon);
    Util.click(repo.reportthisUserOptioninSettings);
    Util.click(repo.reportButtonInReportthisUser);

    Util.waitForDisplayed(repo.blockedUserMessage);
    Util.click(repo.p2pChatSettingsGearIcon);
    Util.waitForNotDisplayed(repo.reportthisUserOptioninSettings);
    Util.waitForDisplayed(repo.unblockthisUserOptioninSettings);
    Util.waitForNotDisplayed(repo.shareThisChat);
    Util.waitForNotDisplayed(repo.p2pMuteChatSetting);
    Util.waitForDisplayed(repo.reportedChat);

    // Yahan pe updated code aye ga when reported chat functionality gets finalized. (Messages se reported/shared chat ki verification.)

    Util.click(repo.unblockthisUserOptioninSettings);
    Util.click(repo.unblockButton1);
    Util.waitForNotDisplayed(repo.blockedUserMessage);
    Util.pause(3);
    Util.click(repo.firstChatWindowInputField);
    Util.pause(5);
    Util.click(repo.firstChatWindowCrossButton);

  });

  it('verify that group chat functionality is working with filters', function (){

    const userName = `${profile.network1Admin1.firstName} ${profile.network1Admin1.lastName}`;
    const userName2 = `${profile.unifiedNetwork1Admin1.firstName} ${profile.unifiedNetwork1Admin1.lastName}`;
    Util.waitForDisplayed(repo.newChatIcon);
    Util.click(repo.newChatIcon);
    Util.pause(3);
    Util.keys(profile.network1Admin1.email);
    Util.pause(5);
    Util.click(repo.suggestedUserInGroupchat(profile.network1Admin1.email));
    Util.pause(2);
    Util.keys(profile.unifiedNetwork1Admin1.email);
    Util.pause(5);
    Util.click(repo.suggestedUserInGroupchat(profile.unifiedNetwork1Admin1.email));

    Util.pause(5);

    Util.click(repo.firstChatWindowInputField);

    const timestamp6 = CustomCommand.getTimestamp();
    const chatMessage6 = `${timestamp6}:  Chat Message.`; 
    Util.keys(chatMessage6);
    Util.pause(1);
    Util.keys('Enter');
    Util.waitForDisplayed(repo.sentChatMessage(chatMessage6));
    Util.takeScreenshot();

    Util.switchToBrowser(sessionBrowser1);
    Util.waitForDisplayed(repo.receivedChatMessage(chatMessage6));


    Util.switchToBrowser(sessionBrowser3);
    Util.setValue(repo.chatSearchInputField, `${profile.network1Admin1.email}`);
    Util.pause(2);
    Util.takeScreenshot();

    let userName1 = `${profile.network1Admin1.firstName} ${profile.network1Admin1.lastName}`;
    Util.pause(5);
    
    Util.waitForDisplayed(repo.userVerification(userName1));
    Util.click(repo.userVerification(userName1));

    Util.pause(5);

    Util.click(repo.secondChatWindowInputField);

    Util.click(repo.p2pChatSettingsGearIcon2);

    if(Util.waitForDisplayed(repo.blockthisUser, 20000, true))
    {
      Util.click(repo.blockthisUser);
      Util.pause(3);
      Util.click(repo.blockButtonNew);
    }

    Util.waitForDisplayed(repo.blockedUserMessage);
    Util.click(repo.firstChatWindowInputField);
    const timestamp7 = CustomCommand.getTimestamp();
    const chatMessage7 = `${timestamp7}:  Chat Message.`; 
    Util.keys(chatMessage7);
    Util.pause(1);
    Util.keys('Enter');
    Util.waitForDisplayed(repo.sentChatMessage(chatMessage7));
    Util.takeScreenshot();

    Util.switchToBrowser(sessionBrowser1);
    Util.waitForDisplayed(repo.receivedChatMessage(chatMessage7));

    Util.switchToBrowser(sessionBrowser3);
    Util.pause(5);
    Util.click(repo.secondChatWindowInputField);
    Util.waitForDisplayed(repo.p2pChatSettingsGearIcon2);
    Util.click(repo.p2pChatSettingsGearIcon2);

    if(Util.waitForDisplayed(repo.unblockthisUserOptioninSettings, 10000, true))
    {
      Util.click(repo.unblockthisUserOptioninSettings);
      Util.pause(2);
      Util.click(repo.unblockButton1);
      Util.pause(2);
    }

    Util.waitForNotDisplayed(repo.blockedUserMessage);
 
  });

  it('verify that guest user cant be added in group chat', function (){

    Util.switchToBrowser(sessionBrowser1);
    Util.pause(5);
    Util.click(repo.firstChatWindowInputField);
    Util.pause(1);
    Util.click(repo.firstChatWindowCrossButton);
    Util.pause(1);
    Util.click(repo.secondChatWindowInputField);
    Util.pause(1);
    Util.click(repo.firstChatWindowCrossButton);

    Util.waitForDisplayed(repo.newChatIcon);
    Util.click(repo.newChatIcon);
    Util.pause(3);
    Util.keys(profile.network2Admin1.email);
    Util.pause(5);
    Util.click(repo.suggestedUserInGroupchat(profile.network2Admin1.email));
    Util.pause(2);
    Util.keys(profile.unifiedNetwork1Admin1.email);
    Util.pause(5);
    Util.click(repo.suggestedUserInGroupchat(profile.unifiedNetwork1Admin1.email));

    Util.pause(5);
    Util.click(repo.firstChatWindowInputField);
    const timestamp7 = CustomCommand.getTimestamp();
    const chatMessage7 = `${timestamp7}:  Chat Message.`; 
    Util.keys(chatMessage7);
    Util.pause(1);
    Util.keys('Enter');

    Util.waitForDisplayed(repo.guestUserUnabletobeAddedInGroupChat);
    Util.takeScreenshot();
    Util.waitForDisplayed(repo.okButtonInUnifiedChat);
    Util.click(repo.okButtonInUnifiedChat);

    Util.pause(5);
    Util.click(repo.firstChatWindowInputField);
    Util.click(repo.firstChatWindowCrossButton);

    
  });

  it('verify that unified filter is showing in big chat', function (){

    Util.click(repo.chatListExpandIcon);
    Util.pause(3);

    const windowHandles = Util.getWindowHandles();
    Util.switchToWindow(windowHandles[1]);
    Util.waitForDisplayed(repo.expandSettingsButton);
    Util.takeScreenshot();
    Util.waitForDisplayed(repo.filterIconInBigChat);
    Util.click(repo.filterIconInBigChat);

    Util.waitForDisplayed(repo.networksVerificationUnifiedChat(network1));
    Util.waitForDisplayed(repo.networksVerificationUnifiedChat(network2));
    Util.takeScreenshot();

    Util.waitForDisplayed(repo.disableApplyButton);
    Util.takeScreenshot();

    Util.waitForDisplayed(repo.addnetworkPlaceholder);
    Util.takeScreenshot();

    Util.click(repo.greytickIconUnselected(network1));
    Util.waitForDisplayed(repo.bluetickSelected(network1));
    Util.takeScreenshot();

    Util.waitForDisplayed(repo.applyButtonEnabled);
    Util.takeScreenshot();

    Util.waitForDisplayed(repo.greytickIconUnselected(network2));
    Util.click(repo.greytickIconUnselected(network2));
    Util.waitForDisplayed(repo.bluetickSelected(network2));
    Util.takeScreenshot();

    Util.waitForDisplayed(repo.selectedNetworksVerificationInSearchField(network1));
    Util.waitForDisplayed(repo.selectedNetworksVerificationInSearchField(network2));
    Util.takeScreenshot();


    Util.click(repo.applyButtonEnabled);
    userName1 = `${profile.unifiedNetwork1Admin1.firstName} ${profile.unifiedNetwork1Admin1.lastName}`;
    Util.pause(5);
    Util.setValue(repo.chatsearchInputFieldBigChat, `${profile.unifiedNetwork1Admin1.email}`);
    Util.pause(2);
    

    Util.waitForDisplayed(repo.networkandUserchatVerificationInBigChat(network1,userName1));
    Util.takeScreenshot();
    Util.waitForNotDisplayed(repo.groupchatsInBigChat);

    userName2 = `${profile.unifiedNetwork2Admin1.firstName} ${profile.unifiedNetwork2Admin1.lastName}`;
    Util.click(repo.closeteammateIconInBigChat);

    Util.setValue(repo.chatsearchInputFieldBigChat, `${profile.unifiedNetwork2Admin1.email}`);
    Util.pause(2);
    Util.takeScreenshot();

    Util.waitForDisplayed(repo.networkandUserchatVerificationInBigChat(network2,userName2));
    Util.takeScreenshot();
    Util.waitForNotDisplayed(repo.groupchatsInBigChat);

    Util.waitForDisplayed(repo.closeteammateIconInBigChat);
    Util.click(repo.closeteammateIconInBigChat);

    Util.pause(5);
    Util.setValue(repo.chatsearchInputFieldBigChat, `${profile.unifiedNetwork1Admin1.email}`);
    Util.pause(2);
    

    Util.waitForDisplayed(repo.networkandUserchatVerificationInBigChat(network1,userName1));
    Util.takeScreenshot();
    Util.waitForNotDisplayed(repo.groupchatsInBigChat);

    Util.click(repo.networkandUserchatVerificationInBigChat(network1,userName1));

    Util.waitForDisplayed(repo.expandIconInBigChat);
    Util.click(repo.expandIconInBigChat);

    Util.waitForDisplayed(repo.chatSettingsOptionInBigChat);
    Util.click(repo.chatSettingsOptionInBigChat);


    if(Util.waitForDisplayed(repo.unblockthisUserOptioninSettings, 10000, true))
    {
      Util.click(repo.unblockthisUserOptioninSettings);
      Util.click(repo.unblockButton1);
    }

    Util.click(repo.firstChatWindowInputField);

    const timestamp2 = CustomCommand.getTimestamp();
    const chatMessage2 = `${timestamp2}: P2P Chat Message.`; 
    Util.keys(chatMessage2);
    Util.pause(1);
    Util.keys('Enter');

    Util.pause(5);
    Util.waitForDisplayed(repo.sentGroupChatMessage(chatMessage2));
    Util.switchToBrowser(sessionBrowser2);
    Util.waitForDisplayed(repo.receivedChatMessage(chatMessage2));

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