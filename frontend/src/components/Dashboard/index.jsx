import Footer from '../common/Footer'
import Topbar from '../common/Topbar'
import Content from './Content'
import "./Style.scss"

const Dashboard = () => {
  return (
    <>
        <div className='nb-page-container'>
            <Topbar estimate={true} limiteRole={false}/>
            <Content />
            <Footer /> 
        </div>
    </>
  )
}

export default Dashboard
