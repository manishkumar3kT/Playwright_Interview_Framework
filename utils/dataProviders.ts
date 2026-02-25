import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export class DataProviders {

    static getTestDataFromJason(fileName: string) {
        const filePath = path.join(process.cwd(), fileName);
        const rawData = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(rawData);
    }

    static getTestDataFromCSV(fileName: string) {
        const filePath = path.join(process.cwd(), fileName);
        const rawData = fs.readFileSync(filePath, 'utf-8');
        return parse(rawData, { columns: true, skip_empty_lines: true });
    }
}