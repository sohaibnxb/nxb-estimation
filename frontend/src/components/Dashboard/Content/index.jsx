import React from 'react'
import EstimatesHistory from './EstimatesHistory'
import Stats from './Stats'
import Statuses from './Statuses'
import PDFGenerator from '../../PDFGenerator/PDFGenerator'
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
            <Stats />
          </div>
        </div>
        <PDFGenerator />

      </section>
    </>
  )
}

export default Content
