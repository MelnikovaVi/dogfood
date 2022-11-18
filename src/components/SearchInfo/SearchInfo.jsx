import wordForm from "../Utils/Utils";
import "./Style.css";



const SearchInfo = ({searchText, searchQuantity}) => {
	return (
		searchText && <section className="search-title">
			По запросу <span>{searchText}</span> найдено {searchQuantity} {wordForm(searchQuantity, ['товар', 'товара', 'товаров'])}
		</section>
	);
};

export default SearchInfo;