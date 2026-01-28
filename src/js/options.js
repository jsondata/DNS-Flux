(function () {

  if (!chrome.benchmarking) {
    location.href = 'https://tinyurl.com/DNS-Flux';
  }

  const enable = document.getElementById('enable');
  const interval = document.getElementById('interval');

  // Load options from storage
  chrome.storage.local.get(['enable', 'interval'], (result) => {
    const options = {
      enable: result.enable === true,
      interval: parseFloat(result.interval) || 0,
    };

    enable.checked = options.enable;
    interval.value = options.interval;

    const updateOptions = () => {
      chrome.runtime.sendMessage({
        enable: enable.checked,
        interval: parseFloat(interval.value) || 0
      });
    };

    interval.addEventListener('input', updateOptions);
    enable.addEventListener('change', updateOptions);
  });

})();