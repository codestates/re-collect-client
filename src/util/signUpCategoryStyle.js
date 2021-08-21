const customStyles = {
	container: (provided, state) => ({
		...provided,
		width: 160,
		height: 45,
		border: '1px #214bc8 solid',
		borderLeft: 'none',
		display: 'flex',
		background: 'white',
		boxSizing: 'border-box',
	}),

	control: () => ({
		display: 'flex',
		flex: 1,
		width: 40,
	}),

	placeholder: (provided) => ({
		...provided,
		color: 'rgba(0, 0, 0, 0.5)',
		fontSize: 13,
	}),

	singleValue: (provided, state) => {
		const opacity = state.isDisabled ? 0.5 : 1;
		const transition = 'opacity 300ms';

		return { ...provided, opacity, transition };
	},

	valueContainer: (provided) => ({
		...provided,
		fontSize: 13,
		fontFamily: 'Noto Sans KR',
		paddingLeft: 0,
	}),

	menu: (provided) => ({
		...provided,
		border: '1px #214bc8 solid',
		borderRadius: 2,
		marginTop: 9,
		fontFamily: 'Noto Sans KR',
	}),

	indicatorsContainer: (provided) => ({
		...provided,
	}),

	dropdownIndicator: (provided) => ({
		...provided,
		fontSize: 10,
	}),
};

export default customStyles;
