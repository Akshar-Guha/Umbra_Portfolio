import { webcrypto } from 'node:crypto';

// Utility functions go here

export const generateBinaryString = (length: number): string => {
  let binaryString = '';
  for (let i = 0; i < length; i++) {
    binaryString += Math.random() < 0.5 ? '0' : '1';
  }
  return binaryString;
};

// Function to generate a *deterministic* placeholder full SHA-256 hash (64 characters)
// This is a placeholder and not a cryptographically secure hash function.
export const generateSHA256Placeholder = (input: string): string => {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char; // Simple hashing algorithm
    hash = hash & hash; // Convert to 32bit integer
  }

  // Convert the hash to a 64-character hex-like string deterministically
  const hexCharacters = 'abcdef0123456789';
  let result = '';
  const hashLength = 64;
  for (let i = 0; i < hashLength; i++) {
    // Use a combination of the deterministic hash and the index to pick a character
    const charIndex = Math.abs((hash + i) % hexCharacters.length);
    result += hexCharacters.charAt(charIndex);
    // Further mix the hash for the next character (optional but adds variation)
    hash = (hash >> 1) ^ hash; // Simple bitwise operation
  }

  return result;
};

// export const generatePartialSha256 = (length: number = 8): string => {
//   const characters = 'abcdef0123456789';
//   let result = '';
//   for (let i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * characters.length));
//   }
//   return result;
// };

export const exampleUtil = () => {
  // TODO: Implement utility functions
}; 