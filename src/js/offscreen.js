chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type === 'flush-dns') {
    const bm = chrome.benchmarking;
    if (bm) {
      console.log('Offscreen: Flushing DNS...');
      bm.clearHostResolverCache();
      bm.closeConnections();
      sendResponse({ success: true });
    } else {
      console.error('Offscreen: chrome.benchmarking not found. Is --enable-benchmarking on?');
      sendResponse({ success: false, error: 'chrome.benchmarking not found' });
    }
  }
  return true;
});
