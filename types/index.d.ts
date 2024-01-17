/**
 * @export
 * @param {Date} value
 * @param {number} [offset=defaultOffset]
 * @return {number}
 */
export function DateToOADate(value: Date, offset?: number): number;
/**
 * @export
 * @param {number} value
 * @param {number} [offset=defaultOffset]
 * @return {Date}
 */
export function OADateToDate(value: number, offset?: number): Date;
export class TDateTime extends Date {
    constructor(...args: any[]);
    toJSON(): any;
    prepareOADate(value: any): any;
}
export class TDate extends TDateTime {
    prepareOADate(value: any): number;
}
export class TTime extends TDateTime {
    prepareOADate(value: any): number;
}
//# sourceMappingURL=index.d.ts.map