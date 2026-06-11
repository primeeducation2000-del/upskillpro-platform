import React from 'react';
import { WHATSAPP_MESSAGE, WHATSAPP_NUMBER } from './contactConfig.js';

const ANALYTICS_KEY = 'upskillpro-whatsapp-clicks';

function getWhatsAppUrl() {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
}

function trackWhatsAppClick() {
  const event = {
    type: 'whatsapp_contact_click',
    timestamp: new Date().toISOString(),
    pageUrl: window.location.href,
  };

  try {
    const previousEvents = JSON.parse(localStorage.getItem(ANALYTICS_KEY)) || [];
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify([...previousEvents.slice(-49), event]));
  } catch {
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify([event]));
  }

  window.dispatchEvent(new CustomEvent('upskillpro:whatsapp-click', { detail: event }));
  window.dataLayer?.push(event);
}

export default function FloatingWhatsAppButton() {
  return (
    <a
      className="whatsapp-float"
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us about English courses on WhatsApp"
      data-tooltip="Chat with us about English courses"
      onClick={trackWhatsAppClick}
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <path d="M16.02 3.4c-6.9 0-12.5 5.48-12.5 12.24 0 2.33.67 4.55 1.92 6.48L3.4 28.6l6.72-1.98a12.76 12.76 0 0 0 5.9 1.46c6.9 0 12.5-5.48 12.5-12.24S22.92 3.4 16.02 3.4Zm0 22.56c-1.94 0-3.82-.53-5.46-1.54l-.38-.23-3.98 1.18 1.2-3.84-.25-.4a10 10 0 0 1-1.54-5.49c0-5.58 4.67-10.12 10.41-10.12s10.4 4.54 10.4 10.12-4.66 10.32-10.4 10.32Zm5.72-7.58c-.31-.15-1.84-.89-2.13-.99-.29-.11-.5-.15-.71.15-.2.31-.81.99-.99 1.19-.18.2-.37.22-.68.07-.31-.15-1.32-.47-2.51-1.51-.93-.81-1.56-1.82-1.74-2.13-.18-.31-.02-.48.14-.63.14-.14.31-.37.47-.55.16-.18.21-.31.31-.52.1-.2.05-.39-.03-.55-.08-.15-.71-1.68-.97-2.31-.26-.6-.52-.52-.71-.53h-.61c-.21 0-.55.08-.84.39-.29.31-1.1 1.05-1.1 2.57s1.13 2.99 1.29 3.2c.16.2 2.23 3.33 5.4 4.67.75.32 1.34.51 1.8.65.76.24 1.45.2 1.99.12.61-.09 1.84-.73 2.1-1.44.26-.71.26-1.31.18-1.44-.08-.13-.29-.21-.6-.36Z" />
      </svg>
    </a>
  );
}
