/**
 * Frequently components dont care what a callbacks response is. That is what this is typed to support -
 * a callback the the component cannot use the value of, but it can be anything
 */
export type UnopinionatedResponseType = Promise<any> | void;
