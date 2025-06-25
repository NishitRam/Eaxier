import { useEffect } from 'react';
import { Platform } from 'react-native';

declare global {
  interface Window {
    Tawk_API?: any;
    Tawk_LoadStart?: Date;
  }
}

export default function TawkScript() {
  useEffect(() => {
    if (Platform.OS === 'web') {
      const script = document.createElement('script');
      script.src = 'https://embed.tawk.to/685c188771a033190a6214d1/1iujrvllr';
      script.async = true;
      script.charset = 'UTF-8';
      script.setAttribute('crossorigin', '*');

      script.onload = () => {
        window.Tawk_LoadStart = new Date();

        const waitForTawkAPI = setInterval(() => {
          if (window.Tawk_API && typeof window.Tawk_API.endChat === 'function') {
            clearInterval(waitForTawkAPI);

            window.Tawk_API.endChat();

           
            setTimeout(() => {
              window.Tawk_API.maximize();
            }, 1000);
          }
        }, 500);
      };

      document.body.appendChild(script);
    }
  }, []);

  return null;
}
