import fs from 'fs';
const writeData = async <T>(path: string, data: T[]): Promise<void> => {
    try {
        const json = JSON.stringify(data, null, 2);
        await fs.promises.writeFile(path, json, 'utf-8');
    } catch (err: any) {
        console.log(err)
        throw new Error('Failed to read to file');
    }
}
const readData = async <T>(path: string): Promise<T[]> => {
    try {
        console.log(path)
        let data = await fs.promises.readFile(path, 'utf-8');
        return JSON.parse(data) as T[];
    } catch (err: any) {
         console.log(err)
        throw new Error('Failed to read to file');
    }
}

export { writeData, readData }