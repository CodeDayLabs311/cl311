/** Error messages */
export const INTERNAL_SERVER_ERROR = 'Internal Server Error';
export const METHOD_NOT_ALLOWED = 'Method Not Allowed';
export const BAD_REQUEST = 'Bad Request';
export const NOT_FOUND = 'Not Found';
export const INVALID_PAGINATION_TOKEN = 'Invalid Pagination Token';

/** Invalid requests */
export const MULTIPLE_IDS = 'Invalid Request: Multiple "ID" Parameters Are Not Allowed.';
export const MISSING_ID = 'Invalid Request: "ID" Parameter Is Required And Should Be A Non-empty String.';
export const MISSING_REQUEST_BODY = 'Invalid Request: Request Body Is Missing Or Not An Object.';
export const MISSING_REPORT_ID = 'Invalid Request: "reportId" Field Is Required In The Request Body.';

/** Invalid report data */
export const INVALID_REPORT_DATA = 'Invalid Report Data. Required Fields Are Missing.';