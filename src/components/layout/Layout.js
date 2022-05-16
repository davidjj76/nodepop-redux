import T from 'prop-types';

import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

Layout.propTypes = {
  children: T.node,
};

Layout.defaultProps = {
  children: null,
};

export default Layout;
