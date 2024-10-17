import DocumentTitle from '../../components/DocumentTitle';
import Loader from '../../components/Loader/Loader';

import css from './RefreshingPage.module.css';

export default function RefreshingPage() {
  return (
    <div>
      <DocumentTitle>Refreshing user...</DocumentTitle>

      <div className={css.container}>
        <Loader />
        <h1 className={css.title}>Refreshing user please wait...</h1>
      </div>
    </div>
  );
}
