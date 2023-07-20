export function generateUniqueTGID() {
  const prefix = "TG";
  const now = new Date();
  const day = now.getDate().toString().padStart(2, "0");
  const year = now.getFullYear().toString();
  const hour = now.getHours().toString().padStart(2, "0");
  const minute = now.getMinutes().toString().padStart(2, "0");
  const second = now.getSeconds().toString().padStart(2, "0");

  // Combine the prefix and the date components to form the unique TG ID
  const uniqueTGID = `${prefix}${day}${year}${hour}${minute}${second}`;

  return uniqueTGID;
}
