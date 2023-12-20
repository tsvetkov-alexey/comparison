import React from 'react';

import { useSelector } from 'react-redux';
import { setIsChecked, setProductNum } from '../redux/slices/filter';
import PhoneBlock from './PhoneBlock';
import { selectExtractedItems, selectProductNum } from '../redux/slices/phones';
import { RootState, useAppDispatch } from '../redux/store';

const MainInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const productNum = useSelector(selectProductNum);
  const extractedItems = useSelector(selectExtractedItems);
  const { isChecked } = useSelector((state: RootState) => state.filter);

  const handleCheck = () => {
    dispatch(setIsChecked(!isChecked));
  };

  const handleClick = (productNum: number) => {
    dispatch(setProductNum(productNum));
  };

  const list = [2, 3, 4, 5, 6];

  const widthMapping: { [key: number]: string } = {
    2: '35%',
    3: '25%',
    4: '25%',
    5: '23%',
    6: '20%',
  };
  const trueWidth = widthMapping[productNum];

  const containerWidth = {
    width: '83%',
  };

  return (
    <div className="main-info">
      <div className="wrapper">
        <div className="head-information">
          <h2>Смартфоны</h2>
          <div className="count">
            Отобразить товары:
            <ul>
              {list.map((a) => (
                <li
                  className={productNum === a ? 'active' : ''}
                  onClick={() => handleClick(a)}
                  key={a}
                >
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="container" style={productNum === 2 ? containerWidth : { width: '100%' }}>
          <div className="frontCol-1" id="difference" style={{ width: trueWidth }}>
            <div className="wrapper">
              {isChecked ? (
                <input type="checkbox" id="differenceCheck" defaultChecked onClick={handleCheck} />
              ) : (
                <input type="checkbox" id="differenceCheck" onClick={handleCheck} />
              )}

              <label htmlFor="differenceCheck">Показать различия</label>
            </div>
          </div>
          {extractedItems && extractedItems.length
            ? extractedItems.map((obj) => <PhoneBlock key={obj.id} {...obj} />)
            : ''}
        </div>
      </div>
    </div>
  );
};

export default MainInfo;
