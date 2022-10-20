import { useState } from "react"

import "../index.css"

const FormDisplay = ({ submitHandler }: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchTerm, setSearchTerm] = useState("")

  // const handleChange = (e: any) => {
  //   e.preventDefault()
  //   setSearchTerm(e.target.value)
  // }

  return (
    <div className="app-container">
      <div className="app-title">Generic Code Challenge 02</div>
      <div className="app-panel">
        <form onSubmit={submitHandler}>
          <div
            className="app-input"
            role="presentation"
            aria-label="searchTerm"
          >
            This app receives a solar production estimate for 52° north, 12°
            east, <br />
            for an installation with a declination of 37° looking south (0°)
            with 5.67 kWp.
          </div>
          <div className="app-input">
            <button type="submit" name="search-button" className="btn-app">
              Get Estimate
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormDisplay
