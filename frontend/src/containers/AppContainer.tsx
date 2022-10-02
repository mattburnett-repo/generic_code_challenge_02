import { useState } from "react";
import axios from "axios";

import FormDisplay from "../display/FormDisplay";
import ResponseDisplay from "../display/ResponseDisplay";

import { RiskAssessment, ApiError } from "../../../types";

const AppContainer = () => {
  const [theData, setTheData] = useState<RiskAssessment | ApiError | null>();

  const handleSubmitClick = async (e: any) => {
    e.preventDefault();

    try {
      let result = await axios({
        method: "post",
        url: "http://localhost:4000",
        // FIXME: url: process.env.REACT_APP_BACKEND_URL,
        data: {
          domainName: e.target.searchTerm.value,
        },
      });

      setTheData(result.data);
    } catch (err: any) {
      setTheData(null);
      alert(
        "There was an error: " +
          err.message +
          ".\nMaybe an invalid search term."
      );
      console.log(err);
    }
  };

  return (
    <div className="App">
      <FormDisplay submitHandler={handleSubmitClick} />
      {theData && <ResponseDisplay theData={theData} />}
    </div>
  );
};

export default AppContainer;
