export const byteToBase64 = (contentType: string, bytes: string) => {
  return `data:${contentType && contentType};base64,${bytes && bytes}`;
};
