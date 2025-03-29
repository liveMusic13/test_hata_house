import { Link } from 'react-router-dom';
import { ProductsService } from '../../services/products.service';

import styles from './CardProduct.module.scss';

const CardProduct = ({ data, setDetail }) => {
	const handleDetail = async () => {
		setDetail({
			isPopup: true,
			data: await ProductsService.getDetailsProduct(data.ManufacturerId),
		});
	};
	return (
		<div className={styles.cardProduct}>
			<button onClick={handleDetail}>{data.ManufacturerName}</button>
			<Link to={data.URL} target='_blank'>
				Ссылку на детализацию
			</Link>
		</div>
	);
};

export default CardProduct;
