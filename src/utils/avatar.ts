import { createCanvas } from 'canvas';
import { AVATAR_SIZE } from '../config';

/**
 * Generate an avatar image with initials based on the provided name
 * @param name - User's name
 * @param backgroundColor - Background color in hex format (with or without #)
 * @returns Data URL of the generated avatar
 */
export function generateAvatar(name: string, backgroundColor: string): string {
  // Normalize the background color
  if (!backgroundColor.startsWith('#')) {
    backgroundColor = `#${backgroundColor}`;
  }
  
  // Calculate contrasting text color (white or black based on background brightness)
  const textColor = getContrastingColor(backgroundColor);
  
  // Generate initials from name
  const initials = getInitials(name);
  
  // Create canvas
  const size = AVATAR_SIZE;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Draw background
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, size, size);
  
  // Draw text
  ctx.fillStyle = textColor;
  ctx.font = 'bold 40px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(initials, size / 2, size / 2);
  
  // Return data URL
  return canvas.toDataURL('image/png');
}

/**
 * Extract initials from a name
 * @param name - User's name
 * @returns Initials (max 2 characters)
 */
export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  
  if (parts.length === 1) {
    // If only one name, return the first 2 characters (or just 1 if name is only 1 character)
    return parts[0].substring(0, 2).toUpperCase();
  } else {
    // Return first letter of first name and first letter of last name
    const firstInitial = parts[0].charAt(0);
    const lastInitial = parts[parts.length - 1].charAt(0);
    return (firstInitial + lastInitial).toUpperCase();
  }
}

/**
 * Calculate a contrasting color (black or white) based on background color brightness
 * @param hexColor - Hex color string
 * @returns Either black or white, whichever contrasts better
 */
export function getContrastingColor(hexColor: string): string {
  // Remove # if present
  const hex = hexColor.replace('#', '');
  
  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Calculate brightness using the formula (0.299*R + 0.587*G + 0.114*B)
  const brightness = (r * 0.299 + g * 0.587 + b * 0.114);
  
  // Return white for dark backgrounds and black for light backgrounds
  return brightness > 150 ? '#000000' : '#ffffff';
} 