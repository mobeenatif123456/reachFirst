module.exports = {

  employerLoginLink: ({ elementName: 'employerLoginLink', elementPath: '//p[text()="I want to hire"]/..//a[text()="Login"]' }),
  employeeLoginLink: ({ elementName: 'employeeLoginLink', elementPath: '//p[text()="I want to work"]/..//a[text()="Login"]' }),
  emailInputField: ({elementName: 'emailInputField', elementPath:`//input[@name='email']`}),
  passwordInputField: ({elementName: 'passwordInputField', elementPath:`//input[@name='password']`}),
  loginButton: ({elementName: 'loginButton', elementPath:`//p[text()='LOGIN']`}),
  employerLoginVerification: ({elementName: 'loginButton', elementPath:`//p[text()='POST A JOB']`}),
  profileImageLink: ({elementName: 'profileImageLink', elementPath:`//div[@class='MuiAvatar-root MuiAvatar-circular MuiAvatar-colorDefault'] | //div[@class='MuiAvatar-root MuiAvatar-circular']/img`}),
  logoutButton:({elementName: 'logoutButton', elementPath:`//p[text()='Log out']`}),
  invalidEmailOrPassword: ({elementName: 'invalidEmailOrPassword', elementPath:`//div[text()='Invalid email or password']`}),
  jobLists: ({elementName: 'filterJobs', elementPath:`//p[contains(text(),'Jobs List')]`}),
  closeButton: ({elementName: 'closeButton', elementPath:`//button[@title='Close']`}),
  enterEmailAddress: ({elementName: 'enterEmailAddress', elementPath:`//p[contains(text(),'Enter a valid email address')]`}),
  enterPassword: ({elementName: 'enterPassword', elementPath:`//p[contains(text(),'Enter the password')]`}),
  networkandUserchatVerificationInBigChat: (networkName, userName) => ({elementName: 'networkandUserchatVerificationInBigChat', elementPath:`//div[@class='separator-title' and text()='${networkName}']/..//div[@class='chat-list-item-user-name' and text()='${userName}']`}),
  

}