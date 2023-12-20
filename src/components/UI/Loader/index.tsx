import React from 'react';
import st from './loader.module.scss';

export const Loader: React.FC = () => {
  return (
    <div className={st.loaderContainer}>
      <div className={st.loader}></div>
      <h4 className={st.loaderHeader}>Идет загрузка, подождите...</h4>
    </div>
  );
};
