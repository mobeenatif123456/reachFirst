const profileTestEnvironment = require('./profile-test-environment');
const profileAWSProduction = require('./profile-production-environment');

// Mention profile to be used during execution of test cases.
const selectedProfile = profileTestEnvironment;

module.exports = selectedProfile;
