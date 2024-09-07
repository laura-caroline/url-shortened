export declare class ErrorResponse {
    statusCode: number;
    timestamp: string;
    path: string;
    messages: string[];
}
export declare class BadRequestResponse extends ErrorResponse {
}
export declare class ConflictResponse extends ErrorResponse {
}
export declare class NotFoundResponse extends ErrorResponse {
}
export declare class InternalServerErrorResponse extends ErrorResponse {
}
