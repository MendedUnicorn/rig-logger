import { DateTime } from 'luxon';
import { countEachOccurence, findTopBottomX } from '../helpers/calculate';
import { tripLength as trip } from '../helpers/formatting';

export const selectTripsWithDaysMoreLessEqualToX =
  (days, evaluator) => (state) => {
    return state.trips.filter((trip) => {
      return eval(
        'tripLength(trip.dateFrom, trip.dateTo)' + evaluator + 'days'
      );
    });
  };

export const selectTotalAmountOfTrips = (state) => {
  return state.trips.length;
};

export const selectTripsSortedBy =
  (sortBy, filterText = '', startDate, endDate) =>
  (state) => {
    return [...state.trips]
      .filter((trip) => {
        console.log(
          'compare',
          DateTime.fromISO(startDate),
          'startdata',
          startDate,
          'tripdate:',
          trip.dateFrom
        );
        const startDateMatch = startDate
          ? DateTime.fromISO(startDate) < DateTime.fromISO(trip.dateFrom)
          : true;
        const endDateMatch = endDate
          ? DateTime.fromISO(endDate) > DateTime.fromISO(trip.dateTo)
          : true;
        let textMatch;

        if (filterText) {
          const tripValues = Object.values(trip);
          for (let i = 0; i < tripValues.length; i++) {
            if (typeof tripValues[i] !== 'object') {
              if (
                tripValues[i].toLowerCase().includes(filterText.toLowerCase())
              ) {
                textMatch = true;
              }
            }
          }
          return startDateMatch && endDateMatch && textMatch;
        } else return startDateMatch && endDateMatch;
      })

      .sort((a, b) => {
        if (sortBy === 'date') {
          return DateTime.fromISO(a.dateFrom).toMillis() <
            DateTime.fromISO(b.dateFrom).toMillis()
            ? 1
            : -1;
        } else if (sortBy === 'length') {
          return DateTime.fromISO(a.dateTo).diff(DateTime.fromISO(a.dateFrom)) >
            DateTime.fromISO(b.dateTo).diff(DateTime.fromISO(b.dateFrom))
            ? 1
            : -1;
        } else if (sortBy === 'rig') {
          return a.rig > b.rig ? 1 : -1;
        }
      });
  };

export const getTripById = (id) => (state) => {
  return state.trips.filter((trip) => {
    return trip.id === id;
  })[0];
};

export const selectTopBottomColleague = (rank) => (state) => {
  const workedWith = [];
  state.trips.forEach((trip) => {
    if (trip.colleagues) {
      trip.colleagues.map((colleague) => {
        workedWith.push(colleague.name);
      });
    }
  });
  return findTopBottomX(countEachOccurence(workedWith), rank);
};
// retunrs a ranked array with objects containing name and amount of that name
export const selectTopBottomXofY = (category, rank) => (state) => {
  return findTopBottomX(
    countEachOccurence(
      state.trips
        .filter((trip) => trip[category])
        .map((trip) => {
          return trip[category];
        })
    ),
    rank
  );
};

// return trips that has days falling between interval
export const selectBetweenDates = (start, end) => (state) => {
  const formatStart = DateTime.fromISO(start);
  const formatEnd = DateTime.fromISO(end);

  return state.trips.filter((trip) => {
    const formatTripStart = DateTime.fromISO(trip.dateFrom);
    const formatTripEnd = DateTime.fromISO(trip.dateTo);
    if ((trip.dateFrom === '') | (trip.dateTo === '')) {
      return;
    }
    if (formatTripStart > formatEnd || formatTripEnd < formatStart) {
      return;
    }
    return trip;
  });
};

// 1. create empty dataset based on input dates- 1-jan 2021 - 23 march 2022 = [{x: jan, y: nr days}, {x: feb, y: nr days} ...]
export const selectCreateDataset = (start, end) => (state) => {
  const formatStart = DateTime.fromISO(start);
  const formatEnd = DateTime.fromISO(end);
  // Filter out data to create an array of only trips that has any number of days in the range
  const tripsWithinRange = state.trips.filter((trip) => {
    const tripStart = DateTime.fromISO(trip.dateFrom);
    const tripEnd = DateTime.fromISO(trip.dateTo);
    if ((trip.dateFrom === '') | (trip.dateTo === '')) {
      return;
    }
    if (tripStart > formatEnd || tripEnd < formatStart) {
      return;
    }
    return trip;
  });

  // create array of dataset with all months
  const res = [];
  const difference = formatEnd.diff(formatStart, 'months').toObject().months;
  let year = formatStart.year;
  for (let i = 0; i < difference; i++) {
    // create something that adds to year when  i > 12
    res[i] = {
      x: formatStart.startOf('month').plus({ month: i }).toISO(),
      y: 0,
    };
  }
  tripsWithinRange.map((trip) => {
    const tripStart = DateTime.fromISO(trip.dateFrom);
    const tripEnd = DateTime.fromISO(trip.dateTo);
    // compare moth of start and end date - if same, jsut count the days, if different spread days on months
    // console.log(tripStart.month, tripEnd.month);

    if (tripStart.month === tripEnd.month) {
      // fix issue here - not going to above 12 montjhs, just stacs between 1 and 12
      res.forEach((d) => {
        if (d.x === tripStart.startOf('month').toISO()) {
          d.y = d.y + tripEnd.diff(tripStart, 'days').days + 1; // remove +1 or not? check data manually
          // console.log('days', d.y);
        }
      });
    } else {
      // divide up the days to correct month
      res.forEach((d) => {
        if (d.x === tripStart.startOf('month').toISO()) {
          d.y = d.y + tripStart.endOf('month').day - tripStart.day + 1;
        }
        if (d.x === tripEnd.startOf('month').toISO()) {
          d.y = d.y + (tripEnd.day - tripEnd.startOf('month').day) + 1;
        }
      });
    }
  });
  return res;
};
