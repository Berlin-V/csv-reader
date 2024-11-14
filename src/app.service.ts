import { Injectable } from '@nestjs/common';

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser'); // Ensure you have installed the `csv-parser` package.

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  readAndSaveCsv() {
    async function readCsvFile() {
      const res = [];
      // __dirname
      const dirPath = './utils/file';
      const filePath = path.join(dirPath, 'output.csv');

      // Ensure only the directory exists, not the file path itself
      fs.mkdirSync(dirPath, { recursive: true });

      // Check if the file exists before attempting to read
      if (!fs.existsSync(filePath)) {
        console.error('File does not exist at path:', filePath);
        return 'File not found';
      }

      // Now proceed with reading the CSV file
      return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
          .pipe(csv())
          .on('data', (data) => res.push(data))
          .on('end', () => {
            console.log('CSV Data:', res);
            resolve(res);
          })
          .on('error', (error) => {
            console.error('Error reading CSV file:', error);
            reject(error);
          });
      });
    }
  }
}
