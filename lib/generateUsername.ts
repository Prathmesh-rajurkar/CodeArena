export default function generateUsername(email: string): string {
  // take everything before '@'
  const base = email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "_");

  // add a random 4-digit number
  const randomNum = Math.floor(1000 + Math.random() * 9000);

  return `${base}_${randomNum}`;
}