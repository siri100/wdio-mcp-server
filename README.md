# 🚀 wdio-mcp-server

A custom [Model Context Protocol (MCP)](https://modelcontextprotocol.org) server for automating WebdriverIO (WDIO) browser-based testing using GitHub Copilot Agent's **Agent Mode**. It enables LLM-powered QA automation: provide a test scenario in plain English, and the server performs testing **and** auto-generates WebdriverIO test code using the registered tools.

---

## 📦 What is MCP Server?

MCP (Model Context Protocol) Server allows developers to expose tools that can be invoked by GitHub Copilot Agents through LLMs.  
This project extends MCP to support **WebdriverIO automation**, so your agent can:
- Interpret test scenarios
- Perform real-time UI testing
- Generate WDIO test automation code

---

## 🤖 Integration with GitHub Copilot Agent (Agent Mode)

Once configured, GitHub Copilot Agent (in **Agent Mode**) can:
- Communicate with this local MCP server
- Utilize WDIO-based tools to **run** and **generate** tests
- Dynamically interact with browsers using defined tools

---

## ⚙️ Local Setup Instructions

### 1. Clone and install dependencies
```bash
git clone https://github.com/your-username/wdio-mcp-server.git
cd wdio-mcp-server
npm install
