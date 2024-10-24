import { disableScroll, enableScroll } from "./popupHandler";

export interface InfoTag {
  title: string;
  desc: string;
};

export function StartInfoForm(tags:InfoTag, isClosable: boolean = false) {
  var infoForm = document.getElementById('InfoForm');
  if (infoForm) {
    if (!isClosable) infoForm.classList.add('noClose');
    else infoForm.classList.remove('noClose');
    let title = infoForm.querySelector('.content h5') as HTMLHeadingElement | null;
    let desc = infoForm.querySelector('.content p') as HTMLHeadingElement | null;
    if (title && desc) {
      title.innerText = tags.title
      desc.innerText = tags.desc
    }
    disableScroll();
    infoForm.classList.remove("init");
    infoForm.classList.add("show");
  }
}

export function StartInputCheck(tags:{title: string, desc: string, btn1: string, btn2: string}) {
  var infoForm = document.getElementById('InfoForm');
  if (!infoForm) return;
  infoForm.classList.remove('noClose');
  infoForm.classList.add("waiting")
  let title = infoForm.querySelector('.content h5') as HTMLHeadingElement | null;
  let desc = infoForm.querySelector('.content p') as HTMLHeadingElement | null;
  if (title && desc) {
    title.innerText = tags.title
    desc.innerText = tags.desc
  }
  disableScroll();
  infoForm.classList.remove("init");
  infoForm.classList.add("show");
}

export function resetInfoForm() {
  var infoForm = document.getElementById('InfoForm');
  if (!infoForm) return
  infoForm.classList.remove('noClose');
  infoForm.classList.remove('success');
  infoForm.classList.remove('waiting');
  infoForm.classList.remove("show");
  infoForm.classList.remove("submitted");
  infoForm.dataset.response = "-1";
}
 
export function UpdateInfoForm(tags:InfoTag, isClosable: boolean = true, success: boolean = false) {
  var infoForm = document.getElementById('InfoForm');
  if (!infoForm) return;
  if (success) infoForm.classList.add('success');
  else infoForm.classList.remove('success');
  if (isClosable) infoForm.classList.remove('noClose');
  else infoForm.classList.add('noClose');
  let title = infoForm.querySelector('.content h5') as HTMLHeadingElement | null;
  let desc = infoForm.querySelector('.content p') as HTMLHeadingElement | null;
  if (title && desc) {
    title.innerText = tags.title
    desc.innerText = tags.desc
  }
  
}

export function CloseInfoForm() {
  var infoForm = document.getElementById('InfoForm');
  if (!infoForm) return;
  enableScroll()
  resetInfoForm()
}