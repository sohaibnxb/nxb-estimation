import React from 'react'
import EstimatesHistory from './EstimatesHistory'
import Statuses from './Statuses'
//styles
import "./Style.scss"

const Content = () => {

  return (
    <>
      <section className='nb-section'>
        <div className="nb-dashboard-title">
          <h4>Dashboard</h4>
        </div>
        <div className='nb-dashboard-layout'>
          <div className='nb-dashboard-estimates'>
            <EstimatesHistory />
          </div>
          <div className='nb-dashboard-status'>
            <Statuses />
          </div>
        </div>
      </section>
    </>
  )
}
export default Content
