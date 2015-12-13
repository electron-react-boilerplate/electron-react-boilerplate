import path from 'path';
import webdriver from 'selenium-webdriver';
import { expect } from 'chai';
import electronPath from 'electron-prebuilt';
import homeStyles from '../app/components/Home.module.css';
import counterStyles from '../app/components/Counter.module.css';

describe('main window', function spec() {
  before((done) => {
    this.timeout(5000);
    this.driver = new webdriver.Builder()
      .usingServer('http://localhost:9515')
      .withCapabilities({
        chromeOptions: {
          binary: electronPath,
          args: [ 'app=' + path.resolve() ]
        }
      })
      .forBrowser('electron')
      .build();
    done();
  });

  after(async () => {
    this.timeout(10000);
    await this.driver.quit();
  });

  const findCounter = () => {
    return this.driver.findElement(webdriver.By.className(counterStyles.counter));
  };

  const findButtons = () => {
    return this.driver.findElements(webdriver.By.className(counterStyles.btn));
  };

  it('should open window', async () => {
    const title = await this.driver.getTitle();
    expect(title).to.equal('Hello Electron React!');
  });

  it('should to Counter with click "to Counter" link', async () => {
    const link = await this.driver.findElement(webdriver.By.css(`.${homeStyles.container} > a`));
    link.click();

    const counter = await findCounter();
    expect(await counter.getText()).to.equal('0');
  });

  it('should display updated count after increment button click', async () => {
    const buttons = await findButtons();
    buttons[0].click();

    const counter = await findCounter();
    expect(await counter.getText()).to.equal('1');
  });

  it('should display updated count after descrement button click', async () => {
    const buttons = await findButtons();
    const counter = await findCounter();

    buttons[1].click();  // -

    expect(await counter.getText()).to.equal('0');
  });

  it('shouldnt change if even and if odd button clicked', async () => {
    const buttons = await findButtons();
    const counter = await findCounter();
    buttons[2].click();  // odd

    expect(await counter.getText()).to.equal('0');
  });

  it('should change if odd and if odd button clicked', async () => {
    const buttons = await findButtons();
    const counter = await findCounter();

    buttons[0].click();  // +
    buttons[2].click();  // odd

    expect(await counter.getText()).to.equal('2');
  });

  it('should change if async button clicked and a second later', async () => {
    const buttons = await findButtons();
    const counter = await findCounter();
    buttons[3].click();  // async

    expect(await counter.getText()).to.equal('2');

    await this.driver.wait(() =>
      counter.getText().then(text => text === '3' )
    , 1000, 'count not as expected');
  });

  it('should back to home if back button clicked', async () => {
    const link = await this.driver.findElement(webdriver.By.css(`.${counterStyles.backButton} > a`));
    link.click();

    await this.driver.findElement(webdriver.By.className(homeStyles.container));
  });
});
