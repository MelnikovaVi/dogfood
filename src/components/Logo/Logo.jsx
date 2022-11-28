import './Style.css';
import logoSvg from './logo.svg'


const Logo = () => {
	return (
		<a className='logo__pic' href='/'>
			<img src={logoSvg} alt="Logo DogFood" className='logo__pic'/>
		</a>
	);
};

export default Logo;