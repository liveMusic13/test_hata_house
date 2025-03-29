import { useState } from 'react';
import { ProductsService } from '../../services/products.service';
import CardProduct from '../card-product/CardProduct';
import Popup from '../popup/Popup';

import styles from './App.module.scss';

const App = () => {
	const [query, setQuery] = useState('');
	const [responseData, setResponseData] = useState(null);
	const [detail, setDetail] = useState({
		data: {},
		isPopup: false,
	});
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

	const handleGetProducts = async () => {
		const data = await ProductsService.getProducts(query);
		setResponseData(data);
		setTotalPages(Math.ceil(data.Results.length / 10));
		setCurrentPage(1);
	};
	const onChange = e => setQuery(e.target.value);
	const prevPage = () => {
		setCurrentPage(prev => Math.max(prev - 1, 1));
	};

	const nextPage = () => {
		setCurrentPage(prev => Math.min(prev + 1, totalPages));
	};
	const renderPagination = () => {
		const pages = [];
		if (totalPages <= 5) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(
					<button
						key={i}
						onClick={() => setCurrentPage(i)}
						className={currentPage === i ? styles.active : ''}
					>
						{i}
					</button>
				);
			}
		} else {
			if (currentPage <= 3) {
				for (let i = 1; i <= 5; i++) {
					pages.push(
						<button
							key={i}
							onClick={() => setCurrentPage(i)}
							className={currentPage === i ? styles.active : ''}
						>
							{i}
						</button>
					);
				}
				pages.push(<span key='dots1'>...</span>);
				pages.push(
					<button key={totalPages} onClick={() => setCurrentPage(totalPages)}>
						{totalPages}
					</button>
				);
			} else if (currentPage >= totalPages - 2) {
				pages.push(
					<button key={1} onClick={() => setCurrentPage(1)}>
						1
					</button>
				);
				pages.push(<span key='dots2'>...</span>);
				for (let i = totalPages - 4; i <= totalPages; i++) {
					pages.push(
						<button
							key={i}
							onClick={() => setCurrentPage(i)}
							className={currentPage === i ? styles.active : ''}
						>
							{i}
						</button>
					);
				}
			} else {
				pages.push(
					<button key={1} onClick={() => setCurrentPage(1)}>
						1
					</button>
				);
				pages.push(<span key='dots3'>...</span>);
				for (let i = currentPage - 1; i <= currentPage + 1; i++) {
					pages.push(
						<button
							key={i}
							onClick={() => setCurrentPage(i)}
							className={currentPage === i ? styles.active : ''}
						>
							{i}
						</button>
					);
				}
				pages.push(<span key='dots4'>...</span>);
				pages.push(
					<button key={totalPages} onClick={() => setCurrentPage(totalPages)}>
						{totalPages}
					</button>
				);
			}
		}

		return (
			<div className={styles.pagination}>
				<button onClick={prevPage} disabled={currentPage === 1}>
					←
				</button>
				{pages}
				<button onClick={nextPage} disabled={currentPage === totalPages}>
					→
				</button>
			</div>
		);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.search}>
				<input type='text' value={query} onChange={onChange} />
				<button onClick={handleGetProducts}>Поиск</button>
			</div>

			<div className={styles.block__result}>
				<div className={styles.block__result}>
					{responseData &&
						responseData.Results.slice(
							(currentPage - 1) * 10,
							currentPage * 10
						).map((el, ind) => (
							<CardProduct key={ind} data={el} setDetail={setDetail} />
						))}
				</div>
			</div>
			{totalPages > 1 && renderPagination()}
			{detail.isPopup && (
				<>
					<div className={styles.opacity}></div>
					<Popup data={detail.data} setDetail={setDetail} />
				</>
			)}
		</div>
	);
};

export default App;
