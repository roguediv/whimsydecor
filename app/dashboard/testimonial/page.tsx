import AutoTextarea from "@/components/elements/html/AutoTextarea";
import TextInput from "@/components/elements/html/TextInput";
import ImageUpload from "@/components/parts/cms/elements/ImageUpload";
import CMSHeader from "@/components/parts/cms/main/CmsHeader";
import { PrismaClient, Testimonial } from "@prisma/client";
import { updateTestimonial } from "@/components/scripts/database/queries";
import { getSession } from "@/components/scripts/auth/sessionManager";
import LoginCheckServer from "@/components/parts/cms/main/LoginCheckServer";
const db = new PrismaClient();

export default async function AdminPage() {
  if (!await getSession()) {return(<LoginCheckServer/>)}
  
  let testimonial : Testimonial | null = await db.testimonial.findUnique({where: {testimonialID: 1}});
  return (
    <>
    <CMSHeader page="testimonial" testimonial={testimonial} updateTestimonial={updateTestimonial}/>
    <div className="cms-wrapper">
      <section>
        <div className="sct-content">
          <div className="sct-header">
            <h4>Testimonial Management Center</h4>
            <p>Manage your homepage testimonials by adding or editing quotes, titles, names, and descriptions. All changes are auto-saved for your convenience.</p>
          </div>
          <div className="text">
            <TextInput id="iptTestimonialTitle" placeholder="Testimonail Title" loadText={testimonial?.title} />
            <AutoTextarea id="iptTestimonialDesc" placeholder="Testimonial Quote" loadText={testimonial?.desc} />
            <TextInput id="iptTestimonialName" placeholder="Testimonail Name" loadText={testimonial?.name} />
            <ImageUpload id="iptTestimonialImg1" src={testimonial?.img1} imgDesc={testimonial?.img1Desc} />
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
