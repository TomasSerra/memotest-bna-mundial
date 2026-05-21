import React, {useState} from 'react'
import './Home.scss'

import Logo from '../../img/logo.png'
import SecretButton from '../../components/SecretButton/SecretButton'
import StatsViewer from '../../components/StatsViewer/StatsViewer'

function Home({goToNextPage}) {
  const [showStats, setShowStats] = useState(false)
  return (
    <div className='home-page'>
      <div style={{position: 'absolute', top: 0, left: 0, width: '15vw', height: '15vw'}}>
        <SecretButton whenClicked={() => setShowStats(true)} totalClicks={2}/>
      </div>
      {showStats && <StatsViewer whenClose={()=>{setShowStats(false)}} storageKey={'stats-memotest-bna'}/>}
      <div className="center">
        <h1>¡Te damos la <br/>bienvenida!</h1>
        <p>Encontrá los 10 pares <br/>de productos.</p>
        <button className="play-button" onClick={goToNextPage} aria-label="Vamos a jugar" />
      </div>
      <div className="footer">
        <img src={Logo} />
      </div>
    </div>
  )
}

export default Home
