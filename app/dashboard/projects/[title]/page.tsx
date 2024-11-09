import ActiveButton from "@/components/elements/html/ActiveButton";
import AutoTextarea from "@/components/elements/html/AutoTextarea";
import SwitchInput from "@/components/elements/html/SwitchInput";
import TextInput from "@/components/elements/html/TextInput";
import ImageUpload from "@/components/parts/cms/elements/ImageUpload";
import CMSHeader from "@/components/parts/cms/main/CmsHeader";
import LoginCheckServer from "@/components/parts/cms/main/LoginCheckServer";
import { getSession } from "@/components/scripts/auth/sessionManager";
import { updateProject } from "@/components/scripts/database/queries";
import { validServices } from "@/components/scripts/database/validation";
import { PrismaClient, Project } from "@prisma/client";

const db = new PrismaClient()

export default async function AdminPage(props: {params: Promise<{title: string}>}) {
  const params = await props.params;
  if (!(await getSession())) {return(<LoginCheckServer/>)}

  let project : Project | null = null;
  if (!isNaN(Number(params.title))) {
    project = await db.project.findUnique({
      where: {projectID: Number(params.title)},
      select: {
        projectID: true,
        userID: true,
        title: true,
        shortDesc: true,
        longDesc: true,
        projectDate: true,
        isFeatured: true,
        isLive: true,
        services: true,
        order: true,
        img1: true,img2: true,img3: true,img4: true,img5: true,img6: true,img7: true,img8: true,img9: true,
        img1Desc: true,img2Desc: true,img3Desc: true,img4Desc: true,img5Desc: true,img6Desc: true,img7Desc: true,img8Desc: true,img9Desc: true,
        createdDate: true,
      }
    })
  } else {
    project = await db.project.findFirst({
      where: {title: params.title.toLowerCase().replace(/_/g, ' ').trim()}
    })
  }
  return (
    <>
    <CMSHeader page="projects" title="project" project={project} updateProject={updateProject}/>
    <div className="cms-wrapper">
      <section>
        <div className="sct-content">
          <div className="sct-header">
            <h4>Project Creation Center</h4>
            <p>Create new projects by adding a title, short description, detailed description, selecting the services provided, upload images, and choose if this will be a featured project. Changes will not be saved unless you select "Publish" in the upper corner.</p>
          </div>
          <div className="text">
            <TextInput id="iptProjectTitle" placeholder="Project Title" loadText={project?.title.replaceAll("/nl", "/nl")}/>
            <div className="flex gap-2">
              <div className="flex">
                <p className="v2">Public:</p>
                <SwitchInput id="iptProjectIsLive" checked={project?.isLive} />
              </div>
              <div className="flex">
                <p className="v2">Featured Project:</p>
                <SwitchInput id="iptProjectIsFeatured" checked={project?.isFeatured} />
              </div>
            </div>
            <div className="serviceList" id="iptProjectService">
              <p className="v2">What services were done for this project?</p>
              {validServices.map((service, i) => {
                return <ActiveButton key={i} className={project?.services.includes(service) ? 'active' : ''} text={service} />
              })}
            </div>
            <AutoTextarea id="iptProjectShortDesc" placeholder="One Sentence Summary*" loadText={project?.shortDesc}/>
            <p className="v2">You can make custom edits to the following field. Reference the key below.</p>
            <ul>
              <li><b>Key:</b></li>
              <li>New Line/Paragraph: <b>/nl</b></li>
              <li>Create a Title: <b>##</b>Title Text Here<b>##</b></li>
              <li>Bold Text: <b>**</b>Bold Text Here<b>**</b></li>
            </ul>
            <AutoTextarea className="large" id="iptProjectLongDesc" placeholder="Description of Project*" loadText={project?.longDesc.replaceAll("/np", "/np")}/>
            <div className="imageList">
            <ImageUpload id="iptProjectImg1" src={project?.img1} imgDesc={project?.img1Desc} />
            <ImageUpload id="iptProjectImg2" src={project?.img2} imgDesc={project?.img2Desc} />
            <ImageUpload id="iptProjectImg3" src={project?.img3} imgDesc={project?.img3Desc} />
            <ImageUpload id="iptProjectImg4" src={project?.img4} imgDesc={project?.img4Desc} />
            <ImageUpload id="iptProjectImg5" src={project?.img5} imgDesc={project?.img5Desc} />
            <ImageUpload id="iptProjectImg6" src={project?.img6} imgDesc={project?.img6Desc} />
            <ImageUpload id="iptProjectImg7" src={project?.img7} imgDesc={project?.img7Desc} />
            <ImageUpload id="iptProjectImg8" src={project?.img8} imgDesc={project?.img8Desc} />
            <ImageUpload id="iptProjectImg9" src={project?.img9} imgDesc={project?.img9Desc} />
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
