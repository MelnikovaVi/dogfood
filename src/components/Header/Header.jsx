import "./Style.css";
import  {ReactComponent as HeartIcon} from "./heartIcon.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CardsContext } from "../../context/CardsContext";
import { useLocation } from "react-router-dom";

export default function Header({children, user}) {
  const {myFav} = useContext(CardsContext)
  const location = useLocation();


  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          {children}
          {/* изменение состояния родителя через дочерние компоненты производятся через колбеки */}
          <div className="userInfo">
            <div className="iconMenu">
              <Link to="/my-fav" className="favoritesLink">
                  <HeartIcon className="heartIcon"/>
                  {myFav.length !== 0 && <span className="iconBubble">{myFav.length}</span>}
              </Link>
              <Link to="/login" className="textEnter" state={{background:location, firstPath: location.pathname}}>Войти</Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
