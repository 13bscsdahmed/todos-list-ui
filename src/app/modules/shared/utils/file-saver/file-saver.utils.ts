import { saveAs } from 'file-saver';

/**
 * File saver utility functions
 */
export class FileSaverUtils {
  public static downloadFile(data: any, filename: string, fileType: string){
    const file = new Blob([data], { type: fileType });
    saveAs(file, filename);
  }
}
