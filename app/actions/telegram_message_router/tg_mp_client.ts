const { Client } = require('tlg');
export class TgClient extends Client {
    constructor(options = {}) {
        super(options);
    }
    async authorizationCode() {
        console.error("NEW---------------");
        super.authorizationCode();
    }
}
