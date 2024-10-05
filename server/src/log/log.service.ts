import { Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { writeFile, mkdir, readFile, readdir } from 'fs/promises';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class LogService {
  public  logsFolder:string;
  public  curfile:string;
  constructor(){
    this.logsFolder = path.join(__dirname, '..', '..',  'logs');
    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0'); // Get day
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Get month (0-based, hence +1)
    const year = now.getFullYear();
    let fileName = day+""+month+""+year+".txt"
    this.curfile = path.join(this.logsFolder, fileName);
  } 

  public fileExists(fileName: string): boolean {
    const filePath = path.join(this.logsFolder, fileName);
    return fs.existsSync(filePath);
  }

  async fileLogSetUp() {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0'); // Get day
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Get month (0-based, hence +1)
    const year = now.getFullYear(); // Get year

    try {
      let fileName = day+""+month+""+year+".txt"
      
      if(!this.fileExists(fileName)){
        const filePath = path.join(this.logsFolder, fileName);
        await writeFile(filePath, '');
       
      }
      
    } catch (error) {
      console.error('Error creating file:', error);
      throw new Error('Could not create file');
    }


  }

  async write(data) {
    this.fileLogSetUp()
    try {
      
      // Append data to the file
      console.log("WE GO : "+this.curfile)
      await writeFile(this.curfile,data, { flag: 'a' }); // 'a' flag for appending
      console.log(`Data appended to file at: ${this.curfile}`);
    } catch (error) {
      console.error('Error appending to file:', error);
      throw new Error('Could not append to file');
    }
    return `This action returns all log`;
  }
  async getOptions(){
    this.fileLogSetUp()
    try {
      // Read the directory and return the list of files
      const files = await readdir(this.logsFolder);
      return files;
    } catch (error) {
      // Handle errors (e.g., directory does not exist)
      throw new Error('Could not read directory: ' + error.message);
    }
  }
  async getData(filename: string) {
    this.fileLogSetUp()
    try {
   
      let data = (await readFile(path.join(this.logsFolder,filename))).toString().split('\n').reverse().join('\n');; // 'utf-8' for string output
      data = data.replaceAll('\n','<br>')
      console.log(data)
      return data;
    } catch (error) {
      console.error('Error reading file:', error);
      throw new Error('Could not read file');
    }
  }

 
}
