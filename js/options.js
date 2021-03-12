document.getElementById('save').addEventListener('click', saveKey)
function saveKey() {
    console.log('saving key')
    const inputValue = document.getElementById('apiKey').value;
    chrome.storage.local.set({apiKey: inputValue});
}

window.onload = () => {
    chrome.storage.local.get(['apiKey'], (res) => {
        console.log(res)
        document.getElementById('apiKey').value = res.apiKey || '';
    })
}