import { useState, useEffect } from "react";
import AddressInput from "../../components/AdressInput/AdressInput";
import {DateInput, validateDates }from "../../components/DateInput/DateInput";
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import userIcon from '../../assets/icons/profil.png';
import './Proposer.css'

function Proposer() {
    const [auth, setAuth] = useState(false)
    const [message, setMsg] = useState('')
    const [name, setName] = useState('')
    const [imagePreviews, setImagePreviews] = useState([null, null, null]);
    //const [suggestions, setSuggestions] = useState([]);

    const [values, setValues] = useState({
        id: "",
        user_id: "",
        type: "",
        title: "",
        dates: "",
        location: "",
        city: "",
        region: "",
        country: "",
        detail: "",
        place: ""
    })
    const [err, setErr] = useState({
        type: "",
        title: "",
        dates: "",
        location: "",
        city: "",
        region: "",
        country: "",
    })
    function handleChange(event) {
        const { name, value } = event.target
        setValues(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    const handleSelectAdress = (adress,city,region,country) => {
        setValues(prevValues => ({
            ...prevValues, location:adress, city:city, region:region, country:country
        }))
    }
    const handleSelectDate = (dates) => {
        setValues(prevValues => ({
            ...prevValues, dates:dates
        }))
    }


    //axios.defaults.withCredentials = true;

    function previewImage(event, index) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const updatedPreviews = [...imagePreviews];
            updatedPreviews[index] = e.target.result;
            setImagePreviews(updatedPreviews);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }



    useEffect(() => {
        axios.get('http://localhost:8081/proposer')
            .then(res => {
                if (res.data.Status === "Succes") {
                    setAuth(true);
                    setName(res.data.name)
                } else {
                    setAuth(false);
                    setMsg(res.data.Error);
                }
            })
            .then(err => { console.log(err) });

    }, []);

  
    function handleSubmit(event){
        event.preventDefault();
        console.log(values)
        if (validateDates(values.dates,setErr)) {
            // Ici, vous pouvez envoyer les dates validées à votre backend ou faire toute autre opération requise.
            // Par exemple, vous pouvez convertir les dates en objets Date JavaScript pour un traitement ultérieur.
            const dateArray = values.dates.split(",").map((date) => date.trim());
            const formattedDates = dateArray.map((dateStr) => {
              const [day, month, year] = dateStr.split("/");
              return new Date(`${year}-${month}-${day}`);
            });
            
            // Faire quelque chose avec les dates validées, par exemple les envoyer à votre backend.
            console.log(formattedDates);
          }
          console.log(err)
       
    }

    return (
        <div>
            <Navbar isUserLoggedIn={auth} profilePhoto={userIcon} />
            <div className="main--content">
                <h1>Proposer une activité</h1>
                <div className="form-container">
                    <div className="form-left">
                        <div className="form-group">
                            <label htmlFor="selector1">Type d'activité *</label>
                            <select id="selector1" name="type" onChange={handleChange}>
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
                        <div className="form-group">
                            <label htmlFor="input1">Titre de l'activité *</label>
                            <input type="text" id="input1" name="title" onChange={handleChange} placeholder="Titre de l'activité" maxLength="120" />
                        </div>
                        <div className="form-group">
                             <AddressInput onSelectedAddress={handleSelectAdress}/>
                        </div>
                           
                 
                        <div className="form-group">
                           <DateInput onSelectedDate={handleSelectDate} errorMessage={err.dates}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="textarea">Détails de l'activité</label>
                            <textarea id="textarea" name="detail" onChange={handleChange} placeholder="Détails..."></textarea>
                        </div>
                    </div>
                    <div className="form-right">
                        <div className="form-group">
                            <label htmlFor="selector2">Nombre de place</label>
                            <select id="selector2" name="place" onChange={handleChange}>
                                <option value="none">Non défini</option>
                                <option value="1">Jusqu'à 1 personne</option>
                                <option value="2">Jusqu'à 2 personnes</option>
                                <option value="3">Jusqu'à 3 personnes</option>
                                <option value="4">Jusqu'à 4 personnes</option>
                                <option value="5">Jusqu'à 5 personnes</option>
                                <option value="6">Jusqu'à 6 personnes</option>
                                <option value="7">Jusqu'à 7 personnes</option>
                            </select>
                        </div>
                        <div className="image-input">
                            <label htmlFor="image1">
                                Image 1
                                <div className="image-preview">
                                    {imagePreviews[0] ? <img src={imagePreviews[0]} alt="Image 1" /> : <span className="plus">+</span>}
                                </div>
                                <input type="file" id="image1" accept="image/*" onChange={(e) => previewImage(e, 0)} />
                            </label>
                        </div>
                        <div className="image-input">
                            <label htmlFor="image2">
                                Image 2
                                <div className="image-preview">
                                    {imagePreviews[1] ? <img src={imagePreviews[1]} alt="Image 2" /> : <span className="plus">+</span>}
                                </div>
                                <input type="file" id="image2" accept="image/*" onChange={(e) => previewImage(e, 1)} />
                            </label>
                        </div>
                        <div className="image-input">
                            <label htmlFor="image3">
                                Image 3
                                <div className="image-preview">
                                    {imagePreviews[2] ? <img src={imagePreviews[2]} alt="Image 3" /> : <span className="plus">+</span>}
                                </div>
                                <input type="file" id="image3" accept="image/*" onChange={(e) => previewImage(e, 2)} />
                            </label>
                        </div>

                        <button id="confirm" onClick={handleSubmit}>Confirmer</button>
                    </div>
                </div>



            </div>
        </div>
    )
}

export default Proposer;