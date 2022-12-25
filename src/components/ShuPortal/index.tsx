import React from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  attach?: React.ReactElement;
  triggerNode?: HTMLElement;
  children: React.ReactNode;
}
