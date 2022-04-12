const repo = require('../../../object-repository/object-repo');
const profile = require('../../../config/profile');
const Util = require('../../../utils/utils');
const CustomCommand = require('../../../utils/custom-commands');

describe('cloud sync', function() {

  // Author: Mobeen Atif
  // Total Test Cases: 04

  let email = 'admin@testsuite1.com';
  let password = 'Kitchen1';
  let url= 'app.convo.com';
  let cloudDomain= '';
  let subDomain= 'convo.pk';

  let pakcloudEmail = 'admin@testsuite11.com';
  let pakcloudPassword = 'Kitchen1';
  let pakcloudurl= 'app.convo.pk';
  let pkcloudDomain= '';
  let pksubDomain= 'convo.com';

  let sessionBrowser1 = null;
  let sessionBrowser2 = null;


  it('login- gcp to pak cloud', function() {

    CustomCommand.login(url, email, password);

    cloudDomain= browser.getUrl();

    console.log(cloudDomain);

    expect(cloudDomain).toContain(subDomain);

    Util.click(repo.profileImageDropdown);
    Util.click(repo.signOut);
    if(Util.waitForDisplayed(repo.haveAnAccountLoginButton,5000,true))
    {
      Util.waitForDisplayed(repo.haveAnAccountLoginButton);
    
    }
    else{

      Util.waitForDisplayed(repo.signInButton);
    }

  });
  
  it('login- pak cloud to gcp', function() {

    CustomCommand.login(pakcloudurl, pakcloudEmail, pakcloudPassword);

    pkcloudDomain= browser.getUrl();

    console.log(pkcloudDomain);

    expect(pkcloudDomain).toContain(pksubDomain);

    Util.click(repo.profileImageDropdown);
    Util.click(repo.signOut);
    if(Util.waitForDisplayed(repo.haveAnAccountLoginButton,5000,true))
    {
      Util.waitForDisplayed(repo.haveAnAccountLoginButton);
      
    }
    else{

      Util.waitForDisplayed(repo.signInButton);
    }

  });

  it('signup- gcp to pak cloud', function() {

    browser.url(url);

    Util.click(repo.signupNowLink);
    console.log('Signup Email:', email);
    Util.setValue(repo.signupEmailInputField, email);
    Util.click(repo.signupButton);
    Util.pause(2);

    Util.waitForDisplayed(repo.signInButton);

    cloudDomain= browser.getUrl();

    console.log(cloudDomain);

    expect(cloudDomain).toContain(subDomain);

  });

  it('signup- pak cloud to gcp', function() {

    browser.url(pakcloudurl);

    Util.click(repo.signupNowLink);
    console.log('Signup Email:', pakcloudEmail);
    Util.setValue(repo.signupEmailInputField, pakcloudEmail);
    Util.click(repo.signupButton);
    Util.pause(2);

    Util.waitForDisplayed(repo.signInButton);

    pkcloudDomain= browser.getUrl();

    console.log(pkcloudDomain);

    expect(pkcloudDomain).toContain(pksubDomain);


  });

  
});


