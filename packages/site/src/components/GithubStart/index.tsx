/**
 * GitHub start 数组件
 */
import React, { useEffect } from 'react';

const GitHubStart:React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://buttons.github.io/buttons.js';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, []);

  return <a className="github-button" href="https://github.com/diy4869/otaku-ui" data-icon="octicon-star" data-show-count="true" aria-label="Star diy4869/otaku-ui on GitHub">Star</a>
}

export default GitHubStart;
