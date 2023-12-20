import React, { useEffect, useRef } from 'react';
import arrowDown from '../assets/arrowDown.svg';
import Modal from './Modal';
import { useSelector } from 'react-redux';
import { closeAllModals, setClickedMain, setOpenModalId } from '../redux/slices/filter';
import { selectProductNum } from '../redux/slices/phones';
import { RootState, useAppDispatch } from '../redux/store';

type PhoneBlockProps = {
  id: number;
  title: string;
  mainImage: string;
};

const PhoneBlock: React.FC<PhoneBlockProps> = ({ id, title, mainImage }) => {
  const dispatch = useAppDispatch();

  const productNum = useSelector(selectProductNum);
  const openModalId = useSelector((state: RootState) => state.filter.openModalId);

  const modalRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (openModalId === id) {
      dispatch(closeAllModals());
    } else {
      dispatch(setOpenModalId(id));
    }
    dispatch(setClickedMain(id));
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      dispatch(closeAllModals());
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className="phoneBlock">
      <div className="phone">
        <img src={mainImage} alt={mainImage} />
        <h5>{title}</h5>
      </div>

      {productNum < 6 &&
        (id === 3 || id === 4 ? ( // Это специальное условие, чтобы поправить непонятный косяк с версткой стрелочек
          <img
            src={arrowDown}
            alt="arrowDown"
            className="arrowDown"
            id="specialArr"
            onClick={handleClick}
          />
        ) : (
          <img src={arrowDown} alt="arrowDown" className="arrowDown" onClick={handleClick} />
        ))}

      {openModalId === id && (
        <div ref={modalRef}>
          <Modal />
        </div>
      )}
    </div>
  );
};

export default PhoneBlock;
