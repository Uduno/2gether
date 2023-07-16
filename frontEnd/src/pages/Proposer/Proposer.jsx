import { useState, useEffect } from "react";
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import userIcon from '../../assets/icons/profil.png';
import './Proposer.css'

function Proposer() {
    const [auth, setAuth] = useState(false)
    const [message, setMsg] = useState('')
    const [name, setName] = useState('')
    const [imagePreviews, setImagePreviews] = useState([null, null, null]);

    axios.defaults.withCredentials = true;

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
            .then(err => { console.log(err) })
    }, [])
    return (
        <div>
            <Navbar isUserLoggedIn={auth} profilePhoto={userIcon} />
            <div className="main--content">
                <h1>Proposer une activité</h1>
                <div className="form-container">
                    <div className="form-left">
                        <div className="form-group">
                            <label htmlFor="selector1">Selector 1</label>
                            <select id="selector1"></select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="input1">Input 1</label>
                            <input type="text" id="input1" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="input2">Input 2</label>
                            <input type="text" id="input2" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="date">Date</label>
                            <input type="date" id="date" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="textarea">Textarea</label>
                            <textarea id="textarea"></textarea>
                        </div>
                    </div>
                    <div className="form-right">
                        <div className="form-group">
                            <label htmlFor="selector2">Selector 2</label>
                            <select id="selector2"></select>
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

                        <button id="confirm">Confirmer</button>
                    </div>
                </div>



            </div>
        </div>
    )
}

export default Proposer;