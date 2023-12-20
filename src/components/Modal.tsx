import React, { useEffect, useState } from 'react';
import ModalPhones from './ModalPhones';
import { useSelector } from 'react-redux';
import { setSearchValue } from '../redux/slices/filter';
import { selectModalItems } from '../redux/slices/phones';
import { useAppDispatch } from '../redux/store';
import { RootState } from '../redux/store';

const Modal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { productNum, searchValue } = useSelector((state: RootState) => state.filter);
  let modalItems = useSelector(selectModalItems);

  const [search, setSearch] = useState<string>('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
    dispatch(setSearchValue(event.target.value));
  };

  if (modalItems.length) {
    modalItems = modalItems.filter((obj) => obj.title.toLowerCase().includes(search.toLowerCase()));
  }

  useEffect(() => {
    setSearch(searchValue);
  }, [searchValue]);

  return (
    <div className="additional">
      <div className="wrapper">
        {productNum === 2 ? <input type="text" placeholder="Поиск" onChange={handleSearch} /> : ''}
        {modalItems.length ? modalItems.map((obj) => <ModalPhones key={obj.id} {...obj} />) : ''}
      </div>
    </div>
  );
};

export default Modal;
