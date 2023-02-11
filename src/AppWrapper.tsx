import React, { useState } from "react";
import App from './App';
import { Banner } from './components/Banner/Banner';

export const AppWrapper = () => {
  const [showUpdate, setShowUpdate] = useState(false);

  const applyUpdate = () => {
    navigator.serviceWorker.getRegistrations().then((regs) =>
      regs.forEach((reg) => {
        reg.waiting?.postMessage({ type: "SKIP_WAITING" });
      })
    );
  };

  return <><Banner show={showUpdate} applyUpdate={applyUpdate}/><App onShow={(show) => setShowUpdate(show)}/></>;
};
