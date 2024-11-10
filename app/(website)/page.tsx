import Hexcon from "@/components/elements/icons/Hexcon";
import Action from "@/components/elements/sections/Action";
import ShowProjects from "@/components/elements/sections/ShowProjects";
import Header from "@/components/main/Header";
import Image from "next/image";
import { PrismaClient } from "@prisma/client";
import { GlobalUploadURL } from "@/components/main/global";
const db = new PrismaClient();

export default async function Home() {
  const projects = await db.project.findMany({where: {isLive: true}})
  const testimonial = await db.testimonial.findFirst();
  return (
    <div id="pge-home">
      <Header page="home" />
      <section id="home-sct-1">
        <div className="sct-content">
          <div className="sct-header center">
            <h5>What We Do</h5>
            <h2>Our Services</h2>
          </div>

          <div className="three-grid">
            <div className="p-1">
              <Hexcon icon="pencil" dots={true} />
              <h5>Interior Redesign</h5>
              <p>Refresh your space with a tailored redesign.</p>
            </div>
            <div className="p-2">
              <Hexcon icon="map" dots={true} />
              <h5>Floor Plan Layout</h5>
              <p>Create a functional and stylish layout.</p>
            </div>
            <div className="p-3">
              <Hexcon icon="furniture" dots={true} />
              <h5>Home Staging</h5>
              <p>Boost your home's appeal for buyers.</p>
            </div>
            <div className="p-4">
              <Hexcon icon="paint" dots={true} />
              <h5>Painting</h5>
              <p>Revitalize your walls with expert painting & murals.</p>
            </div>
            <div className="p-5">
              <Hexcon icon="slabs" dots={true} />
              <h5>Color Consulting</h5>
              <p>Discover your ideal color palette.</p>
            </div>
            <div className="p-6">
              <Hexcon icon="decor" />
              <h5>Custom Decor</h5>
              <p>Personalize your home with unique decor.</p>
            </div>
          </div>
        </div>
      </section>
      <section id="home-sct-2">
        <div className="sct-content">
          <div className="two-grid">
            <div className="p-1">
              <h2>Designs inspired by<br/> the <span> <span>new generation.</span><svg width="455" height="96" viewBox="0 0 455 96" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M430.152 52.3917C430.152 54.5988 428.903 56.8432 426.318 59.1014C423.737 61.3566 419.894 63.5604 414.887 65.6766C404.878 69.9069 390.358 73.7302 372.37 76.946C336.404 83.3758 286.692 87.3563 231.765 87.3563C176.837 87.3563 127.125 83.3758 91.1589 76.946C73.1707 73.7302 58.6508 69.9069 48.6422 65.6766C43.6355 63.5604 39.7924 61.3566 37.211 59.1014C34.6262 56.8432 33.377 54.5988 33.377 52.3917C33.377 50.1847 34.6262 47.9403 37.211 45.6821C39.7924 43.4268 43.6355 41.2231 48.6422 39.1069C58.6508 34.8766 73.1707 31.0533 91.1589 27.8375C127.125 21.4077 176.837 17.4272 231.765 17.4272C286.692 17.4272 336.404 21.4077 372.37 27.8375C390.358 31.0533 404.878 34.8766 414.887 39.1069C419.894 41.2231 423.737 43.4268 426.318 45.6821C428.903 47.9403 430.152 50.1847 430.152 52.3917Z" stroke="#F0B28C" strokeWidth="1.22183"/><path d="M430.151 53.5386C430.151 56.2656 428.879 58.985 426.339 61.6767C423.796 64.3712 420.015 66.9998 415.093 69.5227C405.251 74.5676 390.97 79.1288 373.272 82.966C337.886 90.6383 288.972 95.3887 234.922 95.3887C180.873 95.3887 131.958 90.6383 96.5721 82.966C78.874 79.1288 64.593 74.5676 54.7513 69.5227C49.8296 66.9998 46.0487 64.3712 43.5056 61.6767C40.9652 58.985 39.6934 56.2656 39.6934 53.5386C39.6934 50.8116 40.9652 48.0922 43.5056 45.4005C46.0487 42.706 49.8296 40.0774 54.7513 37.5545C64.593 32.5096 78.874 27.9484 96.5721 24.1112C131.958 16.4389 180.873 11.6885 234.922 11.6885C288.972 11.6885 337.886 16.4389 373.272 24.1112C390.97 27.9484 405.251 32.5096 415.093 37.5545C420.015 40.0774 423.796 42.706 426.339 45.4005C428.879 48.0922 430.151 50.8116 430.151 53.5386Z" stroke="#F0B28C" strokeWidth="1.22183"/><path d="M442.786 50.67C442.786 53.6021 441.464 56.5172 438.838 59.3938C436.21 62.2738 432.305 65.0813 427.224 67.7748C417.064 73.1612 402.321 78.0306 384.053 82.1271C347.525 90.3177 297.033 95.3891 241.24 95.3891C185.447 95.3891 134.954 90.3177 98.4266 82.1271C80.1579 78.0306 65.4155 73.1612 55.2552 67.7748C50.1745 65.0813 46.2691 62.2738 43.6409 59.3938C41.0157 56.5172 39.6934 53.6021 39.6934 50.67C39.6934 47.7379 41.0157 44.8229 43.6409 41.9463C46.2691 39.0662 50.1745 36.2588 55.2552 33.5653C65.4155 28.1789 80.1579 23.3094 98.4266 19.213C134.954 11.0223 185.447 5.95094 241.24 5.95094C297.033 5.95094 347.525 11.0223 384.053 19.213C402.321 23.3094 417.064 28.1789 427.224 33.5653C432.305 36.2588 436.21 39.0662 438.838 41.9463C441.464 44.8229 442.786 47.7379 442.786 50.67Z" stroke="#F0B28C" strokeWidth="1.22183"/><path d="M9.07818 78.2167C24.8686 52.3927 81.733 18.5423 183.604 18.5425" stroke="#F0B28C" strokeWidth="1.22183"/><path d="M451.291 41.492C414.179 20.8325 343.66 5.84421 241.788 5.84434" stroke="#F0B28C" strokeWidth="1.22183"/></svg></span></h2>
              <button>View Our Process</button>
            </div>
            <div className="p-2"><p>Celebrate your individuality, steer clear of ordinary and embracing uniqueness tailored to your personality, leaving cookie-cutter styles far behind.</p></div>
          </div>
          <Image className="chair"
                src={`/images/homeSct2.png`}
                width={1500}
                height={500}
                alt={`Beautiful Interior Design`}/>
        </div>
      </section>
      <ShowProjects projects={projects} />
      <section id="home-sct-4">
        <div className="sct-content">
          <div className="two-grid">
            <div className="p-1">
              <div className="css-hexagon shadow"></div>
              <div className="css-hexagon image">
                <Image 
                  src={testimonial?.img1 ? `${GlobalUploadURL}${testimonial.img1}` : '/images/error.webp'}
                  width={500}
                  height={500}
                  alt={`Beautiful Interior Design`}/>
              </div>
              <div className="css-hexagon"></div>
              <svg width="133" height="134" viewBox="0 0 133 134" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.76126 68.4186C0.285818 67.5326 0.285819 66.4674 0.76126 65.5814L15.8202 37.52L32.4015 10.3658C32.9307 9.49917 33.8624 8.95906 34.8774 8.93047L66.5 8.04L98.1225 8.93047C99.1376 8.95906 100.069 9.49917 100.598 10.3658L117.18 37.52L132.239 65.5814C132.714 66.4674 132.714 67.5326 132.239 68.4186L117.18 96.48L100.598 123.634C100.069 124.501 99.1376 125.041 98.1226 125.07L66.5 125.96L34.8775 125.07C33.8624 125.041 32.9307 124.501 32.4015 123.634L15.8202 96.48L0.76126 68.4186Z" fill="url(#paint0_linear_52_826)"/><path d="M85.9375 87.8125C83.7292 87.8125 81.6875 87.4583 79.8125 86.75C77.9792 86.0417 76.3958 85.0208 75.0625 83.6875C73.7292 82.3125 72.6875 80.6667 71.9375 78.75C71.1875 76.8333 70.8125 74.6667 70.8125 72.25C70.8125 66.7917 72.6667 61.5833 76.375 56.625C80.125 51.625 85.5625 47.1875 92.6875 43.3125L99.5625 53.125C97.6875 54.125 96.0208 55.1042 94.5625 56.0625C93.1458 57.0208 91.8958 58 90.8125 59C89.7708 60 88.8542 61.0417 88.0625 62.125C87.3125 63.1667 86.625 64.2917 86 65.5C88.0417 65.5 89.875 65.7917 91.5 66.375C93.1667 66.9583 94.5833 67.7708 95.75 68.8125C96.9583 69.8125 97.875 71 98.5 72.375C99.1667 73.7083 99.5 75.1458 99.5 76.6875C99.5 78.2292 99.1667 79.6875 98.5 81.0625C97.875 82.3958 96.9583 83.5625 95.75 84.5625C94.5833 85.5625 93.1667 86.3542 91.5 86.9375C89.8333 87.5208 87.9792 87.8125 85.9375 87.8125ZM47.0625 87.8125C44.8542 87.8125 42.8125 87.4583 40.9375 86.75C39.1042 86.0417 37.5208 85.0208 36.1875 83.6875C34.8542 82.3125 33.8125 80.6667 33.0625 78.75C32.3125 76.8333 31.9375 74.6667 31.9375 72.25C31.9375 66.7917 33.7917 61.5833 37.5 56.625C41.25 51.625 46.6875 47.1875 53.8125 43.3125L60.6875 53.125C58.8125 54.125 57.1458 55.1042 55.6875 56.0625C54.2708 57.0208 53.0208 58 51.9375 59C50.8958 60 49.9792 61.0417 49.1875 62.125C48.4375 63.1667 47.75 64.2917 47.125 65.5C49.1667 65.5 51 65.7917 52.625 66.375C54.2917 66.9583 55.7083 67.7708 56.875 68.8125C58.0833 69.8125 59 71 59.625 72.375C60.2917 73.7083 60.625 75.1458 60.625 76.6875C60.625 78.2292 60.2917 79.6875 59.625 81.0625C59 82.3958 58.0833 83.5625 56.875 84.5625C55.7083 85.5625 54.2917 86.3542 52.625 86.9375C50.9583 87.5208 49.1042 87.8125 47.0625 87.8125Z" fill="#243333"/><defs><linearGradient id="paint0_linear_52_826" x1="2.88186e-05" y1="699.728" x2="-1.82764" y2="-316.361" gradientUnits="userSpaceOnUse"><stop stopColor="#8D7F61"/><stop offset="0.151457" stopColor="#F1DCAD"/><stop offset="0.267035" stopColor="#8E7B53"/><stop offset="0.382648" stopColor="#E5D9A9"/><stop offset="0.495657" stopColor="#8A724C"/><stop offset="0.620286" stopColor="#E5D9A9"/><stop offset="0.73364" stopColor="#8E7B53"/><stop offset="0.866263" stopColor="#F1DCAD"/><stop offset="1" stopColor="#8D7F61"/></linearGradient></defs></svg>
            </div>

            <div className="p-2">
              <h5>Testimonial</h5>
              <h2>{testimonial?.title}</h2>
              <p>{testimonial?.desc}</p>
              <h5>{testimonial?.name}</h5>
            </div>
          </div>
        </div>
      </section>
      <Action/>
    </div>
  );
}