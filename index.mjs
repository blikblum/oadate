const defaultOffset = new Date().getTimezoneOffset()

// code below extracted from https://github.com/markitondemand/moment-msdate
const MINUTE_MILLISECONDS = 60 * 1000
const DAY_MILLISECONDS = 86400000
const MS_DAY_OFFSET = 25569

/**
 * @param {number} oaDate
 * @return {number}
 */
function oaDateToTicks(oaDate) {
  var ticks = (oaDate - MS_DAY_OFFSET) * DAY_MILLISECONDS
  if (oaDate < 0) {
    const frac = (oaDate - Math.trunc(oaDate)) * DAY_MILLISECONDS
    if (frac !== 0) {
      ticks -= frac * 2
    }
  }
  return ticks
}

/**
 * @param {number} ticks
 * @return {number}
 */
function ticksToOADate(ticks) {
  var oad = ticks / DAY_MILLISECONDS + MS_DAY_OFFSET
  if (oad < 0) {
    const frac = oad - Math.trunc(oad)
    if (frac !== 0) {
      oad = Math.ceil(oad) - frac - 2
    }
  }
  return oad
}

/**
 * @export
 * @param {Date} value
 * @param {number} [offset=defaultOffset]
 * @return {number}
 */
export function DateToOADate(value, offset = defaultOffset) {
  return ticksToOADate(value.valueOf() - offset * MINUTE_MILLISECONDS)
}

/**
 * @export
 * @param {number} value
 * @param {number} [offset=defaultOffset]
 * @return {Date}
 */
export function OADateToDate(value, offset = defaultOffset) {
  const ticks = oaDateToTicks(value)
  return new Date(ticks + offset * MINUTE_MILLISECONDS)
}

export class TDateTime extends Date {
  constructor(...args) {
    if (args.length === 1 && typeof args[0] === 'number') {
      super(OADateToDate(args[0]))
    } else {
      super(...args)
    }
  }

  toJSON() {
    return this.prepareOADate(DateToOADate(this))
  }

  prepareOADate(value) {
    return value
  }
}

export class TDate extends TDateTime {
  prepareOADate(value) {
    return Math.trunc(value)
  }
}

export class TTime extends TDateTime {
  prepareOADate(value) {
    return Math.abs(value % 1)
  }
}
