import React, { Component } from 'react';
import brace from 'brace';
import 'brace/mode/java';
import 'brace/theme/github';
import 'brace/theme/twilight';
import Editor from 'react-ace';

export default (props) => (
  <div>
    <Text padding="20px" color={props.theme === 'dark' ? "white" : "black"} >Job ID: {props.job.jobID}</Text>
    <Text padding="20px" color={props.theme === 'dark' ? "white" : "black"} >Owner: {props.job.owner}</Text>
    <Text padding="20px" color={props.theme === 'dark' ? "white" : "black"} >Status: {props.job.status}</Text>
    <Text padding="20px" color={props.theme === 'dark' ? "white" : "black"} ># Files: {props.job.numberOfSpoolFiles}</Text>
    <Button push color='red' onClick={() => props.deleteJob(props.job.jobID)} >Delete</Button>
    <Button push color='green' onClick={() => props.retrieveJob(props.job.jobID)}> Download </Button>
  </div>
)