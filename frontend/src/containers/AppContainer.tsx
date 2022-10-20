import { useState } from "react"
import axios from "axios"

import FormDisplay from "../display/FormDisplay"
import ResponseDisplay from "../display/ResponseDisplay"

import { Estimate, ApiError } from "../../../types"

const AppContainer = () => {
  const [theData, setTheData] = useState<Estimate | ApiError | null>()

  const handleSubmitClick = async (e: any) => {
    e.preventDefault()

    try {
      let result = await axios({
        method: "post",
        url: process.env.REACT_APP_BACKEND_URL,
      })

      setTheData(result.data)
    } catch (err: any) {
      // Catch clause variable type annotation must be 'any' or 'unknown' if specified.

      // TODO: figure out how to intercept error messages sent to Axios,
      //    instead of handling a generic Axios error message.
      setTheData(null)
      alert(
        "There was an error.\n\nUsually this means that the server is down, or there are too mamy requests within one hour."
      )
      // console.log(err)
    }
  }

  return (
    <div className="App">
      <FormDisplay submitHandler={handleSubmitClick} />
      {theData && <ResponseDisplay theData={theData} />}
    </div>
  )
}

export default AppContainer
