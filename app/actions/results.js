import {
  SET_RESULTS_CONTENT,
  SET_JOB_STATUS,
  SET_CURRENT_STEP,
  SET_IS_CONNECTED,
  SET_IS_CONNECTING,
  SET_IS_SUBMITTED,
  SET_IS_SUBMITTING,
  SET_IS_RETRIEVED,
  SET_IS_RETRIEVING,
  SET_IS_DISCONNECTED,
  SET_IS_DISCONNECTING
} from '../constants';

export const setResultsContent = resultsContent => ({
  type: SET_RESULTS_CONTENT,
  resultsContent
});

export const setJobStatus = jobStatus => ({
  type: SET_JOB_STATUS,
  jobStatus
});

export const setCurrentStep = currentStep => ({
  type: SET_CURRENT_STEP,
  currentStep
});

export const setIsConnected = isConnected => ({
  type: SET_IS_CONNECTED,
  isConnected
});

export const setIsConnecting = isConnecting => ({
  type: SET_IS_CONNECTING,
  isConnecting
});
export const setIsSubmitted = isSubmitted => ({
  type: SET_IS_SUBMITTED,
  isSubmitted
});
export const setIsSubmitting = isSubmitting => ({
  type: SET_IS_SUBMITTING,
  isSubmitting
});
export const setIsRetrieved = isRetrieved => ({
  type: SET_IS_RETRIEVED,
  isRetrieved
});
export const setIsRetrieving = isRetrieving => ({
  type: SET_IS_RETRIEVING,
  isRetrieving
});
export const setIsDisconnected = isDisconnected => ({
  type: SET_IS_DISCONNECTED,
  isDisconnected
});
export const setIsDisconnecting = isDisconnecting => ({
  type: SET_IS_DISCONNECTING,
  isDisconnecting
});