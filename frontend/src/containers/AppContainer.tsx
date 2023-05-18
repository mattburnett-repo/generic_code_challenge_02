import {useState} from 'react'
import axios from 'axios'

import FormDisplay from '../display/FormDisplay'
import ResponseDisplay from '../display/ResponseDisplay'

import {Estimate} from '../../../types'

const AppContainer = () => {
  const [theData, setTheData] = useState<Estimate | null>()

  const handleSubmitClick = async (e: any) => {
    e.preventDefault()

    try {
      // TODO: axios returns <any, any> instead of Estimate | ApiError, etc.
      //    find a way to better type the axios response
      let res = await axios({
        method: 'post',
        url: process.env.REACT_APP_BACKEND_URL
      })

      setTheData(res.data)
    } catch (err: unknown) {
      // Catch clause variable type annotation must be 'any' or 'unknown' if specified.

      // TODO: figure out how to intercept error messages sent to Axios,
      //    instead of handling a generic Axios error message.
      //    'err' is a generic Axios error message. Right now there is nothing more
      //      to provide to error-handling.
      alert(
        'There was an error.\n\nUsually this means that the server is down, or there are too mamy requests within one hour.  Sometimes there is more information in the developer console.\n\nError in AppContainer.tsx handleSubmitClick:\n\n' +
          err
      )
      console.log(err)
    }
  }

  return (
    <div className='App'>
      <FormDisplay submitHandler={handleSubmitClick} />
      {theData && <ResponseDisplay theData={theData} />}
    </div>
  )
}

export default AppContainer
