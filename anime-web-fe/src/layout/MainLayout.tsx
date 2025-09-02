import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Background from '../components/Background';
import Footer from '../components/footer/Footer';

const MainLayout = () => {
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