import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function MayShowNav({ children }) {
  const loc = useLocation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (loc.pathname === '/login-signup') {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [loc.pathname]);

  useEffect(() => {

  }, [loc]);

  return <div>{show && children}</div>;
}

export default MayShowNav;
