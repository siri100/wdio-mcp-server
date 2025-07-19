import { z } from 'zod';
import { getBrowserInstance } from './open.browser.tool.js';

// Zod schema for argument validation
export const enterValueArguments = z.object({
  elementSelector: z.string().min(1, 'Selector must not be empty'),
  timeout: z.number().min(100).max(10000).optional().default(5000),
  value: z.string().min(1, 'Value must not be empty'),
});

// The actual tool function
export const enterValueTool = async (
  { elementSelector, timeout, value }: z.infer<typeof enterValueArguments>,
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
    await element.setValue(value);

    return {
      content: [
        {
          type: 'text',
          text: `✅ Successfully entered value "${value}" into element: "${elementSelector}"`,
        },
      ],
    };
  } catch (e) {
    return {
      content: [
        {
          type: 'text',
          text: `❌ Failed to enter value into element "${elementSelector}". Error: ${e?.message || String(e)}`,
        },
      ],
    };
  }
};
