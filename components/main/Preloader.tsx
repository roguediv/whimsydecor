import Link from "next/link";

type props = {
  className?: string;
  isSvg?: boolean;
}

const Preloader: React.FC<props> = ({className = '', isSvg = false}) => {
  return (
    <div className="Preloader">
      <div className="preloader-inner">
        <span className="dot"></span>
        <div className="dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  )
}

export default Preloader
