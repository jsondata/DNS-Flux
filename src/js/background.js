async function createOffscreen() {
  if (await chrome.offscreen.hasDocument()) return;
  await chrome.offscreen.createDocument({
    url: 'src/pages/offscreen.html',
    reasons: ['DISPLAY_MEDIA'], // Closest reason fit for generic tasks or benchmarking
    justification: 'Access chrome.benchmarking API which is only available in renderer processes'
  });
}

const flashAndReload = async function(noReload) {
  try {
    await createOffscreen();
    const response = await chrome.runtime.sendMessage({ type: 'flush-dns' });
    
    if (response && !response.success) {
      console.error('Flush failed:', response.error);
      chrome.tabs.create({ url: 'https://tinyurl.com/DNS-Flux' });
      return;
    }

    if (!noReload) {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab) {
        chrome.tabs.reload(tab.id, { bypassCache: true });
      }
    }
    console.log('[flashAndReload] Success');
  } catch (err) {
    console.error('[flashAndReload] Error:', err);
  }
};

chrome.action.onClicked.addListener(function() {
  flashAndReload();
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'flush-dns-reload',
    title: 'Flush DNS and Reload',
    contexts: ['all']
  });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === 'flush-dns-reload') {
    flashAndReload();
  }
});

chrome.commands.onCommand.addListener(function(cmd) {
  if (cmd === 'flush-and-reload') {
    flashAndReload();
  }
});

const setAutoReload = async (options) => {
  await chrome.alarms.clear('auto-reload');
  if (options.enable && options.interval > 0) {
    chrome.alarms.create('auto-reload', {
      periodInMinutes: options.interval / 60
    });
    console.log('[AutoReload] start with interval', options.interval);
  } else {
    console.log('[AutoReload] stop');
  }
};

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'auto-reload') {
    flashAndReload(true);
  }
});

// Initial setup from storage
chrome.storage.local.get(['enable', 'interval'], (result) => {
  const options = {
    enable: result.enable === true,
    interval: parseFloat(result.interval) || 0
  };
  setAutoReload(options);
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.type === 'flush-dns') return; // Ignore messages from background to offscreen
  
  setAutoReload(message);
  // Persist options
  chrome.storage.local.set(message);
});