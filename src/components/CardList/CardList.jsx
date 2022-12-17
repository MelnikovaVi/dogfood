import { useContext } from "react";
import { CardsContext } from "../../context/CardsContext";
import Card from "../Card/Card";
import "./Style.css";


const CardList = () => {
	const {cards: goods} = useContext(CardsContext)
	return (
		<div className="cards">
			{
				goods.map(function(item){
					return (
						<Card key={item._id} {...item}/>
						)
					})
				}
		</div>
	);
	
};

export default CardList;