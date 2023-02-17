// const DateTime = require('luxon');
import { DateTime } from 'luxon';

const time = DateTime.fromFormat('24.11.2023', 'dd.LL.yyyy');

const dt = new DateTime(Date.now());

console.log(time);

console.log(DateTime.fromISO('2021-11-01'));
