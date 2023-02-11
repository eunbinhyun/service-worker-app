import React, { useEffect, useState } from "react";
import { Banner } from './components/Banner/Banner';
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

export const AppWrapper = ({children}: {children: JSX.Element}) => {
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    serviceWorkerRegistration.register({
      onUpdate: () => {
        console.log("onUpdate");
        setShowUpdate(true);
      },
      onSuccess: () => {
        console.log("onSuccess");
      },
    });

    navigator.serviceWorker.getRegistrations().then((regs) =>
      regs.forEach((reg) => {
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
