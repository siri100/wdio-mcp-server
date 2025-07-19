#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerTools } from '../src/browser-tools/registerTools.js'; 

async function runServer() {
  const server = new McpServer({
    name: 'wdio-mcp-server',
    version: '1.0.0',
  });

  // Register all tools from a centralized place
  registerTools(server);



  const transport = new StdioServerTransport();
  await server.connect(transport);

  // Graceful shutdown
  function shutdown() {
    console.log('Shutdown signal received. Exiting...');
    process.exit(0);
  }

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
  process.on('exit', shutdown);
  process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
  });
}

runServer().catch((error) => {
  console.error('Fatal error in runServer():', error);
  process.exit(1);
});
