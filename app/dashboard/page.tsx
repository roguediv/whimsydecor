import CMSHeader from "@/components/parts/cms/main/CmsHeader";
import Link from "next/link";
import CmsHome from "@/components/parts/cms/pages/dashboard/CmsHome";
import { getSession } from "@/components/scripts/auth/sessionManager";
import LoginCheckServer from "@/components/parts/cms/main/LoginCheckServer";
import { User } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { GlobalDevEmailAnchor } from "@/components/main/global";
const db = new PrismaClient();


export default async function AdminPage() {
  const sessionUser = await getSession();
  if (!sessionUser) {return(<LoginCheckServer/>)}
  let user : Partial<User> | null = null;
  if (sessionUser.user) {
    user = await db.user.findUnique({where: {userID: sessionUser.user.userID}, select: {
      userID: true,
      name: true,
      email: true,
      phone: true,
      access: true,
    }});
  }
  return (
    <>
    <CMSHeader page="home" />
    <div className="cms-wrapper">
      <section>
        <div className="sct-content">
          <CmsHome name={user?.name} />
          <div className="text">
            <div className="homeLinks">
              <Link href={'/dashboard/projects'}>
                <div className="background">
                  <div className="circle"></div>
                  <div className="circle"></div>
                </div>
                <div className="content">
                  <div className="text">
                    <h5>Projects</h5>
                    <p className="v2">Showcase your latest work.</p>
                  </div>
                  <svg width="80" height="90" viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d_461_2359)"><path fillRule="evenodd" clipRule="evenodd" d="M37.6997 84.7563C39.1351 85.5324 40.8652 85.5324 42.3006 84.7563L58.9201 75.7705L75.0118 65.8705C76.4017 65.0154 77.2667 63.5171 77.3123 61.8859L77.8401 43.0001L77.3123 24.1143C77.2667 22.4831 76.4017 20.9849 75.0118 20.1298L58.9201 10.2297L42.3006 1.24396C40.8652 0.467835 39.1351 0.467834 37.6997 1.24396L21.0801 10.2297L4.98849 20.1298C3.59861 20.9848 2.73359 22.4831 2.688 24.1143L2.16016 43.0001L2.688 61.8859C2.73359 63.5171 3.59861 65.0154 4.98849 65.8705L21.0801 75.7705L37.6997 84.7563ZM37.6996 72.7563C39.1351 73.5324 40.8652 73.5324 42.3006 72.7563L53.6401 66.6253L64.6195 59.8705C66.0094 59.0154 66.8744 57.5171 66.92 55.8859L67.2801 43.0001L66.92 30.1143C66.8744 28.4831 66.0094 26.9848 64.6195 26.1298L53.6401 19.375L42.3006 13.2439C40.8652 12.4678 39.1351 12.4678 37.6997 13.2439L26.3601 19.375L15.3808 26.1297C13.9909 26.9848 13.1259 28.4831 13.0803 30.1143L12.7201 43.0001L13.0803 55.8859C13.1259 57.5171 13.9909 59.0154 15.3808 59.8705L26.3601 66.6253L37.6996 72.7563Z" fill="url(#paint0_linear_461_2359)"/></g><g filter="url(#filter1_d_461_2359)"><path d="M40 64L30.76 59.0041L21.8135 53.5L21.52 43L21.8135 32.5L30.76 26.9959L40 22L49.24 26.9959L58.1865 32.5L58.48 43L58.1865 53.5L49.24 59.0041L40 64Z" fill="url(#paint1_linear_461_2359)"/></g><defs><filter id="filter0_d_461_2359" x="0.225386" y="0.661865" width="79.5492" height="88.5461" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="1.93477"/><feGaussianBlur stdDeviation="0.967385"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_461_2359"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_461_2359" result="shape"/></filter><filter id="filter1_d_461_2359" x="19.5848" y="22" width="40.8305" height="45.8695" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="1.93477"/><feGaussianBlur stdDeviation="0.967385"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_461_2359"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_461_2359" result="shape"/></filter><linearGradient id="paint0_linear_461_2359" x1="-317.35" y1="0.661868" x2="256.514" y2="-0.253778" gradientUnits="userSpaceOnUse"><stop stopColor="#8D7F61"/><stop offset="0.151457" stopColor="#F1DCAD"/><stop offset="0.267035" stopColor="#8E7B53"/><stop offset="0.382648" stopColor="#E5D9A9"/><stop offset="0.495657" stopColor="#8A724C"/><stop offset="0.620286" stopColor="#E5D9A9"/><stop offset="0.73364" stopColor="#8E7B53"/><stop offset="0.866263" stopColor="#F1DCAD"/><stop offset="1" stopColor="#8D7F61"/></linearGradient><linearGradient id="paint1_linear_461_2359" x1="238.318" y1="64" x2="-80.158" y2="64.5685" gradientUnits="userSpaceOnUse"><stop stopColor="#8D7F61"/><stop offset="0.151457" stopColor="#F1DCAD"/><stop offset="0.267035" stopColor="#8E7B53"/><stop offset="0.382648" stopColor="#E5D9A9"/><stop offset="0.495657" stopColor="#8A724C"/><stop offset="0.620286" stopColor="#E5D9A9"/><stop offset="0.73364" stopColor="#8E7B53"/><stop offset="0.866263" stopColor="#F1DCAD"/><stop offset="1" stopColor="#8D7F61"/></linearGradient></defs></svg>
                </div>
              </Link>
              <Link href={'/dashboard/testimonial'}>
                <div className="background">
                  <div className="circle"></div>
                  <div className="circle"></div>
                </div>
                <div className="content">
                  <div className="text">
                    <h5>Testimonials</h5>
                    <p className="v2">Update with fresh, impactful feedback.</p>
                  </div>
                  <svg width="77" height="73" viewBox="0 0 77 73" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d_547_1823)"><path d="M33.042 3.97753V35.2314C33.042 43.7477 30.7682 50.7344 26.2207 56.1914C21.6732 61.7311 15.5134 65.4105 7.74122 67.2295V53.3389C10.139 52.5947 12.082 51.6852 13.5703 50.6103C15.0586 49.5355 16.2162 48.2539 17.043 46.7656C17.8698 45.2773 18.4072 43.541 18.6553 41.5566C18.9033 39.6549 19.0273 37.5465 19.0273 35.2314V31.8828H7.74122V3.97753H33.042ZM70.7451 3.97753V35.2314C70.7451 43.7477 68.4714 50.7344 63.9238 56.1914C59.3763 61.7311 53.2165 65.4105 45.4443 67.2295V53.3389C47.8421 52.5947 49.7852 51.6852 51.2734 50.6103C52.7617 49.5355 53.9193 48.2539 54.7461 46.7656C55.4902 45.2773 56.0277 43.541 56.3584 41.5566C56.6064 39.6549 56.7305 37.5465 56.7305 35.2314V31.8828H45.4443V3.97753H70.7451Z" fill="url(#paint0_linear_547_1823)"/></g><defs><filter id="filter0_d_547_1823" x="5.25363" y="3.97754" width="67.981" height="68.2291" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="2.48856"/><feGaussianBlur stdDeviation="1.24428"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_547_1823"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_547_1823" result="shape"/></filter><linearGradient id="paint0_linear_547_1823" x1="461.745" y1="96" x2="-213.122" y2="96.3126" gradientUnits="userSpaceOnUse"><stop stopColor="#8D7F61"/><stop offset="0.151457" stopColor="#F1DCAD"/><stop offset="0.267035" stopColor="#8E7B53"/><stop offset="0.382648" stopColor="#E5D9A9"/><stop offset="0.495657" stopColor="#8A724C"/><stop offset="0.620286" stopColor="#E5D9A9"/><stop offset="0.73364" stopColor="#8E7B53"/><stop offset="0.866263" stopColor="#F1DCAD"/><stop offset="1" stopColor="#8D7F61"/></linearGradient></defs></svg>
                </div>
              </Link>
              <Link href={'/dashboard/settings'}>
                <div className="background">
                  <div className="circle"></div>
                  <div className="circle"></div>
                </div>
                <div className="content">
                  <div className="text">
                    <h5>Settings</h5>
                    <p className="v2">Update email for customer inquiries.</p>
                  </div>
                  <svg width="71" height="54" viewBox="0 0 71 54" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M5 0C2.23858 0 0 2.23858 0 5V43.9469C0 46.7084 2.23858 48.9469 5 48.9469H62.0753L69.44 53.7391C70.1082 54.1739 70.9916 53.6902 70.9853 52.893L70.9542 48.9469H71V5C71 2.23858 68.7614 0 66 0H5ZM9.39506 24.0586C9.39506 22.954 10.2905 22.0586 11.3951 22.0586H59.6049C60.7095 22.0586 61.6049 22.954 61.6049 24.0586C61.6049 25.1632 60.7095 26.0586 59.6049 26.0586H11.3951C10.2905 26.0586 9.39506 25.1632 9.39506 24.0586ZM10.9568 12.9329C9.85222 12.9329 8.95679 13.8283 8.95679 14.9329C8.95679 16.0374 9.85222 16.9329 10.9568 16.9329H46.4568C47.5614 16.9329 48.4568 16.0374 48.4568 14.9329C48.4568 13.8283 47.5614 12.9329 46.4568 12.9329H10.9568Z" fill="url(#paint0_linear_461_2380)"/><defs><linearGradient id="paint0_linear_461_2380" x1="-299.752" y1="1.65753e-06" x2="238.623" y2="-1.266" gradientUnits="userSpaceOnUse"><stop stopColor="#8D7F61"/><stop offset="0.151457" stopColor="#F1DCAD"/><stop offset="0.267035" stopColor="#8E7B53"/><stop offset="0.382648" stopColor="#E5D9A9"/><stop offset="0.495657" stopColor="#8A724C"/><stop offset="0.620286" stopColor="#E5D9A9"/><stop offset="0.73364" stopColor="#8E7B53"/><stop offset="0.866263" stopColor="#F1DCAD"/><stop offset="1" stopColor="#8D7F61"/></linearGradient></defs></svg>
                </div>
              </Link>
            </div>
            <div className="help-notice center">
              <h5>Need Help?</h5>
              <p>Reach out via email at <GlobalDevEmailAnchor /> for assistance.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
