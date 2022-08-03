// @ts-check
const { test } = require('@playwright/test');

test('Go to Highlands site', async ({ page }) => {
  await page.goto('https://www.google.ca/');
  const searchBar =
    'body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf > form > div:nth-child(1) > div.A8SBwf > div.RNNXgb > div > div.a4bIc > input';
  // await page.type(searchBar, 'highlands music festival'); // Types slower, like a user
  await page.type(searchBar, 'palmer rapids music festival'); // Types slower, like a user
  await page.keyboard.press('Enter');
  await page.waitForNavigation();
  const nextButtonSelector = '#pnnext';
  await page.click(
    '#botstuff > div > div:nth-child(3) > table > tbody > tr > td:nth-child(8) > a'
  );
  await page.locator('text=Highlands Music Festival').click();
  // await page.click(nextButtonSelector);
  // await page.click(nextButtonSelector);
  // await page.click(nextButtonSelector);
  // await page.click(nextButtonSelector);
  // await page.click(nextButtonSelector);
  // await page.click(
  //   // '#rso > div:nth-child(6) > div > div.NJo7tc.Z26q7c.UK95Uc.uUuwM.jGGQ5e > div > a'
  //   '#rso > div:nth-child(10) > div > div.NJo7tc.Z26q7c.UK95Uc.uUuwM.jGGQ5e > div > a'
  // );
});
