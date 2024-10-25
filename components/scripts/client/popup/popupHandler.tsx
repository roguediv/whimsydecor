// Disable scrolling
export async function disableScroll() {
  // Get the current scroll position
  const scrollPosition = window.scrollY || window.pageYOffset;

  // Save the current scroll position as a style on the body
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollPosition}px`;
}

// Enable scrolling
export async function enableScroll() {
  // Retrieve the saved scroll position from the body style
  const scrollPosition = parseInt(document.body.style.top || '0', 10);
  
  // enable scrolling to be smooth most of the time
  const scrollElement : HTMLHtmlElement | null = document.querySelector("html");
  if (scrollElement) {
    scrollElement.classList.add("notSmooth");
    setTimeout(() => {
      scrollElement.classList.remove("notSmooth");
    }, 100)
  }
  // Reset the body style and scroll to the saved position
  document.body.style.position = '';
  document.body.style.top = '';
  window.scrollTo(0, Math.abs(scrollPosition));
}

/// Slide a form
export function slide(popupID: string, slideInClass: string, isReverse: boolean = false) {
  /// Set default values
  let inClass = 'slide-in'
  let outClass = 'slide-out'
  let currentSlideClass = 'slide-in'

  /// Going backwards?
  if (isReverse) {
    inClass = 'slide-in-rev';
    outClass = 'slide-out-rev'
  }

  /// Figure out if last move was forwards or backwords and set initial slide elm
  let slideOutElement = document.querySelector(popupID + ' .slide-in');
  if (!slideOutElement) {
    slideOutElement = document.querySelector(popupID + ' .slide-in-rev');
    currentSlideClass = 'slide-in-rev'
  }

  /// Remove the class "slide-in"
  if (slideOutElement) {
    slideOutElement.classList.remove(currentSlideClass, 'slide-init');
  
    /// Add the class "slide-out"
    slideOutElement.classList.add(outClass);
  
    /// Wait for 250 milliseconds (use 250,000 microseconds for exact microseconds)
    setTimeout(() => {
      /// Add .slide-in to the slide in element given
      const slideInElement = document.querySelector(slideInClass);

      /// Remove the class "slide-out"
      slideOutElement!.classList.remove(outClass);
    
      /// Add the class "slide-in" to the "slide-1-2" element
      if (slideInElement) {
        slideInElement.classList.add(inClass);
      }
    }, 250);
  }
}

export function alertErrorMessage(title: string, text: string, el: HTMLElement | null = null): void {
  // Get the first element with the class .footAlertError
  const error = el?.parentElement?.parentElement?.querySelector('.error');

  if (error) {
    error.textContent = text;
    if (el) el.classList.add('inputError')
  }
}

/// Form Validation 
export function isValidEmail(email: string): boolean {
  // Regular expression for a simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Test the email against the regular expression
  return emailRegex.test(email);
}
export function isStringLengthValid(str: string): boolean {
  const minLength = 2;
  const maxLength = 500;

  const length = str.length;

  return length >= minLength && length <= maxLength;
}

export function isValidPhoneNumber(phoneNumber: string): boolean {
  // Remove non-digit characters
  const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');

  // Check if the cleaned phone number is between 7 and 15 characters
  return cleanedPhoneNumber.length == 10;
}