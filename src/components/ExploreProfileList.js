import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptop } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

function ExploreProfileList({ className, ...props }, settings) {
	return (
	// landing page react-reveal 'Pulse cascade'적용을 위한 props 전달 {...props}//
		<div
			className={`${className}__searchProfile`}
			{...props}
			{...settings}
			key={props.key}
		>
			<div className={`${className}__searchProfile__profileImage`}>
				<FontAwesomeIcon icon={faUserCircle} className="photo-icon" />
			</div>
			<p>{props.user.username ? `${props.user.username}` : '-'}</p>
			<div className={`${className}__searchProfile__socialInfo`}>
				<div>
					<div> 28 </div>
					<div> Recollects </div>
				</div>
				<div>
					<div> 214 </div>
					<div> Following </div>
				</div>
				<div>
					<div> 280 </div>
					<div> Followers </div>
				</div>
			</div>
			<div className={`${className}__searchProfile__companyInfo`}>
				<div>
					<FontAwesomeIcon className="icon" icon={faLaptop} />
					{props.user.company ? `Work at ${props.user.company}` : '-'}
				</div>
				<div>
					<FontAwesomeIcon className="icon" icon={faGithub} />
					{props.user.gitRepo ? `${props.user.gitRepo.slice(8)}` : '-'}
				</div>
			</div>
		</div>
	);
}
  
export default ExploreProfileList;
