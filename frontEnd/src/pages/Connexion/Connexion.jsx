import { useState } from 'react'
import InputForm from '../../components/inputForm/InputForm'
import './Connexion.css'
import image from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom'; // Importer useNavigate
import axios from 'axios';

function Connexion() {
  const navigate = useNavigate(); // Utiliser useNavigate pour obtenir la fonction de navigation
  axios.defaults.withCredentials = true;
  const [values, setValues] = useState({ email: "", password: "" })
  const [error, setError] = useState("")

  function handleChange(event) {
    const { name, value } = event.target
    setValues(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    })
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!values.email || !values.password) {
      setError('Les champs email et mot de passe sont obligatoires');
      return;
    }
    axios.post('http://localhost:8081/api/connexion', values)
      .then(res => {
        if (res.data.status === "Succes") {
          navigate('/rejoindre'); // Utiliser la fonction de navigation
        } else {
          const errorMessage = res.data.error;
          if (errorMessage.includes("Email")) {
            setError(res.data.error);
          } else {
            alert(res.data.error);
          }
        }
      })
      .catch(err => console.log(err));
  }


  return (
    <div className='connexion--page'>
      <div className='login--introduction'>
        <img src={image} alt='logo' />
        <span>Connectez vous</span>
      </div>
      <form className='form--connexion'>
        <h2>Connexion</h2>
        <InputForm name={'email'} type={'email'} placeholder={"Email"} onChange={handleChange} />
        <InputForm name={'password'} type={'password'} placeholder={"Mot de passe"} onChange={handleChange} />
        <span><strong><u className='link--sign'><Link to="/motdepasseoublié?">Mot de passe oublié?</Link></u></strong></span><br />
        {error && <span className="error">{error}</span>}
        <div className='submit--button' onClick={handleSubmit}>Connexion</div>
        <center><span>Pas de compte? <strong className='link--sign'><Link to="/inscription">Inscrivez vous</Link></strong></span></center>
      </form>
    </div>
  )
}

export default Connexion;
