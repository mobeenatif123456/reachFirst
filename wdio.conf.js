const fs = require('fs');
const path = require('path');
const {TimelineService} = require('wdio-timeline-reporter/timeline-service');
const TestcaseRealtimeStatus = require('./utils/testcase-realtime-status');
const video = require('wdio-video-reporter');
const chalk = require('chalk');
const enableConvoWebMonitor = true;
const shareTestSuiteReportInConvo = false;

exports.config = {

  runner: 'local',

  // ==================
  // Specify Test Files
  // ==================
  // Define which test specs should run. The pattern is relative to the directory
  // from which `wdio` was called. Notice that, if you are calling `wdio` from an
  // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
  // directory is where your package.json resides, so `wdio` will be called from there.
  
  suites: {
    suite0: ['./test/specs/employer login/**/*.js'],
    suite1: ['./test/specs/employee login/**/*.js'],
    shareReport: ['./test/misc/share-report/**/*.js']

  },

  // hostname: '52.191.114.158',
  // hostname: '192.168.225.114',

  hostname: 'localhost',
 // hostname: '192.168.225.111',

  
  port: 4444,
  path: '/wd/hub',

  specs: ['./test/misc/share-report.test.js'],

  // Patterns to exclude.
  exclude: [
    // 'path/to/excluded/files'
  ],
  //
  // ============
  // Capabilities
  // ============
  // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
  // time. Depending on the number of capabilities, WebdriverIO launches several test
  // sessions. Within your capabilities you can overwrite the spec and exclude options in
  // order to group specific specs to a specific capability.
  //
  // First, you can define how many instances should be started at the same time. Let's
  // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
  // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
  // files and you set maxInstances to 10, all spec files will get tested at the same time
  // and 30 processes will get spawned. The property handles how many capabilities
  // from the same test should run tests.
  //
  maxInstances: 30,
  //
  // If you have trouble getting all important capabilities together, check out the
  // Sauce Labs platform configurator - a great tool to configure your capabilities:
  // https://docs.saucelabs.com/reference/platforms-configurator
  //
  capabilities: [{
    
    maxInstances: 30,
    'browserName': 'chrome',
    'acceptInsecureCerts': true,
    'goog:chromeOptions': {
      'prefs': {
        credentials_enable_service: false,
        'profile.managed_default_content_settings.geolocation' : 1,
        profile: {
          password_manager_enabled: false,
          geolocation: 1
        }

      },
      'excludeSwitches': ['enable-automation'],
      'args': ['--start-maximized', '--disable-notifications'],
    },
    outputDir: './webdriver-logs'

  }],
  //
  // If outputDir is provided WebdriverIO can capture driver session logs
  // it is possible to configure which logTypes to include/exclude.
  // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
  // excludeDriverLogs: ['bugreport', 'server'],
  // ===================
  // Test Configurations
  // ===================
  // Define all options that are relevant for the WebdriverIO instance here
  //
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  logLevel: 'info',
  //
  // Set specific log levels per logger
  // loggers:
  // - webdriver, webdriverio
  // - @wdio/applitools-service, @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
  // - @wdio/mocha-framework, @wdio/jasmine-framework
  // - @wdio/local-runner
  // - @wdio/sumologic-reporter
  // - @wdio/cli, @wdio/config, @wdio/sync, @wdio/utils
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  // logLevels: {
  //     webdriver: 'info',
  //     '@wdio/applitools-service': 'info'
  // },
  //
  // If you only want to run your tests until a specific amount of tests have failed use
  // bail (default is 0 - don't bail, run all tests).
  bail: 0,
  //
  // Set a base URL in order to shorten url command calls. If your `url` parameter starts
  // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
  // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
  // gets prepended directly.
  baseUrl: '',
  //
  // Default timeout for all waitFor* commands.
  waitforTimeout: 240000,
  //
  // Default timeout in milliseconds for request
  // if browser driver or grid doesn't send response
  connectionRetryTimeout: 240000,
  //
  // Default request retries count
  connectionRetryCount: 3,
  //
  // Test runner services
  // Services take over a specific job you don't want to take care of. They enhance
  // your test setup with almost no effort. Unlike plugins, they don't add new
  // commands. Instead, they hook themselves up into the test process.
  //services: ['chromedriver', [TimelineService]],
  services: [
    [TimelineService]
  ],
  // Framework you want to run your specs with.
  // The following are supported: Mocha, Jasmine, and Cucumber
  // see also: https://webdriver.io/docs/frameworks.html
  //
  // Make sure you have the wdio adapter package for the specific framework installed
  // before running any tests.
  framework: 'mocha',
  //
  // The number of times to retry the entire specfile when it fails as a whole
  specFileRetries: 2,
  //
  // Delay in seconds between the spec file retry attempts
  // specFileRetriesDelay: 0,
  //
  // Whether or not retried specfiles should be retried immediately or deferred to the end of the queue
  // specFileRetriesDeferred: false,
  //

  reporters: [
    'spec', [
        'timeline', {
          outputDir: './timeline-report',
          fileName: 'timeline-report.html',
          embedImages: true,
          screenshotStrategy: 'on:error'
        }
    ]
  ],
  

  // reporters: [
  //   'spec',
  //   [video, {
  //   saveAllVideos: true,
  //   videoSlowdownMultiplier: 80, // Higher to get slower videos, lower for faster videos [Value 1-100]
  //   videoRenderTimeout: 900,
  //   outputDir: './testcase-recordings',
  //   maxTestNameCharacters: 2000
  //  }]
  // ],

  // Options to be passed to Mocha.
  // See the full list at http://mochajs.org/
  mochaOpts: {
    ui: 'bdd',
    timeout: 9000000000000,
    bail: 1
  },
  //
  // =====
  // Hooks
  // =====
  // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
  // it and to build services around it. You can either apply a single function or an array of
  // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
  // resolved to continue.
  /**
   * Gets executed once before all workers get launched.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   */
  onPrepare: function (config, capabilities) {

    if (enableConvoWebMonitor) { TestcaseRealtimeStatus.sendStatusClearTestCounters(); }
    
    //Check whether webdriver-logs, testcase_recordings and timeline-report directories are empty and if not delete files in those directories.
    
    let directories = ['webdriver-logs', 'timeline-report', 'testcase-recordings'];

    directories.forEach((directoryName) => {
     
      const filesFoundInDirectory =  fs.readdirSync(path.join(__dirname, directoryName));
     
      if (filesFoundInDirectory) {
        
        filesFoundInDirectory.forEach((fileName) => {
          if (fileName === 'rawSeleniumVideoGrabs') { fs.rmdirSync(path.join(__dirname, directoryName, fileName), { recursive: true }) }
          if (fileName !== '.gitignore' && fileName !== 'rawSeleniumVideoGrabs') { fs.unlinkSync(path.join(__dirname, directoryName, fileName)); }
        });
      
      }
   
    });

  },
  /**
   * Gets executed before a worker process is spawned and can be used to initialise specific service
   * for that worker as well as modify runtime environments in an async fashion.
   * @param  {String} cid      capability id (e.g 0-0)
   * @param  {[type]} caps     object containing capabilities for session that will be spawn in the worker
   * @param  {[type]} specs    specs to be run in the worker process
   * @param  {[type]} args     object that will be merged with the main configuration once worker is initialised
   * @param  {[type]} execArgv list of string arguments passed to the worker process
   */
  // onWorkerStart: function (cid, caps, specs, args, execArgv) {
  // },
  /**
   * Gets executed just before initialising the webdriver session and test framework. It allows you
   * to manipulate configurations depending on the capability or spec.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   */
  beforeSession: function (config, capabilities, specs) {
    if (enableConvoWebMonitor) { TestcaseRealtimeStatus.sendStatusTestSuiteExecutionStartAndEndTime({startTime: new Date().toString()}); }
  },
  /**
   * Gets executed before test execution begins. At this point you can access to all global
   * variables like `browser`. It is the perfect place to define custom commands.
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   */
  // before: function (capabilities, specs) {
  // },
  /**
   * Runs before a WebdriverIO command gets executed.
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   */
  beforeCommand: function (commandName, args) {},
  /**
   * Hook that gets executed before the suite starts
   * @param {Object} suite suite details
   */

  beforeSuite: function (suite) {
  },
  /**
   * Function to be executed before a test (in Mocha/Jasmine) starts.
   */
  beforeTest: function (test, context) {
    console.log(chalk.blue.bold('Test Started: ' + test.title));
  },
  /**
   * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
   * beforeEach in Mocha)
   */
  // beforeHook: function (test, context) {
  // },
  /**
   * Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
   * afterEach in Mocha)
   */
  // afterHook: function (test, context, { error, result, duration, passed, retries }) {
  // },

  afterTest: async function (test, context, { error, result, duration, passed, retries} ) {
    console.log(chalk.blue.bold('Test Finished: ' + test.title));
    console.log('');
    if (enableConvoWebMonitor) {
      await TestcaseRealtimeStatus.sendTestCaseStatusAfterExecution(test.title, passed);
      TestcaseRealtimeStatus.sendTestcaseExecutionDetails(test.parent, test.title, passed, duration, test.file, error ? error.message : null);
      
    }
  },


  /**
   * Hook that gets executed after the suite has ended
   * @param {Object} suite suite details
   */
  afterSuite: function (suite) {},
  /**
   * Runs after a WebdriverIO command gets executed
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   * @param {Number} result 0 - command success, 1 - command error
   * @param {Object} error error object if any
   */
  afterCommand: function (commandName, args, result, error) {},
  /**
   * Gets executed after all tests are done. You still have access to all global variables from
   * the test.
   * @param {Number} result 0 - test pass, 1 - test fail
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  after: function (result, capabilities, specs) {},
  /**
   * Gets executed right after terminating the webdriver session.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  // afterSession: function (config, capabilities, specs) {
  // },
  /**
   * Gets executed after all workers got shut down and the process is about to exit. An error
   * thrown in the onComplete hook will result in the test run failing.
   * @param {Object} exitCode 0 - success, 1 - fail
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {<Object>} results object containing test results
   */
  onComplete: async function (exitCode, config, capabilities, results) {

    if (enableConvoWebMonitor) {
      await TestcaseRealtimeStatus.sendStatusTestSuiteExecutionStartAndEndTime({endTime: new Date().toString()});
      const generatedReportPath = path.join(__dirname, 'timeline-report', 'timeline-report.html');
      await TestcaseRealtimeStatus.sendStatusReportGenerated(generatedReportPath);
      console.log('--------');
      console.log('Status Updated: Timeline Report Generated');
      console.log('--------');  
    }

    if (shareTestSuiteReportInConvo) {
      await TestcaseRealtimeStatus.shareReportInConvo();
    }

  },
  /**
   * Gets executed when a refresh happens.
   * @param {String} oldSessionId session ID of the old session
   * @param {String} newSessionId session ID of the new session
   */
  //onReload: function(oldSessionId, newSessionId) {
  //}
}