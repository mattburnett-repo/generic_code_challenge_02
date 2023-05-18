import '../index.css'

const FormDisplay = ({submitHandler}: any) => {
  return (
    <div className='app-container'>
      <div className='app-title'>PV Estimate</div>
      <div className='app-panel'>
        <form onSubmit={submitHandler}>
          <div
            className='app-input'
            role='presentation'
            aria-label='description-text'
          >
            This app receives a solar production estimate for 52° north, 12°
            east, <br />
            for an installation with a declination of 37° looking south (0°)
            with 5.67 kWp. <br />
            The estimates are in hourly increments.
          </div>
          <div className='app-input'>
            <button type='submit' name='search-button' className='btn-app'>
              Get Estimate
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormDisplay
