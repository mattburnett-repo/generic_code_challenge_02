import '../index.css'

import ResponsePanelDisplay from './ResponsePanelDisplay'

import {Estimate} from '../../../types'

const ResponseDisplay = ({theData}: {theData: Estimate}) => {
  return (
    <div className='app-container'>
      <div className='app-title'>Photovoltaic Production Estimate</div>
      <div className='app-info'>
        {theData.message.ratelimit.limit} API calls per hour are allowed.
      </div>
      <div className='app-info'>
        There are {theData.message.ratelimit.remaining} remaining.
      </div>
      {/* FIXME: This is props drilling and should be avoided. */}
      <ResponsePanelDisplay theData={theData} />
    </div>
  )
}

export default ResponseDisplay
