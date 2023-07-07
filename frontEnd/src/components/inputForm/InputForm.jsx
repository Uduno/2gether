import React from "react";
import './InputForm.css'

export default function InputForm({name,type,onChange, placeholder}){
    return(
        <div>
            <span className="input--form--name">{placeholder}</span>
            <input className="input--form" name={name} type={type}
                placeholder={placeholder} onChange={onChange}
            />
        </div>
    )
}