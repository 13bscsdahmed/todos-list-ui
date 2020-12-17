/**
 * App utility functions
 */
export class AppUtils {
  
  /**
   * Function to return date time string from date object
   * @param [date] - Date object
   */
  public static getDateTimeString(date: Date): string {
    if (date) {
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    } else {
      return '';
    }
  }
}
