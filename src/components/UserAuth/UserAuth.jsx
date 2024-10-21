import { useNavigate } from 'react-router-dom';
import css from './UserAuth.module.css'

export default function UserAuth() {

  const navigate = useNavigate();
  const handleSigninClick = () => {
    navigate('/signin');
  };

  return (
    <button onClick={handleSigninClick}>
      <div className={css.buttWrap}>
        <div className={css.text}>Sing in</div>
        <div className={css.iconWrap}>
          <svg width="15" height="20" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.75 5C11.75 5.99456 11.3549 6.94839 10.6516 7.65165C9.94837 8.35491 8.99454 8.75 7.99998 8.75C7.00541 8.75 6.05159 8.35491 5.34833 7.65165C4.64506 6.94839 4.24998 5.99456 4.24998 5C4.24998 4.00544 4.64506 3.05161 5.34833 2.34835C6.05159 1.64509 7.00541 1.25 7.99998 1.25C8.99454 1.25 9.94837 1.64509 10.6516 2.34835C11.3549 3.05161 11.75 4.00544 11.75 5ZM0.500977 19.118C0.533111 17.1504 1.33731 15.2742 2.74015 13.894C4.14299 12.5139 6.03206 11.7405 7.99998 11.7405C9.96789 11.7405 11.857 12.5139 13.2598 13.894C14.6626 15.2742 15.4668 17.1504 15.499 19.118C13.1464 20.1968 10.5881 20.7535 7.99998 20.75C5.32398 20.75 2.78398 20.166 0.500977 19.118Z" stroke="#2F2F2F" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </button >
  )
}
