import Footer from '../common/Footer'
import Topbar from '../common/Topbar'
import ProgressBar from '../common/ProgressBar'

import Content from './Content'
import "./Style.scss"

const Timeline = () => {
  return (
    <>
        <div className='nb-page-container'>
            <Topbar estimate={false} limiteRole={false}/>
            <ProgressBar steps={2}/>
            <Content />
            <Footer /> 
        </div>
    </>
  )
} 

export default Timeline
