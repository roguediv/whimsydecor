import Image from "next/image";
import ProjectPreview from "../cards/ProjectPreview";
import Link from "next/link";
import { FaGreaterThan } from "react-icons/fa";
import { Project } from "@prisma/client";
import { GlobalWebDomain } from "@/components/main/global";

type Props = {
  className?: string;
  small?: boolean;
  projects?: Project[] | null;
};

const Action: React.FC<Props> = ({ className = '', small=false, projects = null}) => {
  if (!projects) return;
  let featuredProject : Project = projects.filter(project => project.isFeatured)[0];
  let orderedProjects : Project[] = projects.sort((a, b) => a.order - b.order);
  if (!small) {
    featuredProject = projects.filter(project => project.isFeatured)[0];
    orderedProjects = projects.filter(project => !project.isFeatured).sort((a, b) => a.order - b.order);
  }

  return (
    <section className={`ShowProjects ${className}`}>
      <div className="background DottedLines">
        <svg width="1373" height="1216" viewBox="0 0 1373 1216" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3C95.5 205 241.5 422 486.5 434.5C682.5 444.5 798.541 602.941 941 772C1061.5 915 1105 987.5 1262.5 1042C1472.39 1114.63 1485.57 948.264 1615 895.5C1758.5 837 1945 987 2124 987C2277 987 2408 963.8 2700 655C3065 269 3321 1217 3588 1212.5" stroke="#162B2B" strokeWidth="5" strokeLinecap="round" strokeDasharray="16 20"/></svg>
        <svg width="299" height="3505" viewBox="0 0 299 3505" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M-2159 3511C-2022 3613.5 -1512.5 3412.5 -1418.5 2967.5C-1324.5 2522.5 -1106 2424 -832 2492.5C-468.648 2583.34 -347.5 2514.17 -210.5 2468.5C158.501 2357 242 2058 248.002 1921.19C252.998 1807.3 73.5015 1755.19 132.002 1611.69C184.766 1482.26 351.131 1469.09 278.502 1259.19C224.002 1101.69 75.5015 997.693 8.50151 937.693C-91.3323 857.463 -289.4 642.504 -283 424.504C-275 152.004 -567.5 -40.4963 -792.5 11.5037C-1017.5 63.5037 -1105.5 264.004 -1346.5 224.004" stroke="#162B2B" strokeWidth="5" strokeLinecap="round" strokeDasharray="16 20"/></svg>
      </div>
      <svg className="drips" width="935" height="165" viewBox="0 0 935 165" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M844.5 53.5001C841.7 32.3001 847 35.5 858.5 27.5001C870 19.5001 888.187 27.0001 904.5 22.5C919 18.5 935 18 935 18V0H858.5H0V18C24 18 73.4 17.7 79 20.5C86 24 87 27.5001 96 26.0001C105 24.5001 117 37.5 112 52C107 66.5 108.5 81.5 117 79.5C125.5 77.5 122.5 68 121 51.0001C119.5 34.0001 124 27.5001 129 27.5001C134 27.5001 134 44.5 143.5 46C153 47.5 157.5 33.0001 159 30.0001C160.5 27.0001 165 13.0001 179 23.0001C193 33.0001 185 80.0001 184.5 102.5C184 125 195 125.5 197.5 125.5C200 125.5 213 124.5 208.5 107C204 89.5001 205.5 67.0001 208.5 47.5001C211.5 28.0001 219.5 25.5001 229 26.0001C238.5 26.5001 243.5 30.0001 245 38.5001C246.5 47.0001 240 65.5001 253 66.0001C266 66.5001 260.5 40.5001 260 33.0001C259.5 25.5001 263.5 24.0001 267.5 24.0001C271.5 24.0001 273 32.0001 279.5 33.0001C286 34.0001 282 32.0001 296.5 33.0001C308.1 33.8001 308.667 45.3334 307.5 51.0001C304 78.0001 307.5 87.0001 311 90.0001C314.5 93.0001 332 99.0001 326.5 70.5001C321 42.0001 328 32.5001 332 27.5001C336 22.5001 344 22.5001 345 27.5001C346 32.5001 351.5 35 354.5 38.5001C357.5 42.0001 363 47.5001 359.5 63.5C356 79.4999 362.5 79.5001 365.5 77.0001C368.5 74.5001 366 63.5 366.5 59C367 54.5001 366.5 49.5001 373 47.5001C379.5 45.5001 379 61.0001 378.5 68.5001C378 76.0001 372 104 383.5 102.5C395 101 385.5 73 385.5 63.5C385.5 53.9999 389.5 35 403 27.5001C416.5 20.0001 421 59 425 85C429 111 409 146.5 431.5 148.5C454 150.5 436.5 85 436.5 73C436.5 61 442.5 56.5 449 49C455.5 41.5001 459 49 461 59C463 69 453.5 93.5 464.5 96C475.5 98.5 469 78 469 69.5001C469 61.0002 473.5 49 479.5 45.5C485.5 42 480.5 75 478.5 85C476.5 95.0001 482 111.5 492.5 104C503 96.5 490 69.5001 495.5 65.5C501 61.4999 505 59 509.5 49C514 39 515.5 37 526 35C536.5 33 540 63.5 537.5 96C535 128.5 537 137.5 546.5 138.5C556 139.5 560.5 127 557 111.5C553.5 96 557 75 560.5 54C564 33.0001 578.5 28.5001 584 27.5001C589.5 26.5001 603.5 30.5001 598.5 49C593.5 67.5 596.5 80.5001 603.5 81.5001C610.5 82.5001 617 78 613 63.5C609 48.9999 611 40 613 39.5C615 39 617.5 35 619.5 43.5001C621.5 52.0002 633 49 641.5 49C650 49 660.5 59 658 78C655.5 97.0001 659.5 107 669 107C678.5 107 679.5 93 677 75C674.5 56.9999 678 49 683 43.5001C688 38.0002 697.5 39 697.5 43.5001C697.5 48.0003 705 49 708 56.5C711 63.9999 708.5 88 712.5 88C716.5 88 717 84.5 716.5 75C716 65.5 722.5 63 724.5 63.5C726.5 64 733 62 729 88C725 114 729.5 119.5 733 119.5C736.5 119.5 740.5 118.5 740.5 107C740.5 95.5 736.5 81 737.5 69.5001C738.5 58.0003 744.5 46.5 751.5 43.5001C758.5 40.5002 762 43.5001 765.5 49C769 54.4999 782 88 775.5 122C769 156 774 164.5 782 164.5C790 164.5 794.5 155.5 788 122C781.5 88.5 788 74.5 794.5 69.5001C801 64.5002 805 64 811 59C817 54 816 31.5 825.5 33C835 34.5 831 53.5001 830.5 72C830 90.4998 831 105 841 106C851 107 848 80.0001 844.5 53.5001Z" fill="#111D1D"/></svg>
      <div className="sct-content">
        {small?
        <>
        <div className="two-grid small-header">
          <h2>Explore More</h2>
          <Link className="a-orange-100" href="/projects">View All <FaGreaterThan /></Link>
        </div>
        </>
         : <>
        <div className="sct-header center">
          <h5>Our Work</h5>
          <h2>Explore Our Projects</h2>
          <button className="orange">View All</button>
        </div>
        {featuredProject ? <>
          <div className="two-grid">
            <div className="image">
              <Image 
                src={featuredProject.img1? `${GlobalWebDomain}/images/uploads/${featuredProject.img1}` : '/images/error.webp'}
                width={700}
                height={700}
                alt={`${featuredProject.img1Desc}`}/>
              <Image 
                src={featuredProject.img2? `${GlobalWebDomain}/images/uploads/${featuredProject.img2}` : '/images/error.webp'}
                width={300}
                height={300}
                alt={`${featuredProject.img2Desc}`}/>
              <Image 
                src={featuredProject.img3? `${GlobalWebDomain}/images/uploads/${featuredProject.img3}` : '/images/error.webp'}
                width={300}
                height={300}
                alt={`${featuredProject.img3Desc}`}/>
            </div>
            <div className="p-2">
              <h5>Featured Project</h5>
              <Link href={`/projects/${featuredProject.projectID}`}><h4>{featuredProject.title.replace("/nl", "")}</h4></Link>
              <p>{featuredProject.shortDesc}</p>
              <svg width="131" height="140" viewBox="0 0 131 140" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M78.5998 52.4001L67.2421 45.9581L55.9099 39.4725L55.8844 26.5449L55.9099 13.6173L67.2421 7.13162L78.5998 0.689622L89.9575 7.13162L101.29 13.6173L101.315 26.5449L101.29 39.4725L89.9575 45.9582L78.5998 52.4001Z" fill="#E09263"/><path d="M115.473 88.1981L104.8 94.2516L94.1273 88.1981L94.1226 88.1955L83.4875 82.1088L83.4635 69.9844L83.4635 69.9789L83.4875 57.8545L94.1226 51.7678L94.1273 51.7652L104.8 45.7117L115.473 51.7652L115.477 51.7678L126.112 57.8545L126.136 69.9789L126.136 69.9844L126.112 82.1088L115.477 88.1955L115.473 88.1981Z" stroke="#E09263" strokeWidth="2.75789"/><path d="M78.5998 139.274L67.2421 132.832L55.9099 126.346L55.8844 113.419L55.9099 100.491L67.2421 94.0053L78.5998 87.5633L89.9575 94.0053L101.29 100.491L101.315 113.419L101.29 126.346L89.9575 132.832L78.5998 139.274Z" fill="#E09263"/><path d="M52.4001 95.8369L41.0424 89.3949L29.7102 82.9093L29.6847 69.9816L29.7102 57.054L41.0424 50.5684L52.4001 44.1264L63.7578 50.5684L75.09 57.054L75.1155 69.9817L75.09 82.9093L63.7578 89.3949L52.4001 95.8369Z" fill="url(#paint0_linear_48_797)"/><path d="M36.8726 131.635L26.1999 137.688L15.5272 131.635L15.5225 131.632L4.8874 125.546L4.86344 113.421L4.86344 113.416L4.8874 101.291L15.5225 95.2047L15.5272 95.2021L26.1999 89.1486L36.8727 95.2021L36.8773 95.2047L47.5124 101.291L47.5364 113.416L47.5364 113.421L47.5124 125.546L36.8773 131.632L36.8726 131.635Z" stroke="#E09263" strokeWidth="2.75789"/><defs><linearGradient id="paint0_linear_48_797" x1="299.825" y1="95.8369" x2="-97.5112" y2="96.5557" gradientUnits="userSpaceOnUse"><stop stopColor="#8D7F61"/><stop offset="0.151457" stopColor="#F1DCAD"/><stop offset="0.267035" stopColor="#8E7B53"/><stop offset="0.382648" stopColor="#E5D9A9"/><stop offset="0.495657" stopColor="#8A724C"/><stop offset="0.620286" stopColor="#E5D9A9"/><stop offset="0.73364" stopColor="#8E7B53"/><stop offset="0.866263" stopColor="#F1DCAD"/><stop offset="1" stopColor="#8D7F61"/></linearGradient></defs></svg>
            </div>
          </div>   
        </> : <></>}
        </>}
        <div className="three-grid">
          {orderedProjects.slice(0, 3).map((project, i) => {
            return <ProjectPreview key={i} project={project} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Action;