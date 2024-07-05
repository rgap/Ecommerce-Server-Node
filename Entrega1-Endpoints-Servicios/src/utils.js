import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

// This returns the directory name of a path (the folder where the path is located)
const __filename = fileURLToPath(import.meta.url);

export const __dirname = dirname(__filename);
