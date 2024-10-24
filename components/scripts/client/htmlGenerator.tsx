import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';

export const generateLongDesc = (text: string): string => {
  // Create a DOM instance for DOMPurify
  const window = new JSDOM('').window;
  const purify = DOMPurify(window);

  // Replace keys with corresponding HTML tags
  let html = text
    .replace(/\/nl/g, '</p><p class="v2" >') // New Paragraph
    .replace(/##(.*?)##/g, '<h4>$1</h4>') // Title
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Bold Text

  if (!html.startsWith('<p')) {
    html = `<p class="v2">${html}`;
  }
  html += '</p>';
  // Sanitize the generated HTML
  const sanitizedHtml = purify.sanitize(html);

  return sanitizedHtml;
};

export const generateTitle = (text: string): string => {
  // Create a DOM instance for DOMPurify
  const window = new JSDOM('').window;
  const purify = DOMPurify(window);

  // Replace keys with corresponding HTML tags
  let html = text.replace(/\/nl/g, '<br/>') 

  // Sanitize the generated HTML
  const sanitizedHtml = purify.sanitize(html);

  return sanitizedHtml;
};