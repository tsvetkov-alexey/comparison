import React from 'react';
import arrowChange from '../assets/arrowChange.svg';
import { useSelector } from 'react-redux';
import { selectExtractedItems, selectModalItems } from '../redux/slices/phones';
import { closeAllModals } from '../redux/slices/filter';
import { RootState, useAppDispatch } from '../redux/store';

type ModalPhonesProps = {
  id: number;
  title: string;
  mainImage: string;
};

const ModalPhones: React.FC<ModalPhonesProps> = ({ id, title, mainImage }) => {
  let { clickedMain } = useSelector((state: RootState) => state.filter);
  let extractedItems = useSelector(selectExtractedItems);
  let modalItems = useSelector(selectModalItems);
  const dispatch = useAppDispatch();

  const handleClick = (clickedId: number) => {
    const extractedIndex = extractedItems.findIndex((item) => item.id === clickedMain);
    const modalIndex = modalItems.findIndex((item) => item.id === clickedId);

    if (extractedIndex !== -1 && modalIndex !== -1) {
      const extractedItem = extractedItems[extractedIndex];
      const modalItem = modalItems[modalIndex];

      extractedItems[extractedIndex] = modalItem;
      modalItems[modalIndex] = extractedItem;

      dispatch(closeAllModals());
    }
  };

  return (
    <>
      <div className="phones" onClick={() => handleClick(id)}>
        <img src={arrowChange} alt="arrowChange" className="arrowChange" />
        <img src={mainImage} alt={mainImage} />
        <span>{title}</span>
      </div>
    </>
  );
};

export default ModalPhones;
