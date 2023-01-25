import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Card from "../Card/Card";
import NotFoundComponent from "../NotFoundComponent/NotFoundComponent";
import "./Style.css";
// import { useContext } from "react";
// import { CardsContext } from "../../context/CardsContext";


const CardList = ({cards}) => {
	// const {cards} = useContext(CardsContext)
	const navigate = useNavigate()
	const {loading} = useContext(UserContext)
	return (
		<div className="cards">
			{!cards.length && !loading && <NotFoundComponent buttonText='Назад' title='По Вашему запросу ничего не найдено' buttonActtion={()=>navigate(-1)}/>}
			{
				cards.map((item) => <Card key={item._id} {...item}/>)
			}
		</div>
	);
	
};

export default CardList;