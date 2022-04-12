const repo = require('../../../object-repository/object-repo');
const profile = require('../../../config/profile');
const Util = require('../../../utils/utils');
const CustomCommand = require('../../../utils/custom-commands');


describe('custom fields', function() {


  // Author: Shoaib Arslan Kiyani
  // Total Test Cases: 15

  let sessionBrowser1 = null;
  let sessionBrowser2 = null;

  const browserSessions = []
  
  

  it('verify that help text Hover over the fields and click Lock icon <lock icon> to lock the field', function() {
    CustomCommand.login(profile.url, profile.network1Admin1.email, profile.network1Admin1.password);
    
    Util.click(repo.networkDropdown);
    Util.click(repo.networkSettingsLinkInNetworkDropdown);
    Util.click(repo.manageUsersLinkInNetworkSettings);
    Util.click(repo.customizeUserProfilesTab);
    Util.waitForDisplayed(repo.customProfilesInfoText);
  });

  it('verify already created locked fields are present in network setttings under manage users section', function() {

    // Already created and locked fields.
    Util.waitForDisplayed(repo.firstNameLockedField);
    Util.waitForDisplayed(repo.lastNameLockedField);
    Util.waitForDisplayed(repo.positionLockedField);
    Util.waitForDisplayed(repo.shortBioLockedField);
    Util.waitForDisplayed(repo.locationLockedField);
    Util.waitForDisplayed(repo.phoneLockedField);
    Util.waitForDisplayed(repo.linkedInLockedField);
    Util.waitForDisplayed(repo.twitterLockedField);

    Util.click(repo.permanentFieldsHeading);

    Util.keys('End');

    Util.keys('End');

    Util.pause(5);

    Util.takeScreenshot();
    Util.click(repo.firstCreatedCustomFieldDeleteButton,5000,true);

    Util.takeScreenshot();
    Util.click(repo.secondCreatedCustomFieldDeleteButton,5000,true);

    Util.takeScreenshot();
    Util.click(repo.thirdCreatedCustomFieldDeleteButton,5000,true);



  });

  it('verify custom field name cannot be less than 3 characters', function() {

    // Custom field cannot be less than 3  chars.
    Util.setValue(repo.customFieldsInputField, 'sh');
    Util.keys('Enter');
    Util.waitForDisplayed(repo.fieldNameShortErrorMessage);
    Util.takeScreenshot();
    Util.clearValue(repo.customFieldsInputFieldWithErrorMessage);

  });

  it('verify custom field name cannot be greater than 25 characters', function() {

    // Custom field cannot be greater than 25  chars.
    Util.setValue(repo.customFieldsInputField, 'This is a very long field.');
    Util.keys('Enter');
    Util.waitForDisplayed(repo.fieldNameLongErrorMessage);
    Util.takeScreenshot();
    Util.clearValue(repo.customFieldsInputFieldWithErrorMessage);
    
  });

  it('verify custom field can be created by admin user', function() {

    // Create custom field.
    Util.setValue(repo.customFieldsInputField, 'First Custom Field');
    Util.click(repo.customFieldsAddButton);
    Util.waitForDisplayed(repo.createdCustomField);
    
  });

  it('verify duplicate custom field cannot be created', function() {
    
    // Duplicate name for custom field.
    Util.setValue(repo.customFieldsInputField, 'First Custom Field');
    Util.keys('Enter');
    Util.waitForDisplayed(repo.fieldNameAlreadyExistsErrorMessage);
    Util.takeScreenshot();
    Util.clearValue(repo.customFieldsInputFieldWithErrorMessage);

  });

  it('verify custom field can be removed by admin user', function() {

     // Remove this piece of code when the bug CONVO-17141 (JIRA) is fixed
     Util.refresh();
     Util.waitForDisplayed(repo.customizeUserProfilesTab);
     Util.pause(3);
     Util.click(repo.customizeUserProfilesTab);
     Util.waitForDisplayed(repo.customProfilesInfoText);

     Util.click(repo.permanentFieldsHeading);

     Util.keys('End');

     Util.keys('End');

     Util.pause(5);
 
     // Remove custom field.
     Util.takeScreenshot();
     Util.click(repo.createdCustomFieldDeleteButton);
     Util.waitForNotDisplayed(repo.createdCustomFieldDeleteButton)
    
  });

  it('verify locked and unlocked custom fields can be created by admin user', function() {

    Util.pause(5);
    Util.setValue(repo.customFieldsInputField, 'First CF');
    Util.keys('Enter');
    
    Util.waitForDisplayed(repo.firstCreatedCustomField);
    Util.moveTo(repo.firstCreatedCustomField);
    
    Util.click(repo.customFieldBlackLockIcon);
    Util.waitForDisplayed(repo.customFieldRedLockIcon);
    Util.takeScreenshot();

    Util.pause(5);
    Util.setValue(repo.customFieldsInputField, 'Second CF');
    Util.keys('Enter');
    
    Util.waitForDisplayed(repo.secondCreatedCustomField);

  });

  it('verify that length of custom field should not be >75 characters.', function() {
    
    Util.click(repo.profileImageDropdown);
    Util.click(repo.editProfileLink);
    Util.waitForDisplayed(repo.editProfileSection);
    //Util.waitForDisplayed(repo.additionalInfoTab);
    Util.pause(10);
    Util.waitForDisplayed(repo.additionalInfoTab);
    Util.pause(5);
    Util.click(repo.additionalInfoTab);
    Util.pause(5);
    const string1 = "The first value in my custom field is twenty two hundered which we added in feild input";
    const string2 = "The first value in my custom field is twenty two hundered which we added in";
    Util.moveTo(repo.secondCustomFieldForUser);
    Util.waitForDisplayed(repo.secondCustomFieldPencilImageForUser);
    Util.click(repo.secondCustomFieldForUser);
    Util.setValue(repo.secondCustomFieldInputField, string1);
    Util.keys('Enter');
    const string3 = Util.getText(repo.secondCustomFieldInputText);
    const string4 = string3.substring(11,87);
    console.log('second CF:', string4);
    console.log('Third CF:', string2);
    expect(string4).toBe(string2);
    Util.pause(3);
    Util.click(repo.userProfileSaveButton);
    Util.pause(5);

    Util.waitForNotDisplayed(repo.editProfileSection);
    
  });

 it('verify that custom fields appear in a separate tab of Additional info under the individual user profiles dialog box.', function() {
    
    Util.click(repo.profileImageDropdown);
    Util.click(repo.editProfileLink);
    Util.waitForDisplayed(repo.editProfileSection);
    Util.pause(10);
    Util.waitForDisplayed(repo.additionalInfoTab);
    Util.pause(5);
    Util.click(repo.additionalInfoTab);
    Util.pause(5);
    Util.moveTo(repo.firstCustomFieldForAdmin);
    Util.waitForDisplayed(repo.firstCustomFieldForAdmin);
    Util.waitForDisplayed(repo.firstCustomFieldLockImageForAdmin);
    Util.moveTo(repo.secondCustomFieldForAdmin);
    Util.waitForDisplayed(repo.secondCustomFieldForAdmin);
    Util.waitForDisplayed(repo.secondCustomFieldPencilImageForAdmin);
    Util.click(repo.userProfileSaveButton);
    Util.pause(5);

    Util.waitForNotDisplayed(repo.editProfileSection);

    Util.click(repo.networkDropdown);
    Util.click(repo.networkSettingsLinkInNetworkDropdown);
    Util.click(repo.manageUsersLinkInNetworkSettings);
    Util.click(repo.customizeUserProfilesTab);
    Util.waitForDisplayed(repo.customProfilesInfoText);

    sessionBrowser1 = Util.getBrowserSession();
    console.log(sessionBrowser1);
    browserSessions.push(sessionBrowser1);
    console.log('printing array :',browserSessions[0]);
    sessionBrowser2 = Util.openBrowser();
    browserSessions.push(sessionBrowser2);

    Util.switchToBrowser(sessionBrowser2);

    CustomCommand.login(profile.url, profile.network1User1.email, profile.network1User1.password);
    
    Util.click(repo.profileImageDropdown);
    Util.click(repo.editProfileLink);
    Util.waitForDisplayed(repo.editProfileSection);
    Util.pause(10);
    Util.waitForDisplayed(repo.additionalInfoTab);
    Util.pause(5);
    Util.click(repo.additionalInfoTab);
    Util.pause(5);

    Util.moveTo(repo.firstCustomFieldForUser);
    Util.waitForDisplayed(repo.firstCustomFieldForUser);
    Util.waitForDisplayed(repo.firstCustomFieldLockImageForUser);
    Util.moveTo(repo.secondCustomFieldForUser);
    Util.waitForDisplayed(repo.secondCustomFieldForUser);
    Util.waitForDisplayed(repo.secondCustomFieldPencilImageForUser);


  });

  it('verify normal user cannot edit locked custom field and lock icon shown to the user', function() {

    Util.moveTo(repo.firstCustomFieldForUser);
    Util.waitForDisplayed(repo.firstCustomFieldLockImageForUser);

  });

  it('verify normal user can edit unlocked custom field and save value in it', function() {

    Util.moveTo(repo.secondCustomFieldForUser);
    Util.waitForDisplayed(repo.secondCustomFieldPencilImageForUser);
    Util.takeScreenshot();

    Util.click(repo.secondCustomFieldForUser);
    Util.clearValue(repo.secondCustomFieldInputField);
    Util.setValue(repo.secondCustomFieldInputField, 'CF Value');

    Util.click(repo.userProfileSaveButton);

    Util.pause(2);

    Util.waitForNotDisplayed(repo.editProfileSection);

  });

  it('verify saved custom field value is shown in normal user profile details section', function() {
    
    Util.click(repo.profileImageDropdown);
    Util.click(repo.editProfileLink);
    Util.waitForDisplayed(repo.editProfileSection);
    Util.pause(10);
    Util.waitForDisplayed(repo.additionalInfoTab);
    Util.pause(5);
    Util.click(repo.additionalInfoTab);
    Util.pause(5);

    Util.moveTo(repo.secondCustomFieldForUser);
    Util.waitForDisplayed(repo.secondCustomFieldSavedValue);
    //console.log('first:', secondCustomFieldSavedValue);
    Util.click(repo.userProfileSaveButton);
    Util.pause(5);

    Util.waitForNotDisplayed(repo.editProfileSection);
    
  });

  it('verify admin user can remove locked and unlocked custom fields', function() {

    //Util.closeBrowser();
    Util.switchToBrowser(sessionBrowser1);

    // Remove first custom field.
    Util.takeScreenshot();
    Util.click(repo.firstCreatedCustomFieldDeleteButton);
    Util.waitForNotDisplayed(repo.firstCreatedCustomFieldDeleteButton);
   
    // Remove second custom field.
    Util.takeScreenshot();
    Util.click(repo.secondCreatedCustomFieldDeleteButton);
    Util.waitForNotDisplayed(repo.secondCreatedCustomFieldDeleteButton);

  });

  it('verify no additional information tab show under user profile dilogue box', function() {
    
    Util.click(repo.profileImageDropdown);
    Util.click(repo.editProfileLink);
    Util.waitForDisplayed(repo.editProfileSection);
    Util.pause(10);
    
    Util.waitForNotDisplayed(repo.additionalInfoTab);
    Util.click(repo.userProfileSaveButton);

    Util.switchToBrowser(sessionBrowser2);
    Util.click(repo.profileImageDropdown);
    Util.click(repo.editProfileLink);
    Util.waitForDisplayed(repo.editProfileSection);
    Util.pause(10);
    
    Util.waitForNotDisplayed(repo.additionalInfoTab);
    Util.click(repo.userProfileSaveButton);

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