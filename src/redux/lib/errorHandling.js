const handleError = ( action, status ) => {
	let errorMessage = `${ action } 실패 : `;
	switch ( status ) {
	case 500:
	case 501:
		errorMessage += '서버에 오류가 발생했습니다.';
		break;
	case 401:
		// action에 따라서 다른메시지 내보내는 함수 실행
		errorMessage += '인증되지 않은 사용자입니다.';
		break;
	case 422:
		errorMessage += '잘못된 정보 입력입니다.';
		break;
	case 409:
		errorMessage += '이미 존재합니다.';
		break;
	default:
		errorMessage += '알 수 없는 오류.';
	}

	return errorMessage;
};

export default handleError;
