import Header from '../components/base/Header.tsx'
import Footer from '../components/base/Footer.tsx'

import '../styles/components.css'

const Home = () => {

    return (
      	<>
        	<Header />
        		<div className='mainSection' style={{display: 'flex', alignItems: 'center'}}>
        			<h1>Главная страница</h1>
        		</div>
        	<Footer />
        </>
    )
}
  
export default Home