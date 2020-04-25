import { LOG } from "./logger";

export enum ErrorType {
    SystemError,
    IOError,
    BusinessError,
    Retry
}

export class ErrorHandler {
    constructor() {

    }

    static createDBErrorStr(errorMsg: string, dbError: any) {
        return errorMsg + ' : ' + (dbError.message ? dbError.message : '');
    }

    static sendError(res: any, errorType: ErrorType, errorString: string, logError?: string) {
        if (logError) {
            LOG.error(logError);
        }

        switch (errorType) {
            case ErrorType.BusinessError:
                res.status(200).send({error: errorString});
                break;
            case ErrorType.Retry:
                res.status(552).send({error: errorString});
                break;
            case ErrorType.IOError:
                res.status(500).send(errorString);
                break;
            case ErrorType.SystemError:
            default:
                res.status(500).send(errorString);
                break;
            
        }
    }
}