import { Configuration } from 'webpack';
import { Configuration as DevServer } from 'webpack-dev-server';

export default interface WebpackConfig extends Configuration {
  devServer?: DevServer;
}
