import React, { useEffect, useState } from "react";
import { Banner } from './components/Banner/Banner';

export const AppWrapper = ({children}: {children: JSX.Element}) => {
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    
    navigator.serviceWorker.getRegistrations().then((regs) =>
      regs.forEach((reg) => {
        console.log(reg, ' reg');
        if (reg.waiting) setShowUpdate(true);
      })
    );
  }, []);

  const applyUpdate = () => {
    navigator.serviceWorker.getRegistrations().then((regs) =>
      regs.forEach((reg) => {
        reg.waiting?.postMessage({ type: "SKIP_WAITING" });
      })
    );
  };

  return <><Banner show={showUpdate} applyUpdate={applyUpdate}/>{children}</>;
};
