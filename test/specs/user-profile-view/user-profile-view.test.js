const repo = require('../../../object-repository/object-repo');
const profile = require('../../../config/profile');
const Util = require('../../../utils/utils');
const CustomCommand = require('../../../utils/custom-commands');


const userProfileMobileNumber = "+923201234567";
const userProfileAddress = "Plot # 134, Street 9, I-10/3, Islamabad";
const userProfileLinkedin = "https://www.linkedin.com/company/convocorp/";
const userProfileTwitter = "https://twitter.com/convo";
const profilePictureFilePath = Util.getResourcePath('mario.jpg');

describe('user profile view', function () {

  // Author: Shoaib Arsalan Kiyani
  // Total Test Cases: 04
  
  it('open profile view through edit profile and fix-it links', function () {

    CustomCommand.login(profile.url, profile.network7Admin1.email, profile.network7Admin1.password);
    Util.click(repo.profileImageDropdown);
    Util.click(repo.editProfileLink);
    Util.waitForDisplayed(repo.aboutMeHeadingUserProfileView);

    Util.pause(1);

    Util.click(repo.userProfilePhoneFieldFilledWithValue,5000,true);
    Util.clearValue(repo.userProfilePhoneInputField, 5000, true);

    Util.pause(1);

    Util.click(repo.userProfileLocationFieldFilledWithValue, 5000, true);
    Util.clearValue(repo.userProfileLocationInputField, 5000, true);

    Util.pause(1);

    Util.click(repo.userProfileLinkedinFieldFilledWithValue, 5000, true);
    Util.clearValue(repo.userProfileLinkedinInputField, 5000, true);

    Util.pause(1);

    Util.click(repo.userProfileTwitterFieldFilledWithValue, 5000, true);
    Util.clearValue(repo.userProfileTwitterInputField, 5000, true);

    Util.pause(1);

    Util.click(repo.userProfileSaveButton);

    Util.pause(30);

    Util.waitForDisplayed(repo.fixitLinkUserFeedView);

    Util.click(repo.fixitLinkUserFeedView);
    Util.waitForDisplayed(repo.aboutMeHeadingUserProfileView);
  
  });
  
  it('update profile with values for linkedin, twitter, phone, location and description fields', function () {

    Util.click(repo.userProfilePhoneField);
    Util.clearValue(repo.userProfilePhoneInputField);
    Util.setValue(repo.userProfilePhoneInputField, userProfileMobileNumber);

    Util.click(repo.userProfileLocationField);
    Util.clearValue(repo.userProfileLocationInputField);
    Util.setValue(repo.userProfileLocationInputField, userProfileAddress);

    Util.click(repo.userProfileLinkedinField);
    Util.clearValue(repo.userProfileLinkedinInputField);
    Util.setValue(repo.userProfileLinkedinInputField, userProfileLinkedin);

    Util.click(repo.userProfileTwitterField);
    Util.clearValue(repo.userProfileTwitterInputField);
    Util.setValue(repo.userProfileTwitterInputField, userProfileTwitter);

    Util.click(repo.userProfileSaveButton);

  });
  
  it('user feed view has edit profile, location, phone number and top groups listed', function () {

    Util.waitForDisplayed(repo.editProfileButton);
    
    const phoneFieldText = Util.getText(repo.userProfilePhoneFieldWithValue);
    const locationFieldText = Util.getText(repo.userProfileLocationFieldWithValue);
    const linkedinFieldText = Util.getAttributeValue(repo.userProfileLinkedinFieldWithValue, 'href');
    const twitterFieldText = Util.getAttributeValue(repo.userProfileTwitterFieldWithValue, 'href');

    expect(phoneFieldText).toBe(userProfileMobileNumber);
    expect(locationFieldText).toBe(userProfileAddress);
    expect(linkedinFieldText).toBe(userProfileLinkedin);
    expect(twitterFieldText).toBe(userProfileTwitter);

    // Reset profile fields for next time execution of test case.
    
    Util.pause(3);
    Util.click(repo.editProfileButton);
    Util.waitForDisplayed(repo.aboutMeHeadingUserProfileView);

    Util.pause(1);

    Util.click(repo.userProfilePhoneFieldFilledWithValue);
    Util.clearValue(repo.userProfilePhoneInputField);

    Util.pause(1);

    Util.click(repo.userProfileLocationFieldFilledWithValue);
    Util.clearValue(repo.userProfileLocationInputField);

    Util.pause(1);

    Util.click(repo.userProfileLinkedinFieldFilledWithValue);
    Util.clearValue(repo.userProfileLinkedinInputField);

    Util.pause(1);

    Util.click(repo.userProfileTwitterFieldFilledWithValue);
    Util.clearValue(repo.userProfileTwitterInputField);

    Util.pause(1);

    Util.click(repo.userProfileSaveButton);

    Util.waitForDisplayed(repo.userProfileViewAddPhoneNumber);

  });
  
  it('add your photo modal and upload profile picture through update link and edit profile', function () {

    Util.moveTo(repo.userFeedViewProfileImage);
    Util.click(repo.userFeedViewProfileImageUpdateLink);
    Util.uploadFile(repo.userFeedViewProfileImageUploadInputField, profilePictureFilePath);
    Util.click(repo.applyPhotoButton);
    Util.waitForDisplayed(repo.applyPhotoGeneratingThumbnails);
    Util.waitForNotDisplayed(repo.applyPhotoGeneratingThumbnails);
    Util.waitForDisplayed(repo.profilePictureUploadSuccess);

    Util.click(repo.editProfileButton);
    Util.click(repo.userProfileViewUploadPicture);
    Util.uploadFile(repo.userFeedViewProfileImageUploadInputField, profilePictureFilePath);
    Util.pause(10);
    Util.click(repo.applyPhotoButton);
    Util.waitForDisplayed(repo.applyPhotoGeneratingThumbnails);
    Util.waitForNotDisplayed(repo.applyPhotoGeneratingThumbnails);
    Util.waitForDisplayed(repo.profilePictureUploadSuccess);

  });

});