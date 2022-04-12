const repo = require('../../../object-repository/object-repo');
const profile = require('../../../config/profile');
const Util = require('../../../utils/utils');
const CustomCommand = require('../../../utils/custom-commands');

describe('polls', function () {

    // Author: Mobeen Atif
  // Total Test Cases: 08

    it('create poll with images', function () {

        CustomCommand.login(profile.url, profile.network3Admin1.email, profile.network3Admin1.password);
        const timestamp = CustomCommand.getTimestamp();
        Util.pause(7);
        Util.click(repo.inlineInsertTextField);
        Util.waitForDisplayed(repo.pollIcon);
        Util.click(repo.pollIcon);
        Util.waitForDisplayed(repo.pollwithImages);
        Util.waitForDisplayed(repo.pollwithText);
        Util.click(repo.pollwithImages);
        Util.waitForDisplayed(repo.pollColorIcon);
        Util.click(repo.toInputField);
        Util.pause(3);
        Util.setValue(repo.typeToInputField, profile.network3Admin1.email);
        Util.pause(1);
        Util.click(repo.suggestedPostRecipient);
        Util.setValue(repo.noteTitleInputField, `Test Poll: ${timestamp}`);
        const imageFilePath = Util.getResourcePath('mario.jpg');
        Util.uploadFile(repo.attachment, imageFilePath);
        Util.waitForExist(repo.progressBar);
        Util.uploadFile(repo.attachment, imageFilePath);
        Util.waitForExist(repo.progressBar2);
        Util.pause(2);
        Util.click(repo.noteShareButton);
        Util.pause(2);
        Util.waitForDisplayed(repo.pollPost(timestamp));
        Util.takeScreenshot();
        Util.waitForDisplayed(repo.pollImageUploaded(timestamp));

    });

    it('poll creation with location', function () {

        //CustomCommand.login(profile.url, profile.email, profile.password);
        const timestamp = CustomCommand.getTimestamp();
        Util.pause(2);
        Util.click(repo.inlineInsertTextField);
        Util.waitForDisplayed(repo.pollIcon);
        Util.click(repo.pollIcon);
        Util.waitForDisplayed(repo.pollwithImages);
        Util.waitForDisplayed(repo.pollwithText);
        Util.click(repo.pollwithImages);
        Util.waitForDisplayed(repo.pollColorIcon);
        Util.click(repo.toInputField);
        Util.pause(3);
        Util.setValue(repo.typeToInputField, profile.network3Admin1.email);
        Util.pause(1);
        Util.click(repo.suggestedPostRecipient);
        Util.setValue(repo.noteTitleInputField, `Test Poll: ${timestamp}`);
        const imageFilePath = Util.getResourcePath('mario.jpg');
        Util.uploadFile(repo.attachment, imageFilePath);
        Util.waitForExist(repo.progressBar);
        Util.uploadFile(repo.attachment, imageFilePath);
        Util.waitForExist(repo.progressBar2);
        Util.click(repo.locationIcon);
        Util.waitForDisplayed(repo.fetchedLocationPoll);
        const location = Util.getText(repo.fetchedLocationPoll);
        Util.takeScreenshot();
        console.log(location);
        Util.click(repo.noteShareButton);
        Util.pause(2);
        Util.waitForDisplayed(repo.pollPost(timestamp));
        Util.waitForDisplayed(repo.postLocation(timestamp));
        expect(Util.getText(repo.postLocation(timestamp))).toEqual(location);
        Util.waitForDisplayed(repo.pollImageUploaded(timestamp));
        
    });

    it('delete the poll', function () {

      //  CustomCommand.login(profile.url, profile.email, profile.password);
        const timestamp = CustomCommand.getTimestamp();
        Util.pause(2);
        Util.click(repo.inlineInsertTextField);
        Util.waitForDisplayed(repo.pollIcon);
        Util.click(repo.pollIcon);
        Util.waitForDisplayed(repo.pollwithImages);
        Util.waitForDisplayed(repo.pollwithText);
        Util.click(repo.pollwithImages);
        Util.waitForDisplayed(repo.pollColorIcon);
        Util.click(repo.toInputField);
        Util.pause(3);
        Util.setValue(repo.typeToInputField, profile.network3Admin1.email);
        Util.pause(1);
        Util.click(repo.suggestedPostRecipient);
        Util.setValue(repo.noteTitleInputField, `Test Poll: ${timestamp}`);
        const imageFilePath = Util.getResourcePath('mario.jpg');
        Util.uploadFile(repo.attachment, imageFilePath);
        Util.waitForExist(repo.progressBar);
        Util.uploadFile(repo.attachment, imageFilePath);
        Util.waitForExist(repo.progressBar2);
        Util.takeScreenshot();
        Util.pause(2);
        Util.click(repo.noteShareButton);
        Util.pause(2);
        Util.waitForDisplayed(repo.pollPost(timestamp));
        Util.waitForDisplayed(repo.pollImageUploaded(timestamp));
        Util.takeScreenshot();
        Util.pause(2);
        Util.click(repo.pollDropdown(timestamp));
        Util.click(repo.pollDeletePost);
        Util.takeScreenshot();
        Util.waitForNotDisplayed(repo.pollPost(timestamp));

    });

    it('create poll with text', function () {

       // CustomCommand.login(profile.url, profile.email, profile.password);
        const timestamp = CustomCommand.getTimestamp();
        Util.pause(2);
        Util.click(repo.inlineInsertTextField);
        Util.waitForDisplayed(repo.pollIcon);
        Util.click(repo.pollIcon);
        Util.waitForDisplayed(repo.pollwithImages);
        Util.waitForDisplayed(repo.pollwithText);
        Util.click(repo.pollwithText);
        Util.waitForDisplayed(repo.pollColorIcon);
        Util.click(repo.toInputField);
        Util.pause(3);
        Util.setValue(repo.typeToInputField, profile.network3Admin1.email);
        Util.pause(1);
        Util.click(repo.suggestedPostRecipient);
        Util.setValue(repo.noteTitleInputField, `Test Poll: ${timestamp}`);
        const timestamp2 = CustomCommand.getTimestamp();
        const timestamp3 = CustomCommand.getTimestamp();
        Util.setValue(repo.option1, `Text Poll Option 1: ${timestamp2}`);
        Util.click(repo.addNewChoice);
        Util.setValue(repo.option2, `Text Poll Option 2: ${timestamp3}`);
        Util.takeScreenshot();
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.pollPost(timestamp));

    });

    it('poll vote casting', function () {

     //   CustomCommand.login(profile.url, profile.email, profile.password);
        const timestamp = CustomCommand.getTimestamp();
        Util.pause(2);
        Util.click(repo.inlineInsertTextField);
        Util.waitForDisplayed(repo.pollIcon);
        Util.click(repo.pollIcon);
        Util.waitForDisplayed(repo.pollwithImages);
        Util.waitForDisplayed(repo.pollwithText);
        Util.click(repo.pollwithImages);
        Util.waitForDisplayed(repo.pollColorIcon);
        Util.click(repo.toInputField);
        Util.pause(3);
        Util.setValue(repo.typeToInputField, profile.network3Admin1.email);
        Util.pause(1);
        Util.click(repo.suggestedPostRecipient);
        Util.setValue(repo.noteTitleInputField, `Test Poll: ${timestamp}`);
        const imageFilePath = Util.getResourcePath('mario.jpg');
        Util.uploadFile(repo.attachment, imageFilePath);
        Util.waitForExist(repo.progressBar);
        Util.uploadFile(repo.attachment, imageFilePath);
        Util.waitForExist(repo.progressBar2);
        Util.click(repo.pollEnds);
        Util.click(repo.calendarIcon);
        const today = new Date();
        const date = today.getDate();
        console.log(date);
        Util.pause(2);
        Util.waitForDisplayed(repo.calendarDate(date));
        Util.pause(2);
        Util.click(repo.calendarDate(date));
        Util.pause(1);
        Util.click(repo.hoursIcon);
        var hours = today.getHours();
        console.log(hours);
        var newformat = hours >= 12 ? 'PM' : 'AM';
        console.log(newformat);
        hours=hours%12;
        console.log(hours);
        hours = hours < 10 ? "0" + hours : hours;
        console.log(hours);

        Util.click(repo.hourSelection(hours));
        var minutes = today.getMinutes();

        console.log(minutes);

       // minutes = minutes < 10 ? "0" + minutes : minutes;
       // console.log(minutes);

        var newMinutes = minutes + 4;

        var AMPMNEW = Util.getText(repo.AMPM);
        console.log(AMPMNEW);
        if (newformat == AMPMNEW) {
            console.log("Do Nothing");
        }
        else {
            console.log("This should be executed");
            Util.pause(5);
            Util.click(repo.AMPM);
        }

        Util.click(repo.mintsIcon);
        Util.click(repo.minutesSelection(newMinutes));
        Util.pause(2);
        Util.takeScreenshot();
        Util.click(repo.noteShareButton);
        Util.pause(2);
        Util.waitForDisplayed(repo.pollEndTimeVerify(timestamp,hours));
        console.log("Waiting for Poll to end");
        Util.click(repo.pollVoteIcon(timestamp));
        Util.waitForDisplayed(repo.resultBar(timestamp));

    });

    it('list of users who voted for poll', function () {

      //  CustomCommand.login(profile.url, profile.email, profile.password);
        const timestamp = CustomCommand.getTimestamp();
        Util.pause(2);
        Util.click(repo.inlineInsertTextField);
        Util.waitForDisplayed(repo.pollIcon);
        Util.click(repo.pollIcon);
        Util.waitForDisplayed(repo.pollwithImages);
        Util.waitForDisplayed(repo.pollwithText);
        Util.click(repo.pollwithImages);
        Util.waitForDisplayed(repo.pollColorIcon);
        Util.click(repo.toInputField);
        Util.pause(3);
        Util.setValue(repo.typeToInputField, profile.network3Admin1.email);
        Util.pause(1);
        Util.click(repo.suggestedPostRecipient);
        Util.setValue(repo.noteTitleInputField, `Test Poll: ${timestamp}`);
        const imageFilePath = Util.getResourcePath('mario.jpg');
        Util.uploadFile(repo.attachment, imageFilePath);
        Util.waitForExist(repo.progressBar);
        Util.uploadFile(repo.attachment, imageFilePath);
        Util.waitForExist(repo.progressBar2);
        Util.click(repo.pollEnds);
        Util.click(repo.calendarIcon);
        var today = new Date();
        var date = today.getDate();
        Util.click(repo.calendarDate(date));
        Util.pause(1);
        Util.click(repo.hoursIcon);
        var hours = today.getHours();
        var newformat = hours >= 12 ? 'PM' : 'AM';
        console.log(newformat);
        hours=hours%12;

        console.log(hours);
        hours = hours < 10 ? "0" + hours : hours;
        console.log(hours);

        Util.click(repo.hourSelection(hours));
        var minutes = today.getMinutes();
        var newMinutes = minutes + 4;
        var AMPMNEW = Util.getText(repo.AMPM);
        console.log(AMPMNEW);
        if (newformat == AMPMNEW) {
            console.log("Do Nothing");
        }
        else {
            Util.pause(5);
            Util.click(repo.AMPM);
        }
        Util.click(repo.mintsIcon);
        Util.click(repo.minutesSelection(newMinutes));
        Util.pause(2);
        Util.takeScreenshot();
        Util.click(repo.noteShareButton);
        Util.pause(2);
        Util.waitForDisplayed(repo.pollEndTimeVerify(timestamp,hours));
        console.log("Waiting for Poll to end");
        Util.click(repo.pollVoteIcon(timestamp));
        Util.waitForDisplayed(repo.resultBar(timestamp));
        Util.click(repo.resultBar(timestamp));
        Util.waitForDisplayed(repo.peopleWhoVotedForThis);
        Util.click(repo.closeButton);

    });

    it('poll ended message', function () {

      //  CustomCommand.login(profile.url, profile.email, profile.password);
        const timestamp = CustomCommand.getTimestamp();
        Util.pause(2);
        Util.click(repo.inlineInsertTextField);
        Util.waitForDisplayed(repo.pollIcon);
        Util.click(repo.pollIcon);
        Util.waitForDisplayed(repo.pollwithImages);
        Util.waitForDisplayed(repo.pollwithText);
        Util.click(repo.pollwithImages);
        Util.waitForDisplayed(repo.pollColorIcon);
        Util.click(repo.toInputField);
        Util.pause(3);
        Util.setValue(repo.typeToInputField, profile.network3Admin1.email);
        Util.pause(1);
        Util.click(repo.suggestedPostRecipient);
        Util.setValue(repo.noteTitleInputField, `Test Poll: ${timestamp}`);
        const imageFilePath = Util.getResourcePath('mario.jpg');
        Util.uploadFile(repo.attachment, imageFilePath);
        Util.waitForExist(repo.progressBar);
        Util.uploadFile(repo.attachment, imageFilePath);
        Util.waitForExist(repo.progressBar2);
        Util.click(repo.pollEnds);
        Util.click(repo.calendarIcon);
        var today = new Date();
        var date = today.getDate();
        console.log(date);
        Util.pause(3);
        Util.click(repo.calendarDate(date));
        Util.pause(1);
        Util.click(repo.hoursIcon);
        var hours = today.getHours();
        var newformat = hours >= 12 ? 'PM' : 'AM';
        console.log(newformat);
        hours=hours%12;
        console.log(hours);
        hours = hours < 10 ? "0" + hours : hours;
        console.log(hours);
        Util.click(repo.hourSelection(hours));
        var minutes = today.getMinutes();
        var newMinutes = minutes + 3;
        const AMPMNEW = Util.getText(repo.AMPM);
        console.log(AMPMNEW);
        if (newformat == AMPMNEW) {
            console.log("Do Nothing");
        }
        else {
            Util.pause(5);
            Util.click(repo.AMPM);
        }
        Util.click(repo.mintsIcon);
        Util.click(repo.minutesSelection(newMinutes));
        Util.pause(2);
        Util.takeScreenshot();
        Util.click(repo.noteShareButton);
        Util.pause(2);
        Util.waitForDisplayed(repo.pollPost(timestamp));
        Util.waitForDisplayed(repo.pollEndTimeVerify(timestamp,hours));
        Util.pause(200);
        Util.waitForDisplayed(repo.pollEnded(timestamp));
        Util.takeScreenshot();
    });

    it('verify  poll icon, poll options are available and verify poll icon color changes on clicking', function () {

        Util.pause(2);
        Util.click(repo.inlineInsertTextField);
        Util.waitForDisplayed(repo.pollIcon);
        Util.click(repo.pollIcon);
        Util.takeScreenshot();
        Util.waitForDisplayed(repo.pollwithImages);
        Util.waitForDisplayed(repo.pollwithText);
        Util.click(repo.pollwithImages);
        Util.waitForDisplayed(repo.pollColorIcon);

    });

});