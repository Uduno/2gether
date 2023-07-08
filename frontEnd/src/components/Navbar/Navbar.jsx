import { NavLink } from 'react-router-dom';
import image from '../../assets/logo.png';

function Navbar() {
  return (
    <nav className='navbar'>
      <div className='navbar--logo'>
        <img src={image}/>
        <span>2gether</span>
      </div>  
      <ul>
        <li>
          <NavLink exact to="/" activeClassName="active">
            Accueil
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" activeClassName="active">
            À propos
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" activeClassName="active">
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;