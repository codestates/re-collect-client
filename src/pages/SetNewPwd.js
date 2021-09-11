import React, { useEffect } from 'react';

function SetNewPwd(props) {
	useEffect(() => {
		props.setModalMode('setNewPwd');
	}, []);

	return <div className="SetNewPwd__container"></div>;
}

export default SetNewPwd;
