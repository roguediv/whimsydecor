import ProjectSelector from "@/components/parts/cms/elements/ProjectSelector";
import CMSHeader from "@/components/parts/cms/main/CmsHeader";
import { prismaExecutionService } from "@/components/scripts/database/PrismaExecutionService";
import { PrismaClient, Project } from "@prisma/client";
import Button from "@/components/elements/html/Button";
import { getSession } from "@/components/scripts/auth/sessionManager";
import LoginCheckServer from "@/components/parts/cms/main/LoginCheckServer";
import { endQuery } from "@/components/scripts/database/queries";
import DndProjects from "@/components/parts/cms/elements/DndProjects";
import { deleteFile } from "@/components/scripts/database/uploadHandler";
const db = new PrismaClient();

export default async function ProjectPage() {
  if (!await getSession()) {return(<LoginCheckServer/>)}

  const projects = await db.project.findMany({orderBy: {order: 'asc'}})
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
            <DndProjects Projects={projects} orderTrigger={async (Projects : Project[]) => {
              "use server"
              Projects = Projects.sort((a, b) => a.projectID - b.projectID)
              const dbProjects = await db.project.findMany({ orderBy: { projectID: 'asc' } });

              /// Ensure the session is valid and store the user
              const session = await getSession();
              if (!session) return dbProjects;
              if (!session.user.access || session.user.access < 1) return dbProjects;
                      
              // First, validate that there are no duplicate orders in Projects array
              const orderSet = new Set(Projects.map((p) => p.order));
              if (orderSet.size !== Projects.length) {
                console.log("Duplicate order values detected in client Projects.");
              }
            
              // Begin a transaction to ensure atomic updates
              await db.$transaction(async (transaction) => {
                for (let i = 0; i < Projects.length; i++) {
                  const clientProject = Projects[i];
                  const serverProject = dbProjects[i];
                
                  if (
                    clientProject.projectID === serverProject.projectID 
                    && clientProject.order !== serverProject.order
                  ) {
                    // Verify if the `order` is unique before updating
                    const conflictingProject = await transaction.project.findFirst({
                      where: { order: clientProject.order, projectID: { not: clientProject.projectID } }
                    });
                    if (conflictingProject) {
                      console.log(`Order value ${clientProject.order} is already assigned to another project.`);
                    }
                  
                    // Update order
                    await transaction.project.update({
                      data: { order: clientProject.order },
                      where: { projectID: clientProject.projectID }
                    });
                  } else {
                    console.log(`Order didn't work: ${clientProject.order}`);
                  }
                }
              });
            
              return await db.project.findMany({ orderBy: { order: 'asc' } });
            }} deleteTrigger={async (projectID : number) => {
                    "use server"
                    const project : Project | null = await db.project.findUnique({where: {projectID: projectID}});
                    if (!project) return;
                    for (let i = 0; i < 10; i++) {
                      const imageSrc = project[`img${i}` as keyof Project]
                      if (imageSrc) {
                        deleteFile(imageSrc as string);
                      }
                    }
                    await db.project.delete({
                      where: {
                        projectID: projectID,
                      },
                    });
                  }} favoriteTrigger={async (projectID : number) => {
                    "use server"
                    await db.project.updateMany({
                      data: {
                        isFeatured: false,
                      },
                      where: {
                        projectID: {not: projectID,},
                      }
                    });
                    const currentProjectState = await db.project.findUnique({where: {projectID: projectID}})
                    if (!currentProjectState?.isFeatured) {
                      const proj = await db.project.update({
                        data: {
                          isFeatured: true,
                        },
                        where: {
                          projectID: projectID,
                        },
                      })
                      if (proj) {return true}
                    } else {
                      await db.project.update({
                        data: {
                          isFeatured: false,
                        },
                        where: {
                          projectID: projectID,
                        },
                      })
                    }
                    return false;
                  }} />
            {/* <div className="ProjectSelectorGroup">
              {projects.map((project, i) => {
                return <ProjectSelector key={i} project={project}/>
              })}
            </div> */}
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
