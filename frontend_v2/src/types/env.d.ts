interface CustomWindow extends Window {
    _env_?: {
      VITE_API_URL?: string;
    };
  }
  
  declare const window: CustomWindow;