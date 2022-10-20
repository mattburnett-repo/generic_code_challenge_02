import ResponseDetailsDisplay from "./ResponseDetailsDisplay"

// FIXME: Correctly type { theData } prop, and not as not 'any'
const ResponsePanelDisplay = ({ theData }: { theData: any }) => {
  return (
    <div className="app-panel">
      {/* TODO: get this to work with ResponseDetailsDisplay component */}
      <details>
        <summary className="app-panel-label; font-weight-700">Place</summary>
        <p className="indent-20-px">{theData.message.info.place}</p>
      </details>
      <ResponseDetailsDisplay theLabel="Watts" theData={theData.watts} />
      <ResponseDetailsDisplay
        theLabel="Watt Hours"
        theData={theData.watt_hours}
      />
      <ResponseDetailsDisplay
        theLabel="Watt Hours Period"
        theData={theData.watt_hours_period}
      />
      {/* TODO: get this work display correctly */}
      {/* <ResponseDetailsDisplay
        theLabel="Watt Hours Day"
        theData={theData.watt_hours_day}
      /> */}
    </div>
  )
}

export default ResponsePanelDisplay
