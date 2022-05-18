import path from "path";
import { fileURLToPath } from "url";

export const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const pathPublic = path.join(__dirname, "public");
export const pathViews = path.join(__dirname, "views");