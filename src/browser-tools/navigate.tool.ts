import { z } from "zod";
import { getBrowserInstance } from "./open.browser.tool.js";

// Schema definition
export const navigateToolArguments = z.object({
  url: z.string().url().describe("The URL to navigate to"),
});

// Tool function
export const navigateTool = async ({ url }: z.infer<typeof navigateToolArguments>) => {
  const browser = getBrowserInstance();

  try {
    await browser.url(url);
    return {
      content: [
        {
          type: "text" as const,
          text: `🌐 Navigated to: ${url}`,
        },
      ],
    };
  } catch (err) {
    return {
      content: [
        {
          type: "text" as const,
          text: `❌ Failed to navigate to ${url}: ${(err as Error).message}`,
        },
      ],
    };
  }
};
