import Action from "@/components/elements/sections/Action";
import ShowProjects from "@/components/elements/sections/ShowProjects";
import Header from "@/components/main/Header";
import Image from "next/image";
import { notFound } from 'next/navigation';
import { PrismaClient, Project } from "@prisma/client";
import { generateLongDesc, generateTitle } from "@/components/scripts/client/htmlGenerator";
import { Metadata } from "next";
const db = new PrismaClient();

export const metadata: Metadata = {
  title: 'Project',
  description: 'A project for Whimsy Decor',
};

export default async function page({params = {title: "Test"}}: {params: {title: string}}) {
  const title = params.title
  
  let project : Project = {
    projectID: 0, 
    userID: 0, 
    title: 'Project Not Found', 
    shortDesc: 'Undefined Summary', 
    longDesc: 'Undefined Description', 
    projectDate: new Date(), 
    isFeatured: false, 
    isLive: false, 
    services: '', 
    order: 0, 
    img1: null, img2: null, img3: null, img4: null, img5: null, img6: null, img7: null, img8: null, img9: null, 
    img1Desc: null, img2Desc: null, img3Desc: null, img4Desc: null, img5Desc: null, img6Desc: null, img7Desc: null, img8Desc: null, img9Desc: null, 
    createdDate: new Date(),};
  if (!isNaN(Number(title))) {
    let tempProject : Project | null = await db.project.findUnique({
      where: {projectID: Number(title), isLive: true},
    })
    if (tempProject) project = tempProject;
  } else {
    let tempProject : Project | null = await db.project.findFirst({
      where: {title: (title as string).toLowerCase().replace(/_/g, ' ').trim(), isLive: true}
    })
    if (tempProject) project = tempProject;
  }
  let projects : Project[] = await db.project.findMany({
    take: 3, 
    orderBy: {order: 'desc',},
    where: {projectID: {not: project.projectID}, isLive: true}
  });
  return (
    <div id="pge-projects">
      <Header page="project" title={project.title} src={project.img1} />
      <section id="project-sct-1">
        <div className="background DottedLines">
          <svg width="1373" height="1216" viewBox="0 0 1373 1216" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3C95.5 205 241.5 422 486.5 434.5C682.5 444.5 798.541 602.941 941 772C1061.5 915 1105 987.5 1262.5 1042C1472.39 1114.63 1485.57 948.264 1615 895.5C1758.5 837 1945 987 2124 987C2277 987 2408 963.8 2700 655C3065 269 3321 1217 3588 1212.5" stroke="#162B2B" strokeWidth="5" strokeLinecap="round" strokeDasharray="16 20"/></svg>
          <svg width="299" height="3505" viewBox="0 0 299 3505" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M-2159 3511C-2022 3613.5 -1512.5 3412.5 -1418.5 2967.5C-1324.5 2522.5 -1106 2424 -832 2492.5C-468.648 2583.34 -347.5 2514.17 -210.5 2468.5C158.501 2357 242 2058 248.002 1921.19C252.998 1807.3 73.5015 1755.19 132.002 1611.69C184.766 1482.26 351.131 1469.09 278.502 1259.19C224.002 1101.69 75.5015 997.693 8.50151 937.693C-91.3323 857.463 -289.4 642.504 -283 424.504C-275 152.004 -567.5 -40.4963 -792.5 11.5037C-1017.5 63.5037 -1105.5 264.004 -1346.5 224.004" stroke="#162B2B" strokeWidth="5" strokeLinecap="round" strokeDasharray="16 20"/></svg>
          <svg width="1440" height="1954" viewBox="0 0 1440 1954" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M-201.66 2462.82C-304.444 2326.03 -104.499 1816.12 340.306 1721.2C785.11 1626.28 883.158 1407.57 814.091 1133.71C722.501 770.552 791.421 649.261 836.804 512.167C947.54 142.936 1246.37 58.8179 1383.16 52.5332C1497.04 47.3013 1549.53 226.689 1692.9 167.892C1822.22 114.86 1835.06 -51.532 2045.1 20.6629C2202.71 74.8368 2307.02 223.121 2367.16 289.997C2447.59 389.664 2662.96 587.287 2880.95 580.435C3153.43 571.871 3346.54 863.972 3295 1089.08C3243.47 1314.19 3043.15 1402.6 3083.65 1643.52" stroke="#162B2B" strokeWidth="5" strokeLinecap="round" strokeDasharray="16 20"/></svg>
        </div>
        <div className="sct-content">
          <div className="two-grid">
            <div className="text-content">
              <div className="p-1">
                <h2 dangerouslySetInnerHTML={{ __html: generateTitle(project.title) }}></h2>
                {project.services.split("|,").map((service, i) => {
                  switch (service) {
                    case "Interior Redesign": return (
                      <div key={i} className="flex">
                        <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.93658 16.8838L22.9039 5.06325C22.9621 5.02495 23.0376 5.02541 23.0953 5.06442L40.5577 16.8633C41.1048 17.233 41.8372 17.1628 42.3042 16.6958C42.9215 16.0785 42.8167 15.05 42.0876 14.5699L23.0695 2.04574C23.0272 2.01793 22.9726 2.01763 22.93 2.04497L3.43617 14.5767C2.69785 15.0514 2.58662 16.0866 3.20727 16.7073C3.66886 17.1689 4.39124 17.2426 4.93658 16.8838Z" stroke="black" strokeLinecap="round"/><path d="M6.5 16V41C6.5 41.5523 6.94772 42 7.5 42H38.2273C38.7796 42 39.2273 41.5523 39.2273 41V16" stroke="black" strokeLinecap="round"/><path d="M23 21.5L16.2071 14.7071C15.8166 14.3166 15.1834 14.3166 14.7929 14.7071L10.7071 18.7929C10.3166 19.1834 10.3166 19.8166 10.7071 20.2071L17.5 27" stroke="black" strokeLinecap="round"/><path d="M13.1832 31.3168L29.0858 15.4142C29.8668 14.6332 31.1332 14.6332 31.9142 15.4142L34.0858 17.5858C34.8668 18.3668 34.8668 19.6332 34.0858 20.4142L18.1832 36.3168C18.0631 36.4369 17.9142 36.5245 17.7508 36.5712L12.7307 38.0055C11.9764 38.221 11.279 37.5236 11.4945 36.7693L12.9288 31.7492C12.9755 31.5858 13.0631 31.4369 13.1832 31.3168Z" stroke="black" strokeLinecap="round"/><path d="M12.5 34.5C13 34.5 15 35.5 15 37" stroke="black" strokeLinecap="round"/><path d="M30 24.5L25 19.5" stroke="black" strokeLinecap="round"/><path d="M27.5 22.5L16.5 33" stroke="black" strokeLinecap="round"/><path d="M13 31.5L16.1323 32.8424C16.3684 32.9436 16.5564 33.1316 16.6576 33.3677L18 36.5" stroke="black" strokeLinecap="round"/><path d="M32.5 22L27.5 17" stroke="black" strokeLinecap="round"/><path d="M18.5 17L16.5 19" stroke="black" strokeLinecap="round"/><path d="M20.5 19.5L19.5 20.5" stroke="black" strokeLinecap="round"/><path d="M22.5 32L29.323 38.823C29.7015 39.2015 30.3111 39.2148 30.7058 38.853L35.2301 34.7057C35.6498 34.321 35.6641 33.6641 35.2615 33.2615L28.5 26.5" stroke="black" strokeLinecap="round"/><path d="M31 33L33 31" stroke="black" strokeLinecap="round"/><path d="M29.5 30L30.5 29" stroke="black" strokeLinecap="round"/></svg>
                        <p className="v2">{service}</p>
                      </div>)
                    case "Custom Decor": return (
                      <div key={i} className="flex">
                        <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M25 24.5H8C7.17157 24.5 6.5 25.1716 6.5 26C6.5 26.8284 7.17157 27.5 8 27.5H25C25.8284 27.5 26.5 26.8284 26.5 26C26.5 25.1716 25.8284 24.5 25 24.5Z" stroke="black" strokeLinecap="round"/><path d="M7.5 27.5V38.5" stroke="black" strokeLinecap="round"/><path d="M25 27.5V38.5" stroke="black" strokeLinecap="round"/><path d="M8 24.5L6.5 17.5H14" stroke="black" strokeLinecap="round" strokeLinejoin="round"/><path d="M7.99997 17.5C7.3333 16 6 12.5 6 11C7 11.5 9 14 9.99999 15.5" stroke="black" strokeLinecap="round" strokeLinejoin="round"/><path d="M10.4998 17.5C9.49972 15 10 10.5 11.4999 8.5C12.4999 10.5 12.9999 15 12.4999 17.5" stroke="black" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 17.5C15.5 16.5 16.5 13 16.5 11.5C15.5 12 14.5 13 13 14.5" stroke="black" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 17.5V20.5H23C24.1046 20.5 25 19.6046 25 18.5V18.5C25 17.3954 24.1046 16.5 23 16.5H15" stroke="black" strokeLinecap="round" strokeLinejoin="round"/><path d="M25 24.5H14.5C13.3954 24.5 12.5 23.6046 12.5 22.5C12.5 21.3954 13.3954 20.5 14.5 20.5H25V24.5Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/><path d="M25 24.5H18C16.8954 24.5 16 23.6046 16 22.5C16 21.3954 16.8954 20.5 18 20.5H25V24.5Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/><path d="M23 16.5V7H38.5V24.5H26" stroke="black" strokeLinecap="round" strokeLinejoin="round"/><path d="M25 14.5V9.5H35.5V22H30.5" stroke="black" strokeLinecap="round" strokeLinejoin="round"/><path d="M29.567 12.75C29.7594 12.4167 30.2406 12.4167 30.433 12.75L33.0311 17.25C33.2235 17.5833 32.983 18 32.5981 18H27.4019C27.017 18 26.7765 17.5833 26.9689 17.25L29.567 12.75Z" stroke="black" strokeLinejoin="round"/><path d="M29 22C29 22.2761 28.7761 22.5 28.5 22.5C28.2239 22.5 28 22.2761 28 22C28 21.7239 28.2239 21.5 28.5 21.5C28.7761 21.5 29 21.7239 29 22Z" fill="black"/></svg>
                        <p className="v2">{service}</p>
                      </div>)
                    case "Floor Plan Layout": return (
                      <div key={i} className="flex">
                        <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 10.5H41.1693C41.7239 10.5 42.1726 10.9513 42.1693 11.5059L42.0016 39.7349C42.0007 39.8816 41.8816 40 41.7349 40H7.25C4.35051 40 2 37.6495 2 34.75V34.75C2 31.8505 4.35051 29.5 7.25 29.5H7.46333C7.48358 29.5 7.5 29.4836 7.5 29.4633V24.5M7.5 22V6C7.5 5.44772 7.04801 4.99059 6.5005 5.06304C2.84866 5.54631 2 8.71103 2 11.179V35" stroke="black" strokeLinecap="round"/><path d="M35.5 14H37.5C38.0523 14 38.5 14.4477 38.5 15V35C38.5 35.5523 38.0523 36 37.5 36H35.5" stroke="black" strokeLinecap="round"/><path d="M14.5 36H12C11.4477 36 11 35.5523 11 35V15C11 14.4477 11.4477 14 12 14H23C23.5523 14 24 14.4477 24 15V17" stroke="black" strokeLinecap="round"/><path d="M17 36H20M15 23.5H24M24 23.5H32C32.5523 23.5 33 23.9477 33 24.5V29.75M24 23.5V19.5M33 29.75V35C33 35.5523 32.5523 36 32 36H20M33 29.75H27.6509C27.0986 29.75 26.6509 30.1977 26.6509 30.75V33.5M20 36V28.5M17.5 28.5H23" stroke="black" strokeLinecap="round"/></svg>
                        <p className="v2">{service}</p>
                      </div>)
                    case "Painting": return (
                      <div key={i} className="flex">
                        <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.5 25.5V22.5H25.5V25.5M25.5 25.5H19.5V39C19.5 40.933 21.067 42.5 23 42.5V42.5C24.933 42.5 26.5 40.933 26.5 39V25.5H25.5Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/><path d="M23 22.5V20.178C23 19.2075 23.6967 18.3771 24.6524 18.2084L39.1738 15.6458C39.6516 15.5615 40 15.1463 40 14.661V9.5C40 8.94772 39.5523 8.5 39 8.5H37" stroke="black" strokeLinecap="round" strokeLinejoin="round"/><path d="M29.5 13H35C36.1046 13 37 12.1046 37 11V5C37 3.89543 36.1046 3 35 3H9.5C8.39543 3 7.5 3.89543 7.5 5V11C7.5 12.1046 8.39543 13 9.5 13H13" stroke="black" strokeLinecap="round" strokeLinejoin="round"/><path d="M17 13H27" stroke="black" strokeLinecap="round" strokeLinejoin="round"/><path d="M13.5 3V6.5" stroke="black" strokeLinecap="round" strokeLinejoin="round"/><path d="M13.5 9V16.75C13.5 17.7165 14.2835 18.5 15.25 18.5V18.5C16.2165 18.5 17 17.7165 17 16.75V7.25C17 6.2835 17.7835 5.5 18.75 5.5V5.5C19.7165 5.5 20.5 6.2835 20.5 7.25V9C20.5 10.1046 21.3954 11 22.5 11V11C23.6046 11 24.5 10.1046 24.5 9V3" stroke="black" strokeLinecap="round" strokeLinejoin="round"/><path d="M7.5 5.5H5V10.5H7.5" stroke="black" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        <p className="v2">{service}</p>
                      </div>)
                    case "Color Consulting": return (
                      <div key={i} className="flex">
                        <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 33.5V5H18V33.5C18 36.5376 15.5376 39 12.5 39C9.46243 39 7 36.5376 7 33.5Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 25H18" stroke="black" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 18H18" stroke="black" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 12H18" stroke="black" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12.5" cy="33.5" r="2" stroke="black"/><path d="M18.2416 10.041L20.5933 5L30 10.041L27.178 15.9693M18 35L24.2408 22.1395M27.178 15.9693L18.2416 11.0492M27.178 15.9693L24.2408 22.1395M24.2408 22.1395L18.2416 19.1149" stroke="black" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 28L18 27" stroke="black" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 38L28 29.1304M33.5882 25L39 21L32.5 12L27 16.5L33.5882 25ZM33.5882 25L28 29.1304M28 29.1304L24 23.5" stroke="black" strokeLinecap="round" strokeLinejoin="round"/><path d="M22.5 33L20.5 30" stroke="black" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        <p className="v2">{service}</p>
                      </div>)
                    case "Home Staging": return (
                      <div key={i} className="flex">
                        <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.5 20H11C9.89543 20 9 20.8954 9 22V28.5V31C9 31.2761 9.22386 31.5 9.5 31.5H22C22.2761 31.5 22.5 31.2761 22.5 31V22C22.5 20.8954 21.6046 20 20.5 20Z" stroke="black" strokeLinecap="round"/><path d="M22.5 29V29C22.5 28.1716 21.8284 27.5 21 27.5H10.5C9.67157 27.5 9 28.1716 9 29V29" stroke="black" strokeLinecap="round"/><path d="M22.5 27V25.25C22.5 24.0074 23.5074 23 24.75 23V23C25.9926 23 27 24.0074 27 25.25V33C27 34.1046 26.1046 35 25 35H6.5C5.39543 35 4.5 34.1046 4.5 33V25.25C4.5 24.0074 5.50736 23 6.75 23V23C7.99264 23 9 24.0074 9 25.25V28" stroke="black" strokeLinecap="round"/><path d="M7 35V37.5C7 38.0523 7.44772 38.5 8 38.5H8.04007C8.33199 38.5 8.60934 38.3724 8.79932 38.1508L11.5 35" stroke="black" strokeLinecap="round"/><path d="M24.5 35V37.5C24.5 38.0523 24.0523 38.5 23.5 38.5H23.4599C23.168 38.5 22.8907 38.3724 22.7007 38.1508L20 35" stroke="black" strokeLinecap="round"/><path d="M20.5 20V8C20.5 7.44772 20.9477 7 21.5 7H30.75M27 33.5H30.75M30.75 7H40C40.5523 7 41 7.44772 41 8V26M30.75 7V33.5M30.75 33.5H40C40.5523 33.5 41 33.0523 41 32.5V26M27 26H41" stroke="black" strokeLinecap="round"/><path d="M39.5 33.5V36C39.5 36.5523 39.0523 37 38.5 37H38.1594C37.7594 37 37.3978 36.7616 37.2403 36.3939L36 33.5" stroke="black" strokeLinecap="round"/><path d="M32.5 29V31" stroke="black" strokeLinecap="round"/><path d="M33 13V20" stroke="black" strokeLinecap="round"/><path d="M28 13V20" stroke="black" strokeLinecap="round"/><path d="M29 29V31" stroke="black" strokeLinecap="round"/></svg>
                        <p className="v2">{service}</p>
                      </div>)
                  }
                })}
              </div>
              <div className="p-2" dangerouslySetInnerHTML={{ __html: generateLongDesc(project.longDesc) }}>
              </div>
            </div>
            <Image 
              src={project.img2 ? `/images/uploads/${project.img2}` :`/images/error.webp`}
              width={500}
              height={500}
              alt={`${project.img2Desc}`}/> 
            <Image 
              src={project.img3 ? `/images/uploads/${project.img3}` : `/images/error.webp`}
              width={500}
              height={500}
              alt={`${project.img3Desc}`}/> 
            <Image 
              src={project.img4 ? `/images/uploads/${project.img4}` : `/images/error.webp`}
              width={500}
              height={500}
              alt={`${project.img4Desc}`}/> 
            <Image 
              src={project.img5 ? `/images/uploads/${project.img5}` : `/images/error.webp`}
              width={500}
              height={500}
              alt={`${project.img5Desc}`}/> 
            <Image 
              src={project.img6 ? `/images/uploads/${project.img6}` : `/images/error.webp`}
              width={500}
              height={500}
              alt={`${project.img6Desc}`}/> 
            <Image 
              src={project.img7 ? `/images/uploads/${project.img7}` : `/images/error.webp`}
              width={500}
              height={500}
              alt={`${project.img7Desc}`}/> 
            <Image 
              src={project.img8 ? `/images/uploads/${project.img8}` : `/images/error.webp`}
              width={500}
              height={500}
              alt={`${project.img8Desc}`}/> 
            <Image 
              src={project.img9 ? `/images/uploads/${project.img9}` : `/images/error.webp`}
              width={500}
              height={500}
              alt={`${project.img9Desc}`}/> 
          </div>
        </div>
      </section>
      <ShowProjects projects={projects} small={true}/>
      <Action className="theme-teal-300"/>
    </div>
  );
}
