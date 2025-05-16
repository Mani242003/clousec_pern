/// <reference types="vite/client" />

// Declare modules for image imports
declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.jpeg' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  const value: string;
  export default value;
}

declare module '*.gif' {
  const value: string;
  export default value;
}

declare module '*.webp' {
  const value: string;
  export default value;
}

// Add requestIdleCallback types for browsers that support it
interface Window {
  requestIdleCallback: (
    callback: (deadline: {
      didTimeout: boolean;
      timeRemaining: () => number;
    }) => void,
    options?: { timeout: number }
  ) => number;
  cancelIdleCallback: (handle: number) => void;
}
