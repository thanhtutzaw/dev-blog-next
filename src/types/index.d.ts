export { };

declare global {
  interface Window {
    google: any,
    handleResponse: (response: any) => void;

  }
}
