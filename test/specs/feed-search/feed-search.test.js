const repo = require('../../../object-repository/object-repo');
const profile = require('../../../config/profile');
const Util = require('../../../utils/utils');
const CustomCommand = require('../../../utils/custom-commands');

describe('feed search', function () {

  // Author: Shoaib Arslan Kiyani
  // Total Test Cases: 20

  it('filters', function () {

    CustomCommand.login(profile.url, profile.network1Admin1.email, profile.network1Admin1.password);
    Util.click(repo.feedSearchDropdownIcon);
    Util.waitForDisplayed(repo.feedSearchFilters);

  });

  it('has: filters list', function () {
    
    //CustomCommand.login(profile.url, profile.email, profile.password);
    Util.click(repo.networkLogo);
    
    Util.setValue(repo.feedSearchInputField, 'has:');
    Util.waitForDisplayed(repo.hasFiltersList);

    const hasFiltersListItemsCount = Util.getElementsCount(repo.hasFiltersList);
    expect(hasFiltersListItemsCount).toEqual(10);
  
  });

  it('filter has all files', function () {

    //CustomCommand.login(profile.url, profile.email, profile.password);
    Util.click(repo.networkLogo);
   
    Util.setValue(repo.feedSearchInputField, 'has:"Files"');
    Util.pause(5);
    Util.click(repo.searchIcon);
    Util.pause(10);

    // If there are no posts found with attachments then a post will be created with all of the required attachments.

    const statusNoFeedToDisplay = Util.isDisplayed(repo.statusNoFeedToDisplay);
    
    if (statusNoFeedToDisplay) {
      createNewPostWithAttachments();
      Util.setValue(repo.feedSearchInputField, 'has:"Files"');
      Util.pause(5);
      Util.click(repo.searchIcon);
      Util.pause(5);
    }

    Util.waitForDisplayed(repo.feedViewFeedItemsCount);

    const feedViewFeedItemsCount = Util.getElementsCount(repo.feedViewFeedItemsCount);
    const feedViewAttachedFilesCount = Util.getElementsCount(repo.feedViewAttachedFilesCount);
  
    expect(feedViewAttachedFilesCount).toBeGreaterThanOrEqual(feedViewFeedItemsCount);

  });

  it('filter has audio', function () {

    //CustomCommand.login(profile.url, profile.email, profile.password);
    Util.click(repo.networkLogo);
   
    Util.setValue(repo.feedSearchInputField, 'has:"Audio"');
    Util.pause(5);
    Util.click(repo.searchIcon);
    Util.pause(10);

    const statusNoFeedToDisplay = Util.isDisplayed(repo.statusNoFeedToDisplay);

    if (statusNoFeedToDisplay) {
      createNewPostWithAttachments();
      Util.setValue(repo.feedSearchInputField, 'has:"Audio"');
      Util.pause(5);
      Util.click(repo.searchIcon);
      Util.pause(5);
    }

    Util.waitForDisplayed(repo.feedViewFeedItemsCount);

    const feedViewFeedItemsCount = Util.getElementsCount(repo.feedViewFeedItemsCount);
    const feedViewAttachedAudioFilesCount = Util.getElementsCount(repo.feedViewAttachedAudioFilesCount);
    
    expect(feedViewAttachedAudioFilesCount).toBeGreaterThanOrEqual(feedViewFeedItemsCount);

  });

  it('filter has excel sheets', function () {

    //CustomCommand.login(profile.url, profile.email, profile.password);
    Util.click(repo.networkLogo);
   
    Util.setValue(repo.feedSearchInputField, 'has:"xlsx,xls"');
    Util.pause(5);
    Util.click(repo.searchIcon);
    Util.pause(10);

    const statusNoFeedToDisplay = Util.isDisplayed(repo.statusNoFeedToDisplay);

    if (statusNoFeedToDisplay) {
      createNewPostWithAttachments();
      Util.setValue(repo.feedSearchInputField, 'has:"xlsx,xls"');
      Util.pause(5);
      Util.click(repo.searchIcon);
      Util.pause(5);
    }

    Util.waitForDisplayed(repo.feedViewFeedItemsCount);

    const feedViewFeedItemsCount = Util.getElementsCount(repo.feedViewFeedItemsCount);
    const feedViewAttachedExcelFilesCount = Util.getElementsCount(repo.feedViewAttachedExcelFilesCount);
  
    expect(feedViewAttachedExcelFilesCount).toBeGreaterThanOrEqual(feedViewFeedItemsCount);

  });

  
  xit('filter has images', function () {

    //CustomCommand.login(profile.url, profile.email, profile.password);
    Util.click(repo.networkLogo);
    
    Util.setValue(repo.feedSearchInputField, 'has:"Images"');
    Util.pause(5);
    Util.click(repo.searchIcon);
    Util.pause(10);

    const statusNoFeedToDisplay = Util.isDisplayed(repo.statusNoFeedToDisplay);

    if (statusNoFeedToDisplay) {
      createNewPostWithAttachments();
      Util.setValue(repo.feedSearchInputField, 'has:"Images"');
      Util.pause(5);
      Util.click(repo.searchIcon);
      Util.pause(5);
    }

    Util.waitForDisplayed(repo.feedViewFeedItemsCount);

    const feedViewFeedItemsCount = Util.getElementsCount(repo.feedViewFeedItemsCount);
    const feedViewAttachedImageFilesCount = Util.getElementsCount(repo.feedViewAttachedImageFilesCount);
  
    expect(feedViewAttachedImageFilesCount).toBeGreaterThanOrEqual(feedViewFeedItemsCount);

  });

  it('filter has pdf', function () {

    //CustomCommand.login(profile.url, profile.email, profile.password);
    Util.click(repo.networkLogo);
    
    Util.setValue(repo.feedSearchInputField, 'has:"pdf"');
    Util.pause(5);
    Util.click(repo.searchIcon);
    Util.pause(10);

    const statusNoFeedToDisplay = Util.isDisplayed(repo.statusNoFeedToDisplay);

    if (statusNoFeedToDisplay) {
      createNewPostWithAttachments();
      Util.setValue(repo.feedSearchInputField, 'has:"pdf"');
      Util.pause(5);
      Util.click(repo.searchIcon);
      Util.pause(5);
    }

    Util.waitForDisplayed(repo.feedViewFeedItemsCount);

    const feedViewFeedItemsCount = Util.getElementsCount(repo.feedViewFeedItemsCount);
    const feedViewAttachedPdfFilesCount = Util.getElementsCount(repo.feedViewAttachedPdfFilesCount);
  
    expect(feedViewAttachedPdfFilesCount).toBeGreaterThanOrEqual(feedViewFeedItemsCount);

  });

  it('filter has powerpoint slideshows', function () {

    //CustomCommand.login(profile.url, profile.email, profile.password);
    Util.click(repo.networkLogo);
    
    Util.setValue(repo.feedSearchInputField, 'has:"pptx,ppt"');
    Util.pause(5);
    Util.click(repo.searchIcon);
    Util.pause(10);

    const statusNoFeedToDisplay = Util.isDisplayed(repo.statusNoFeedToDisplay);

    if (statusNoFeedToDisplay) {
      createNewPostWithAttachments();
      Util.setValue(repo.feedSearchInputField, 'has:"pptx,ppt"');
      Util.pause(5);
      Util.click(repo.searchIcon);
      Util.pause(5);
    }

    Util.waitForDisplayed(repo.feedViewFeedItemsCount);

    const feedViewFeedItemsCount = Util.getElementsCount(repo.feedViewFeedItemsCount);
    const feedViewAttachedPptFilesCount = Util.getElementsCount(repo.feedViewAttachedPptFilesCount);
  
    expect(feedViewAttachedPptFilesCount).toBeGreaterThanOrEqual(feedViewFeedItemsCount);

  });

  it('filter has videos', function () {

    //CustomCommand.login(profile.url, profile.email, profile.password);
    Util.click(repo.networkLogo);
    
    Util.setValue(repo.feedSearchInputField, 'has:"Videos"');
    Util.pause(5);
    Util.click(repo.searchIcon);
    Util.pause(10);

    const statusNoFeedToDisplay = Util.isDisplayed(repo.statusNoFeedToDisplay);

    if (statusNoFeedToDisplay) {
      createNewPostWithAttachments();
      Util.setValue(repo.feedSearchInputField, 'has:"Videos"');
      Util.pause(5);
      Util.click(repo.searchIcon);
      Util.pause(5);
    }

    Util.waitForDisplayed(repo.feedViewFeedItemsCount);

    const feedViewFeedItemsCount = Util.getElementsCount(repo.feedViewFeedItemsCount);
    const feedViewAttachedVideoFilesCount = Util.getElementsCount(repo.feedViewAttachedVideoFilesCount);
  
    expect(feedViewAttachedVideoFilesCount).toBeGreaterThanOrEqual(feedViewFeedItemsCount);
  
  });

  it('filter has word docs', function () {

    //CustomCommand.login(profile.url, profile.email, profile.password);
    Util.click(repo.networkLogo);
    
    Util.setValue(repo.feedSearchInputField, 'has:"docx,doc"');
    Util.pause(5);
    Util.click(repo.searchIcon);
    Util.pause(10);

    const statusNoFeedToDisplay = Util.isDisplayed(repo.statusNoFeedToDisplay);

    if (statusNoFeedToDisplay) {
      createNewPostWithAttachments();
      Util.setValue(repo.feedSearchInputField, 'has:"docx,doc"');
      Util.pause(5);
      Util.click(repo.searchIcon);
      Util.pause(5);
    }

    Util.waitForDisplayed(repo.feedViewFeedItemsCount);

    const feedViewFeedItemsCount = Util.getElementsCount(repo.feedViewFeedItemsCount);
    const feedViewAttachedWordDocsFilesCount = Util.getElementsCount(repo.feedViewAttachedWordDocsFilesCount);
  
    expect(feedViewAttachedWordDocsFilesCount).toBeGreaterThanOrEqual(feedViewFeedItemsCount);

  });

  it('is: filters list', function () {
    
    //CustomCommand.login(profile.url, profile.email, profile.password);
    Util.click(repo.networkLogo);

    Util.setValue(repo.feedSearchInputField, 'is:');

    Util.waitForDisplayed(repo.isFiltersList);

    const isFiltersListItemsCount = Util.getElementsCount(repo.isFiltersList);
    expect(isFiltersListItemsCount).toEqual(3);
  
  });

  it('filter is chat', function () {

    //CustomCommand.login(profile.url, profile.email, profile.password);
    Util.click(repo.networkLogo);
    
    Util.setValue(repo.feedSearchInputField, 'is:chat');
    Util.pause(5);
    Util.click(repo.searchIcon);
    Util.pause(10);

    const statusNoFeedToDisplay = Util.isDisplayed(repo.statusNoFeedToDisplay);

    if (statusNoFeedToDisplay) {
      createNewChatConversation();
      Util.setValue(repo.feedSearchInputField, 'is:chat');
      Util.pause(5);
      Util.click(repo.searchIcon);
      Util.pause(5);
    }

    Util.waitForDisplayed(repo.feedViewFeedItemsCount);

    const feedViewFeedItemsCount = Util.getElementsCount(repo.feedViewFeedItemsCount);
    const feedViewChatItemsCount = Util.getElementsCount(repo.feedViewChatItemsCount);
  
    expect(feedViewChatItemsCount).toBeGreaterThanOrEqual(feedViewFeedItemsCount);
  
  });

  it('filter is link', function () {

    //CustomCommand.login(profile.url, profile.email, profile.password);
    Util.click(repo.networkLogo);
  
    Util.setValue(repo.feedSearchInputField, 'is:link');
    Util.click(repo.searchIcon);
    Util.pause(10);

    const statusNoFeedToDisplay = Util.isDisplayed(repo.statusNoFeedToDisplay);

    if (statusNoFeedToDisplay) {
      createNewLinkPost();
      Util.setValue(repo.feedSearchInputField, 'is:link');
      Util.pause(5);
      Util.click(repo.searchIcon);
      Util.pause(5);
    }

    Util.waitForDisplayed(repo.feedViewFeedItemsCount);

    const feedViewFeedItemsCount = Util.getElementsCount(repo.feedViewFeedItemsCount);
    const feedViewLinkFeedItemsCount = Util.getElementsCount(repo.feedViewLinkFeedItemsCount);

    expect(feedViewLinkFeedItemsCount).toBeGreaterThanOrEqual(feedViewFeedItemsCount);

  });

  it('filter is message', function () {

    //CustomCommand.login(profile.url, profile.email, profile.password);
    Util.click(repo.networkLogo);
    
    Util.setValue(repo.feedSearchInputField, 'is:message');
    Util.pause(5);
    Util.click(repo.searchIcon);
    Util.pause(10);

    const statusNoFeedToDisplay = Util.isDisplayed(repo.statusNoFeedToDisplay);

    if (statusNoFeedToDisplay) {
      createNewPostWithAttachments();
      Util.setValue(repo.feedSearchInputField, 'is:message');
      Util.pause(5);
      Util.click(repo.searchIcon);
      Util.pause(5);
    }

    Util.waitForDisplayed(repo.feedViewFeedItemsCount);

    const feedViewFeedItemsCount = Util.getElementsCount(repo.feedViewFeedItemsCount);
    const feedViewMessageFeedItemsCount = Util.getElementsCount(repo.feedViewMessageFeedItemsCount);

    expect(feedViewMessageFeedItemsCount).toBeGreaterThanOrEqual(feedViewFeedItemsCount);

  });

  it('groups suggestion', function () {

    //CustomCommand.login(profile.url, profile.email, profile.password);
    Util.click(repo.networkLogo);
    
    const firstPrivateGroupDisplayed = Util.isDisplayed(repo.firstPrivateGroup);
    
    if (firstPrivateGroupDisplayed !== true) {
      createNewPrivateGroup();
    }

    const firstPrivateGroupName = Util.getText(repo.firstPrivateGroup);

    Util.pause(200);

    Util.setValue(repo.feedSearchInputField, firstPrivateGroupName);
    Util.pause(2);
    Util.takeScreenshot();

    Util.click(repo.groupSuggestion(firstPrivateGroupName));
    expect(Util.getText(repo.groupTitle(firstPrivateGroupName))).toBe(firstPrivateGroupName);

    Util.click(repo.groupToggleDropdown(firstPrivateGroupName));
    Util.pause(3);
    Util.click(repo.deleteGroup);
    Util.pause(1);
    Util.takeScreenshot();
    Util.click(repo.deleteButton);
    Util.pause(3);

  });

  it('keyword search', function () {

    //CustomCommand.login(profile.url, profile.email, profile.password);
    Util.click(repo.networkLogo);
    
    const searchedKeyword = 'Post';
    Util.setValue(repo.feedSearchInputField, searchedKeyword);
    Util.pause(5);
    Util.click(repo.searchIcon);
    Util.pause(10);

    const statusNoFeedToDisplay = Util.isDisplayed(repo.statusNoFeedToDisplay);
    
    if (statusNoFeedToDisplay) {
      createNewPostWithAttachments();
      Util.setValue(repo.feedSearchInputField, searchedKeyword);
      Util.pause(5);
      Util.click(repo.searchIcon);
      Util.pause(5);
    }

    Util.waitForDisplayed(repo.postFoundWithSearchedKeyword(searchedKeyword));

  });

  it('search suggestion', function () {

    //CustomCommand.login(profile.url, profile.email, profile.password);
    Util.click(repo.networkLogo);
    
    const searchedKeyword = 'Post';
    Util.setValue(repo.feedSearchInputField, searchedKeyword);

    Util.pause(5);
    Util.waitForDisplayed(repo.searchSuggestion(searchedKeyword));

  });

  it('filter from user and to user', function () {

    //CustomCommand.login(profile.url, profile.email, profile.password);
    Util.click(repo.networkLogo);
    
    Util.click(repo.feedSearchDropdownIcon);
    Util.waitForDisplayed(repo.feedSearchFilters);

    Util.click(repo.feedFilterFromDropdown);
    Util.pause(2);
    Util.keys(profile.network1Admin1.email);
    Util.click(repo.fromUserFilterSuggestion(profile.network1Admin1.email));

    Util.pause(2);

    Util.click(repo.feedFilterToDropdown);
    Util.pause(2);
    Util.keys(profile.network1User1.email);    
    Util.click(repo.toUserFilterSuggestion(profile.network1User1.email));

    const postSharedWithFilterToUserFullName = `${profile.network1User1.firstName} ${profile.network1User1.lastName}`;
    Util.waitForDisplayed(repo.postSharedWithFilterToUser(postSharedWithFilterToUserFullName));

  });

  it('string search', function () {

    //CustomCommand.login(profile.url, profile.email, profile.password);
    Util.click(repo.networkLogo);
    
    const searchedKeyword = 'Test Post';
    Util.setValue(repo.feedSearchInputField, `"${searchedKeyword}"`);
    Util.pause(5);
    Util.click(repo.searchIcon);
    Util.pause(10);

    const statusNoFeedToDisplay = Util.isDisplayed(repo.statusNoFeedToDisplay);

    if (statusNoFeedToDisplay) {
      createNewPostWithAttachments();
      Util.setValue(repo.feedSearchInputField, `"${searchedKeyword}"`);
      Util.pause(5);
      Util.click(repo.searchIcon);
      Util.pause(5);
    }

    Util.waitForDisplayed(repo.postFoundSearchedKeyword(searchedKeyword));

  });

  it('user search appearance', function () {

    //CustomCommand.login(profile.url, profile.email, profile.password);
    Util.click(repo.networkLogo);
    Util.setValue(repo.feedSearchInputField, profile.network1User1.email);
    Util.click(repo.userSuggestion(profile.network1User1.email));
    const userFullName= profile.network1User1.firstName + ' ' + profile.network1User1.lastName;
    Util.waitForDisplayed(repo.userTitle(userFullName));

  });

});


function createNewPostWithAttachments () {

  //CustomCommand.login(profile.url, profile.email, profile.password);
  Util.click(repo.networkLogo);

  const timestamp = CustomCommand.getTimestamp();
  
  const postAttachmentsList = {

    attachmentCsvFileName: 'data.csv',
    attachmentAudioFileName: 'test-audio-file.mp3',
    attachmentExcelFileName: 'excel-data-file.xlsx',
    attachmentImageFileName: 'mario.jpg',
    attachmentPdfFileName: 'dummy-pdf-file.pdf',
    attachmenPowerpointFileName: 'ppt-document-file.ppt',
    attachmentVideoFileName: 'video-file.mp4',
    attachmentWordDocFileName: 'word-document-file.doc'

  };

  Util.click(repo.inlineInsertTextField);
  Util.click(repo.toInputField);
  Util.setValue(repo.typeToInputField, profile.network1Admin1.email);
  Util.click(repo.suggestedPostRecipient);
  Util.pause(2)

  Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
  Util.setValue(repo.noteBodyInputField, `${timestamp}: This post will have required attachments.`);
  Util.pause(2);

  // upload all attachments in the post.

  Object.values(postAttachmentsList).forEach(function (filePath) {
    Util.uploadFile(repo.feedFileUploadInputField, Util.getResourcePath(filePath));
  });

  let allUploadedFilesConverted = false;

  // check whether all attachments have been uploaded and converted.

  while(allUploadedFilesConverted !== true) {
    const countFilesUploadedAndConverted = Util.getElementsCount(repo.fileUploadAndConversionSuccess);
    
    if (countFilesUploadedAndConverted === 8) {
      allUploadedFilesConverted = true;
    }
  
    Util.pause(5);
  }

  Util.click(repo.noteShareButton);

  // check whether post has been shared.
   
  Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
  
  Util.pause(60);
  
  let postIndexed = false;

  while(postIndexed !== true) {

    Util.setValue(repo.feedSearchInputField, `"Test Post: ${timestamp}"`);
    Util.click(repo.searchIcon);

    Util.pause(10);
    const postIndexedAndDisplayed = $(repo.searchedPostResult(timestamp)).isDisplayed();
    
    if (postIndexedAndDisplayed) {
      postIndexed = true;
      Util.click(repo.networkLogo);      
      break;
    }        

    Util.click(repo.networkLogo);
    Util.pause(60);

  }
 
}

function createNewPrivateGroup () {

  //CustomCommand.login(profile.url, profile.email, profile.password);
  
  const timestamp = CustomCommand.getTimestamp();

  Util.click(repo.createNewGroup);
  Util.click(repo.privateGroup);
  Util.click(repo.nextButton);

  Util.setValue(repo.grpName,`PG ${timestamp}`);
  Util.click(repo.nextButtonForGrpCreation);
  Util.click(repo.createGroup);

  Util.waitForDisplayed(repo.groupCreationPost(timestamp));

}

function createNewChatConversation () {

  //CustomCommand.login(profile.url, profile.email, profile.password);

  Util.click(repo.greenChatActiveIcon);
  Util.setValue(repo.chatSearchInputField, `${profile.network1User1.email}`);
  Util.click(repo.searchedChatUserSuggestion);

  Util.keys('Test Message. Please Ignore.');
  Util.pause(1);
  Util.keys('Enter');
  Util.pause(2);
  Util.click(repo.firstChatWindowCrossButton);
  Util.click(repo.greenChatActiveIcon);


  let chatIndexed = false;

  while (chatIndexed !== true) {

    Util.setValue(repo.feedSearchInputField, 'is:chat');
    Util.click(repo.searchIcon);
    Util.pause(10);

    const statusNoFeedToDisplay = Util.isDisplayed(repo.statusNoFeedToDisplay);
    
    if (statusNoFeedToDisplay) {

      Util.click(repo.networkLogo);
      Util.pause(50);

    }else {

      Util.click(repo.networkLogo);
      chatIndexed = true;
      
    }

  }

}

function createNewLinkPost () {

  const timestamp = CustomCommand.getTimestamp();

  Util.click(repo.inlineInsertTextField);
  Util.click(repo.toInputField);
  Util.setValue(repo.typeToInputField, profile.network1Admin1.email);
  Util.click(repo.suggestedPostRecipient);
  Util.pause(2);
  Util.click(repo.noteBodyInputField);
  const postBodyURL = `https://en.wikipedia.org/wiki/Main_Page`;
  Util.setValue(repo.noteBodyInputField, postBodyURL);
  Util.keys(['Control', 'a']);
  Util.keys(['Control', 'c']);
  Util.clearValue(repo.noteBodyInputField);
  Util.click(repo.noteBodyInputField);
  Util.keys(['Control', 'v']);
  Util.pause(2);
  Util.setValue(repo.linkPostCommentInputField, `${timestamp} Link Post Comment`);
  Util.click(repo.noteShareButton);

  Util.waitForDisplayed(repo.createdLinkPostComment(timestamp));
  Util.click(repo.networkLogo);
  
}