import { useState } from 'react'
import InputForm from '../../components/inputForm/InputForm'
import '../Connexion/Connexion.css'
import image from '../../assets/logo.png';
import { Link } from 'react-router-dom';

function Mdpo() {
  return (
    <div className='connexion--page'>
          <form className='form--connexion'>
              <h2>Mot de passe oublié?</h2>
              <InputForm name={'email'} type={'email'} placeholder={"Email"} />
              <div className='submit--button'>Envoyer</div>
              <center><span><strong className='link--sign'><Link to="/connexion">Connectez vous</Link></strong></span></center>
          </form>
    </div>
  )
}

export default Mdpo;