let repo = require('../../../object-repository/object-repo');
let profile = require('../../../config/profile');
let Util = require('../../../utils/utils');
let CustomCommand = require('../../../utils/custom-commands');
 
describe('feed detail view', function () {

// Author: Mobeen Atif
  // Total Test Cases: 32


  it('verify comment on post is working', function () {

    CustomCommand.login(profile.url, profile.network1Admin1.email, profile.network1Admin1.password);
    const timestamp = CustomCommand.getTimestamp();    
    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network1Admin1.email);
    Util.click(repo.suggestedPostRecipient);
    Util.pause(2);
    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post to execute feed detail view test cases.`);
    Util.pause(2);
    Util.click(repo.noteShareButton);
    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
    Util.pause(2);
    Util.click(repo.sharedPostTitle(timestamp));
    Util.pause(5);
    Util.moveTo(repo.postCommentArea);
    Util.click(repo.postCommentArea);
    Util.pause(1);
    Util.setValue(repo.postCommentInputField, 'Test Comment');
    Util.pause(1);
    Util.keys('Enter');
    Util.pause(1);
    Util.waitForDisplayed(repo.postCommentText);
  });


  it('verify add permissions comment only functionality is working', function () {

    Util.click(repo.more);
    Util.moveTo(repo.permissionLinkInMoreMenuBar);
    Util.pause(5);
    Util.click(repo.commentOnlyFromPermissionsContextMenu);
    Util.waitForDisplayed(repo.permissionsUpdatedSuccessMessage);
  
  });

  it('verify add permissions view only functionality is working', function () {

    Util.click(repo.more);
    Util.moveTo(repo.permissionLinkInMoreMenuBar);
    Util.pause(5);
    Util.click(repo.viewOnlyFromPermissionsContextMenu);
    Util.waitForDisplayed(repo.permissionsUpdatedSuccessMessage);
  
  });

  it('verify add tags from top menu bar is working', function () {

    Util.click(repo.addTagsButtonInPostDetailView);
    Util.setValue(repo.tagInputField,"Database");
    browser.keys('Enter');
    Util.click(repo.doneButtonOnTagPost);
    Util.pause(2);
    Util.waitForDisplayed(repo.tagVerificationInDetail);
  });

  it('verify remove tag functionality is working', function () {

    Util.pause(3);
    Util.waitForDisplayed(repo.tagVerificationInDetail);
    Util.click(repo.editButtonInPostDetailView);
    Util.pause(2);
    Util.click(repo.removeTag);
    Util.pause(1);
    Util.click(repo.doneButtonPostDetailView);
    Util.waitForNotDisplayed(repo.tagVerificationInDetail);
 
  });

  it('verify add tag functionality is working', function () {

    Util.pause(3);
    Util.click(repo.editButtonInPostDetailView);
    Util.pause(3);
    Util.click(repo.addTag);
    Util.pause(1);
    Util.setValue(repo.addTagInputField,"Computer");
    browser.keys('Enter');
    Util.pause(3);
    Util.click(repo.doneButtonPostDetailView);
    Util.waitForDisplayed(repo.tagVerificationInDetailVerified);
  });

  it('verify add tags in text editor is working', function () {

    Util.pause(3);
    Util.click(repo.editButtonInPostDetailView);
    Util.pause(3);
    Util.setValue(repo.postEditorInPostDetailView,"This post text is now edited. #tissuePaper");
    Util.click(repo.doneButtonPostDetailView);
    const tag= 'tissue';
    Util.waitForDisplayed(repo.tagVerificationInDetailTissuePaper);
  });

  it('verify auto saved edited post functionality is working', function () {

    Util.pause(3);
    Util.click(repo.editButtonInPostDetailView);
    Util.pause(3);
    Util.setValue(repo.postEditorInPostDetailView,"This post text is now edited.");
    Util.waitForDisplayed(repo.autoSavedText);
    Util.click(repo.doneButtonPostDetailView);
    
  });

  it('verify manually saved edited post functionality is working', function () {

    Util.pause(3);
    Util.click(repo.editButtonInPostDetailView);
    Util.pause(3);
    Util.setValue(repo.postEditorInPostDetailView,"This post text is now edited.");
    browser.keys(['Meta', 's']);
    Util.waitForDisplayed(repo.autoSavedText);
    Util.click(repo.doneButtonPostDetailView);
    
  });

  it('verify mute post in post detail view is working', function () {

    Util.pause(3);
    Util.click(repo.more);
    Util.click(repo.muteThisPost);
    Util.waitForDisplayed(repo.mutedAlertMessage);

  });

  it('verify show hide panel functionality is working', function () {

    Util.pause(3);
    Util.click(repo.hidePanel);
    Util.waitForDisplayed(repo.showPanel);
    Util.click(repo.showPanel);

  });

  it('verify like post in post detail view is working', function () {

    Util.pause(3);
    Util.click(repo.likeButtonInPostDetailView);
    Util.waitForDisplayed(repo.unlikeButton);
    
  });

  it('verify unlike post in post detail view is working', function () {

    Util.click(repo.unlikeButton);
    Util.waitForDisplayed(repo.likeButtonInPostDetailView);
    
  });

  it('verify star post functionality is working in post detail view', function () {

    Util.click(repo.starPostInDetailView);
    Util.waitForDisplayed(repo.UnstarPostInDetailView);
  
  });

  it('verify unstar post functionality is working in post detail view', function () {

    Util.click(repo.UnstarPostInDetailView);
    Util.waitForDisplayed(repo.starPostInDetailView);
  
  });

  it('verify text snippet and playback in post detail view is working', function () {

    //Util.dragAndDrop(repo.editorText, { x: 70, y: 85 });
    Util.pause(3);
    const editor= $('//div[@class="ql-editor"]/div');
    editor.doubleClick();
    Util.pause(2);
    Util.click(repo.commentOnThisPopup);
    Util.pause(1);
    Util.setValue(repo.postCommentInputField, 'Test Comment');
    Util.pause(1);
    Util.keys('Enter');
    Util.pause(1);
    Util.waitForDisplayed(repo.snippetPlayback);
    Util.click(repo.snippetPlayback);
    Util.pause(2);

  });

  it('verify uploading of file in post detail view is working', function () {

    //Util.dragAndDrop(repo.editorText, { x: 70, y: 85 });
    Util.pause(3);
    const imageFilePath = Util.getResourcePath('mario.jpg');
    Util.uploadFile(repo.imageUploadinput, imageFilePath);
    Util.waitForDisplayed(repo.uploadedImageVerification);
    Util.click(repo.doneButtonInPostDetailView);
    Util.pause(3);

  });

  it('verify file deletion is working in post detail view', function () {
    //Util.dragAndDrop(repo.editorText, { x: 70, y: 85 });

    Util.moveTo(repo.uploadedImageVerification);
    Util.pause(1);
    Util.click(repo.deleteImage);
    Util.pause(1);
    Util.click(repo.deleteButtonForFile);
    Util.pause(1);
    Util.waitForNotDisplayed(repo.uploadedImageVerification);

  });

  it('verify mention in comment functionality is working', function () {

    const secondNetworkUserFullName = `${profile.network1User1.firstName} ${profile.network1User1.lastName}`;
    Util.click(repo.postCommentArea);
    Util.setValue(repo.postCommentInputField, `@${secondNetworkUserFullName}`);
    Util.click(repo.mentionedUserNameSuggestion(secondNetworkUserFullName));
    Util.keys('Enter');  
    Util.waitForDisplayed(repo.mentionedUserName(secondNetworkUserFullName));
  
  });

  it('verify user suggestion in comment functionality is working', function () {
    Util.setValue(repo.postCommentInputField, '@');
    Util.waitForDisplayed(repo.usersSuggestionListInCommentSection);
    Util.clearValue(repo.postCommentInputField);
  });

  it('verify copy comment link functionality is working', function () {

    const timestamp = CustomCommand.getTimestamp();
    Util.pause(2);
    Util.setValue(repo.postCommentInputField, `Comment: ${timestamp}`);
    Util.pause(1);
    Util.keys('Enter');
    Util.waitForDisplayed(repo.postCommentText);
    Util.pause(2);
    Util.moveTo(repo.createdCommentText(timestamp));
    Util.pause(1);
    Util.click(repo.commentElipsesInDetail(timestamp));
    Util.click(repo.copyCommentLink);
    Util.waitForExist(repo.copiedToClipboardAlertMessage);
    Util.moveTo(repo.postCommentArea);
    Util.click(repo.postCommentArea);
    Util.keys(['Control', 'v']);
    Util.keys('Enter');
    Util.waitForDisplayed(repo.copiedCommentLink(timestamp));
    Util.pause(3);
  });

  it('verify edit comment functionality is working', function () {

    const timestamp = CustomCommand.getTimestamp();
    Util.setValue(repo.postCommentInputField, `Comment: ${timestamp}`);
    Util.keys('Enter');
    Util.pause(3);
    Util.waitForDisplayed(repo.postCommentText);
    Util.moveTo(repo.createdCommentText(timestamp));
    Util.click(repo.commentElipsesInDetail(timestamp));
    Util.click(repo.editCommentLinkPostDetailView);
    Util.clearValue(repo.postCommentInputField);
    Util.setValue(repo.postCommentInputField, `Comment Edited: ${timestamp}`);
    Util.keys('Enter');
    Util.waitForDisplayed(repo.editedCommentInDetail(timestamp));
  });

  it('verify edited comment timestamp is working', function () {

    const timestamp = CustomCommand.getTimestamp();
    Util.moveTo(repo.postCommentArea);
    Util.click(repo.postCommentArea);
    Util.setValue(repo.postCommentInputField, `Comment: ${timestamp}`);
    Util.keys('Enter');
    Util.pause(3);
    Util.waitForDisplayed(repo.postCommentText);
    Util.moveTo(repo.createdCommentText(timestamp));
    Util.click(repo.commentElipsesInDetail(timestamp));
    Util.click(repo.editCommentLinkPostDetailView);
    Util.pause(3);
    Util.clearValue(repo.postCommentInputField);
    Util.setValue(repo.postCommentInputField, `Comment Edited TS: ${timestamp}`);
    Util.keys('Enter');
    Util.pause(3);
    Util.waitForDisplayed(repo.editedCommentInDetail(timestamp));
    Util.waitForDisplayed(repo.editedCommentTimestamp(timestamp));
    
  });

  it('verify delete comment functionality is working', function () {

    const timestamp = CustomCommand.getTimestamp();
    Util.moveTo(repo.postCommentArea);
    Util.click(repo.postCommentArea);
    Util.setValue(repo.postCommentInputField, `Comment: ${timestamp}`);
    Util.keys('Enter');
    Util.pause(3);
    Util.waitForDisplayed(repo.postCommentText);
    Util.moveTo(repo.createdCommentText(timestamp));
    Util.click(repo.commentElipsesInDetail(timestamp));
    Util.click(repo.deleteCommentLinkPostDetailView);
    Util.takeScreenshot();
    Util.click(repo.deleteCommentButton);
    Util.waitForNotDisplayed(repo.createdCommentText(timestamp));

  });

  it('verify emoticon in commet is working', function () {

    const timestamp = CustomCommand.getTimestamp();
    Util.moveTo(repo.postCommentArea);
    Util.click(repo.postCommentArea);
    Util.setValue(repo.postCommentInputField, `Comment: ${timestamp}`);
    Util.click(repo.emoticonIconForCommentPostDetailView);
    Util.click(repo.firstEmoticonIcon);
    Util.keys('Enter');
    Util.pause(3);
    Util.waitForDisplayed(repo.postCommentText);
    Util.waitForDisplayed(repo.createdCommentWithEmoticon(timestamp));
  });

  it('verify attachment in comment is working', function () {

    const timestamp = CustomCommand.getTimestamp();
    Util.setValue(repo.postCommentInputField, `Comment: ${timestamp}`);
    const imageFilePath = Util.getResourcePath('mario.jpg');
    Util.uploadFile(repo.commentFileUploadPostDetailView, imageFilePath);
    Util.waitForExist(repo.fileUploadProgressLine);
    Util.keys('Enter');
    Util.pause(3);
    Util.waitForDisplayed(repo.postCommentText);
  });

  it('verify delete comment with attachment is working', function () {

    const timestamp = CustomCommand.getTimestamp();
    Util.setValue(repo.postCommentInputField, `Comment: ${timestamp}`);
    const imageFilePath = Util.getResourcePath('mario.jpg');
    Util.uploadFile(repo.commentFileUploadPostDetailView, imageFilePath);
    Util.waitForExist(repo.fileUploadProgressLine);
    Util.keys('Enter');
    Util.pause(3);
    Util.waitForDisplayed(repo.postCommentText);
    Util.moveTo(repo.createdCommentText(timestamp));
    Util.click(repo.commentElipsesInDetail(timestamp));
    Util.takeScreenshot();
    Util.click(repo.deleteCommentLinkPostDetailView);
    Util.click(repo.deleteCommentButton);
  
  })

  it('verify cancel delete comment functionality is working', function () {

    const timestamp = CustomCommand.getTimestamp();
    Util.moveTo(repo.postCommentArea);
    Util.click(repo.postCommentArea);
    Util.setValue(repo.postCommentInputField, `Comment: ${timestamp}`);
    Util.keys('Enter');
    Util.pause(3);
    Util.waitForDisplayed(repo.postCommentText);
    Util.moveTo(repo.createdCommentText(timestamp));
    Util.click(repo.commentElipsesInDetail(timestamp));
    Util.click(repo.deleteCommentLinkPostDetailView);
    Util.click(repo.cancelDeleteCommentButton);
    Util.waitForDisplayed(repo.postCommentText);
  });

  it('verify share with others functionality is working', function () {

    Util.pause(2);
    Util.click(repo.shareThis);
    Util.setValue(repo.peopleandGroupInput,`${profile.network1User2.firstName} ${profile.network1User2.lastName}`);
    Util.pause(2);
    const userFullName= profile.network1User2.firstName + ' ' + profile.network1User2.lastName;
    Util.click(repo.userName(userFullName));
    Util.click(repo.publish);
    Util.waitForDisplayed(repo.shared);

  });

  it('verify copy post link functionality is working', function () {

    Util.pause(2);

    Util.click(repo.more);

    Util.click(repo.copyPostlink);

    Util.pause(5);

    Util.click(repo.networkLogo);

    Util.click(repo.inlineInsertTextField);

    Util.keys(['Control', 'v']);

    Util.pause(5);

    Util.click(repo.postLink);

    Util.click(repo.tooltipUrl);

    const integrationWindows = Util.getWindowHandles();

    Util.switchToWindow(integrationWindows[1]);

    Util.waitForDisplayed(repo.editButtonInPostDetailView);


  });

  it('verify delete post is working', function () {

    Util.pause(2);
    Util.click(repo.more);
    Util.click(repo.deletePost);
    Util.waitForDisplayed(repo.movedtoTrash);

  });

  it('verify restore post functionality is working', function () {

    Util.pause(2);
    Util.click(repo.restore);
    Util.waitForDisplayed(repo.restored);

  });

  it('verify delete forever is working', function () {

    Util.pause(2);
    Util.click(repo.more);
    Util.click(repo.deletePost);
    Util.waitForDisplayed(repo.movedtoTrash);
    Util.click(repo.deleteforever);
    Util.waitForDisplayed(repo.deleted);

  });

}); 