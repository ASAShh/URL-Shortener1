// Get DOM elements
const shortBtn = document.getElementById('short-btn');
const reloadBtn = document.getElementById('reload-btn');
const copyBtn = document.getElementById('copy-btn');
const shortUrlLink = document.getElementById("shortUrl");

// Map to store short URLs and their corresponding long URLs
const shortUrlMap = {};

// Counter for generating short codes
let counter = 1;

// Event listener for Shorten button
shortBtn.addEventListener('click', shortenUrl);

// Event listener for Reload button
reloadBtn.addEventListener('click', () => location.reload());

// Event listener for Copy button
copyBtn.addEventListener('click', copyShortUrl);

// Event listener for Short URL link
shortUrlLink.addEventListener('click', redirectToLongUrl);

// Function to shorten URL
function shortenUrl() {
    const longUrl = document.getElementById('longUrl').value.trim();
    if (!isValidUrl(longUrl)) {
        alert('Please enter a valid URL.');
        return;
    }

    const shortUrl = generateShortUrl(longUrl);
    shortUrlMap[shortUrl] = longUrl;

    displayShortUrl(shortUrl);
}

// Function to generate a short URL
function generateShortUrl(longUrl) {
    let shortCode;
    do {
        shortCode = generateRandomString(6);
    } while (shortUrlMap.hasOwnProperty(shortCode));
    return window.location.origin + '/' + shortCode;
}

// Function to generate a random string
function generateRandomString(length) {
    const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
        randomString += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
    }
    return randomString;
}

// Function to validate URL format
function isValidUrl(url) {
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(url);
}

// Function to display short URL
function displayShortUrl(shortUrl) {
    shortUrlLink.href = shortUrl;
    shortUrlLink.innerText = shortUrl;
}

// Function to copy short URL to clipboard
function copyShortUrl() {
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
}

// Function to redirect to long URL when short URL link is clicked
function redirectToLongUrl(event) {
    event.preventDefault();
    const shortUrl = shortUrlLink.innerText;
    const longUrl = shortUrlMap[shortUrl];
    if (longUrl) {
        window.open(longUrl, '_blank');
    } else {
        alert('Long URL not found for this short link.');
    }
}
