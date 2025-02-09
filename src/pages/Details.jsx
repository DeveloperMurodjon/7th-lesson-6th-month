import React from "react";
import { useParams } from "react-router-dom";

function Details() {
  const params = useParams();
  console.log("params", params);

  return <div>Deatils</div>;
}

export default Details;
