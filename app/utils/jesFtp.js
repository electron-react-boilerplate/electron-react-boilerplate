import { store } from '../index';

const PromiseFtp = require('promise-ftp');
import { setCurrentStep, setIsConnected, setIsSubmitted, setIsRetrieved, setIsDisconnected } from '../actions/results';
import { refreshJobs } from '../actions/jobs';

class JES {
  constructor() {
    this.ftp = new PromiseFtp();
    this.connectionStatus = '';
    //bind all the things here
    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.setFiletype = this.setFiletype.bind(this);
    this.setEncoding = this.setEncoding.bind(this);
    this.pollJobStatus = this.pollJobStatus.bind(this);
    this.deleteJob = this.deleteJob.bind(this);
    this.errorLookup = this.errorLookup.bind(this);
    this._sleep = this._sleep.bind(this);
  }

  // Connects and then sets filetype to jes
  connect() {
    this.ftp.connect({
      host: store.getState().config.hostName,
      port: store.getState().config.ftpPort,
      user: store.getState().config.ftpUserName,
      password: store.getState().config.ftpPassword
    })
      .then((msg) => {
        console.log(msg);
        this.connectionStatus = this.ftp.getConnectionStatus();
        if (this.connectionStatus === 'connected') {
          console.log("connected");
          store.dispatch(setCurrentStep(''));
          store.dispatch(setIsConnected(true));
        }
      })
      .then((msg) => {
        return this.setEncoding('ascii');
      })
      .then((msg) => {
        return this.setFiletype('jes');
      })
      .catch(err => this.errorLookup(err))
  }

  async disconnect() {
    this.connectionStatus = this.ftp.getConnectionStatus();
    console.log("Attempting to disconnect");
    this.ftp.end()
      .then((msg) => {
        console.log(msg);
      })
      .catch(err => errorLookup(err))
    // .then(async () => {
    this.connectionStatus = this.ftp.getConnectionStatus();
    console.log("Connection Status: ", this.connectionStatus);
    if (this.connectionStatus === 'disconnecting') {
      store.dispatch(setCurrentStep('disconnecting'));
    }
    let numTries = 10;
    while (this.connectionStatus === 'disconnecting' && numTries > 0) {
      await this._sleep(2000);
      this.connectionStatus = this.ftp.getConnectionStatus();
      console.log("Connection Status: ", this.connectionStatus);
      numTries--
    }
    if (numTries == 0) {
      console.log("Failed to gracefully disconnect from the server, so forcing destroy");
      this.ftp.destroy()
      this.connectionStatus = this.ftp.getConnectionStatus();
      console.log("Connection Status: ", this.connectionStatus);
    }
    store.dispatch(setCurrentStep(''));
    // Clear all indicators
    store.dispatch(setIsConnected(false));
    store.dispatch(setIsSubmitted(false));
    store.dispatch(setIsRetrieved(false));
    store.dispatch(setIsDisconnected(false));
  }

  setFiletype(filetype) {
    let acceptableFileTypes = ['jes'];
    if (acceptableFileTypes.includes(filetype)) {
      // if (store.getState().isConnected === false) this.connect();
      return this.ftp.site('FILETYPE=' + filetype)
        .then((resultsObj) => {
          console.log("Server responded to FILETYPE=jes with " + resultsObj.code + ' ' + resultsObj.text);
        })
        .catch(err => this.errorLookup(err))
    }
  }

  setEncoding(type) {
    let acceptableFileTypes = ['ascii'];
    if (acceptableFileTypes.includes(type)) {
      switch (type) {
        case 'ascii':
          return this.ftp.ascii()
            .then(res => {
              console.log(res);
              console.log(JSON.stringify(res));
            })
          break;
        default:
          return
      }
    }
  }

  pollJobStatus() {
    console.log("really polling");
    return this.ftp.list('')
      .then(results => {
        console.log("Checking results of list: ", results);
        if (!results || results.length === 0) {
          throw new Error("No jobs found on JES Queue. Did you forget to name your JCL job using your FTP username?");
        }
        let jobs = {}
        results.forEach((job) => {
          let jobSplit = job.trim().split(/\ +/);
          let jobID = jobSplit[1];
          jobs[jobID] = {
            owner: jobSplit[0],
            status: jobSplit[2],
            numberOfSpoolFiles: job.includes('Spool Files') ? jobSplit[3] : null,
            fullString: job.trim()
          };
        });
        store.dispatch(refreshJobs(jobs));
      })
      .catch(err => this.errorLookup(err));
  }

  errorLookup(err) {
    console.log("BUG DETECTED");
    console.log("Connection: ", this.ftp.getConnectionStatus());
    if (err.code) {
      switch (err.code) {
        case 451:
          alert("File Error. Do you have a valid file open in the editor?");
          console.log(err);
          break;
        case 550:
          alert("Permission Denied (or No such file or folder):\n", err.toString());
          console.log(err);
          break;
        case "Error: PASS command failed(…)":
          alert("What is a PASS command?");
          break;
        default:
          console.log("|", err, "|");
          // console.log(err.parse(':'));
          alert(JSON.stringify(err));
      }
    } else {
      console.log(err.toString());
      console.log("Just in Case: ", JSON.stringify(err));
    }
  }

  async deleteJob(jobID) {
    console.log('Attempted to delete "' + jobID + '"');
    try {
      console.log("Start of try block");
      let res = await this.ftp.delete(jobID);
      console.log("JOB RESULTS: ", res);
      console.log("JOB RESULTS: ", res.toString);
      return res
    }
    catch (e) {
      console.log("ERR", e)
    }
  }

  _sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

const jes = new JES();
export default jes;

// accepts 'jes'




