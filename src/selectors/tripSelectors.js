import { countEachOccurence, findTopBottomX } from '../helpers/calculate';
import { tripLength as trip } from '../helpers/formatting';

const tripLength = trip;

export const selectTripsWithDays = (days, evaluator) => (state) => {
  return state.trips.filter((trip) => {
    return eval('tripLength(trip.dateFrom, trip.dateTo)' + evaluator + 'days');
  });
};

export const selectNumberOfTrips = (state) => {
  return state.trips.length;
};

export const getTripById = (id) => (state) => {
  return state.trips.filter((trip) => {
    return trip.id === id;
  })[0];
};

// export const selectTopXOfY = (x, y) => (state) => {
//   const number = x;
//   const category = y;
//   let toBeChecked = state?.trips[0][category];
//   if (typeof toBeChecked === 'object') {
//     const res = [];
//     state?.trips.forEach((trip) => {
//       trip[category]?.forEach((thing) => res.push(thing.name));
//     });
//     console.log('ress', res);
//     return res;
//   }
//   return findTopBottomX(
//     countEachOccurence(
//       state.trips.map((trip) => {
//         return trip[y];
//       })
//     ),
//     x
//   );
// };
export const selectTopBottomColleague = (rank) => (state) => {
  const workedWith = [];
  state.trips.forEach((trip) => {
    console.log(trip);
    if (trip.colleagues) {
      trip.colleagues.map((colleague) => {
        console.log(colleague.name);
        workedWith.push(colleague.name);
      });
    }
  });
  return workedWith;
};
