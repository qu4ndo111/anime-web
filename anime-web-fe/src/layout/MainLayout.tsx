import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Background from '../components/Background';
import Footer from '../components/footer/Footer';
import { useEffect, useState } from 'react';
import Loading from '../components/common/Loading';

const MainLayout = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if(isLoading) {
    return <>
      <Loading />
    </>
  }
  
  return (
    <div>
      <Background />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;