const handleError = (action, status) => {
	let errorMessage = `${action} 실패 : `;
	switch (status) {
		case 500:
		case 501:
			errorMessage += '서버에 오류가 발생했습니다.';
			break;
		case 401:
			errorMessage +=
        '장기간 사용하지 않아 인증이 만료되었습니다. 다시 로그인 해주세요.';
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
