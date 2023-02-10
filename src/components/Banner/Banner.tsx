import { useContext } from 'react';
import { UpdateAlarmContext } from '../../context/UpdateAlarmContext';
import './Banner.css';

export const Banner = () => {
  const context = useContext(UpdateAlarmContext);
  if (context?.showUpdate) {
    return <div className="banner">새 버전으로 업데이트합니다.<button className="btn" onClick={context?.applyUpdate}>확인</button></div>;
  }
  return <></>;
}