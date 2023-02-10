import { createContext, useEffect, useState } from "react";
import * as serviceWorkerRegistration from "../serviceWorkerRegistration";

export type UpdateContextValue = {
  showUpdate: boolean;
  applyUpdate: () => void;
};

export const UpdateAlarmContext = createContext<UpdateContextValue | null>(
  null
);

export const UpdateAlarmProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [showUpdate, setShowUpdate] = useState(false);

  const applyUpdate = () => {
    navigator.serviceWorker.getRegistrations().then((regs) =>
      regs.forEach((reg) => {
        reg.waiting?.postMessage({ type: "SKIP_WAITING" });
      })
    );
  };

  useEffect(() => {
    serviceWorkerRegistration.register({
      onUpdate: () => {
        setShowUpdate(true);
      },
    });

    navigator.serviceWorker.getRegistrations().then((regs) =>
      regs.forEach((reg) => {
        if (reg.waiting) {
          setShowUpdate(true);
        }
      })
    );
  }, []);

  return (
    <UpdateAlarmContext.Provider value={{ showUpdate, applyUpdate }}>
      {children}
    </UpdateAlarmContext.Provider>
  );
};
