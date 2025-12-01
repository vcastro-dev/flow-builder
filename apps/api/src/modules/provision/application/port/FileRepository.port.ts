export interface FileRepositoryPort {
  writeFile(path: string, content: string): Promise<void>;
}
