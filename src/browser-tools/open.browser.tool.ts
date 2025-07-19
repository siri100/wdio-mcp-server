import { remote, Browser } from 'webdriverio';
import { z } from 'zod';

// Shared state
const state = {
    browsers: new Map<string, Browser>(),
    currentSession: null as string | null,
};

// Schema for browser launch input
export const startBrowserArgs = z.object({
  headless: z.boolean().optional(),
  windowWidth: z.number().min(400).max(3840).optional(),
  windowHeight: z.number().min(400).max(2160).optional(),
});

// Tool logic to start browser
export const startBrowserTool = async ({ headless = true, windowWidth = 1280, windowHeight = 1080 }: z.infer<typeof startBrowserArgs>) => {
    const chromeArgs = [
        `--window-size=${windowWidth},${windowHeight}`,
        '--no-sandbox',
        '--disable-search-engine-choice-screen',
        '--disable-infobars',
        '--log-level=3',
        '--use-fake-device-for-media-stream',
        '--use-fake-ui-for-media-stream',
        '--disable-web-security',
        '--allow-running-insecure-content',
    ];

    // if (headless) {
    //     chromeArgs.push('--headless', '--disable-gpu');
    // }

    const browser = await remote({
        logLevel: 'error',
        capabilities: {
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: chromeArgs,
            },
            acceptInsecureCerts: true,
        },
    });

    const sessionId = browser.sessionId;
    state.browsers.set(sessionId, browser);
    state.currentSession = sessionId;

    const modeText = headless ? 'headless' : 'headed';

   return {
  content: [{
    type: "text" as const,
    text: `✅ Launched Chrome (${modeText}) at ${windowWidth}x${windowHeight} — Session: ${sessionId}`,
  }],
};
};

// Reusable getter
export const getBrowserInstance = () => {
    const browser = state.browsers.get(state.currentSession!);
    if (!browser) {
        throw new Error('❌ No active browser session found.');
    }
    return browser;
};

// Optional: Close tool (used in server.ts if needed)
export const closeSessionTool = async () => {
    if (state.currentSession) {
        const browser = state.browsers.get(state.currentSession);
        if (browser) {
            await browser.deleteSession();
            state.browsers.delete(state.currentSession);
        }
        state.currentSession = null;
        return {
            content: [{ type: 'text', text: '🛑 Browser session closed.' }],
        };
    }

    return {
        content: [{ type: 'text', text: 'ℹ️ No active session to close.' }],
    };
};
