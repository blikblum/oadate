import { expect } from 'chai'
import { OADateToDate, DateToOADate } from '../index.js'

describe('OADateToDate', () => {
  it('should convert OA Date to JS Date using an offset in minutes', () => {
    // pass 0 to get UTC date
    expect(OADateToDate(0, 0).toISOString()).to.equal('1899-12-30T00:00:00.000Z')
    expect(OADateToDate(44324.61254490740975598, 0).toISOString()).to.equal(
      '2021-05-08T14:42:03.880Z'
    )
    // GMT-300
    expect(OADateToDate(44324, 180).toISOString()).to.equal('2021-05-08T03:00:00.000Z')
    expect(OADateToDate(44324.61254490740975598, 180).toISOString()).to.equal(
      '2021-05-08T17:42:03.880Z'
    )
    expect(OADateToDate(44324.61254490740975598, 180).getHours()).to.equal(14)
  })

  it('should use local timezone offset as default offset', () => {
    expect(OADateToDate(44324).toISOString()).to.equal('2021-05-08T03:00:00.000Z')
    expect(OADateToDate(44324.61254490740975598).toISOString()).to.equal('2021-05-08T17:42:03.880Z')
    expect(OADateToDate(44324).toISOString()).to.equal(
      OADateToDate(44324, new Date().getTimezoneOffset()).toISOString()
    )
    expect(OADateToDate(44324.61254490740975598).toISOString()).to.equal(
      OADateToDate(44324.61254490740975598, new Date().getTimezoneOffset()).toISOString()
    )
    expect(OADateToDate(44324.61254490740975598, 180).getHours()).to.equal(14)
  })
})

describe('DateToOADate', () => {
  it('should convert JS Date to OA Date using an offset in minutes', () => {
    const date = new Date(Date.UTC(2021, 4, 8))

    // pass 0 to convert from UTC
    expect(DateToOADate(date, 0)).to.equal(44324)
    // GMT-300
    expect(DateToOADate(date, 180)).to.equal(44323.875)

    date.setHours(3)
    expect(DateToOADate(date, 0)).to.equal(44323.25)
    expect(DateToOADate(date, 180)).to.equal(44323.125)

    date.setHours(6)
    expect(DateToOADate(date, 0)).to.equal(44323.375)
    expect(DateToOADate(date, 180)).to.equal(44323.25)
  })

  it('should use local timezone offset as default offset', () => {
    const date = new Date(2021, 4, 8)
    expect(DateToOADate(date)).to.equal(44324)
  })
})

describe('DateToOADate and OADateToDate', () => {
  it('should keep same value when converting back', () => {
    const date = new Date(2021, 4, 8)

    expect(OADateToDate(DateToOADate(date)).valueOf()).to.equal(date.valueOf())
    expect(OADateToDate(DateToOADate(date, 0), 0).valueOf()).to.equal(date.valueOf())

    expect(DateToOADate(OADateToDate(44324))).to.equal(44324)
    expect(DateToOADate(OADateToDate(44324, 0), 0)).to.equal(44324)

    expect(DateToOADate(OADateToDate(44324.125))).to.equal(44324.125)
    expect(DateToOADate(OADateToDate(44324.125, 0), 0)).to.equal(44324.125)
  })
})
