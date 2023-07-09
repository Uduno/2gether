import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './Navbar.css'
import { Turn as Hamburger } from 'hamburger-react'


function Navbar({isUserLoggedIn}) {

  const [isOpen,setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!isOpen);
  };

  return (
    <nav className='navbar'>
      <div className='navbar--left'>
        <img src={logo} alt='logo' className='navbar--logo'/>
        <h1>2gether</h1>
      </div>

      <div className='navbar--center'>
      <ul className={`navLinks ${isOpen ? 'menu' : ''}`}>
            <li className='navLink'>
              <NavLink to={'/rejoindre'} activeclassname='active'>Rejoindre</NavLink>
            </li>
            <li className='navLink'>
              <NavLink to={'/proposer'} activeclassname='active'>Proposer</NavLink>
            </li>
            <li className='navLink'>
              <NavLink to={'/partenaire'} activeclassname='active'>Nos partenaires</NavLink>
            </li>
        </ul>
        <div className='menu--navLinks'>
        <Hamburger toggled={isOpen} toggle={setOpen} />
        </div>
        
      </div>

      <div className="navbar--right">
        {isUserLoggedIn ? (
          <>
            <div className="navbar--iconMessage"></div>
            <div className="navbar--profile">
              <img src={profilePhoto} alt="Profil" className="navbar--profilePhoto" />
            </div>
          </>
        ) : (
          <>
            <NavLink to="/connexion" className="navbar--button" >Connexion</NavLink>
            <NavLink to="/inscription" className="navbar--button" >Inscription</NavLink>
          </>
        )}
      </div>
    </nav>
  )

}

export default Navbar;
