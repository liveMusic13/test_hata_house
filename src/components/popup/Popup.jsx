import styles from './Popup.module.scss';

const Popup = ({ data, setDetail }) => {
	const { Results } = data;

	const onClick = () => setDetail(prev => ({ ...prev, isPopup: false }));

	return (
		<div className={styles.wrapper_popup}>
			<button onClick={onClick}>X</button>
			<h2>Тип производителя: {Results[0]?.ManufacturerTypes[0]?.Name}</h2>
			<p>Адрес: {Results[0]?.Address}</p>
			<div>
				<h3>Контакты:</h3>
				<a href={`mailto:${Results[0]?.ContactEmail}`}>
					{Results[0]?.ContactEmail}
				</a>
				<a href={`tel:+${Results[0]?.ContactPhone}`}>
					{Results[0]?.ContactPhone}
				</a>
			</div>
			<p>Страна: {Results[0]?.Country}</p>
		</div>
	);
};

export default Popup;
