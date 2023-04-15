import { useState, useEffect } from 'react';

const useLoadEvenbriteOnPageLoad = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.eventbrite.com/static/widgets/eb_widgets.js';
    document.head.appendChild(script);
    script.addEventListener('load', () => setIsLoaded(true));
  }, []);

  useEffect(() => {
    const hasWidget = window?.EBWidgets?.createWidget;
    if (isLoaded && hasWidget) {
      window.EBWidgets.createWidget({
        widgetType: 'checkout',
        eventId: '353399967817',
        iframeContainerId: 'eventbrite-widget-container-353399967817',
        iframeContainerHeight: 425,
        // modal: true,
        // modalTriggerElementId: 'eventbrite-widget-modal-trigger-353399967817',
        // onOrderComplete: exampleCallback,
      });
    }
  }, [isLoaded]);
};

export default useLoadEvenbriteOnPageLoad;
