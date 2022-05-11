module.exports = {

  emailInputField: ({ elementName: 'emailInputField', elementPath: '//input[@id="email"]' }),
  networkandUserchatVerificationInBigChat: (networkName, userName) => ({elementName: 'networkandUserchatVerificationInBigChat', elementPath:`//div[@class='separator-title' and text()='${networkName}']/..//div[@class='chat-list-item-user-name' and text()='${userName}']`}),
  

}