'use client'
import Image from 'next/image'
import { useRef, useEffect, useState } from "react"
import SetActive from './SetActive'
import { useRouter } from 'next/navigation'
import Preloader from './Preloader'
import Link from 'next/link'
import { GlobalUploadURL } from './global'
import BtnForm from '../elements/forms/BtnForm'


type props = {
  className?: string;
  page?: string;
  title?:string;
  desc?: string;
  src?: string | null;
}

const Header: React.FC<props> = ({className = '', page = "Whimsy Decor", title = "", desc = "", src = "background.jpg"}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [postLoaded, setPostLoaded] = useState(false);
  const [slideClass, setSlideClass] = useState(0);
  const slideClassRef = useRef(0);
  const router = useRouter()
  useEffect(() => {
    setIsLoaded(true);
    const timer = setTimeout(() => {
      setPostLoaded(true);
    }, 750);

    const intervalId = setInterval(() => {
      // let newSlideClass = 1
      // if (slideClass == 0) {newSlideClass = 2}
      // else if (slideClass < 4) {newSlideClass = slideClass + 1}
      // setSlideClass(newSlideClass);
      // console.log(slideClass)
      slideClassRef.current = (() => {
        if (slideClassRef.current === 0) return 2;
        if (slideClassRef.current < 4) return slideClassRef.current + 1;
        return 1; // Reset or loop back if needed
      })();
      setSlideClass(slideClassRef.current);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(intervalId);
    };
  }, []);

  if (page == 'home') {
    return (
      <>
        <SetActive activeText={""} />
        <header className={`${page} ${className} ${isLoaded ? 'animate' : ''} ${postLoaded ? 'postAnimate' : ''}`}>
          <Preloader/>
          <div className="background">
            <svg className="h-1" width="454" height="840" viewBox="0 0 454 840" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M449.485 178.402C455.422 189.383 455.422 202.617 449.485 213.598L285.097 517.64L103.983 812.026C97.4416 822.658 85.9807 829.275 73.5027 829.624L-272 839.28L-617.503 829.624C-629.981 829.275 -641.442 822.658 -647.983 812.026L-829.097 517.64L-993.485 213.598C-999.422 202.617 -999.422 189.383 -993.485 178.402L-829.097 -125.64L-647.983 -420.026C-641.442 -430.658 -629.981 -437.275 -617.503 -437.624L-272 -447.28L73.5028 -437.623C85.9807 -437.275 97.4417 -430.658 103.983 -420.026L285.097 -125.64L449.485 178.402Z" fill="#111D1D"/></svg>
            <svg className="h-2" width="1069" height="952" viewBox="0 0 1069 952" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1064.5 458.415C1070.43 469.389 1070.43 482.611 1064.5 493.585L945.654 713.6L814.73 926.603C808.191 937.242 796.727 943.864 784.243 944.213L534.5 951.2L284.756 944.213C272.273 943.864 260.809 937.242 254.27 926.603L123.346 713.6L4.49894 493.585C-1.42893 482.611 -1.42892 469.389 4.49894 458.415L123.346 238.4L254.27 25.3971C260.809 14.7582 272.273 8.13578 284.756 7.78656L534.5 0.799964L784.244 7.78659C796.727 8.1358 808.191 14.7583 814.73 25.3971L945.654 238.4L1064.5 458.415Z" fill="#E09263"/></svg>
            <svg className="drips" preserveAspectRatio="none" width="955" height="165" viewBox="0 0 955 165" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M90.5 53.5001C93.3 32.3001 88 35.5 76.5 27.5001C65 19.5001 46.8127 27.0001 30.5 22.5C16 18.5 0 18 0 18V0H76.5H935V18C911 18 861.6 17.7 856 20.5C849 24 848 27.5001 839 26.0001C830 24.5001 818 37.5 823 52C828 66.5 826.5 81.5 818 79.5C809.5 77.5 812.5 68 814 51.0001C815.5 34.0001 811 27.5001 806 27.5001C801 27.5001 801 44.5 791.5 46C782 47.5 777.5 33.0001 776 30.0001C774.5 27.0001 770 13.0001 756 23.0001C742 33.0001 750 80.0001 750.5 102.5C751 125 740 125.5 737.5 125.5C735 125.5 722 124.5 726.5 107C731 89.5001 729.5 67.0001 726.5 47.5001C723.5 28.0001 715.5 25.5001 706 26.0001C696.5 26.5001 691.5 30.0001 690 38.5001C688.5 47.0001 695 65.5001 682 66.0001C669 66.5001 674.5 40.5001 675 33.0001C675.5 25.5001 671.5 24.0001 667.5 24.0001C663.5 24.0001 662 32.0001 655.5 33.0001C649 34.0001 653 32.0001 638.5 33.0001C626.9 33.8001 626.333 45.3334 627.5 51.0001C631 78.0001 627.5 87.0001 624 90.0001C620.5 93.0001 603 99.0001 608.5 70.5001C614 42.0001 607 32.5001 603 27.5001C599 22.5001 591 22.5001 590 27.5001C589 32.5001 583.5 35 580.5 38.5001C577.5 42.0001 572 47.5001 575.5 63.5C579 79.4999 572.5 79.5001 569.5 77.0001C566.5 74.5001 569 63.5 568.5 59C568 54.5001 568.5 49.5001 562 47.5001C555.5 45.5001 556 61.0001 556.5 68.5001C557 76.0001 563 104 551.5 102.5C540 101 549.5 73 549.5 63.5C549.5 53.9999 545.5 35 532 27.5001C518.5 20.0001 514 59 510 85C506 111 526 146.5 503.5 148.5C481 150.5 498.5 85 498.5 73C498.5 61 492.5 56.5 486 49C479.5 41.5001 476 49 474 59C472 69 481.5 93.5 470.5 96C459.5 98.5 466 78 466 69.5001C466 61.0002 461.5 49 455.5 45.5C449.5 42 454.5 75 456.5 85C458.5 95.0001 453 111.5 442.5 104C432 96.5 445 69.5001 439.5 65.5C434 61.4999 430 59 425.5 49C421 39 419.5 37 409 35C398.5 33 395 63.5 397.5 96C400 128.5 398 137.5 388.5 138.5C379 139.5 374.5 127 378 111.5C381.5 96 378 75 374.5 54C371 33.0001 356.5 28.5001 351 27.5001C345.5 26.5001 331.5 30.5001 336.5 49C341.5 67.5 338.5 80.5001 331.5 81.5001C324.5 82.5001 318 78 322 63.5C326 48.9999 324 40 322 39.5C320 39 317.5 35 315.5 43.5001C313.5 52.0002 302 49 293.5 49C285 49 274.5 59 277 78C279.5 97.0001 275.5 107 266 107C256.5 107 255.5 93 258 75C260.5 56.9999 257 49 252 43.5001C247 38.0002 237.5 39 237.5 43.5001C237.5 48.0003 230 49 227 56.5C224 63.9999 226.5 88 222.5 88C218.5 88 218 84.5 218.5 75C219 65.5 212.5 63 210.5 63.5C208.5 64 202 62 206 88C210 114 205.5 119.5 202 119.5C198.5 119.5 194.5 118.5 194.5 107C194.5 95.5 198.5 81 197.5 69.5001C196.5 58.0003 190.5 46.5 183.5 43.5001C176.5 40.5002 173 43.5001 169.5 49C166 54.4999 153 88 159.5 122C166 156 161 164.5 153 164.5C145 164.5 140.5 155.5 147 122C153.5 88.5 147 74.5 140.5 69.5001C134 64.5002 130 64 124 59C118 54 119 31.5 109.5 33C100 34.5 104 53.5001 104.5 72C105 90.4998 104 105 94 106C84 107 87 80.0001 90.5 53.5001Z" fill="#243333"/></svg>
            <Image className="chair"
              priority
              src={`/images/sections/header/chair.png`}
              width={1500}
              height={1500}
              alt="Chair"/>
          </div>
          <div className="content">
            <div className="text">
              <h1>Home<br />Sweet<br />Hive</h1>
              <p>We design homes that buzz with purpose and harmony, inspired by the natural efficiency of a hive—where every space has a role and every detail brings warmth to your family.</p>
              <div className="btns">
                <BtnForm className='gold' form='ContactForm' text='Start Project' />
                <Link href="#home-sct-1"><button className="white">Learn More</button></Link>
              </div>
            </div>
          </div>
        </header>
      </>
    )
  } else if (page == 'project') {
    if (title == '' || title == undefined) {
      return (<>
        <SetActive activeText={"Our Work"} />
        <header className={`${page} defaultProjectHeader ${className} ${isLoaded ? 'animate' : ''} ${postLoaded ? 'postAnimate' : ''}`}>
            <Preloader/>
          <div className="background">
            <div className={`carousel slide-${slideClass}`}>
              <Image priority
                src={`/images/projects/works/bk-1.png`}
                width={1500}
                height={1500}
                alt="Chair"/> 
              <Image 
                src={`/images/projects/works/bk-2.png`}
                width={1500}
                height={1500}
                alt="Chair"/> 
              <Image 
                src={`/images/projects/works/bk-3.png`}
                width={1500}
                height={1500}
                alt="Chair"/> 
              <Image 
                src={`/images/projects/works/bk-4.png`}
                width={1500}
                height={1500}
                alt="Chair"/> 
              <Image 
                src={`/images/projects/works/bk-1.png`}
                width={1500}
                height={1500}
                alt="Chair"/> 
            </div>
            <div className="icons">
              <Image priority
                src={`/images/projects/works/icon-1.png`}
                width={250}
                height={250}
                alt="Chair"/> 
              <Image priority
                src={`/images/projects/works/icon-2.png`}
                width={250}
                height={250}
                alt="Chair"/> 
              <Image priority
                src={`/images/projects/works/icon-3.png`}
                width={250}
                height={250}
                alt="Chair"/> 
              <Image priority
                src={`/images/projects/works/icon-4.png`}
                width={250}
                height={250}
                alt="Chair"/> 
              <Image priority
                src={`/images/projects/works/icon-5.png`}
                width={250}
                height={250}
                alt="Chair"/> 
              <Image priority
                src={`/images/projects/works/icon-6.png`}
                width={250}
                height={250}
                alt="Chair"/> 
            </div>
          </div>
        </header>
      </>)
    }
    return (
      <>
        <SetActive activeText={"Our Work"} />
        <header className={`${page} ${title} ${className} ${isLoaded ? 'animate' : ''} ${postLoaded ? 'postAnimate' : ''}`}>
          <Preloader/>
          <div className="background">
          <Image priority
            src={src && src != "background.jpg" ? `${GlobalUploadURL}${src}` : '/images/error.webp'}
            width={1500}
            height={1500}
            alt="Chair"/> 
          </div>
        </header>
      </>
    )
  } else if (page == "about") {
    return (
      <>
        <SetActive activeText={"about us"} />
        <header className={`${page} ${className} ${isLoaded ? 'animate' : ''} ${postLoaded ? 'postAnimate' : ''}`}>
          <Preloader/>
          <div className="background">
            <Image priority
              src={`/images/sections/header/about.png`}
              width={2000}
              height={2000}
              alt="About Header"/> 
          </div>
          <div className="content">
            <div className="text">
              <h5>About Us</h5>
              <h2>Our Story</h2>
              <p>Naomi and Brad Malon founded Whimsy Decor in 2022, combining modern craftsmanship, custom designs, and vibrant murals to create spaces brimming with personality. Their shared love for the arts fuels their work, crafting dream homes that feel like a buzzing hive of joy and belonging.</p>
              <div className="css-hexagon"></div>
            </div>
          </div>
        </header>
      </>
    )
  } else {
    return (
      <>
        <SetActive activeText={page} />
        <header className={`${page} ${className} ${isLoaded ? 'animate' : ''} ${postLoaded ? 'postAnimate' : ''}`}>
          <Preloader/>
        </header>
      </>
    )
  }
  
  
}

export default Header
