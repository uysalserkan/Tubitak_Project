export interface MessageResponse {
    messageResponseType: MessageType;
    message: string
}

export enum MessageType {
    SUCCESS = "SUCCESS", INFO = "INFO", WARNING = "WARNING", ERROR = "ERROR"
}
