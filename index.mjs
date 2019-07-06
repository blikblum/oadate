let epoch = new Date(1899, 11, 30)
const msPerDay = 8.64e7

export function DateToOADate(value) {
  let result = (-1 * (epoch - value)) / msPerDay

  // Deal with dates prior to 1899-12-30 00:00:00
  const dec = result - Math.floor(result)

  if (result < 0 && dec) {
    result = Math.floor(result) - dec
  }

  return result
}

export function OADateToDate(value) {
  // Deal with -ve values
  const dec = value - Math.floor(value)

  if (value < 0 && dec) {
    value = Math.floor(value) - dec
  }

  return new Date(value * msPerDay + +epoch)
}

export class TDateTime extends Date {
  constructor(...args) {
    if (args.length === 1 && typeof args[0] === "number") {
      super(OADateToDate(this.prepareOADate(args[0])))
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
