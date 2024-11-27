import { ReturnField } from "./interface";

export function validateString(string: string, stringTitle : string = 'String', maxLength: number = 255) : ReturnField {
  if (!string || string.trim() === '') {
    return { status: 0, title: `Empty ${stringTitle.charAt(0).toUpperCase() + stringTitle.slice(1)}`, desc: `${stringTitle.charAt(0).toUpperCase() + stringTitle.slice(1)} cannot be empty.`, data: null };
  }
  if (string.length > maxLength) {
    return { status: 0, title: `${stringTitle.charAt(0).toUpperCase() + stringTitle.slice(1)} too Large`, desc: `${stringTitle.charAt(0).toUpperCase() + stringTitle.slice(1)} exceeds the maximum length of ${maxLength} characters.`, data: null};
  }
  string = string.replace(/[\r\n]+/g, '');
  const validCharactersRegex = /^[a-zA-Z0-9 .,?!'"();:/#*|&-]*$/;
  if (!validCharactersRegex.test(string)) {
    return { status: 0, title: `Invalid ${stringTitle.charAt(0).toUpperCase() + stringTitle.slice(1)}`, desc: `${stringTitle.charAt(0).toUpperCase() + stringTitle.slice(1)} contains invalid characters. Only alphanumeric characters are allowed.`, data: null};
  }

  // If all checks pass, the string is valid
  return { status: 1, title: `${stringTitle.charAt(0).toUpperCase() + stringTitle.slice(1)} is valid.`, desc: `${stringTitle.charAt(0).toUpperCase() + stringTitle.slice(1)} is valid`, data: null };
}

export const validServices = [
	'Interior Redesign',
	'Custom Decor',
	'Floor Plan Layout',
	'Painting',
	'Color Consulting',
	'Home Staging'
];
export function validateServices(string: string, maxLength: number = 2000) : ReturnField {
  if (string.length > maxLength) {
    return { status: 0, title: "Service too Large", desc: `Service exceeds the maximum length of ${maxLength} characters.`, data: null};
  }
  const validCharactersRegex = /^[a-zA-Z0-9 .,?!'";:()|]*$/;
  if (!validCharactersRegex.test(string)) {
    return { status: 0, title: 'Invalid Service', desc: 'Service contains invalid characters. Only alphanumeric characters are allowed.', data: null};
  }

	const invalidServices = string.split('|,').filter(substring => {
		const trimmedSubstring = substring.trim();
		return !validServices.includes(trimmedSubstring);
	});
	if (invalidServices.length > 0) {
		return {
				status: 0,
				title: 'Invalid Services',
				desc: `The following services are not valid: ${invalidServices.join(', ')}`,
				data: null
		};
	}

  // If all checks pass, the string is valid
  return { status: 1, title: 'String is valid.', desc: 'String is valid', data: null };
}

export function validateEmail(email: string, maxLength: number = 254): ReturnField {
	if (email.trim() === '') {
			return { status: 0, title: 'Invalid Email', desc: 'Email field cannot be empty.', data: null };
	}
	if (email.length > maxLength) {
			return { status: 0, title: 'Invalid Email', desc: `Email exceeds the maximum length of ${maxLength} characters.`, data: null };
	}
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
			return { status: 0, title: 'Invalid Email', desc: 'Invalid email format.', data: null };
	}

	return { status: 1, title: 'Valid Email', desc: 'Email is valid.', data: null };
}

export function validateNumber(input: string | number, min: number = Number.MIN_SAFE_INTEGER, max: number = Number.MAX_SAFE_INTEGER): ReturnField {
	// Convert input to a number if it's a string
	const num = typeof input === 'string' ? Number(input) : input;

	// Check if the input is NaN
	if (isNaN(num)) {
			return { status: 0, title: 'Invalid Number', desc: 'Input is not a valid number.', data: null };
	}

	// Check if the number is within the specified range
	if (num < min || num > max) {
			return { status: 0, title: 'Invalid Number', desc: `Number must be between ${min} and ${max}.`, data: null };
	}

	// If all checks pass, the number is valid
	return { status: 1, title: 'Valid Number', desc: 'Number is valid.', data: null };
}

export function validateDate(date: string | Date, minDate: Date = new Date(1900, 0, 1), maxDate: Date = new Date()): ReturnField {
	const parsedDate = new Date(date);
	if (isNaN(parsedDate.getTime())) {
			return { status: 0, title: 'Invalid Date', desc: 'Date is not valid.', data: null };
	}
	if (parsedDate < minDate || parsedDate > maxDate) {
			return { status: 0, title: 'Date Out of Range', desc: `Date must be between ${minDate.toDateString()} and ${maxDate.toDateString()}.`, data: null };
	}
	return { status: 1, title: 'Valid Date', desc: 'Date is valid.', data: null };
}

export function validatePhoneNumber(phone: string): ReturnField {
	const phoneRegex = /^\+?[1-9]\d{9}$/; // E.164 format
	if (!phoneRegex.test(phone)) {
			return { status: 0, title: 'Invalid Phone Number', desc: 'Phone number is not valid.', data: null };
	}
	return { status: 1, title: 'Valid Phone Number', desc: 'Phone number is valid.', data: null };
}

export function removeAllInputErrors() {
	document.querySelectorAll('input, textarea, select').forEach(input => {input.classList.remove('inputError')});
}

export function validatePassword(password: string, maxLength: number = 255): ReturnField {
  // Check if the password is empty
  if (!password || password.trim() === '') {
    return { 
      status: 0, 
      title: 'Empty Password', 
      desc: 'Password cannot be empty.', 
      data: null 
    };
  }

  // Check if the password exceeds the maximum length
  if (password.length > maxLength) {
    return { 
      status: 0, 
      title: 'Password Too Large', 
      desc: `Password exceeds the maximum length of ${maxLength} characters.`, 
      data: null 
    };
  }

  // Regex for allowed characters (alphanumeric and common symbols)
  const validCharactersRegex = /^[a-zA-Z0-9 .,?!'"();:/#*|-]*$/;
  if (!validCharactersRegex.test(password)) {
    return { 
      status: 0, 
      title: 'Invalid Password', 
      desc: 'Password contains invalid characters. Only alphanumeric characters and certain symbols are allowed.', 
      data: null 
    };
  }

  // Check if password contains at least one letter and one number
  const containsLetter = /[a-zA-Z]/.test(password);
  const containsNumber = /\d/.test(password);
  if (!containsLetter || !containsNumber) {
    return { 
      status: 0, 
      title: 'Weak Password', 
      desc: 'Password must contain at least one letter and one number.', 
      data: null 
    };
  }

  // If all checks pass, the password is valid
  return { 
    status: 1, 
    title: 'Valid Password', 
    desc: 'Password is valid.', 
    data: null 
  };
}