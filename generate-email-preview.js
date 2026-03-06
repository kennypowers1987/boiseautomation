import { writeFileSync } from 'fs';
import { getEmailTemplate } from './functions/_emailTemplate.js';

const html = getEmailTemplate('[Preview Name]');

writeFileSync('email-preview.html', html);
console.log('✅ Generated email-preview.html - Open this file in your browser to preview the email design!');