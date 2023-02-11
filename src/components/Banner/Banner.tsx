import './Banner.css';

interface BannerProps {
  show: boolean;
  applyUpdate: () => void;
}

export const Banner = (props: BannerProps) => {
  const {show, applyUpdate} = props;

  if (show) {
    return <div className="banner">새 버전으로 업데이트합니다.<button className="btn" onClick={applyUpdate}>확인</button></div>;
  }
  
  return <></>;
}