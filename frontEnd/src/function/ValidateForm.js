export default function ValidateForm(value, error, setErr) {
  const { name, email, password, cpassword } = value;

  if (name.trim() === "") {
    setErr((prevError) => ({ ...prevError, name: "Nom d'utilisateur requis" }));
  } else if (name.length < 4) {
    setErr((prevError) => ({ ...prevError, name: "Minimum 4 caractères" }));
  } else {
    setErr((prevError) => ({ ...prevError, name: "" }));
  }

  const emailValid = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(email);
  if (email.trim() === "") {
    setErr((prevError) => ({ ...prevError, email: "Email requis" }));
  }else if (!emailValid) {
    setErr((prevError) => ({ ...prevError, email: "Email invalide" }));
  } else {
    setErr((prevError) => ({ ...prevError, email: "" }));
  }

  if (password.trim() === "") {
    setErr((prevError) => ({ ...prevError, password: "Mot de passe requis" }));
  }else if (password.length < 6) {
    setErr((prevError) => ({ ...prevError, password: "Mot de passe trop court" }));
  } else {
    setErr((prevError) => ({ ...prevError, password: "" }));
  }

  if (cpassword !== password) {
    setErr((prevError) => ({ ...prevError, cpassword: "Mot de passe non identique" }));
  } else {
    setErr((prevError) => ({ ...prevError, cpassword: "" }));
  }

  return error;
}
