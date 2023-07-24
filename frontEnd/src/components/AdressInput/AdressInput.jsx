import React, { useState } from "react";
import axios from "axios";

const AddressInput = ({ onSelectedAddress }) => {
    const [address, setAddress] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [city, setCity] = useState("");
    const [region, setRegion] = useState("");
    const [country, setCountry] = useState("");

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setAddress(inputValue);
        if (inputValue.trim() !== "") {
            fetchSuggestions(inputValue);
        } else {
            setSuggestions([]);
        }
    };

    const fetchSuggestions = (query) => {
        axios
            .get(
                `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
                    query
                )}&apiKey=97b786d2754b4923bce821e3cbc9308e`
            )
            .then((response) => {
                setSuggestions(response.data.features);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleSelectSuggestion = (selectedSuggestion) => {
        setAddress(selectedSuggestion.properties.formatted);
        setCity(selectedSuggestion.properties.city || "");
        setRegion(selectedSuggestion.properties.state || "");
        setCountry(selectedSuggestion.properties.country || "");
        setSuggestions([]); // Clear suggestions
        onSelectedAddress(selectedSuggestion.properties.formatted,
            selectedSuggestion.properties.city || "",selectedSuggestion.properties.state || "",
        selectedSuggestion.properties.country || "")
    };

    return (
        <div>
            <label htmlFor="input2">Localisation de l'actvité *</label>
            <input
                id="input2"
                type="text"
                value={address}
                onChange={handleInputChange}
                placeholder="Entrez une adresse"
            />
            <div>
                {suggestions.map((suggestion) => (
                    <div className="suggestions" key={suggestion.properties.id} onClick={() => handleSelectSuggestion(suggestion)}>
                        {suggestion.properties.formatted}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddressInput;
