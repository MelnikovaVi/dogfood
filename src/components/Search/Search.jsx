import './Style.css';
import {ReactComponent as SearchIcon} from './ic-search.svg';
import {ReactComponent as CloseIcon} from './ic-close-input.svg';
import { useState } from 'react';



const Search = ({formSubmit, onInputChange}) => {
	const [searchText, setSearchText] = useState('');

	const handleInput = (e) => {
		setSearchText(e.target.value)
		onInputChange && onInputChange(e.target.value)
	}

	const handleFormSubmit = (e) => {
		e.preventDefault()
		formSubmit(searchText)
		setSearchText('')
	}

const clearSearchInput = (e) => {
	e.stopPropagation()
	setSearchText('')
	onInputChange && onInputChange('')
}

	return (
		<form className='search' onSubmit = { handleFormSubmit } >
				<input type="text" className='search__input' placeholder='Найти товар' onInput={handleInput} value = {searchText}/>
				<button type='button' className='search__btn'>
					{searchText && <CloseIcon onClick={clearSearchInput} className='clearInputBtn'/>}
					{searchText && <SearchIcon onClick={handleFormSubmit} className='searchBtn'/>}
				</button>
		</form>
	);
};

export default Search;