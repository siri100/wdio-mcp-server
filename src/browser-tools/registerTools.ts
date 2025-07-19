import { startBrowserTool, startBrowserArgs } from './open.browser.tool.js';
import { navigateToolArguments, navigateTool } from './navigate.tool.js';
import { clickElementArguments, clickElementTool } from './click.tool.js';
import { enterValueArguments, enterValueTool } from './set-value.tool.js';
import { getTextArguments, getTextTool } from './get.text.tool.js';
import { isDisplayedArguments, isDisplayedTool } from './is.displayed.tool.js';
import { closeBrowserArguments, closeBrowserTool } from './close.browser.tool.js';

/**
 * Register all tools to the MCP server.
 * @param {import('@modelcontextprotocol/sdk/server/mcp.js').McpServer} server 
 */
export function registerTools(server) {
  server.tool("open-browser", "Open a browser window", startBrowserArgs.shape, startBrowserTool);

  server.tool("navigate-to-url", "Navigate the active browser to a specified URL", navigateToolArguments.shape, navigateTool);

  server.tool("click-element", "Click an element in the active browser", clickElementArguments.shape, clickElementTool);

  server.tool("set-value", "Enter a value into an input field", enterValueArguments.shape, enterValueTool);

  server.tool("get-text", "Get the visible text of an element", getTextArguments.shape, getTextTool);

  server.tool("is-displayed", "Check if an element is displayed on the page", isDisplayedArguments.shape, isDisplayedTool);

  server.tool("close-browser", "Close the active browser session", closeBrowserArguments.shape, closeBrowserTool);
}
