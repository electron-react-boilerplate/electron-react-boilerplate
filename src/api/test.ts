import { graphql, buildSchema } from 'graphql';
import send from '../tools/network-scan/app';

const schema = buildSchema(`
type Query {
    address: String
    args: String
  }
`);
export function graphqlMutation(range: string, args: string) {
  const rootValue = { address: () => range, args: () => args };

  const source = '{ address, args }';

  // eslint-disable-next-line promise/catch-or-return, promise/always-return
  graphql({ schema, source, rootValue }).then((response: any) => {
    console.log(JSON.stringify(response));
    send(response.data.address, response.data.args);
  });
}
export default graphqlMutation;
