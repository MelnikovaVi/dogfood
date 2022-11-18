import './Style.css';
import {ReactComponent as SearchIcon} from './ic-search.svg';
import {ReactComponent as CloseIcon} from './ic-close-input.svg';



const Search = ({formSubmit, onInputChange}) => {
// теперь переданные из App пропсы нужно повесить на форму и на текстовый инпут 

const handleInput = (e) => {
	onInputChange(e.target.value)
	// e.target.value - это то, что вводится в инпут
}

	return (
		<form className='search' onSubmit = { formSubmit } >
				<input type="text" className='search__input' placeholder='Найти товар' onInput={handleInput}/>
				<button className='search__btn'>
					<SearchIcon/>
					{false && <CloseIcon/>}
				</button>
		</form>
	);
};

export default Search;