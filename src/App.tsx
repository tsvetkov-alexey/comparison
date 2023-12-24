import { useEffect } from 'react';
import Header from './components/Header';
import MainInfo from './components/MainInfo';
import TableInfo from './components/TableInfo';
import { fetchPhones } from './redux/slices/phones';
import { useSelector } from 'react-redux';
import { Loader } from './components/UI/Loader';
import { RootState, useAppDispatch } from './redux/store';

function App() {
  const dispatch = useAppDispatch();
  const { productNum } = useSelector((state: RootState) => state.filter);
  const { phoneInfo } = useSelector((state: RootState) => state.phones);

  useEffect(() => {
    dispatch(fetchPhones());
  }, [productNum]);

  if (!phoneInfo.length) {
    return (
      <>
        <Header />
        <Loader />
      </>
    );
  }

  return (
    <>
      <Header />
      <MainInfo />
      <TableInfo />
    </>
  );
}

export default App;
