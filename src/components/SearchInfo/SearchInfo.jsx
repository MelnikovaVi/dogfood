import { useContext } from "react";
import { CardsContext } from "../../context/CardsContext";
import wordForm from "../Utils/Utils";
import "./Style.css";



const SearchInfo = ({searchText}) => {
	const {cards} = useContext(CardsContext)
	const searchQuantity = cards.length
	return (
		searchText && <section className="search-title">
			По запросу <span>{searchText}</span> найдено {searchQuantity} {wordForm(searchQuantity, ['товар', 'товара', 'товаров'])}
		</section>
	);
};

export default SearchInfo;