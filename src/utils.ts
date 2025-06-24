import { stat, readFile as fsReadFile } from "fs/promises";

export async function isFilePath(str: string): Promise<boolean> {
    try {
        const fileStat = await stat(str);
        return fileStat.isFile();
    } catch {
        return false;
    }
}

export async function readFile(path: string): Promise<string> {
    return fsReadFile(path, { encoding: "utf-8" });
}
