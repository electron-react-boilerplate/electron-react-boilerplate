import awsmobile from '../aws-exports';

const awsmobilewithauth = {
  ...awsmobile,
  API: {
    endpoints: [
      {
        name: 'main',
        endpoint: 'https://indigo-api.diffuze.ai',
      },
    ],
  },
};
export default awsmobilewithauth;
