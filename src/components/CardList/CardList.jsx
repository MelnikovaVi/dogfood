import Card from "../Card/Card";
import "./Style.css";


const CardList = ({goods, onProductLike, actualUser}) => {
	return (
		<div className="cards">
			{
				goods.map(function(item){
					return (
						<Card key={item._id} {...item} onProductLike2={onProductLike} actualUser={actualUser}/>
						)
					})
				}
		</div>
	);
	
};

export default CardList;