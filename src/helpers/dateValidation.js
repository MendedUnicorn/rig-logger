import { DateTime } from "luxon";

// checks that there is no existing trip within those dates -- check redux store instead of making request to DB
export const checkTripOverlap = (newTrip, oldTrips) => {
  const newTripStartDate = DateTime.fromISO(newTrip.dateFrom);
  const newTripEndDate = DateTime.fromISO(newTrip.dateTo);
  //check that end date of new trip is before any existing trip start date & that start date of new trip is after any existing end date
  let res = false;

  for (let i = 0; i < oldTrips.length; i++) {
    const oldTripStartDate = DateTime.fromISO(oldTrips[i].dateFrom);
    const oldTripEndDate = DateTime.fromISO(oldTrips[i].dateTo);
    if (
      newTripStartDate.hasSame(oldTripStartDate, "day") &&
      newTripEndDate.hasSame(oldTripEndDate, "day")
    ) {
      console.log("same trip already exists");
      return true;
    }
    if (newTripStartDate < oldTripEndDate && newTripEndDate > oldTripEndDate) {
      console.log("first");
      return true;
    }
    if (
      newTripStartDate < oldTripStartDate &&
      newTripEndDate > oldTripStartDate
    ) {
      console.log("second");

      return true;
    }
    if (
      newTripStartDate > oldTripStartDate &&
      newTripEndDate < oldTripEndDate
    ) {
      console.log("third");

      return true;
    }
  }
  return false;
};

// const trips = [
//   {
//     dateFrom: "2020-03-31T00:00:00.000+02:00",
//     dateTo: "2020-04-13T00:00:00.000+02:00",
//     heliTimesToRig: {
//       landing: "10:09",
//       takeoff: "09:51",
//     },
//     rig: "Deepsea Yantai",
//     heliTimesToHome: {
//       landing: "18:40",
//       takeoff: "18:23",
//     },
//     heliport: "FRO",
//     id: "0thMSeA82sXXaAdowxtY",
//   },
//   // {
//   //   dateFrom: "2015-08-14T00:00:00.000+02:00",
//   //   heliTimesToRig: {
//   //     takeoff: "13:31",
//   //     landing: "14:30",
//   //   },
//   //   heliTimesToHome: {
//   //     landing: "15:52",
//   //     takeoff: "14:32",
//   //   },
//   //   dateTo: "2015-08-21T00:00:00.000+02:00",
//   //   rig: "Statfjord B",
//   //   heliport: "BGO",
//   //   id: "1DddXrOnxdk2N005zb7B",
//   // },
// ];

// const newTrip = {
//   dateFrom: "2020-04-16",
//   dateTo: "2020-04-20",
// };

// console.log(checkTripOverlap(newTrip, trips));
