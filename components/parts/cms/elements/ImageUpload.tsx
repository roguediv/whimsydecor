"use client"
import TextInput from "@/components/elements/html/TextInput";
import { StartInfoForm } from "@/components/scripts/client/popup/InfoHandler";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";

type props = {
  className?: string;
  id?: string;
  title?: string;
  src?: string | null;
  imgDesc?: string | null;
}

const ImageUpload: React.FC<props> = ({className = '', id = 'image', title="title", src='', imgDesc = ''}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageTitle, setImageTitle] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState<string | null>(null);

  useEffect(() => {
    if (src) {
      setImagePreview(`/images/uploads/${src.replaceAll('\\', '/')}`)
      setImageTitle(`${(src.split('\\')[src.split('\\').length - 1]).split('_')[1]}`)
      setImageSize("Image Uploaded");
    }
    return () => {}
  }, [])


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        StartInfoForm({title: "File type not accepted", desc: 'Please select a JPEG or PNG image.'}, true);
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setImageTitle(file.name);
        setImageSize(`${(file.size / 1024).toFixed(2)} KB`);
      };
      reader.readAsDataURL(file);
    }
  };
  const reset = () => {
    setImagePreview(null);
    setImageTitle(null);
    setImageSize(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }
  return (
    <div className={`ImageUpload ${imageTitle != null ? 'isSet' : ''}`}>
      <input id={id} ref={fileInputRef} type="file" aria-label={`File upload for ${id}`} onChange={handleFileChange}/>
      {imageTitle ? (<></>) : (<>
      <label htmlFor={id} className="text">
        <svg width="100" height="101" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50.5" r="50" fill="url(#paint0_radial_308_2198)"/><circle cx="50.0006" cy="50.5001" r="41.2037" fill="#8BA9A9"/><g filter="url(#filter0_d_308_2198)"><circle cx="49.9996" cy="50.4999" r="35.1852" fill="#111D1D"/></g><path d="M42.5938 57.9072V56.5749H43.9261V57.9072H42.5938ZM34.566 67.8193C34.0456 68.3396 33.202 68.3396 32.6817 67.8193C32.1614 67.2989 32.1614 66.4553 32.6817 65.935L34.566 67.8193ZM41.2614 66.8771V57.9072H43.9261V66.8771H41.2614ZM42.5938 59.2396H33.6238V56.5749H42.5938V59.2396ZM43.5359 58.8493L34.566 67.8193L32.6817 65.935L41.6516 56.9651L43.5359 58.8493Z" fill="url(#paint1_linear_308_2198)"/><path d="M49.7689 66.8771H56.6622C61.7722 66.8771 65.9147 62.7346 65.9147 57.6246V43.8379C65.9147 38.7279 61.7722 34.5854 56.6622 34.5854H42.8755C37.7655 34.5854 33.623 38.7279 33.623 43.8379V50.7313" stroke="url(#paint2_linear_308_2198)" strokeWidth="2.66471" strokeLinecap="round"/><path d="M43.4902 44.4524L48.7795 52.0922C50.2913 54.2757 53.3269 54.7411 55.4233 53.1106L56.4125 52.3413C58.2541 50.909 60.8741 51.0721 62.5238 52.7218L65.915 56.1128" stroke="url(#paint3_linear_308_2198)" strokeWidth="2.66471" strokeLinecap="round"/><circle cx="57.8648" cy="42.637" r="1.72222" fill="url(#paint4_linear_308_2198)"/><defs><filter id="filter0_d_308_2198" x="13.038" y="15.3147" width="73.924" height="73.9233" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="1.77648"/><feGaussianBlur stdDeviation="0.888238"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_308_2198"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_308_2198" result="shape"/></filter><radialGradient id="paint0_radial_308_2198" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(50 50.5) rotate(90) scale(60.8796)"><stop offset="0.459277" stopColor="#9ECACA"/><stop offset="1" stopColor="#9ECACA" stopOpacity="0"/></radialGradient><linearGradient id="paint1_linear_308_2198" x1="80.4634" y1="57.9072" x2="12.4468" y2="57.7858" gradientUnits="userSpaceOnUse"><stop stopColor="#8D7F61"/><stop offset="0.151457" stopColor="#F1DCAD"/><stop offset="0.267035" stopColor="#8E7B53"/><stop offset="0.382648" stopColor="#E5D9A9"/><stop offset="0.495657" stopColor="#8A724C"/><stop offset="0.620286" stopColor="#E5D9A9"/><stop offset="0.73364" stopColor="#8E7B53"/><stop offset="0.866263" stopColor="#F1DCAD"/><stop offset="1" stopColor="#8D7F61"/></linearGradient><linearGradient id="paint2_linear_308_2198" x1="-102.708" y1="34.5855" x2="142.152" y2="34.1483" gradientUnits="userSpaceOnUse"><stop stopColor="#8D7F61"/><stop offset="0.151457" stopColor="#F1DCAD"/><stop offset="0.267035" stopColor="#8E7B53"/><stop offset="0.382648" stopColor="#E5D9A9"/><stop offset="0.495657" stopColor="#8A724C"/><stop offset="0.620286" stopColor="#E5D9A9"/><stop offset="0.73364" stopColor="#8E7B53"/><stop offset="0.866263" stopColor="#F1DCAD"/><stop offset="1" stopColor="#8D7F61"/></linearGradient><linearGradient id="paint3_linear_308_2198" x1="-51.1839" y1="44.4524" x2="118.856" y2="43.8686" gradientUnits="userSpaceOnUse"><stop stopColor="#8D7F61"/><stop offset="0.151457" stopColor="#F1DCAD"/><stop offset="0.267035" stopColor="#8E7B53"/><stop offset="0.382648" stopColor="#E5D9A9"/><stop offset="0.495657" stopColor="#8A724C"/><stop offset="0.620286" stopColor="#E5D9A9"/><stop offset="0.73364" stopColor="#8E7B53"/><stop offset="0.866263" stopColor="#F1DCAD"/><stop offset="1" stopColor="#8D7F61"/></linearGradient><linearGradient id="paint4_linear_308_2198" x1="41.6006" y1="40.9148" x2="67.719" y2="40.8682" gradientUnits="userSpaceOnUse"><stop stopColor="#8D7F61"/><stop offset="0.151457" stopColor="#F1DCAD"/><stop offset="0.267035" stopColor="#8E7B53"/><stop offset="0.382648" stopColor="#E5D9A9"/><stop offset="0.495657" stopColor="#8A724C"/><stop offset="0.620286" stopColor="#E5D9A9"/><stop offset="0.73364" stopColor="#8E7B53"/><stop offset="0.866263" stopColor="#F1DCAD"/><stop offset="1" stopColor="#8D7F61"/></linearGradient></defs></svg>
        <h5>Drag File Here</h5>
        <p className="v2">or, upload from your library</p>
      </label>
      </>)}
      {imagePreview && (
        <>
          <div className="image-preview">
            <Image src={imagePreview} alt="Image Preview" width={600} height={600} />
          </div>
          <div className="info">
            <div className="info-text">
              <p>{imageTitle}</p>
              <p className="v2">{imageSize}</p>
              <button className="custom" aria-label={"Remove Loaded Image"} onClick={reset}><IoClose /></button>
            </div>
            <TextInput id={`${id}Desc`} placeholder="Image Description" loadText={imgDesc ? imgDesc : ''}/>
          </div>
        </>
      )}
    </div>
  )
}

export default ImageUpload
