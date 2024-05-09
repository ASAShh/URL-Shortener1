const shortBtn = document.getElementById('short-btn');
const reloadBtn = document.getElementById('reload-btn');
const copyBtn = document.getElementById('copy-btn');
const shortUrlLink = document.getElementById("shortUrl");

shortBtn.addEventListener('click', () => {
    const longUrl = document.getElementById('longUrl').value;
    const shortUrl = generateShortURL(longUrl);

    shortUrlLink.href = shortUrl;
    shortUrlLink.innerText = shortUrl;
});

reloadBtn.addEventListener('click', () => location.reload());

copyBtn.addEventListener('click', () => {
    const shortUrl = shortUrlLink.href;
    if (shortUrl) {
        navigator.clipboard.writeText(shortUrl)
        .then(() => {
            alert('Short Link Copied to Clipboard!!!!');
        })
        .catch(error => {
            console.error('Error copying to clipboard:', error);
            alert('Error copying to clipboard. Please try again.');
        });
    } else {
        alert('No short URL available.');
    }
});

shortUrlLink.addEventListener('click', (event) => {
    event.preventDefault();
    const longUrl = shortUrlLink.innerText;
    window.open(longUrl, '_blank');
});

function generateShortURL(longUrl) {
    const hash = hashCode(longUrl);
    const shortCode = hash.substring(0, 6);
    return window.location.origin + '/' + shortCode;
}

function hashCode(str) {
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0;
    }
    return hash.toString();
}
