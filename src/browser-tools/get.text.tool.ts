import { z } from 'zod';
import { getBrowserInstance } from './open.browser.tool.js';

// Zod schema for argument validation
export const getTextArguments = z.object({
  elementSelector: z.string().min(1, 'Selector must not be empty'),
  timeout: z.number().min(100).max(10000).optional().default(5000),
});

// Tool logic
export const getTextTool = async (
  { elementSelector, timeout }: z.infer<typeof getTextArguments>,
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
    const element = await browser.$(elementSelector);

    await browser.waitUntil(async () => await element.isExisting(), { timeout });
    await element.scrollIntoView();

    const text = await element.getText();

    return {
      content: [
        {
          type: 'text',
          text: `✅ Text of element "${elementSelector}": "${text}"`,
        },
      ],
    };
  } catch (e) {
    return {
      content: [
        {
          type: 'text',
          text: `❌ Failed to get text from element "${elementSelector}". Error: ${e?.message || String(e)}`,
        },
      ],
    };
  }
};
