// const DateTime = require('luxon');
import { DateTime } from "luxon";

// const time = DateTime.fromFormat("24.11.2023", "dd.LL.yyyy");

// const dt = new DateTime(Date.now());

// console.log(time);

// console.log(DateTime.fromISO("2021-11-01"));

const date1 = DateTime.fromISO("2022-02-12");

console.log(
  "check if same",
  date1.hasSame(DateTime.fromISO("2022-01-12"), "day")
);
