import { z } from 'zod';
import { getBrowserInstance } from "./open.browser.tool.js";

export const clickElementArguments = z.object({
  elementSelector: z.string().min(1, 'Selector must not be empty'),
  timeout: z.number().min(100).max(10000).optional().default(5000),
});
export const clickElementTool = async (
  { elementSelector, timeout }: z.infer<typeof clickElementArguments>,
  _extra?: any // add this if MCP expects a second arg
): Promise<{
  content: {
    type: "text";
    text: string;
    _meta?: Record<string, unknown>;
  }[];
}> => {
  try {
    const browser = getBrowserInstance();
    const element = await browser.$(elementSelector);
    await browser.waitUntil(async () => await element.isExisting(), { timeout });
    await element.scrollIntoView();
    await element.click();

    return {
      content: [
        {
          type: "text",
          text: `✅ Successfully clicked element with selector: "${elementSelector}"`,
        },
      ],
    };
  } catch (e) {
    return {
      content: [
        {
          type: "text",
          text: `❌ Failed to click element "${elementSelector}". Error: ${e?.message || String(e)}`,
        },
      ],
    };
  }
};