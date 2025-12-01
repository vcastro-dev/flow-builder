import { dirname } from "path";
import type { FileRepositoryPort } from "../../application/port/FileRepository.port.js";
import { mkdir, writeFile } from "fs/promises";

export const FileRepository: FileRepositoryPort = {
  async writeFile(path: string, content: string): Promise<void> {
    try {
      const dirPath = dirname(path);
      await mkdir(dirPath, { recursive: true });
      await writeFile(path, content, "utf8");
    } catch (error) {
      console.error(`[FileRepository] Error writing file at ${path}:`, error);
      throw new Error(`Failed to write file at ${path}`);
    }
  },
};
