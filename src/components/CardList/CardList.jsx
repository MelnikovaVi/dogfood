import Card from "../Card/Card";
import "./Style.css";


const CardList = ({goods}) => {
	return (
		<div className="cards">
			{
				goods.map(function(item, index){
					return (
						<Card key={index} {...item}/>
						)
					})
				}
		</div>
	);
	
};

export default CardList;