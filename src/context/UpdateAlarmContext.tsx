import { createContext, useState } from "react";

export type UpdateContextValue = {
  showUpdate: boolean;
  handleShowUpdate: (update: boolean) => void;
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

  return (
    <UpdateAlarmContext.Provider value={{ showUpdate, handleShowUpdate: setShowUpdate, applyUpdate }}>
      {children}
    </UpdateAlarmContext.Provider>
  );
};
