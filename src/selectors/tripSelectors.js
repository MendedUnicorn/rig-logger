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
