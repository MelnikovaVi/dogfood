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
            {/* <span className="info">Пользователь</span> */}
            {/* {user?.name && <span className="name">{user?.name}</span>} */}
            {/* {user?.email && <span className="email">{user?.email}</span>} */}
            <div className="iconMenu">
              <Link to="/my-fav" className="favoritesLink">
                  <HeartIcon className="heartIcon"/>
                  {myFav.length !== 0 && <span className="iconBubble">{myFav.length}</span>}
              </Link>
              <Link to="/login" state={{background:location, firstPath: location.pathname}}>Войти</Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
