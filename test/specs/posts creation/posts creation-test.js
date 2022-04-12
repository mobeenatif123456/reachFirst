const repo = require('../../../object-repository/object-repo');
const profile = require('../../../config/profile');
const Util = require('../../../utils/utils');
const CustomCommand = require('../../../utils/custom-commands');

describe('posts creation', function () {

    it('verify post creation with image attachment and also verify that preview of image is getting generated in feed', function () {

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
    
        Util.waitForDisplayed(repo.sharedPostWithFileAttachment(timestamp));
        
    
      });

    it('verify post creation with pdf attachment', function () {

        const pdfFileName = 'dummy-pdf-file.pdf';
    
        const timestamp = CustomCommand.getTimestamp();
        
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network3Admin1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2)
    
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp}: This post will have an image file attachment.`);
        Util.pause(2);
    
        Util.uploadFile(repo.feedFileUploadInputField, Util.getResourcePath(pdfFileName));
        Util.waitForDisplayed(repo.fileUploadAndConversionSuccess);
       
        Util.click(repo.noteShareButton);
        Util.pause(2);
    
        Util.waitForDisplayed(repo.sharedPostWithFileAttachment(timestamp));
        
    
      });

    it('verify post creation with word attachment', function () {

        const wordFileName = 'word-document-file.doc';
    
        const timestamp = CustomCommand.getTimestamp();
        
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.setValue(repo.typeToInputField, profile.network3Admin1.email);
        Util.click(repo.suggestedPostRecipient);
        Util.pause(2)
    
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp}: This post will have an image file attachment.`);
        Util.pause(2);
    
        Util.uploadFile(repo.feedFileUploadInputField, Util.getResourcePath(wordFileName));
        Util.waitForDisplayed(repo.fileUploadAndConversionSuccess);
       
        Util.click(repo.noteShareButton);
        Util.pause(2);
    
        Util.waitForDisplayed(repo.sharedPostWithFileAttachment(timestamp));
        
    
      });


    it('verify link post is getting created successfully', function () {

        
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
        
    
      });


    it('verify post indexing is working', function () {

    const timestamp = CustomCommand.getTimestamp();
    
    Util.click(repo.inlineInsertTextField);
    const postTitle = `Test Post: ${timestamp}`;
    Util.setValue(repo.noteTitleInputField, postTitle);
    Util.setValue(repo.noteBodyInputField, `${timestamp}: This is a test post for admin mode.`);
    Util.pause(2); 
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network3Admin1.email);
    Util.click(repo.suggestedPostRecipient);
    Util.pause(2);
    Util.click(repo.noteShareButton);
    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));

    Util.pause(150);
    // Check whether created post is indexed.
    Util.setValue(repo.feedSearchInputField, `"${postTitle}"`);
    Util.click(repo.searchIcon);

    Util.pause(3);

  //  const indexedPostPathInSearchResult = verifyPostIndexing(timestamp);

     for (let i = 0; i < 10; i++) {
       
      console.log('Current Loop Counter:', i);
      
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

        console.log('Current Loop Counter value new:', i);

        if(i == 8)
        {

          console.log('inside if block');

          throw new Error('Test Case failed because indexing is not working');

        }

      }
      
      
      
     
    }
        
    
    });






});