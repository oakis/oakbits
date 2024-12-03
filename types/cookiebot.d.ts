declare interface Window {
  Cookiebot: {
    consented: boolean;
    onconsent: (() => void) | null;
  };
}
