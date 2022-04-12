const repo = require('../../../object-repository/object-repo');
const profile = require('../../../config/profile');
const Util = require('../../../utils/utils');
const CustomCommand = require('../../../utils/custom-commands');

describe('Inline Insert', function () {

    // Author: Mobeen Atif
    // Total Test Cases: 17

    let grpName = null;

    it('adding tags with hash followed by text', function () {

        CustomCommand.login(profile.url, profile.network9Admin1.email, profile.network9Admin1.password);
        const timestamp = CustomCommand.getTimestamp();
        Util.pause(7);
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.pause(3);
        Util.setValue(repo.typeToInputField, profile.network9Admin1.email);
        Util.pause(1);
        Util.click(repo.suggestedPostRecipient);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} : This test post contains hash tag. #Database`);
        Util.pause(3);

        Util.takeScreenshot();

        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
        Util.pause(3);
        Util.takeScreenshot();

        Util.waitForDisplayed(repo.postWithHashTag(timestamp));

        Util.takeScreenshot();


    });

    it('verify gifs in inline insert', function () {

        let timestamp = CustomCommand.getTimestamp();
        Util.pause(3);
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.pause(3);
        Util.setValue(repo.typeToInputField, profile.network9Admin1.email);
        Util.pause(1);
        Util.click(repo.suggestedPostRecipient);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} This post has a gif attachment`);
        Util.pause(3);
        Util.click(repo.gifIcon);
        Util.click(repo.firstGifImage);
        Util.waitForDisplayed(repo.firstGifUploadedVerification);

        Util.takeScreenshot();

        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
        Util.pause(3);
        Util.takeScreenshot();
        Util.waitForDisplayed(repo.gifVerification(timestamp));
        Util.takeScreenshot();

    });

    it('verify attaching tags in inline insert', function () {

        let timestamp = CustomCommand.getTimestamp();
        Util.pause(3);
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.pause(3);
        Util.setValue(repo.typeToInputField, profile.network9Admin1.email);
        Util.pause(1);
        Util.click(repo.suggestedPostRecipient);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} This test post contains hash tag.`);
        Util.pause(3);
        Util.click(repo.createTagIcon);
        Util.click(repo.startTypingText);
        Util.setValue(repo.tagInputField, "Database");
        browser.keys('Enter');
        Util.takeScreenshot();
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
        Util.pause(3);
        Util.takeScreenshot();
        Util.waitForDisplayed(repo.postWithHashTag(timestamp));
        Util.takeScreenshot();
    });

    it('bold text post', function () {

        let timestamp = CustomCommand.getTimestamp();
        Util.pause(3);
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.pause(3);
        Util.setValue(repo.typeToInputField, profile.network9Admin1.email);
        Util.pause(1);
        Util.click(repo.suggestedPostRecipient);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.pause(5);
        Util.click(repo.richTextFormatIcon);
        Util.pause(5);
        Util.click(repo.boldIcon);
        Util.keys(`${timestamp} This test has a bold text.`);
        Util.pause(3);
        Util.takeScreenshot();
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
        Util.pause(3);
        Util.takeScreenshot();
        Util.waitForDisplayed(repo.boldPost(timestamp));
        Util.takeScreenshot();

    });

    it('bullet points post', function () {

        let timestamp = CustomCommand.getTimestamp();
        Util.pause(3);
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.pause(3);
        Util.setValue(repo.typeToInputField, profile.network9Admin1.email);
        Util.pause(1);
        Util.click(repo.suggestedPostRecipient);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.pause(5);
        Util.click(repo.richTextFormatIcon);
        Util.pause(5);
        Util.click(repo.bulletPoints);
        Util.keys(`${timestamp} This post has bullet text`);
        Util.pause(3);
        Util.takeScreenshot();
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
        Util.pause(3);
        Util.takeScreenshot();
        Util.waitForDisplayed(repo.bulletPointsPost(timestamp));
        Util.takeScreenshot();

    });

    it('serial points post', function () {

        let timestamp = CustomCommand.getTimestamp();
        Util.pause(3);
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.pause(3);
        Util.setValue(repo.typeToInputField, profile.network9Admin1.email);
        Util.pause(1);
        Util.click(repo.suggestedPostRecipient);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.pause(25);
        Util.click(repo.richTextFormatIcon);
        Util.pause(5);
        Util.click(repo.numberFormatIcon);
        Util.keys(`${timestamp}`);
        Util.pause(3);
        Util.takeScreenshot();
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
        Util.pause(3);
        Util.takeScreenshot();
        Util.waitForDisplayed(repo.serialPointsPostVerification(timestamp));
        Util.takeScreenshot();

    });

    it('color text post', function () {

        let timestamp = CustomCommand.getTimestamp();
        Util.pause(3);
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.pause(3);
        Util.setValue(repo.typeToInputField, profile.network9Admin1.email);
        Util.pause(1);
        Util.click(repo.suggestedPostRecipient);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.pause(5);
        Util.click(repo.richTextFormatIcon);
        Util.pause(5);
        Util.click(repo.colorPickerIcon);
        Util.pause(5);
        Util.click(repo.redColorTextBox);
        Util.keys(`${timestamp} This post has red color text post in detail view`);
        Util.pause(3);
        Util.takeScreenshot();
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
        Util.pause(3);
        Util.takeScreenshot();
        Util.click(repo.sharedPostTitle(timestamp));
        Util.pause(3);
        Util.waitForDisplayed(repo.colorProperty);
        Util.takeScreenshot();
        browser.back();

    });

    it('crossed text', function () {

        let timestamp = CustomCommand.getTimestamp();
        Util.pause(3);
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.pause(3);
        Util.setValue(repo.typeToInputField, profile.network9Admin1.email);
        Util.pause(1);
        Util.click(repo.suggestedPostRecipient);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.pause(5);
        Util.click(repo.richTextFormatIcon);
        Util.pause(5);
        Util.click(repo.crossedTextFormatting);
        Util.keys(`${timestamp} This post has crossed text`);
        Util.pause(3);
        Util.takeScreenshot();
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
        Util.pause(3);
        Util.takeScreenshot();
        Util.waitForDisplayed(repo.postsharedwithCrossedText(timestamp));
        Util.takeScreenshot();

    });

    it('italic text', function () {

        let timestamp = CustomCommand.getTimestamp();
        Util.pause(3);
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.pause(3);
        Util.setValue(repo.typeToInputField, profile.network9Admin1.email);
        Util.pause(1);
        Util.click(repo.suggestedPostRecipient);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.pause(5);
        Util.click(repo.richTextFormatIcon);
        Util.pause(5);
        Util.click(repo.italicIcon);
        Util.keys(`${timestamp} This post has italic text`);
        Util.pause(3);
        Util.takeScreenshot();
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
        Util.takeScreenshot();
        Util.pause(3);
        Util.waitForDisplayed(repo.postsharedwithItalicText(timestamp));
        Util.takeScreenshot();

    });

    it('underline text', function () {

        let timestamp = CustomCommand.getTimestamp();
        Util.pause(3);
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.pause(3);
        Util.setValue(repo.typeToInputField, profile.network9Admin1.email);
        Util.pause(1);
        Util.click(repo.suggestedPostRecipient);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.pause(5);
        Util.click(repo.richTextFormatIcon);
        Util.pause(5);
        Util.click(repo.underlineIcon);
        Util.keys(`${timestamp} This post has underline text`);
        Util.pause(3);
        Util.takeScreenshot();
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
        Util.pause(3);
        Util.takeScreenshot();
        Util.waitForDisplayed(repo.postsharedwithUnderlineText(timestamp));
        Util.takeScreenshot();

    });

    it('draft post', function () {

        let timestamp = CustomCommand.getTimestamp();
        Util.pause(3);
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.pause(3);
        Util.setValue(repo.typeToInputField, profile.network9Admin1.email);
        Util.pause(1);
        Util.click(repo.suggestedPostRecipient);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.pause(2);
        Util.setValue(repo.noteBodyInputField, `${timestamp} This post will be auto saved after 10 to 11 seconds approx.`)
        Util.pause(3);
        Util.waitForDisplayed(repo.savedInDrafts);
        Util.takeScreenshot();
        Util.click(repo.draftsLink);
        Util.waitForDisplayed(repo.draftPost(timestamp));
        Util.click(repo.myFeed);
        Util.takeScreenshot();
        Util.click(repo.noteShareButton);

    });

    it('manual draft', function () {

        let timestamp = CustomCommand.getTimestamp();
        Util.pause(3);
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.pause(3);
        Util.setValue(repo.typeToInputField, profile.network9Admin1.email);
        Util.pause(1);
        Util.click(repo.suggestedPostRecipient);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.pause(2);
        Util.setValue(repo.noteBodyInputField, `${timestamp} This post will be manually saved by using the keyboard shortcut ctrl  S.`)
        Util.pause(3);
        browser.keys(['Meta', 's']);
        Util.waitForDisplayed(repo.savedInDrafts);
        Util.takeScreenshot();
        Util.click(repo.draftsLink);
        Util.waitForDisplayed(repo.draftPost(timestamp));
        Util.takeScreenshot();
        Util.click(repo.myFeed);
        Util.click(repo.noteShareButton);

    });

    it('share post with keyboard shortcut', function () {

        let timestamp = CustomCommand.getTimestamp();
        Util.pause(3);
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.pause(3);
        Util.setValue(repo.typeToInputField, profile.network9Admin1.email);
        Util.pause(1);
        Util.click(repo.suggestedPostRecipient);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.pause(2);
        Util.setValue(repo.noteBodyInputField, `${timestamp} This post will be manually saved by using the keyboard shortcut ctrl  Enter.`)
        Util.pause(3);
        browser.keys(['Meta', 'Enter']);
        Util.pause(2);
        Util.takeScreenshot();
        Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
        Util.takeScreenshot();
    });

    it('adding emoticon in post', function () {

        let timestamp = CustomCommand.getTimestamp();
        Util.pause(3);
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.pause(3);
        Util.setValue(repo.typeToInputField, profile.network9Admin1.email);
        Util.pause(1);
        Util.click(repo.suggestedPostRecipient);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.pause(2);
        Util.setValue(repo.noteBodyInputField, `${timestamp} This post will contain emoticon:`)
        Util.pause(3);
        Util.click(repo.emoticonIcon);
        Util.click(repo.selectingEmoji);
        Util.takeScreenshot();
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
        Util.pause(3);
        Util.takeScreenshot();
        Util.waitForDisplayed(repo.postwithEmoticon(timestamp));
        Util.takeScreenshot();

    });

    it('insert link', function () {

        let timestamp = CustomCommand.getTimestamp();
        Util.pause(3);
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.pause(3);
        Util.setValue(repo.typeToInputField, profile.network9Admin1.email);
        Util.pause(1);
        Util.click(repo.suggestedPostRecipient);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.pause(2);
        Util.click(repo.div_Button);

        const element= $('//span[contains(@class,"ql-inline-link")]');
        browser.execute("arguments[0].click();", element);

        Util.waitForDisplayed(repo.inlineInsertHeading);
        
        Util.setValue(repo.inputUrl, "www.google.com");
        Util.pause(2);
        Util.setValue(repo.textToDisplay, "Google");
        Util.click(repo.insertButton);
        Util.pause(2);
        Util.takeScreenshot();
        Util.click(repo.noteShareButton);
        Util.pause(1);
        Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
        Util.pause(3);
        Util.takeScreenshot();
        Util.waitForDisplayed(repo.insertLinkPost(timestamp));
        Util.takeScreenshot();

    });

    it('upload file with drag and drop option', function () {

        let timestamp = CustomCommand.getTimestamp();
        Util.pause(3);
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.pause(3);
        Util.setValue(repo.typeToInputField, profile.network9Admin1.email);
        Util.pause(1);
        Util.click(repo.suggestedPostRecipient);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.pause(2);
        let imageFilePath = Util.getResourcePath('mario.jpg');
        Util.uploadFile(repo.fileUploadForFeed, imageFilePath);
        Util.waitForExist(repo.imageFileUploadVerification);
        Util.setValue(repo.noteBodyInputField, `${timestamp} This post has a attachment`);
        Util.takeScreenshot();
        Util.click(repo.noteShareButton);
        Util.pause(1);
        Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
        Util.pause(2);
        Util.waitForDisplayed(repo.sharedPostImageVerification(timestamp));
        Util.takeScreenshot();
        Util.pause(2);

    });

    it('mention group in post', function () {

        Util.pause(3);
        Util.click(repo.createNewGroup);
        Util.click(repo.privateGroup);
        Util.click(repo.nextButton);
        grpName = CustomCommand.getTimestamp();
        Util.setValue(repo.grpName, `${grpName}`);
        Util.pause(2);
        Util.click(repo.nextButtonForGrpCreation);
        Util.pause(2);
        Util.click(repo.createGroup);
        Util.pause(10);
        Util.waitForDisplayed(repo.grpPost(grpName));
        let timestamp2 = CustomCommand.getTimestamp();
        Util.pause(3);
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.takeScreenshot();
        Util.pause(3);
        Util.setValue(repo.typeToInputField, profile.network9Admin1.email);
        Util.pause(1);
        Util.click(repo.suggestedPostRecipient);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp2}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp2} This post is addressed to @${grpName}`);
        Util.waitForDisplayed(repo.mentionedGroup(grpName));
        Util.takeScreenshot();
        Util.click(repo.mentionedGroup(grpName));
        Util.takeScreenshot();
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.mentionedGroupVerification(timestamp2, grpName));
        Util.takeScreenshot();

        Util.click(repo.grpPost(grpName));

        Util.click(repo.groupToggleDropdown(grpName));
        Util.pause(3);
        Util.click(repo.deleteGroup);
        Util.pause(1);
        Util.takeScreenshot();
        Util.click(repo.deleteButton);
        Util.pause(3);
        Util.click(repo.grpPost(grpName));

        Util.waitForDisplayed(repo.grpDeletionVerification);
    });

});