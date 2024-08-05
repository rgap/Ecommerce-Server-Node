import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const currentDir = dirname(__filename);
// This will return the src folder path
export const __dirname = join(currentDir, "..");
