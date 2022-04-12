const path = require('path');
const cron = require('node-cron');
const chalk = require('chalk');
const Launcher = require('@wdio/cli').default
const wdioConfigFilePath = path.join('./wdio.conf.js');


// Small Test Suite => Run at 9AM (Current Day) and then at every hour from 11AM (Current Day) to 8AM (Next Day) 

const smallSuitCronExp = '0 * * * *';

cron.schedule(smallSuitCronExp, async () => {
  
  try {
    //const wdioSmallSuite = new Launcher(wdioConfigFilePath, {specs: ['./test/specs/login/*.js']});
    console.log(chalk.black.bgYellowBright('Small Test Suite Execution Started: ' + new Date().toString()));
    await wdioSmallSuite.run();
    console.log(chalk.black.bgYellowBright('Small Test Suite Execution Completed: ' + new Date().toString()));
  } catch (error) {
    console.error('Launcher failed to start the test suites', error.stacktrace);
    process.exit(1);
  }

});

// Large Test Suite => Run at 10AM (Every Day)

/*

const largeSuitCronExp = '0 10 * * *';

cron.schedule(largeSuitCronExp, async () => {

  try {
    const wdioLargeSuite = new Launcher(wdioConfigFilePath, {specs: ['./test/specs/login/*.js']});
    console.log(chalk.black.bgBlueBright('Large Test Suite Execution Started: ' + new Date().toString()));
    await wdioLargeSuite.run();
    console.log(chalk.black.bgBlueBright('Large Test Suite Execution Completed: ' + new Date().toString()));
  } catch (error) {
    console.error('Launcher failed to start the test suites', error.stacktrace);
    process.exit(1);
  }

});

*/