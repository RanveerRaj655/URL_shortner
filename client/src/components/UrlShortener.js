import React, { useState } from 'react';
import axios from 'axios';

function UrlShortener() {
  const [url, setUrl] = useState('');
  const [shortId, setShortId] = useState('');
  const [copied, setCopied] = useState(false);

  const apiBase = 'http://localhost:8001';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCopied(false);
    try {
      const res = await axios.post(`${apiBase}/url`, { url });
      setShortId(res.data.shortId);
    } catch (err) {
      console.error(err);
      alert('Failed to shorten URL');
    }
  };

  const shortUrl = shortId ? `${apiBase}/${shortId}` : '';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Enter URL here"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ padding: '10px', width: '300px', marginRight: '10px' }}
          required
        />
        <button type="submit">Shorten</button>
      </form>

      {shortId && (
        <div style={{ marginTop: '20px' }}>
          <p>
            Short URL:{' '}
            <a href={shortUrl} target="_blank" rel="noreferrer">
              {shortUrl}
            </a>
          </p>
          <button onClick={handleCopy}>{copied ? 'Copied' : 'Copy'}</button>
        </div>
      )}
    </div>
  );
}

export default UrlShortener;
