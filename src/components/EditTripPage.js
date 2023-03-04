import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import TripFormV2 from "./TripFormV2";
import { getTripById } from "../selectors/tripSelectors";

const EditTripPage = () => {
  const { id } = useParams();

  const data = useSelector(getTripById(id));

  return (
    <div>
      <TripFormV2 trip={data} />
    </div>
  );
};

export default EditTripPage;
