const path = require('path');
const fs = require('fs');
const repo = require('../../../object-repository/object-repo');
const Util = require('../../../utils/utils');
const CustomCommand = require('../../../utils/custom-commands');
const testCaseRealTimeStatus = require('./../../../utils/testcase-realtime-status')

describe('share report', function () {
  
  it('share test suite report in convo', function () {
    
    const url = 'https://app.convo.com';
    const userEmail = 'shoaib+008@convo.com';
    const userPassword = '123456';
    
    const shareReportInGroup = 'GCP Reports';
    const timelineReportDirPath = 'C:/Users/convo_admin/Desktop/wdio-suite/convo-web-automation/timeline-report';
    const timelineReportInHTMLFormatFilName = 'timeline-report.html';
    
    const testsSummary = browser.call(() => {
      return testCaseRealTimeStatus.getTestsExecutionSummary();
    });
        
    const failedTestCases = browser.call(() => {
      return testCaseRealTimeStatus.getFailedTestCases();
    });
    
    CustomCommand.login(url, userEmail, userPassword);

    Util.setValue(repo.feedSearchInputField, shareReportInGroup);

    const groupNameSuggestion = `//span/b[text()='GCP Reports']`;
    Util.click(groupNameSuggestion);
    Util.waitForDisplayed(repo.groupNameHeading);

    const timestamp = CustomCommand.getTimestamp();    
    Util.click(repo.inlineInsertTextField);
    Util.pause(2);
    Util.setValue(repo.noteTitleInputField, `${timestamp} Test Suite Report :: Passed: ${testsSummary.passed} Failed: ${testsSummary.failed}`);
    Util.setValue(repo.noteBodyInputField, failedTestCases);
    Util.pause(2);
    Util.uploadFile(repo.feedFileUploadInputField, path.join(timelineReportDirPath, timelineReportInHTMLFormatFilName));
    Util.waitForDisplayed(repo.fileUploadAndConversionSuccess, 900000);
    Util.pause(5);
    Util.click(repo.noteShareButton);
    const sharedPostTitle = `//div/a/span[contains(text(), "${timestamp}")]`;
    Util.waitForDisplayed(sharedPostTitle);
    Util.pause(5);

  });

});