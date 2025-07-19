import { z } from 'zod';
import { getBrowserInstance } from './open.browser.tool.js';

// No arguments needed to close the browser
export const closeBrowserArguments = z.object({});

// Tool implementation
export const closeBrowserTool = async (
  _args: z.infer<typeof closeBrowserArguments>,
  _extra?: any
): Promise<{
  content: {
    type: 'text';
    text: string;
    _meta?: Record<string, unknown>;
  }[];
}> => {
  try {
    const browser = getBrowserInstance();
    await browser.deleteSession(); // properly close the WebDriver session

    return {
      content: [
        {
          type: 'text',
          text: `🛑 Browser session closed successfully.`,
        },
      ],
    };
  } catch (e) {
    return {
      content: [
        {
          type: 'text',
          text: `❌ Failed to close browser. Error: ${e?.message || String(e)}`,
        },
      ],
    };
  }
};
