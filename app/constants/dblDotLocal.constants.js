

export const dblDotLocalConfig = {
  getHttpDblDotLocalBaseUrl
};

function getHttpDblDotLocalBaseUrl() {
  // console.log(`env.HTTP_DBL_DOT_LOCAL_FLASK_API: ${process.env.HTTP_DBL_DOT_LOCAL_FLASK_API}`);
  // console.log(window.require('electron').remote.process.argv);
  // ["C:\Users\...\Nathanael.exe", "--http-dbl-dot-local-flask-api=http://127.0.0.1:8080"]
  return process.env.HTTP_DBL_DOT_LOCAL_FLASK_API;
}

export default dblDotLocalConfig;

