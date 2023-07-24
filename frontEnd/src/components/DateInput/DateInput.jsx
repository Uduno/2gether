import React, { useState } from "react";


const validateDates = (dates, setErr) => {
    const MAX_DATES = 6;
    const currentDate = new Date();

    // Séparer les dates saisies par des virgules pour obtenir un tableau de dates
    const dateArray = dates.split(",").map((date) => date.trim());

    // Vérifier le nombre total de dates
    if (dateArray.length > MAX_DATES) {
        setErr((prevError) => ({ ...prevError, dates:`Vous ne pouvez pas entrer plus de ${MAX_DATES} dates.`}));
      return false;
    }

    // Vérifier chaque date pour s'assurer qu'elle est valide et non dépassée
    for (let i = 0; i < dateArray.length; i++) {
        const currentDateParts = dateArray[i].split("/");
        const day = parseInt(currentDateParts[0], 10);
        const month = parseInt(currentDateParts[1], 10);
        const year = parseInt(currentDateParts[2], 10);
      
        if (
          isNaN(day) ||
          isNaN(month) ||
          isNaN(year) ||
          day <= 0 ||
          day > 31 ||
          month <= 0 ||
          month > 12 ||
          year < currentDate.getFullYear() ||
          (year === currentDate.getFullYear() && month < currentDate.getMonth() + 1) ||
          (year === currentDate.getFullYear() && month === currentDate.getMonth() + 1 && day < currentDate.getDate())
        ) {
          setErr((prevError) => ({
            ...prevError,
            dates: `La date ${dateArray[i]} est invalide ou dépassée.`,
          }));
          return false;
        }
      }
    setErr((prevError) => ({ ...prevError, dates:''}));
    return true;
  };

const DateInput = ({ onSelectedDate, errorMessage }) => {
  const [dates, setDates] = useState("");
  

  const handleInputChange = (event) => {
    const { value } = event.target;
    setDates(value);
    onSelectedDate(value)
  };



  return (
    <div>
        <label htmlFor="dates">Dates (jj/mm/aaaa, jj/mm/aaaa, ...)  *</label>
        <input
          type="text"
          id="dates"
          value={dates}
          onChange={handleInputChange}
          placeholder="Entrez les dates séparées par des virgules (Max 6 dates)"
        />
        {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export { DateInput, validateDates} ;
