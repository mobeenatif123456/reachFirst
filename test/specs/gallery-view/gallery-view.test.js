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

 
  it('verify image uploading is working fine and uploaded image can be seen in gallery view', function () {

    const imageUploadFileName = 'mario.jpg';

    CustomCommand.login(profile.url, profile.network3Admin1.email, profile.network3Admin1.password);
    const timestamp = CustomCommand.getTimestamp();
    
    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network3Admin1.email);
    Util.click(repo.suggestedPostRecipient);
    Util.pause(2)

    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp}: This post will have an image file attachment.`);
    Util.pause(2);

    Util.uploadFile(repo.feedFileUploadInputField, Util.getResourcePath(imageUploadFileName));
    Util.waitForDisplayed(repo.fileUploadAndConversionSuccess);
   
    Util.click(repo.noteShareButton);
    Util.pause(2);

    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));

    Util.click(repo.sharedPostWithFileAttachment(timestamp));

    Util.waitForDisplayed(repo.loadingSpinnerinGalleryView);
    expect(Util.getText(repo.galleryViewFileName)).toBe(imageUploadFileName);

  });

  it('switch an attached image to a note in full screen view', function () {

    Util.click(repo.fullscreenIconInGalleryView);
    Util.waitForDisplayed(repo.fitToScreenButtonGalleryInGalleryView);
    Util.click(repo.galleryViewExitFullScreenIcon);

  });

  it('verify csv file uploading is working fine', function () {
    
    Util.click(repo.networkLogo);

    const csvUploadFileName = 'data.csv';

    //CustomCommand.login(profile.url, profile.email, profile.password);
    const timestamp = CustomCommand.getTimestamp();
    
    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network3Admin1.email);
    Util.click(repo.suggestedPostRecipient);
    Util.pause(2)

    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp}: This post will have a csv file attachment.`);
    Util.pause(2);

    Util.uploadFile(repo.feedFileUploadInputField, Util.getResourcePath(csvUploadFileName));
    Util.waitForDisplayed(repo.fileUploadAndConversionSuccess);
    Util.pause(2);
    Util.click(repo.noteShareButton);
    Util.pause(2);

    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));

    Util.click(repo.sharedPostWithCsvFileAttachment(timestamp));

    expect(Util.getText(repo.galleryViewFileName)).toBe(csvUploadFileName);

  });
  
  it('verify delete of file is working in gallery view', function () {
    
    Util.click(repo.galleryViewElipses);
    Util.click(repo.galleryViewElipsesDeleteLink);
    Util.click(repo.deleteButtonForFileInGalleryView);
    Util.waitForDisplayed(repo.editButtonInPostDetailView);
  
  });
  
  it('verify doc uploading is working fine', function () {

    Util.click(repo.networkLogo);

    const wordDocUploadFileName = 'word-document-file.doc';

    //CustomCommand.login(profile.url, profile.email, profile.password);
    const timestamp = CustomCommand.getTimestamp();
    
    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network3Admin1.email);
    Util.click(repo.suggestedPostRecipient);
    Util.pause(2)

    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp}: This post will have a word doc file attachment.`);
    Util.pause(2);

    Util.uploadFile(repo.feedFileUploadInputField, Util.getResourcePath(wordDocUploadFileName));
    Util.waitForDisplayed(repo.fileUploadAndConversionSuccess);
    Util.pause(2);
    Util.click(repo.noteShareButton);
    Util.pause(2);

    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));

    Util.click(repo.sharedPostWithFileAttachment(timestamp));

    expect(Util.getText(repo.galleryViewFileName)).toBe(wordDocUploadFileName);
    expect(Util.getText(repo.displayedFileTextInGalleryView)).toBe('This is a test document. ');

  });
  
  it('verify excel uploading is working fine', function () {

    Util.click(repo.networkLogo);

    const excelUploadFileName = 'excel-data-file.xlsx';

    //CustomCommand.login(profile.url, profile.email, profile.password);
    const timestamp = CustomCommand.getTimestamp();
    
    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network3Admin1.email);
    Util.click(repo.suggestedPostRecipient);
    Util.pause(2)

    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp}: This post will have an excel file attachment.`);
    Util.pause(2);

    Util.uploadFile(repo.feedFileUploadInputField, Util.getResourcePath(excelUploadFileName));
    Util.waitForDisplayed(repo.fileUploadAndConversionSuccess);
    Util.pause(2);
    Util.click(repo.noteShareButton);
    Util.pause(2);

    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
    
    Util.click(repo.sharedPostWithFileAttachment(timestamp));

    expect(Util.getText(repo.galleryViewFileName)).toBe(excelUploadFileName);
    expect(Util.getText(repo.displayedFileTextInGalleryView)).toMatch(/First Row/);
  
  });
  
  it('verify gif uploading is working fine', function () {

    Util.click(repo.networkLogo);

    const gifImageUploadFileName = 'giphy-image-file.gif';

    //CustomCommand.login(profile.url, profile.email, profile.password);
    const timestamp = CustomCommand.getTimestamp();
    
    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network3Admin1.email);
    Util.click(repo.suggestedPostRecipient);
    Util.pause(2)

    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp}: This post will have a gif file attachment.`);
    Util.pause(2);

    Util.uploadFile(repo.feedFileUploadInputField, Util.getResourcePath(gifImageUploadFileName));
    Util.waitForDisplayed(repo.fileUploadAndConversionSuccess);
    Util.pause(2);
    Util.click(repo.noteShareButton);
    Util.pause(2);

    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));

    Util.click(repo.sharedPostWithFileAttachment(timestamp));

    Util.waitForDisplayed(repo.loadingSpinnerinGalleryView);

    expect(Util.getText(repo.galleryViewFileName)).toBe(gifImageUploadFileName);

  });
  
  it('verify like is working on attached image in gallery view', function () {
    
    Util.click(repo.galleryViewLikeButton);
    Util.waitForDisplayed(repo.galleryViewUnlikeButton);
    
  });

  it('verify unlike is working on attached image in gallery view', function () {
    Util.click(repo.galleryViewUnlikeButton);
    Util.waitForDisplayed(repo.galleryViewLikeButton);
  });

  it('verify delete of image is working in gallery view', function () {
    
    Util.click(repo.galleryViewElipses);
    Util.click(repo.galleryViewElipsesDeleteLink);
    Util.click(repo.deleteButtonForFileInGalleryView);
    Util.waitForDisplayed(repo.editButtonInPostDetailView);
  
  });
 
  it('verify navigation functionality in gallery view is working fine', function () {

    Util.click(repo.networkLogo);

    const imageUploadFileName1 = 'mario.jpg';
    const imageUploadFileName2 = 'snowbros.png';

    //CustomCommand.login(profile.url, profile.email, profile.password);
    const timestamp = CustomCommand.getTimestamp();
    
    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network3Admin1.email);
    Util.click(repo.suggestedPostRecipient);
    Util.pause(2)

    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp}: This post will have 2 image file attachments for navigation.`);
    Util.pause(2);

    Util.uploadFile(repo.feedFileUploadInputField, Util.getResourcePath(imageUploadFileName1));
    Util.waitForDisplayed(repo.firstImageFileConversionSuccess);

    Util.uploadFile(repo.feedFileUploadInputField, Util.getResourcePath(imageUploadFileName2));
    Util.waitForDisplayed(repo.secondImageFileConversionSuccess);

    Util.pause(2);
    Util.click(repo.noteShareButton);
    Util.pause(2);

    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));

    Util.click(repo.sharedPostWithFileAttachment(timestamp));

    Util.waitForDisplayed(repo.loadingSpinnerinGalleryView);

    expect(Util.getText(repo.galleryViewFileName)).toBe(imageUploadFileName1);

    Util.pause(5);

    Util.click(repo.galleryViewNextButton);

    Util.pause(2);

    console.log(Util.getText(repo.galleryViewFileName));

    expect(Util.getText(repo.galleryViewFileName)).toBe(imageUploadFileName2);

    Util.pause(5);

    Util.click(repo.galleryViewPreviousButton);

    Util.pause(3);

    console.log(Util.getText(repo.galleryViewFileName));

    expect(Util.getText(repo.galleryViewFileName)).toBe(imageUploadFileName1);
  
  });
  
  it('verify pdf uploading is working fine', function () {

    Util.click(repo.networkLogo);

    const pdfDocUploadFileName = 'dummy-pdf-file.pdf';

    //CustomCommand.login(profile.url, profile.email, profile.password);
    const timestamp = CustomCommand.getTimestamp();
    
    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network3Admin1.email);
    Util.click(repo.suggestedPostRecipient);
    Util.pause(2)

    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp}: This post will have a PDF doc file attachment.`);
    Util.pause(2);

    Util.uploadFile(repo.feedFileUploadInputField, Util.getResourcePath(pdfDocUploadFileName));
    Util.waitForDisplayed(repo.fileUploadAndConversionSuccess);
    Util.pause(2);
    Util.click(repo.noteShareButton);
    Util.pause(2);

    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));

    Util.click(repo.sharedPostWithFileAttachment(timestamp));

    expect(Util.getText(repo.galleryViewFileName)).toBe(pdfDocUploadFileName);

  //  expect(Util.getText(repo.displayedFileTextInGalleryView)).toBe('Thisis a test document. ');

  });
  
  it('verify ppt upload is working fine', function () {

    Util.click(repo.networkLogo);

    const pptDocUploadFileName = 'ppt-document-file.ppt';

    //CustomCommand.login(profile.url, profile.email, profile.password);
    const timestamp = CustomCommand.getTimestamp();
    
    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network3Admin1.email);
    Util.click(repo.suggestedPostRecipient);
    Util.pause(2)

    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp}: This post will have a PPT doc file attachment.`);
    Util.pause(2);

    Util.uploadFile(repo.feedFileUploadInputField, Util.getResourcePath(pptDocUploadFileName));
    Util.waitForDisplayed(repo.fileUploadAndConversionSuccess);
    Util.pause(2);
    Util.click(repo.noteShareButton);
    Util.pause(2);

    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));

    Util.click(repo.sharedPostWithFileAttachment(timestamp));
    Util.pause(3);
  
    expect(Util.getText(repo.galleryViewFileName)).toBe(pptDocUploadFileName);

    Util.pause(2);
  //  expect(Util.getText(repo.pptDisplayedFileTextInGalleryView).replace(/\n/g, "")).toBe('This is a test document. ');

  });
  
  it('verify snippet creation for attached image using rectangle tool', function () {

    Util.click(repo.networkLogo);

    const imageUploadFileName = 'mario.jpg';

    //CustomCommand.login(profile.url, profile.email, profile.password);
    const timestamp = CustomCommand.getTimestamp();
    
    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network3Admin1.email);
    Util.click(repo.suggestedPostRecipient);
    Util.pause(2)

    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp}: This post will have an image file attachment for snippet creation.`);
    Util.pause(2);

    Util.uploadFile(repo.feedFileUploadInputField, Util.getResourcePath(imageUploadFileName));
    Util.waitForDisplayed(repo.fileUploadAndConversionSuccess);
    Util.pause(2);
    Util.click(repo.noteShareButton);
    Util.pause(2);

    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
    Util.click(repo.sharedPostWithFileAttachment(timestamp));

    Util.waitForDisplayed(repo.loadingSpinnerinGalleryView);
    
    expect(Util.getText(repo.galleryViewFileName)).toBe(imageUploadFileName);

    // Snippet creation.

    Util.click(repo.rectangleTool);
    Util.dragAndDrop(repo.galleryViewImageCanvasArea, { x: 70, y: 85 });
    Util.click(repo.commentOnThisTooltip);
    Util.setValue(repo.snippetCommentInputField, `${timestamp}: Rectangle Snippet`);
    Util.keys('Enter');
    
    Util.waitForDisplayed(repo.createdImageSnippetUsingRectangleIcon(timestamp));

  });
  
  it('verify snippet creation for attached image using color rectangle tool', function () {
    
    const timestamp = CustomCommand.getTimestamp();
     
    Util.moveTo(repo.galleryViewColorRectangleIcon);
    Util.click(repo.galleryViewGreenColorForColorRectangle);

    Util.dragAndDrop(repo.galleryViewImageCanvasArea, { x: 50, y: 65 });
    Util.click(repo.commentOnThisTooltip);
    Util.setValue(repo.snippetCommentInputField, `${timestamp}: Color Rectangle Snippet`);
    Util.keys('Enter');

    Util.waitForDisplayed(repo.createdImageSnippetUsingColorRectangleIcon(timestamp));

  });
  
  it('verify snippet creation with the arrow in gallery view', function () {

    const timestamp = CustomCommand.getTimestamp();

    Util.click(repo.galleryViewArrowIcon);

    Util.dragAndDrop(repo.galleryViewImageCanvasArea, { x: 90, y: 50 });
    Util.click(repo.commentOnThisTooltip);
    Util.setValue(repo.snippetCommentInputField, `${timestamp}: Arrow Snippet`);
    Util.keys('Enter');

    Util.waitForDisplayed(repo.createdImageSnippetUsingArrowIcon(timestamp));

  });
  
  it('verify zooming in of image is working fine in gallery view', function () {

    Util.click(repo.networkLogo);

    const imageUploadFileName = 'mario.jpg';

    //CustomCommand.login(profile.url, profile.email, profile.password);
    const timestamp = CustomCommand.getTimestamp();
    
    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network3Admin1.email);
    Util.click(repo.suggestedPostRecipient);
    Util.pause(2)

    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp}: This post will have an image file attachment.`);
    Util.pause(2);

    Util.uploadFile(repo.feedFileUploadInputField, Util.getResourcePath(imageUploadFileName));
    Util.waitForDisplayed(repo.fileUploadAndConversionSuccess);
    Util.pause(2);
    Util.click(repo.noteShareButton);
    Util.pause(2);

    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));

    Util.click(repo.sharedPostWithFileAttachment(timestamp));

    Util.waitForDisplayed(repo.loadingSpinnerinGalleryView);

    expect(Util.getText(repo.galleryViewFileName)).toBe(imageUploadFileName);

    Util.click(repo.galleryViewZoomIcon);

    let imageZoomMetrics = Util.getAttributeValue(repo.galleryViewZoomMetrics, 'style');
    const imageZoomMetricsBeforeZoom = imageZoomMetrics.substr(18, imageZoomMetrics.indexOf(',') - 18); 
    
    Util.click(repo.galleryViewZoomPercentageInputField);
    Util.clearValue(repo.galleryViewZoomPercentageInputField);
    Util.setValue(repo.galleryViewZoomPercentageInputField, '200');
    Util.keys('Enter');

    imageZoomMetrics = Util.getAttributeValue(repo.galleryViewZoomMetrics, 'style');
    const imageZoomMetricsAfterZoom = imageZoomMetrics.substr(18, imageZoomMetrics.indexOf(',') - 18);
    
    expect(Number(imageZoomMetricsAfterZoom)).toBeGreaterThan(Number(imageZoomMetricsBeforeZoom));
    
  });

  it('verify zooming out of image is working fine in gallery view', function () {

    let imageZoomMetrics = Util.getAttributeValue(repo.galleryViewZoomMetrics, 'style');
    const imageZoomMetricsBeforeZoomOut = imageZoomMetrics.substr(18, imageZoomMetrics.indexOf(',') - 18);

    Util.click(repo.galleryViewZoomPercentageInputField);
    Util.clearValue(repo.galleryViewZoomPercentageInputField);
    Util.setValue(repo.galleryViewZoomPercentageInputField, '60');
    Util.keys('Enter');

    imageZoomMetrics = Util.getAttributeValue(repo.galleryViewZoomMetrics, 'style');
    const imageZoomMetricsAfterZoomOut = imageZoomMetrics.substr(18, imageZoomMetrics.indexOf(',') - 18);

    expect(Number(imageZoomMetricsAfterZoomOut)).toBeLessThan(Number(imageZoomMetricsBeforeZoomOut));

  });

  it('verify video uploading is working fine', function () {

    Util.click(repo.networkLogo);

    const videoUploadFileName = 'video-file.mp4';

    //CustomCommand.login(profile.url, profile.email, profile.password);
    const timestamp = CustomCommand.getTimestamp();
    
    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network3Admin1.email);
    Util.click(repo.suggestedPostRecipient);
    Util.pause(2)

    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp}: This post will have a video file attachment.`);
    Util.pause(2);

    Util.uploadFile(repo.feedFileUploadInputField, Util.getResourcePath(videoUploadFileName));
    Util.waitForDisplayed(repo.fileUploadAndConversionSuccess);
    Util.pause(2);
    Util.click(repo.noteShareButton);
    Util.pause(2);

    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));

    Util.waitForDisplayed(repo.videoUploadingVerification(timestamp));
    
  });
  
  it('Verify the download of file is working in gallery view', function () {

    const  csvUploadFileName = 'data.csv';

    //CustomCommand.login(profile.url, profile.email, profile.password);
    const timestamp = CustomCommand.getTimestamp();
    
    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network3Admin1.email);
    Util.click(repo.suggestedPostRecipient);
    Util.pause(2)

    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp}: This post will have a CSV file attachment.`);
    Util.pause(2);

    Util.uploadFile(repo.feedFileUploadInputField, Util.getResourcePath(csvUploadFileName));
    Util.waitForDisplayed(repo.fileUploadAndConversionSuccess);
    Util.pause(2);
    Util.click(repo.noteShareButton);
    Util.pause(2);

    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));

    Util.click(repo.sharedPostWithCsvFileAttachment(timestamp));

    Util.pause(3);

    expect(Util.getText(repo.galleryViewFileName)).toBe(csvUploadFileName);

    const windowInnerHeightBeforeFileDownload = browser.execute(() => { return window.innerHeight; });
    Util.pause(3);
    Util.click(repo.galleryViewDownloadIcon);
    Util.pause(3);
    const windowInnerHeightAfterFileDownload =   browser.execute(() => { return window.innerHeight; });
    Util.pause(3);
    expect(windowInnerHeightAfterFileDownload).toBeLessThan(windowInnerHeightBeforeFileDownload);
    
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