const ObserveElement = (box: string, funcA: (observer: IntersectionObserver) => void, funcB: (observer: IntersectionObserver) => void = (e) => {}, top: string = "0px"): IntersectionObserver => {
  const sectionOne = document.querySelector(box) as HTMLElement;
  const classOptions = { rootMargin: `${top} 0px 0px 0px` };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        funcA(observer);
      } else {
        funcB(observer);
      }
    });
  }, classOptions);
  if (!sectionOne) return observer;
  observer.observe(sectionOne);
  return observer;
}

export default ObserveElement;