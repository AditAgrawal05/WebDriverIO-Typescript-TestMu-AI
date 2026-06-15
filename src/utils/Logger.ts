export class Logger {
  static info(message: string): void {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
  }

  static error(message: string, error?: Error): void {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, error?.message ?? '');
  }

  static step(stepNumber: number, description: string): void {
    console.log(`\n[STEP ${stepNumber}] ${description}`);
  }
}
