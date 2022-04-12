const repo = require('../../../object-repository/object-repo');
const profile = require('../../../config/profile');
const Util = require('../../../utils/utils');
const CustomCommand = require('../../../utils/custom-commands');

describe('gallery view', function () {

  // Author: Shoaib Arslan Kiyani
  // Note: This test case needs to have 2 seperate network users so that chat activity does not interfere with other chat and feed related test cases.
  // Total Testcases: 32

  let sessionBrowser1 = null;
  let sessionBrowser2 = null;

  const browserSessions = [];

 
  it('copy attachment link to chat in gallery view', function () {

    const imageUploadFileName = 'mario.jpg';
    CustomCommand.login(profile.url, profile.network3Admin1.email, profile.network3Admin1.password);

    //CustomCommand.login(profile.url, profile.email, profile.password);
    const timestamp = CustomCommand.getTimestamp();
    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network3Admin1.email);
    Util.click(repo.suggestedPostRecipient);
    Util.pause(2);
    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp}: This post is addressed to @${profile.network3User1.firstName} ${profile.network3User1.lastName}`);
    Util.pause(2);
    const userFullName= profile.network3User1.firstName + ' ' + profile.network3User1.lastName;
    Util.click(repo.userNameSuggestion(userFullName));
    Util.uploadFile(repo.feedFileUploadInputField, Util.getResourcePath(imageUploadFileName));
    Util.waitForDisplayed(repo.fileUploadAndConversionSuccess);
    Util.pause(2);
    Util.click(repo.noteShareButton);

    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
    Util.pause(1);

    Util.click(repo.sharedPostWithImageAttachment(timestamp));

    Util.waitForDisplayed(repo.loadingSpinnerinGalleryView);

    expect(Util.getText(repo.galleryViewFileName)).toBe(imageUploadFileName);

    Util.click(repo.galleryViewElipses);
    Util.click(repo.galleryViewElipsesCopyLink);

    Util.click(repo.greenChatActiveIcon);
    Util.setValue(repo.chatSearchInputField, `${profile.network3User1.email}`);
    Util.click(repo.searchedChatUserSuggestion);

    Util.setValue(repo.firstChatWindowInputField, `${timestamp} `);
    Util.keys(['Control', 'v']);
    Util.keys('Enter');
    Util.pause(2);

    // second network user.

    sessionBrowser1 = Util.getBrowserSession();
    browserSessions.push(sessionBrowser1);

    sessionBrowser2 = Util.openBrowser();
    browserSessions.push(sessionBrowser2);
    
    Util.switchToBrowser(sessionBrowser2);

    CustomCommand.login(profile.url, profile.network3User1.email, profile.network3User1.password);
    
    Util.click(repo.greenChatActiveIcon);

    Util.setValue(repo.chatSearchInputField, `${profile.network3Admin1.email}`);

    Util.click(repo.searchedChatUserSuggestion); 

    Util.click(repo.imageLinkInChatMessageReceivedFromFirstUser(timestamp));

    Util.waitForDisplayed(repo.loadingSpinnerinGalleryView);

    expect(Util.getText(repo.galleryViewFileName)).toBe(imageUploadFileName);

    Util.click(repo.networkLogo);

    Util.click(repo.chatClose);

    Util.click(repo.greenChatActiveIcon);

    Util.switchToBrowser(sessionBrowser1);
  
    Util.click(repo.chatClose);

    Util.click(repo.greenChatActiveIcon);

  });
  
  it('copy snippet link to chat in gallery view', function () {

    Util.click(repo.networkLogo);

    const imageUploadFileName = 'mario.jpg';

    //CustomCommand.login(profile.url, profile.email, profile.password);
    const timestamp = CustomCommand.getTimestamp();
    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network3Admin1.email);
    Util.click(repo.suggestedPostRecipient);
    Util.pause(2);
    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp}: This post is addressed to @${profile.network3User1.firstName} ${profile.network3User1.lastName}`);
    Util.pause(2);
    const userFullName= profile.network3User1.firstName + ' ' + profile.network3User1.lastName;
    Util.click(repo.userNameSuggestion(userFullName));
    Util.uploadFile(repo.feedFileUploadInputField, Util.getResourcePath(imageUploadFileName));
    Util.waitForDisplayed(repo.fileUploadAndConversionSuccess);
    Util.pause(2);
    Util.click(repo.noteShareButton);

    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));

    Util.pause(1);

    Util.click(repo.sharedPostWithImageAttachment(timestamp));
    Util.waitForDisplayed(repo.loadingSpinnerinGalleryView);

    expect(Util.getText(repo.galleryViewFileName)).toBe(imageUploadFileName);
    
    Util.click(repo.rectangleTool);
    Util.dragAndDrop(repo.galleryViewImageCanvasArea, { x: 70, y: 85 });
    Util.click(repo.commentOnThisTooltip);
    const timestamp2 = CustomCommand.getTimestamp();
    Util.setValue(repo.snippetCommentInputField, `${timestamp2}: Image Snippet`);
    Util.keys('Enter');
    Util.moveTo(repo.createdImageSnippet(timestamp2));
    Util.click(repo.createdImageSnippetCommentElipses(timestamp2));
    Util.click(repo.copyCommentLink);
    
    Util.click(repo.greenChatActiveIcon);
    Util.setValue(repo.chatSearchInputField, `${profile.network3User1.email}`);
    Util.click(repo.searchedChatUserSuggestion);

    Util.keys(['Control', 'v']);
    Util.keys('Enter');
    Util.pause(2);

    // second network user.

    Util.switchToBrowser(sessionBrowser2);
    
    Util.click(repo.greenChatActiveIcon);
    Util.setValue(repo.chatSearchInputField, `${profile.network3Admin1.email}`);
    Util.click(repo.searchedChatUserSuggestion);

    Util.click(repo.imageSnippetCommentLinkInChatMessageReceivedFromFirstUser(timestamp2));

    Util.waitForDisplayed(repo.loadingSpinnerinGalleryView);

    expect(Util.getText(repo.galleryViewFileName)).toBe(imageUploadFileName);
    
    Util.closeBrowser();

    Util.switchToBrowser(sessionBrowser1);

    Util.click(repo.chatClose);

    Util.click(repo.greenChatActiveIcon);

  });
  
  it('copy snippet link to post in gallery view', function () {
    
    Util.click(repo.networkLogo);

    const imageUploadFileName = 'mario.jpg';

    //CustomCommand.login(profile.url, profile.email, profile.password);
    const timestamp = CustomCommand.getTimestamp();
    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network3Admin1.email);
    Util.click(repo.suggestedPostRecipient);
    Util.pause(2);
    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp}: This post is addressed to @${profile.network3User1.firstName} ${profile.network3User1.lastName}`);
    Util.pause(2);
    const userFullName= profile.network3User1.firstName + ' ' + profile.network3User1.lastName;
    Util.click(repo.userNameSuggestion(userFullName));
    Util.uploadFile(repo.feedFileUploadInputField, Util.getResourcePath(imageUploadFileName));
    Util.waitForDisplayed(repo.fileUploadAndConversionSuccess);
    Util.pause(2);
    Util.click(repo.noteShareButton);

    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));

    Util.click(repo.sharedPostWithImageAttachment(timestamp));

    Util.waitForDisplayed(repo.loadingSpinnerinGalleryView);

    expect(Util.getText(repo.galleryViewFileName)).toBe(imageUploadFileName);
    
    Util.click(repo.rectangleTool);
    Util.dragAndDrop(repo.galleryViewImageCanvasArea, { x: 70, y: 85 });
    Util.click(repo.commentOnThisTooltip);
    Util.setValue(repo.snippetCommentInputField, `${timestamp}: Image Snippet`);
    Util.keys('Enter');
    Util.moveTo(repo.createdImageSnippet(timestamp));
    Util.click(repo.createdImageSnippetCommentElipses(timestamp));
    Util.click(repo.copyCommentLink);

    Util.click(repo.networkLogo);

    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network3Admin1.email);
    Util.click(repo.suggestedPostRecipient);
    Util.pause(2);
    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp + 1}`);
    Util.click(repo.noteBodyInputField);
    Util.keys(['Control', 'v']);
    Util.pause(2);
    Util.click(repo.noteShareButton);

    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));

    Util.pause(10);
    
    Util.click(repo.sharedPostWithImageSnippetCommentLink(timestamp));

    Util.waitForDisplayed(repo.loadingSpinnerinGalleryView);
    Util.waitForDisplayed(repo.createdImageSnippet(timestamp));
    expect(Util.getText(repo.galleryViewFileName)).toBe(imageUploadFileName);
    
  });
  
  it('opening valid file in gallery view attached to a link post in a comment', function () {
    
    Util.click(repo.networkLogo);

    const richTextFormatUploadFileName = 'rich-text-file.rtf';

    //CustomCommand.login(profile.url, profile.email, profile.password);
    const timestamp = CustomCommand.getTimestamp();
    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network3Admin1.email);
    Util.click(repo.suggestedPostRecipient);
    Util.pause(2);
    Util.click(repo.noteBodyInputField);
    const postBodyURL = `https://en.wikipedia.org/wiki/Main_Page`;
    Util.setValue(repo.noteBodyInputField, postBodyURL);
    Util.keys(['Control', 'a']);

    Util.pause(3);

    Util.keys(['Control', 'c']);

    Util.pause(3);

    Util.clearValue(repo.noteBodyInputField);

    Util.pause(5);

    Util.click(repo.noteBodyInputField);

    Util.keys(['Control', 'v']);

    Util.pause(5);
    Util.setValue(repo.linkPostCommentInputField, `${timestamp} Link Post Comment`);
    Util.click(repo.noteShareButton);
    Util.pause(5);
    Util.waitForDisplayed(repo.commentTextAreaForCreatedLinkPost(timestamp));

    Util.click(repo.commentTextAreaForCreatedLinkPost(timestamp));
    Util.pause(3);
    Util.keys(`${timestamp} Link Post Comment With File Attachment`);
    Util.uploadFile(repo.fileUploadInputFieldInCommentSection(timestamp), Util.getResourcePath(richTextFormatUploadFileName));
    Util.waitForDisplayed(repo.commentSectionProgressbar);
    Util.waitForNotDisplayed(repo.commentSectionProgressbar);
    Util.keys('Enter');
    Util.pause(5);
    Util.click(repo.commentTextWithFileAttachmentInLinkPost(timestamp));

    //expect(Util.getText(repo.displayedFileTextInGalleryView)).toBe('This is a test document. ');
    expect(Util.getText(repo.galleryViewFileName)).toBe(richTextFormatUploadFileName);
    
  });
  
  it('opening valid file in gallery view attached to a note in a comment', function () {

    Util.click(repo.networkLogo);

    const richTextFormatUploadFileName = 'rich-text-file.rtf';

    //CustomCommand.login(profile.url, profile.email, profile.password);
    const timestamp = CustomCommand.getTimestamp();

    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network3Admin1.email);
    Util.click(repo.suggestedPostRecipient);
    Util.pause(2);

    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp} This post will have a comment with valid file attachment.`);
    Util.pause(2);
    Util.click(repo.noteShareButton);

    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));

    Util.pause(5);

    Util.click(repo.createdPostCommentLink(timestamp));

    Util.keys(`${timestamp} Normal Post Comment With File Attachment`);
    
    Util.uploadFile(repo.fileUploadInputFieldInCommentSection2(timestamp), Util.getResourcePath(richTextFormatUploadFileName));
    Util.waitForDisplayed(repo.commentSectionProgressbar);
    Util.waitForNotDisplayed(repo.commentSectionProgressbar);
    Util.keys('Enter');

    Util.pause(5);
    Util.click(repo.commentTextWithFileAttachmentInNormalPost(timestamp));

    //expect(Util.getText(repo.displayedFileTextInGalleryView)).toBe('This is a test document. ');
    expect(Util.getText(repo.galleryViewFileName)).toBe(richTextFormatUploadFileName);

  });
  
  it('opening valid image in gallery view attached to a link in a comment', function () {

    Util.click(repo.networkLogo);

    const imageUploadFileName = 'mario.jpg';

    //CustomCommand.login(profile.url, profile.email, profile.password);
    const timestamp = CustomCommand.getTimestamp();
    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network3Admin1.email);
    Util.click(repo.suggestedPostRecipient);
    Util.pause(2);
    Util.click(repo.noteBodyInputField);
    const postBodyURL = `https://en.wikipedia.org/wiki/Main_Page`;
    Util.setValue(repo.noteBodyInputField, postBodyURL);
    Util.keys(['Control', 'a']);
    Util.pause(3);
    Util.keys(['Control', 'c']);
    Util.pause(5);
    Util.clearValue(repo.noteBodyInputField);

    Util.pause(3);

    Util.click(repo.noteBodyInputField);
    
    Util.keys(['Control', 'v']);
    
    Util.pause(5);
    Util.setValue(repo.linkPostCommentInputField, `${timestamp} Link Post Comment`);
    Util.click(repo.noteShareButton);
    Util.pause(5);

    Util.waitForDisplayed(repo.commentTextAreaForCreatedLinkPost(timestamp));
    
    Util.pause(2);
    Util.click(repo.commentTextAreaForCreatedLinkPost(timestamp));

    Util.pause(2);
    Util.keys(`${timestamp} Link Post Comment With Image File Attachment`);
    Util.uploadFile(repo.fileUploadInputFieldInCommentSection(timestamp), Util.getResourcePath(imageUploadFileName));
    Util.waitForDisplayed(repo.commentSectionProgressbar);
    Util.waitForNotDisplayed(repo.commentSectionProgressbar);
    Util.keys('Enter');
    Util.pause(5);
    Util.click(repo.commentTextWithFileAttachmentInLinkPost2(timestamp));

    Util.waitForDisplayed(repo.loadingSpinnerinGalleryView);
    expect(Util.getText(repo.galleryViewFileName)).toBe(imageUploadFileName);

  });
  
  it('switch an attached image to a note in a comment in full screen view', function () {

    Util.click(repo.fullscreenIconInGalleryView);
    Util.waitForDisplayed(repo.fitToScreenButtonGalleryInGalleryView);
    Util.click(repo.galleryViewExitFullScreenIcon);
  });

  it('opening valid image in gallery view attached to a note in a comment', function () {
    
    Util.click(repo.networkLogo);
    
    const imageUploadFileName = 'mario.jpg';

    //CustomCommand.login(profile.url, profile.email, profile.password);
    const timestamp = CustomCommand.getTimestamp();

    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network3Admin1.email);
    Util.click(repo.suggestedPostRecipient);
    Util.pause(2);

    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp} This post will have a comment with valid image file attachment.`);
    Util.pause(2);
    Util.click(repo.noteShareButton);

    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));

    Util.pause(3);
    Util.click(repo.createdPostCommentLink(timestamp));

    Util.keys(`${timestamp} Normal Post Comment With Image File Attachment`);

    Util.pause(5);
    
    Util.uploadFile(repo.fileUploadInputFieldInCommentSection2(timestamp), Util.getResourcePath(imageUploadFileName));
    Util.waitForDisplayed(repo.commentSectionProgressbar);
    Util.waitForNotDisplayed(repo.commentSectionProgressbar);
    Util.keys('Enter');

    Util.pause(5);
    Util.click(repo.commentTextWithFileAttachmentInNormalPost2(timestamp));
    
    Util.waitForDisplayed(repo.loadingSpinnerinGalleryView);
    expect(Util.getText(repo.galleryViewFileName)).toBe(imageUploadFileName);

  });
  
  it('verify go to post functionality is working fine', function () {

    Util.click(repo.galleryViewGoToPostIcon);
    Util.waitForDisplayed(repo.editButtonInPostDetailView);

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