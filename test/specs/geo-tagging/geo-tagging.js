const repo = require('../../../object-repository/object-repo');
const profile = require('../../../config/profile');
const Util = require('../../../utils/utils');
const CustomCommand = require('../../../utils/custom-commands');


describe('geo tagging',function() {

    // Author: Mobeen Atif
  // Total Test Cases: 08

    it('adding location in post creation', function(){

        CustomCommand.login(profile.url,profile.network1User1.email,profile.network1User1.password);
        let timestamp = CustomCommand.getTimestamp();
        Util.pause(3);
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.pause(3);
        Util.setValue(repo.typeToInputField, profile.network1User1.email);
        Util.pause(1);
        Util.click(repo.suggestedPostRecipient);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post.`);
        Util.pause(3);
        Util.waitForDisplayed(repo.locationIcon);
        Util.click(repo.locationIcon);
        Util.pause(3);
        Util.waitForDisplayed(repo.fetchedLocation);
        const location=Util.getText(repo.fetchedLocation);
        Util.waitForDisplayed(repo.locationIconBlueColor);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
        Util.waitForDisplayed(repo.locationPost(timestamp));
        expect(Util.getText(repo.locationPost(timestamp))).toEqual(location);
        
    });

    it('map showing in feed view', function(){

        let timestamp = CustomCommand.getTimestamp();
        Util.pause(3);
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.pause(3);
        Util.setValue(repo.typeToInputField, profile.network1User1.email);
        Util.pause(1);
        Util.click(repo.suggestedPostRecipient);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post.`);
        Util.pause(3);
        Util.waitForDisplayed(repo.locationIcon);
        Util.click(repo.locationIcon);
        Util.pause(3);
        Util.waitForDisplayed(repo.fetchedLocation);
        const location=Util.getText(repo.fetchedLocation);
        Util.waitForDisplayed(repo.locationIconBlueColor);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
        Util.waitForDisplayed(repo.locationPost(timestamp));
        expect(Util.getText(repo.locationPost(timestamp))).toEqual(location);
        Util.click(repo.locationPost(timestamp));
        Util.waitForDisplayed(repo.mapShowing(timestamp));
    });

    it('fetched location showing in post detail view', function(){

        let timestamp = CustomCommand.getTimestamp();
        Util.pause(3);
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.pause(3);
        Util.setValue(repo.typeToInputField, profile.network1User1.email);
        Util.pause(1);
        Util.click(repo.suggestedPostRecipient);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post.`);
        Util.pause(3);
        Util.waitForDisplayed(repo.locationIcon);
        Util.click(repo.locationIcon);
        Util.pause(3);
        Util.waitForDisplayed(repo.fetchedLocation);
        const location=Util.getText(repo.fetchedLocation);
        Util.waitForDisplayed(repo.locationIconBlueColor);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
        Util.waitForDisplayed(repo.locationPost(timestamp));
        expect(Util.getText(repo.locationPost(timestamp))).toEqual(location);
        Util.click(repo.locationPost(timestamp));
        Util.waitForDisplayed(repo.mapShowing(timestamp));
        Util.click(repo.sharedPostTitle(timestamp));
        Util.pause(3);
        Util.waitForDisplayed(repo.editButtonInPostDetailView);
        Util.waitForDisplayed(repo.locationInPostDetailViewNew(timestamp));
        expect(Util.getText(repo.locationInPostDetailViewNew(timestamp))).toEqual(location);
        browser.back();
    });

    it('map showing in post detail view', function(){

        let timestamp = CustomCommand.getTimestamp();
        Util.pause(3);
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.pause(3);
        Util.setValue(repo.typeToInputField, profile.network1User1.email);
        Util.pause(1);
        Util.click(repo.suggestedPostRecipient);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post.`);
        Util.pause(3);
        Util.waitForDisplayed(repo.locationIcon);
        Util.click(repo.locationIcon);
        Util.pause(3);
        Util.waitForDisplayed(repo.fetchedLocation);
        const location=Util.getText(repo.fetchedLocation);
        Util.waitForDisplayed(repo.locationIconBlueColor);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
        Util.waitForDisplayed(repo.locationPost(timestamp));
        expect(Util.getText(repo.locationPost(timestamp))).toEqual(location);
        Util.click(repo.locationPost(timestamp));
        Util.waitForDisplayed(repo.mapShowing(timestamp));
        Util.click(repo.sharedPostTitle(timestamp));
        Util.pause(3);
        Util.waitForDisplayed(repo.editButtonInPostDetailView);
        Util.waitForDisplayed(repo.locationInPostDetailViewNew(timestamp));
        expect(Util.getText(repo.locationInPostDetailViewNew(timestamp))).toEqual(location);
        Util.click(repo.locationInPostDetailViewNew(timestamp));
        Util.waitForDisplayed(repo.mapShowingInPostDetailView(timestamp));
        browser.back();
    });

    it('adding location in post detail view', function(){

        let timestamp = CustomCommand.getTimestamp();
        Util.pause(3);
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.pause(3);
        Util.setValue(repo.typeToInputField, profile.network1User1.email);
        Util.pause(1);
        Util.click(repo.suggestedPostRecipient);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post.`);
        Util.pause(3);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
        Util.pause(3);
        Util.click(repo.sharedPostTitle(timestamp));
        Util.waitForDisplayed(repo.editButtonInPostDetailView);
        Util.click(repo.editButtonInPostDetailView);
        Util.waitForDisplayed(repo.locationIconInDetailView);
        Util.click(repo.locationIconInDetailView);
        Util.waitForDisplayed(repo.fetchedLocation2);
        browser.back();
    
    });

    it('remove location in post detail view', function(){

        let timestamp = CustomCommand.getTimestamp();
        Util.pause(3);
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.pause(3);
        Util.setValue(repo.typeToInputField, profile.network1User1.email);
        Util.pause(1);
        Util.click(repo.suggestedPostRecipient);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post.`);
        Util.pause(3);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
        Util.pause(3);
        Util.click(repo.sharedPostTitle(timestamp));
        Util.waitForDisplayed(repo.editButtonInPostDetailView);
        Util.click(repo.editButtonInPostDetailView);
        Util.waitForDisplayed(repo.locationIconInDetailView);
        Util.click(repo.locationIconInDetailView);
        Util.waitForDisplayed(repo.fetchedLocation2);
        Util.waitForDisplayed(repo.closeButtonInDetailView);
        Util.click(repo.closeButtonInDetailView);
        Util.pause(3);
        Util.waitForNotDisplayed(repo.fetchedLocation2);
        Util.pause(5);
        browser.back();
    });

    it('location showing in revisions', function(){

        let timestamp = CustomCommand.getTimestamp();
        Util.pause(3);
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.pause(3);
        Util.setValue(repo.typeToInputField, profile.network1User1.email);
        Util.pause(1);
        Util.click(repo.suggestedPostRecipient);
        Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post.`);
        Util.pause(3);
        Util.click(repo.noteShareButton);
        Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
        Util.pause(3);
        Util.click(repo.sharedPostTitle(timestamp));
        Util.waitForDisplayed(repo.editButtonInPostDetailView);
        Util.click(repo.editButtonInPostDetailView);
        Util.waitForDisplayed(repo.locationIconInDetailView);
        Util.click(repo.locationIconInDetailView);
        Util.waitForDisplayed(repo.fetchedLocation2);
        const location= Util.getText(repo.fetchedLocation2);
        Util.pause(3);
        Util.click(repo.doneButtonInPostDetailView);
        Util.waitForDisplayed(repo.locationEditView(timestamp));
        expect(Util.getText(repo.locationEditView(timestamp))).toEqual(location);
        Util.pause(2);
        Util.click(repo.more);
        Util.click(repo.viewRevisions);
        Util.waitForDisplayed(repo.locationEditView(timestamp));
        browser.back();
        browser.back();

    });

    it('verify location fetched and removed successfully and color of location icon changes', function(){

        let timestamp = CustomCommand.getTimestamp();
        Util.pause(3);
        Util.click(repo.inlineInsertTextField);
        Util.click(repo.toInputField);
        Util.pause(3);
        Util.setValue(repo.typeToInputField, profile.network1User1.email);
        Util.pause(1);
        Util.click(repo.suggestedPostRecipient);
        Util.setValue(repo.noteTitleInputField, `Test Post ${timestamp}`);
        Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post.`);
        Util.pause(3);
        Util.waitForDisplayed(repo.locationIcon);
        Util.pause(2);
        Util.click(repo.locationIcon);
        Util.pause(3);
        Util.waitForDisplayed(repo.fetchedLocation);
        Util.waitForDisplayed(repo.locationIconBlueColor);
        Util.click(repo.closeLocationIcon);
        Util.waitForNotDisplayed(repo.fetchedLocation);
        

    });

});