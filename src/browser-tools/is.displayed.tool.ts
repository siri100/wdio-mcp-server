import { z } from 'zod';
import { getBrowserInstance } from './open.browser.tool.js';

// Argument schema
export const isDisplayedArguments = z.object({
  elementSelector: z.string().min(1, 'Selector must not be empty'),
  timeout: z.number().min(100).max(10000).optional().default(5000),
});

// Tool implementation
export const isDisplayedTool = async (
  { elementSelector, timeout }: z.infer<typeof isDisplayedArguments>,
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

    const isVisible = await element.isDisplayed();

    return {
      content: [
        {
          type: 'text',
          text: `🔍 Element "${elementSelector}" is ${isVisible ? '✅ visible' : '❌ not visible'} on the page.`,
        },
      ],
    };
  } catch (e) {
    return {
      content: [
        {
          type: 'text',
          text: `❌ Failed to check visibility of element "${elementSelector}". Error: ${e?.message || String(e)}`,
        },
      ],
    };
  }
};
