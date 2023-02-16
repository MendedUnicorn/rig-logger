import { DateTime } from 'luxon';

const onshore = {
  BGO: 'Bergen',
  SVG: 'Stavanger',
  KSU: 'Kristiansund',
  HFT: 'Hammerfest',
  FRO: 'Florø',
};

const offshore = {
  WPH: 'West Phoenix',
  DSY: 'Deepsea Yantai',
  ROV: 'Rowan Viking',
  DSA: 'Deepsea Atlantic',
  STC: 'Statfjord C',
  LER: 'Leiv Eiriksson',
  GFA: 'Gullfaks A',
  DEE: 'Songa Dee',
  GFC: 'Gullfaks C',
  STB: 'Statfjord B',
  WEL: 'West Elara',
  GFB: 'Gullfaks B',
  WAL: 'West Alpha',
  KVB: 'Kvitebjørn',
  BID: 'Biedeford Dolphin',
  SNO: 'Snorre A',
  DSB: 'Deepsea Bergen',
  WHE: 'West Hercules',
  MIT: 'Maersk Interceptor',
  VIS: 'Visund',
  WBO: 'West Bollsta',
  NIG: 'Noble Integrator',
  SCO: 'Scarabeo 8',
  DAB: 'Deepsea Aberdeen',
  BRA: 'Brage',
  NIV: 'Noble Invincible',
  ENA: 'Transocean Enabler',
  ISIN: 'Island Innovator',
  TNG: 'Transocean Norge',
};

export const processCSV = (str, delim = ',') => {
  const headers = str.slice(0, str.indexOf('\n')).split(delim);
  const rows = str.slice(str.indexOf('\r\n') + 1).split('\r\n');
  console.log(rows);
  const rowsReversed = [...rows].reverse();
  let currentTrip = {};
  const trips = [];
  rowsReversed.map((row, i) => {
    const values = row.split(delim);
    if (Object.keys(onshore).includes(values[5])) {
      //means its a new offshore trip - create new object
      currentTrip = {
        rig: offshore[values[6]],
        heliport: values[5],
        dateFrom: DateTime.fromFormat(values[1], 'dd.LL.yyyy').toISO(),
        heliTimesToRig: { takeoff: values[2], landing: values[3] },
      };
    }
    if (Object.keys(onshore).includes(values[6])) {
      // means its a trip going home and the current trip can be finished and pushed
      currentTrip = {
        ...currentTrip,
        heliTimesToHome: {
          takeoff: values[2],
          landing: values[3],
        },
        dateTo: DateTime.fromFormat(values[1], 'dd.LL.yyyy').toISO(),
      };
      trips.push(currentTrip);
      currentTrip = {};
    }

    // console.log({
    //   from: values[1],
    //   to: values[2],
    //   fromPlace: values[5],
    //   toPlace: values[6],
    // });
  });

  console.log('trips', trips);
  return trips;
};
