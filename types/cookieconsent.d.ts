declare interface Window {
  CookieScript: {
    instance: {
      currentState: () => { action: "accept" | "reject" };
    };
  };
}
