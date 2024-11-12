import ProjectPreview from "@/components/elements/cards/ProjectPreview";
import Action from "@/components/elements/sections/Action";
import Header from "@/components/main/Header";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export default async function Home() {
  const projects = await db.project.findMany({where: {isLive: true}, orderBy: {order: 'asc'}});
  return (
    <div id="pge-projects">
      <Header page="project" />
      <section id="project-home-sct-1">
        <div className="background DottedLines">
          <svg width="1373" height="1216" viewBox="0 0 1373 1216" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3C95.5 205 241.5 422 486.5 434.5C682.5 444.5 798.541 602.941 941 772C1061.5 915 1105 987.5 1262.5 1042C1472.39 1114.63 1485.57 948.264 1615 895.5C1758.5 837 1945 987 2124 987C2277 987 2408 963.8 2700 655C3065 269 3321 1217 3588 1212.5" stroke="#162B2B" strokeWidth="5" strokeLinecap="round" strokeDasharray="16 20"/></svg>
          <svg width="299" height="3505" viewBox="0 0 299 3505" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M-2159 3511C-2022 3613.5 -1512.5 3412.5 -1418.5 2967.5C-1324.5 2522.5 -1106 2424 -832 2492.5C-468.648 2583.34 -347.5 2514.17 -210.5 2468.5C158.501 2357 242 2058 248.002 1921.19C252.998 1807.3 73.5015 1755.19 132.002 1611.69C184.766 1482.26 351.131 1469.09 278.502 1259.19C224.002 1101.69 75.5015 997.693 8.50151 937.693C-91.3323 857.463 -289.4 642.504 -283 424.504C-275 152.004 -567.5 -40.4963 -792.5 11.5037C-1017.5 63.5037 -1105.5 264.004 -1346.5 224.004" stroke="#162B2B" strokeWidth="5" strokeLinecap="round" strokeDasharray="16 20"/></svg>
          <svg width="1440" height="1954" viewBox="0 0 1440 1954" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M-201.66 2462.82C-304.444 2326.03 -104.499 1816.12 340.306 1721.2C785.11 1626.28 883.158 1407.57 814.091 1133.71C722.501 770.552 791.421 649.261 836.804 512.167C947.54 142.936 1246.37 58.8179 1383.16 52.5332C1497.04 47.3013 1549.53 226.689 1692.9 167.892C1822.22 114.86 1835.06 -51.532 2045.1 20.6629C2202.71 74.8368 2307.02 223.121 2367.16 289.997C2447.59 389.664 2662.96 587.287 2880.95 580.435C3153.43 571.871 3346.54 863.972 3295 1089.08C3243.47 1314.19 3043.15 1402.6 3083.65 1643.52" stroke="#162B2B" strokeWidth="5" strokeLinecap="round" strokeDasharray="16 20"/></svg>
        </div>
        <div className="sct-content">
          <div className="sct-header center">
            <h5>Our Work</h5>
            <h2>Showcasing Whimsy</h2>
            <p>Whimsy Decor brings spaces to life with vibrant murals, custom decor, and unique designs. From residential to commercial projects, each reflects our signature blend of creativity and craftsmanship. Explore our portfolio below and click to view the details of our one-of-a-kind transformations.</p>
          </div>
          <div className="three-grid">
            {projects.map((project, i) => {
              return(<ProjectPreview key={i} className="hex" project={project} />)
            })}
          </div>
        </div>
      </section>
      <Action/>
    </div>
  );
}
