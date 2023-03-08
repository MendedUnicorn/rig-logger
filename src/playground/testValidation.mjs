import { checkTripOverlap } from "../helpers/dateValidation.js";

const trips = [
  {
    dateFrom: "2020-03-31T00:00:00.000+02:00",
    dateTo: "2020-04-13T00:00:00.000+02:00",
    heliTimesToRig: {
      landing: "10:09",
      takeoff: "09:51",
    },
    rig: "Deepsea Yantai",
    heliTimesToHome: {
      landing: "18:40",
      takeoff: "18:23",
    },
    heliport: "FRO",
    id: "0thMSeA82sXXaAdowxtY",
  },
  {
    dateFrom: "2015-08-14T00:00:00.000+02:00",
    heliTimesToRig: {
      takeoff: "13:31",
      landing: "14:30",
    },
    heliTimesToHome: {
      landing: "15:52",
      takeoff: "14:32",
    },
    dateTo: "2015-08-21T00:00:00.000+02:00",
    rig: "Statfjord B",
    heliport: "BGO",
    id: "1DddXrOnxdk2N005zb7B",
  },
];

const newTrip = {
  dateFrom: "2020-03-20",
  dateTo: "2020-03-30",
};

checkTripOverlap(newTrip, trips);
