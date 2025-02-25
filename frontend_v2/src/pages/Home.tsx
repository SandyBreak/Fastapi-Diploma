import Header from '../components/base_components/Header.tsx'
import Footer from '../components/base_components/Footer.tsx'

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