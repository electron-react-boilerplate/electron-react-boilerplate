import { ClientFunction, Selector } from 'testcafe';

const getPageTitle = ClientFunction(() => document.title);

const headerSelector = Selector('[data-tid="header"]');
const firstModuleSelector = Selector('[data-tid="module-0"]');
const secondModuleSelector = Selector('[data-tid="module-1"]');
const titleSelector = Selector('[data-tid="title"]');

const getHeaderText = () => headerSelector().innerText;
const getFirstModuleText = () => firstModuleSelector().innerText;
const getSecondModuleText = () => secondModuleSelector().innerText;
const getTitleText = () => titleSelector().innerText;

const clickToGalleryLink = t => t.click(firstModuleSelector());

const assertNoConsoleErrors = async t => {
  const { error } = await t.getBrowserConsoleMessages();
  await t.expect(error).eql([]);
};

fixture`Home Page`.page('../../app/app.html').afterEach(assertNoConsoleErrors);

test('e2e', async t => {
  await t.expect(getPageTitle()).eql('Home - Electron');
});

test('should open window with title', async t => {
  await t.expect(getHeaderText()).eql('Choose a Gallery Module from the List');
});

test('should have at least one module link', async t => {
  await t.expect(getFirstModuleText()).eql('Test Module\n');
});

test('should have two module links', async t => {
  await t.expect(getSecondModuleText()).eql('Test Module Two\n');
});

test("should haven't any logs in console of main window", assertNoConsoleErrors);

test('should navigate to Gallery when Module link clicked', async t => {
  await t
    .click('[data-tid="module-0"]')
    .expect(getPageTitle())
    .eql('Gallery - Electron');
});

fixture`Gallery Page`
  .page('../../app/app.html')
  .beforeEach(clickToGalleryLink)
  .afterEach(assertNoConsoleErrors);

test('should display module name', async t => {
  await t.expect(getTitleText()).eql('lorumPicsumOne');
});
