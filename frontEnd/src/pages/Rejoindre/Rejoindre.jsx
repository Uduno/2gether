import { useState, useEffect } from 'react'
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';

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
            <Navbar/>
            Hola {name}
        </div>
    )
}

export default Rejoindre;