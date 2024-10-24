import Link from "next/link";
import { MdDragIndicator } from "react-icons/md";
import Image from "next/image";
import Button from "@/components/elements/html/Button";
import { PrismaClient, Project } from "@prisma/client";
import ActiveButton from "@/components/elements/html/ActiveButton";

const db = new PrismaClient();

type props = {
  className?: string;
  project: Project;
}

const ProjectSelector: React.FC<props> = ({className = '', project}) => {
  return (
    <div className={`ProjectSelector ${project.isFeatured ? 'isFeatured' : ''}`} id={`ProjectSelector-${project.projectID}`}>
      <div className="content">
        <div className="order"><MdDragIndicator /></div>
        <div className="image">
          <Image               
            src={project.img1 ? `/images/uploads/${project.img1}`: `/images/error.webp`}
            width={400}
            height={400}
            alt={`Project image for ${project.title.replace("/nl", "")}`} />
        </div>
        <div className="text">
          <h5>{project.title.replace("/nl", "")}</h5>
          <p className="v2">{project.shortDesc}</p>
        </div>
      </div>
      <div className="btns">
        <Button icon="trash" inputCheck={{title: `Delete ${project.title.replace("/nl", "")}?`, desc: `Are you sure you want to delete ${project.title.replace("/nl", "")}? You cannot undo this action.`, btn1: `Delete Project`, btn2: `Cancel`}} Trigger={async () => {
          "use server"
          await db.project.delete({
            where: {
              projectID: project.projectID,
            },
          });
        }} deleteId={`ProjectSelector-${project.projectID}`} />
        <ActiveButton className={`project-selector-favorite-button ${project.isFeatured ? 'active' : ''}`} icon="star" Trigger={async () => {
          "use server"
          await db.project.updateMany({
            data: {
              isFeatured: false,
            },
            where: {
              projectID: {not: project.projectID,},
            }
          });
          const currentProjectState = await db.project.findUnique({where: {projectID: project.projectID}})
          if (!currentProjectState?.isFeatured) {
            const proj = await db.project.update({
              data: {
                isFeatured: true,
              },
              where: {
                projectID: project.projectID,
              },
            })
            if (proj) {return true}
          } else {
            await db.project.update({
              data: {
                isFeatured: false,
              },
              where: {
                projectID: project.projectID,
              },
            })
          }
          return false;
        }} />
        <Link href={`/dashboard/projects/${project.projectID}`}><svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.5 10.25L6.75 26L6 34.25L14.25 33.5L30 17.75C32.0711 15.6789 32.0711 12.3211 30 10.25C27.9289 8.17893 24.5711 8.17894 22.5 10.25Z" strokeWidth="3.5" strokeLinejoin="round"/></svg></Link>
      </div>
    </div>
  )
}

export default ProjectSelector
