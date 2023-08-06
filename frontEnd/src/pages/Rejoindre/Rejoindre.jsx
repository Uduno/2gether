import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import userIcon from '../../assets/icons/profil.png';
import searchIcon from '../../assets/icons/Search.png';
import './Rejoindre.css'

function Rejoindre() {
    const [auth, setAuth] = useState(false)
    const [message, setMsg] = useState('')
    const [id, setId] = useState('')

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:8081/api/rejoindre')
          .then(res => {
            if (res.data.Status === "Succes") {
              setAuth(true);
              setId(res.data.id);
              console.log(res.data.id); // Afficher l'ID reçu dans la console
            } else {
              setAuth(false);
              setMsg(res.data.Error);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }, []);
      

    return (
        <div>
            <Navbar isUserLoggedIn={auth} profilePhoto={userIcon} />
            <div className='main--content'>
                <h1>Rejoindre une activité</h1>
                <div className="filter-bar">
                    <div className="filter-item">
                        <label htmlFor="location">Localisation</label>
                        <input type="text" id="location" placeholder="Localisation" className="filter-input" />
                    </div>
                    <div className="filter-item">
                        <label htmlFor="date">Date</label>
                        <input type="date" id="date" placeholder="Date" className="filter-input" />
                    </div>
                    <div className="filter-item">
                        <label htmlFor="option">Option</label>
                        <select id="option" className="filter-select">
                            <option value="">Sélectionnez une option</option>
                            <option value="sport_et_activites_physique">Sport et activités physique</option>
                            <option value="restauration_et_gastronomie">Restauration et gastronomie</option>
                            <option value="arts_et_culture">Arts et culture</option>
                            <option value="loisirs_et_divertissement">Loisirs et divertissement</option>
                            <option value="nature_et_plein_air">Nature et plein air</option>
                            <option value="shopping_et_mode">Shopping et mode</option>
                            <option value="evenement_speciaux">Evenement spéciaux</option>
                            <option value="autres">Autres</option>
                        </select>
                    </div>
                    <div className="filter-item">
                        <label htmlFor="search">Rechercher</label>
                        <input type="text" id="search" placeholder="Rechercher..." className="filter-input" />
                    </div>
                    <button className="filter-button">
                        <img src={searchIcon} alt='search' />
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Rejoindre;