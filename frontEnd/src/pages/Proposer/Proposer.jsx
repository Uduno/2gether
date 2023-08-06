import { useState, useEffect } from "react";
import AddressInput from "../../components/AdressInput/AdressInput";
import { DateInput, validateDates } from "../../components/DateInput/DateInput";
import ValidateProposition from "../../function/ValidateProposition";
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import userIcon from '../../assets/icons/profil.png';
import './Proposer.css'


function Proposer() {
    const [auth, setAuth] = useState(false)
    const [message, setMsg] = useState('')
    const [imagePreviews, setImagePreviews] = useState("");
    const [imageSaves, setImageSaves] = useState("");

    const [values, setValues] = useState({
        id: "",
        id_user: "",
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

    const handleSelectAdress = (adress, city, region, country) => {
        setValues(prevValues => ({
            ...prevValues, location: adress, city: city, region: region, country: country
        }))
    }
    const handleSelectDate = (dates) => {
        setValues(prevValues => ({
            ...prevValues, dates: dates
        }))
    }



    axios.defaults.withCredentials = true;


  
    function handleImageChange(event) {
        const file = event.target.files[0]; // Récupérer le premier fichier du champ de fichier
        setImageSaves([file]); // Mettre le fichier dans un tableau, car setImageSaves attend un tableau d'images
        setImagePreviews(URL.createObjectURL(file)); // Créer un aperçu de l'image en utilisant l'URL objet
    }




    useEffect(() => {
        axios.get('http://localhost:8081/api/proposer')
            .then(res => {
                if (res.data.Status === "Succes") {
                    setAuth(true);
                    setValues(prevValues => ({ ...prevValues, id_user: res.data.id }));
                    // console.log(res.data.id); // Afficher l'ID reçu dans la console
                } else {
                    setAuth(false);
                    setMsg(res.data.Error);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, []);


    // Fonction pour générer une ID unique de 10 chiffres
    const generateUniqueID = () => {
        const length = 10;
        const characters = '0123456789';
        let id = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            id += characters[randomIndex];
        }

        return parseInt(id);
    };


    const uploadFile = async (file, folderPath, fileName) => {
        //console.log(file)
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folderPath', folderPath);
        formData.append('fileName', fileName);

        try {
            // Remplacez 'http://localhost:8080/upload' par l'URL de votre serveur où se trouve l'endpoint '/upload'.
            const response = await axios.post('http://localhost:8081/api/saveImage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('URL du fichier téléchargé :', response.data);
            // Ici, vous pouvez utiliser l'URL du fichier téléchargé si vous en avez besoin.
        } catch (error) {
            console.error('Erreur lors du téléchargement du fichier :', error);
        }
    };

    function handleSubmit(event) {
        event.preventDefault();
        const id_activity = generateUniqueID()
        setValues(prevValues => ({
            ...prevValues, id: id_activity
        }))
        console.log(values, imageSaves[0])
        const valideProp = ValidateProposition(values, err, setErr);
        if (Object.values(valideProp).every(err => err === "")) {
            if (!values.title || !values.dates || !values.location | !values.type) {
                console.error('Champs Incomplets');
                return; // Arrête l'exécution de la fonction handleSubmit
            }

            if (validateDates(values.dates, setErr)) {
                // Ici, vous pouvez envoyer les dates validées à votre backend ou faire toute autre opération requise.
                // Par exemple, vous pouvez convertir les dates en objets Date JavaScript pour un traitement ultérieur.
                const dateArray = values.dates.split(",").map((date) => date.trim());
                const formattedDates = dateArray.map((dateStr) => {
                    const [day, month, year] = dateStr.split("/");
                    return new Date(`${year}-${month}-${day}`);
                });
                // Faire quelque chose avec les dates validées, par exemple les envoyer à votre backend.
                // console.log(formattedDates);
                const newName ="activity_"+ id_activity.toString()+".png";
                uploadFile(imageSaves[0],"activities",newName)
            } else {
                return;
            }


        }




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
                            {err.type && <p className="error">{err.type}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="input1">Titre de l'activité *</label>
                            <input type="text" id="input1" name="title" onChange={handleChange} placeholder="Titre de l'activité" maxLength="120" />
                            {err.title && <p className="error">{err.title}</p>}
                        </div>
                        <div className="form-group">
                            <AddressInput onSelectedAddress={handleSelectAdress} />
                            {err.location && <p className="error">{err.location}</p>}
                        </div>


                        <div className="form-group">
                            <DateInput onSelectedDate={handleSelectDate} errorMessage={err.dates} />
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
                                Image
                                <div className="image-preview">
                                    {imagePreviews ? <img src={imagePreviews} alt="Image 1" /> : <span className="plus">+</span>}
                                </div>
                                <input type="file" name="image" id="image1" accept="image/*" onChange={(e) => handleImageChange(e, 0)} />
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