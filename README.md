# oadate

Convert between native JS Date and OA Date (OLE Automation Date)

## Usage

```js
import { OADateToDate, DateToOADate } from '../index.mjs'

OADateToDate(44324) // converts OA Date to JS Date using local timezone offset
OADateToDate(44324, 0) // pass 0 to convert to UTC
OADateToDate(44324, 180) // or any offset in minutes

DateToOADate(new Date()) // converts JS Date to OA Date using local timezone offset
DateToOADate(new Date(), 0) // pass 0 to convert from UTC
DateToOADate(new Date(), 180) // or any offset in minutes
```

## Credits

LICENSE - MIT
2021 - Luiz Américo
Uses code from https://github.com/markitondemand/moment-msdate
