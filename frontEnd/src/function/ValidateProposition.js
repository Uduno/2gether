export default function ValidateProposition(value, err, setErr) {
    const { title, type, dates, location, country } = value;

    if (title.trim() === "") {
        setErr((prevError) => ({ ...prevError, title: "Titre requis" }));
    } else {
        setErr((prevError) => ({ ...prevError, title: "" }));
    }
    if (type.trim() === "") {
        setErr((prevError) => ({ ...prevError, type: "Type d'acivité requis" }));
    } else {
        setErr((prevError) => ({ ...prevError, type: "" }));
    }
    if (dates.trim() === "") {
        setErr((prevError) => ({ ...prevError, dates: "Minimun une date" }));
    } else {
        setErr((prevError) => ({ ...prevError, dates: "" }));
    } 
    if (country.trim() === "") {
        setErr((prevError) => ({ ...prevError, location: "Localisation invalide" }));
    } else {
        setErr((prevError) => ({ ...prevError, location: "" }));
    }
    if (location.trim() === "") {
        setErr((prevError) => ({ ...prevError, location: "Localisation de l'activité requis" }));
    } else {
        setErr((prevError) => ({ ...prevError, location: "" }));
    }


    return err;
}