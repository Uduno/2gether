import { useState, useEffect } from 'react'
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import userIcon from '../../assets/icons/profil.png';
import searchIcon from '../../assets/icons/Search.png';
import './Rejoindre.css'

function Rejoindre() {
    const [auth, setAuth] = useState(false)
    const [message, setMsg] = useState('')
    const [name, setName] = useState('')

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:8081/rejoindre')
            .then(res => {
                if (res.data.Status === "Succes") {
                    setAuth(true);
                    setName(res.data.name)
                } else {
                    setAuth(false);
                    setMsg(res.data.Error);
                }
            })
            .then(err => { console.log(err) })
    }, [])

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
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
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