import Link from "next/link"
import CMSHeader from "./CmsHeader"

type props = {}

const LoginCheckServer : React.FC<props> = () => {
  return (
    <>
    <CMSHeader page="home" />
    <div className="cms-wrapper">
      <section>
        <div className="sct-content">
          <div className="text">
            <Link href="/admin">Please Sign In</Link>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}

export default LoginCheckServer