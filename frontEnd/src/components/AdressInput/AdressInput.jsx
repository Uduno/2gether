import React, { useState, useEffect } from "react";

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
        const autocompleteService = new window.google.maps.places.AutocompleteService();
        autocompleteService.getPlacePredictions(
            {
                input: query,
                types: ["(regions)"], // Restrict the suggestions to cities
            },
            (predictions, status) => {
                if (status === "OK" && predictions) {
                    setSuggestions(predictions);
                }
            }
        );
    };

    const handleSelectSuggestion = (selectedSuggestion) => {
        const placesService = new window.google.maps.places.PlacesService(document.createElement("div"));
        placesService.getDetails(
            {
                placeId: selectedSuggestion.place_id,
                fields: ["address_components"],
            },
            (place, status) => {
                if (status === "OK" && place) {
                    const components = place.address_components;
                    const cityComponent = components.find((component) => component.types.includes("locality"));
                    const regionComponent = components.find((component) => component.types.includes("administrative_area_level_1"));
                    const countryComponent = components.find((component) => component.types.includes("country"));

                    setCity(cityComponent ? cityComponent.long_name : "");
                    setRegion(regionComponent ? regionComponent.long_name : "");
                    setCountry(countryComponent ? countryComponent.long_name : "");
                    setAddress(selectedSuggestion.description);
                    setSuggestions([]); // Clear suggestions after selection
                }
            }
        );
    };

    useEffect(() => {
        onSelectedAddress(address, city, region, country);
    }, [address, city, region, country]);

    return (
        <div>
            <label htmlFor="input2">Localisation de l'activté *</label>
            <input
                id="input2"
                type="text"
                value={address}
                onChange={handleInputChange}
                placeholder="Entrez une adresse"
            />
            <div>
                {suggestions.map((suggestion) => (
                    <div
                        key={suggestion.place_id}
                        onClick={() => handleSelectSuggestion(suggestion)}
                        className="suggestions"
                    >
                        {suggestion.description}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddressInput;
