import { isFilePath, readFile } from "../src/utils";
import fs from "fs/promises";
import path from "path";

const testFilePath = path.join(__dirname, "test-file.txt");
const testFileContent = "Hello, utility test!";

describe("file utilities", () => {
    beforeAll(async () => {
        await fs.writeFile(testFilePath, testFileContent, "utf-8");
    });

    afterAll(async () => {
        await fs.unlink(testFilePath);
    });

    test("isFilePath returns true for a valid file", async () => {
        const result = await isFilePath(testFilePath);
        expect(result).toBe(true);
    });

    test("isFilePath returns false for non-existing file", async () => {
        const result = await isFilePath("/path/to/does-not-exist.txt");
        expect(result).toBe(false);
    });

    test("readFile returns correct content", async () => {
        const content = await readFile(testFilePath);
        expect(content).toBe(testFileContent);
    });

    test("readFile throws on missing file", async () => {
        await expect(readFile("/path/to/missing.txt")).rejects.toThrow();
    });
});
