// @flow

type GoogleAccount = {
  upstreamId: string,
}

export default class TestClass {
  static accountFlowType = GoogleAccount;

  constructor() {
    console.log(`Creating instance of TestClass`);

    const account: GoogleAccount = {
      upstreamId: 'foo',
    };

    console.log(`account`, account);
  }
}
