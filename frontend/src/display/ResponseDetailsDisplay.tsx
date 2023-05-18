import {Estimate} from '../../../types'

const ResponseDetailsDisplay = ({
  theLabel,
  theData
}: {
  theLabel: string
  // TODO: type this better than 'any'
  theData: any
}) => {
  return (
    <details>
      <summary className='font-weight-700'>{theLabel}</summary>
      {/* 01. go through the estimate objects */}
      {theData.map((estimates: Estimate, i: number) => (
        <details key={i}>
          <summary className='indent-20-px'>
            {/* get the 'name' of the estiimate. this is the date value-as-key in the data object */}
            <span className='font-weight-500'>{Object.keys(estimates)}</span>
          </summary>
          {/* 02. go into the values objecy/array (the right side of the ':') of a single estimate object */}
          {Object.values(estimates).map((estimate: any) =>
            // 03. go to each record in the single estimate object
            Object.values(estimate).map((record: any, j: number) => (
              <p className='indent-40-px' key={j}>
                {record.time}: {record.watts}
              </p>
            ))
          )}
        </details>
      ))}
    </details>
  )
}

export default ResponseDetailsDisplay
