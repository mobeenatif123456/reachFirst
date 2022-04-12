const repo = require('../../../object-repository/object-repo');
const profile = require('../../../config/profile');
const Util = require('../../../utils/utils');
const CustomCommand = require('../../../utils/custom-commands');

describe('trending hashtags', function() {
  
  it('verify tending hashtag filters are being shown in feed search area', function() {

    CustomCommand.login(profile.url, profile.network1User1.email, profile.network1User1.password);
    Util.setValue(repo.feedSearchInputField, '#');
    Util.waitForDisplayed(repo.trendingHeading);
    Util.click(repo.trendingHashtagFilterDropdown);
    Util.waitForDisplayed(repo.trendingHashtagFilterThisMonth);
    Util.waitForDisplayed(repo.trendingHashtagFilterThisWeek);
    Util.waitForDisplayed(repo.trendingHashtagFilterToday);

  });
  
  xit('verify "this month" trending hashtag filter updates posts count if new post with hashtag is created', function() {

    Util.click(repo.trendingHashtagFilterThisMonth);
    const firstTrendingHashTagName = Util.getText(repo.firstTrendingHashtagName);

    const hashtagName =  firstTrendingHashTagName || 'automation';
    const hashtagPostsCountBeforePostCreation = parseInt(Util.getText(repo.firstTrendingHashtagPostsCount)) || 0;
    console.log('Trending Hashtag Posts Count Before Post Creation:', hashtagPostsCountBeforePostCreation);

    Util.takeScreenshot();

    Util.click(repo.networkLogo);

    // Create a post with hash tag.
    Util.click(repo.inlineInsertTextField);
    const timestamp = CustomCommand.getTimestamp();
    const postTitle = `Test Post: ${timestamp}`;
    Util.setValue(repo.noteTitleInputField, postTitle);
    Util.setValue(repo.noteBodyInputField, `${timestamp}: This is a test post by automation suite. ${hashtagName}`);
    Util.pause(2);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network1User2.email);
    Util.click(repo.suggestedPostRecipient);
    Util.pause(2);
    Util.click(repo.noteShareButton);
    const sharedPostTitle = `//div/a/span[contains(text(), 'Test Post: ${timestamp}')]`;
    Util.waitForDisplayed({sharedPostTitle});

    // Check whether post is indexed and can be searched.
    
    for (let step = 0; step < 10; step++) {
      
      Util.setValue(repo.feedSearchInputField, `"${postTitle}"`);
      Util.click(repo.searchIcon);
      
      const searchedPostResult = `//div[@class='title-text']/a/span/span[text()='${timestamp}']`;
      const searchedPost = Util.waitForDisplayed({searchedPostResult}, 2000, true);
      
      if (searchedPost) {
        Util.takeScreenshot();
        Util.click(repo.networkLogo);
        break;
      }
      
      Util.click(repo.networkLogo);
      Util.pause(30);
    
    }

    Util.pause(5);

    Util.setValue(repo.feedSearchInputField, '#');
    Util.waitForDisplayed(repo.trendingHeading);
    
    const hashtagPostsCountAfterPostCreation = parseInt(Util.getText(repo.firstTrendingHashtagPostsCount));
    console.log('Trending Hashtag Posts Count After Post Creation:', hashtagPostsCountAfterPostCreation);
    expect(hashtagPostsCountAfterPostCreation).toBe((hashtagPostsCountBeforePostCreation + 1));

  });
  
});