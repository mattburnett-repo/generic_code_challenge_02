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
      setTheData(null)
      alert(
        "There was an error: " +
          err.message +
          ".\nMaybe the backend isn't running."
      )
      console.log(err)
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
