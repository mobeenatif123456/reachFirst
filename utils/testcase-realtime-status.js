const axios = require('axios').default;

class TestcaseRealtimeStatus {

  constructor() {
    axios.defaults.baseURL = 'http://localhost:3000';
  }

  async sendTestCaseStatusAfterExecution(title, passed) {

    try {
      const response = await axios.post('submit-test-case-status-after-execution', { title: title, passed: passed });
      if (response.status === 200) { return true; }
    } catch (error) {
      console.error(error);
    }
    
  }

  async getTestsExecutionSummary() {

    try {
      const response = await axios.get('/get-tests-exeuction-summary');
      if (response.status === 200) { return response.data; }
    } catch (error) {
      console.error(error);
    }

  }

  async shareReportInConvo () {

    try {

      let response = await axios.get('share-report');

      if (response.data === 'OK') {
        return true;
      }

    } catch (error) {
      console.log(error);
    }

  }

  async sendTestcaseExecutionDetails(testParent, testTitle, testPassed, testDuration, testPath, testError) {

    try {

      let response = await axios.post('testcaseExecutionDetails', {
        
        parent: testParent,
        title: testTitle,
        passed: testPassed,
        duration: testDuration,
        path: testPath,
        error: testError

      });

      if (response.data === 'Ok') {
        return true;
      }

    } catch (error) {
      console.log(error);
    }

  }

  async sendStatusClearTestCounters() {

    try {

      let response = await axios.post('resetCounters', {
        action: 'clearCounters'
      });

      if (response.data === 'Ok') {
        return true;
      }

    } catch (error) {
      console.log(error);
    }

  }
  
  async sendStatusReportGenerated(reportPath) {

    try {

      let response = await axios.post('report', {
        reportPath: reportPath
      });

      if (response.data === 'OK') {
        return true;
      }
      
    } catch (error) {
      console.log(error);
    }

  }

  async sendStatusTestSuiteExecutionStartAndEndTime(time) {
    
    const {startTime, endTime} = time;
     
    try {

      let response = await axios.post('test-suite-execution-time', {
        
        startTime: startTime,
        endTime: endTime ? endTime: 'In Progress'
      
      });

      if (response.data === 'OK') {
        return true;
      }
      
    } catch (error) {
      console.log(error);
    }

  }

  async getTestSuiteResults() {

    try {

      let response = await axios.get('testcaseStatus');
      if (response.status === 200) {
        return response.data;
      }
      
    } catch (error) {
      console.log(error);
    }

  }

  async getFailedTestCases() {
         
    try {
      let response = await axios.get('get-failed-test-cases');
      if (response.status === 200) {
        const responseData = response.data; 
        if (responseData.length > 0) {
          return responseData.toString().replace(/,/g, '\n');
        }else{
          return 'No test cases were failed.'
        }
      }
    } catch (error) {
      console.log(error);
    }

  }


}

module.exports = new TestcaseRealtimeStatus();