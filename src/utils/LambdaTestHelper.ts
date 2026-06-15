export class LambdaTestHelper {
  static async setTestStatus(status: 'passed' | 'failed', reason?: string): Promise<void> {
    const remark = reason ? `;lambda-reason=${reason}` : '';
    await browser.execute(`lambda-status=${status}${remark}`);
    console.log(`LambdaTest status set to: ${status}`);
  }

  static async addRemark(remark: string): Promise<void> {
    await browser.execute(`lambda-remark=${remark}`);
  }

  static async getSessionId(): Promise<string> {
    const caps = await browser.getSession();
    return caps.sessionId ?? '';
  }
}
