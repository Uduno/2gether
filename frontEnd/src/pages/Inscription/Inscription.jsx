import { useState } from 'react'
import InputForm from '../../components/inputForm/InputForm'
import '../Connexion/Connexion.css'
import image from '../../assets/logo.png';
import ValidateForm from '../../function/ValidateForm';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Inscription() {

  const [values, setValues] = useState({ name: "", email: "", password: "", cpassword: "" })
  const [error, setError] = useState({ name: "", email: "", password: "", cpassword: "" })


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
    event.preventDefault()
    const validationErrors = ValidateForm(values, error, setError)
    console.log(validationErrors)

    // Vérifier s'il y a des erreurs de validation avant de soumettre le formulaire
    if (Object.values(validationErrors).every(err => err === "")) {
      if (!values.name || !values.email || !values.password) {
        console.error('Les champs nom, email et mot de passe sont obligatoires');
        return; // Arrête l'exécution de la fonction handleSubmit
      }
      // Toutes les valeurs sont valides, soumettre le formulaire
      axios.post('http://localhost:8081/api/inscription', values)
        .then(res => {
          console.log(res.data); // Affiche la réponse du serveur
        })
        .catch(err => {
          if (err.response && err.response.data && err.response.data.error) {
            const errorMessage = err.response.data.error;
            console.error(errorMessage);
            
            // Mettez à jour l'état ou l'objet d'erreur pour afficher le message d'erreur dans votre formulaire
            if (errorMessage.includes('e-mail')) {
              setError(prevError => ({ ...prevError, email: errorMessage }));
            }
            if (errorMessage.includes('nom')) {
              setError(prevError => ({ ...prevError, name: errorMessage }));
            }
          } else {
            console.error(err); // Affiche l'erreur par défaut si le message d'erreur spécifique n'est pas disponible
          }
        });
    }
  }
  return (
    <div className='connexion--page'>
      <div className='login--introduction'>
        <img src={image} alt='logo' />
        <span>Bienvenue sur la plateforme</span>
      </div>
      <form className='form--connexion'>
        <h2>Inscription</h2>
        <InputForm name={'name'} type={'text'} placeholder={"Nom d'utilisateur"} onChange={handleChange} />
        {error.name && <span className="error">{error.name}</span>}
        <InputForm name={'email'} type={'email'} placeholder={"Email"} onChange={handleChange} />
        {error.email && <span className="error">{error.email}</span>}
        <InputForm name={'password'} type={'password'} placeholder={"Mot de passe"} onChange={handleChange} />
        {error.password && <span className="error">{error.password}</span>}
        <InputForm name={'cpassword'} type={'password'} placeholder={"Confirmer mot de passe"} onChange={handleChange} />
        {error.cpassword && <span className="error">{error.cpassword}</span>}
        <div className='submit--button' onClick={handleSubmit}>Inscription</div>
        <center><span>Déja un compte? <strong className='link--sign'><Link to="/connexion">Connectez vous</Link></strong></span></center>
      </form>
    </div>
  )
}

export default Inscription;