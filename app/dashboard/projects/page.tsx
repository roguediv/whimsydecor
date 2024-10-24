import Logo from "@/components/elements/icons/Logo";
import Preloader from "@/components/main/Preloader";
import ProjectSelector from "@/components/parts/cms/elements/ProjectSelector";
import CMSHeader from "@/components/parts/cms/main/CmsHeader";
import { prismaExecutionService } from "@/components/scripts/database/PrismaExecutionService";
import { PrismaClient } from "@prisma/client";
import Button from "@/components/elements/html/Button";
import { getSession } from "@/components/scripts/auth/sessionManager";
import LoginCheckServer from "@/components/parts/cms/main/LoginCheckServer";
import { endQuery } from "@/components/scripts/database/queries";

const db = new PrismaClient();
export default async function ProjectPage() {
  if (!await getSession()) {return(<LoginCheckServer/>)}

  const projects = await db.project.findMany({})
  return (
    <>
    <CMSHeader page="projects" />
    <div className="cms-wrapper">
      <section>
        <div className="sct-content">
          <div className="sct-header">
            <h4>Project Management Center</h4>
            <p>Easily manage and reorder your projects for optimal display on the "Our Work" page. Edit, select featured projects, delete, or add new projects with simple tools to keep your portfolio up to date. All changes are auto-saved for your convenience.</p>
          </div>
          <div className="text">
            <div className="ProjectSelectorGroup">
              {projects.map((project, i) => {
                return <ProjectSelector key={i} project={project}/>
              })}
            </div>
            <Button text="Add New Project" icon="FiPlusCircle" RedirectTrigger={async (test) => {
              "use server"
              if (test === 0) {return {status: 1, title: '', desc: '',data: '1'}} // For testing if function is triggered

              // Ensure the session is valid and store the user
              const session = await getSession();
              if (!session) return endQuery("Logged Out", "Refresh the page and try logging.");
              if (!session.user.access || session.user.access < 1) return endQuery("Bad Privileges", "You don't have the proper access level to make this change.");
              
              const projectCount = await db.project.count({});
              const newProject = await db.project.create({
                data: {
                  userID: 0,
                  order: projectCount + 1,
                },
              })
              prismaExecutionService.endQuery();
              return {status: 1, title: '', desc: '', data: `/dashboard/projects/${newProject.projectID}`}
            }} />
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
