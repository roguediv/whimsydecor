import { GlobalUploadURL } from "@/components/main/global";
import { Project } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

type Props = {
  className?: string;
  project?: Project | null;
};

const ProjectPreview: React.FC<Props> = ({ className = '', project = null}) => {
  if (!project) return;
  return (
    <Link href={`/projects/${project.projectID}`} className={`ProjectPreview ${className}`}>
      <div className="image">
        <Image 
          src={project.img1 ? `${GlobalUploadURL}${project.img1}` : "/images/error.webp"}
          width={500}
          height={500}
          alt={`${project.img1Desc}`} />
          <div className="css-hexagon"><div className="css-hexagon"><MdKeyboardDoubleArrowRight /></div></div>
      </div>
      <h4>{project.title.replace('/nl', '')}</h4>
      <p>{project.shortDesc}</p>
      
    </Link>
  );
};

export default ProjectPreview;