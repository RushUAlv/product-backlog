export const downloadBlob = (blob: Blob | File, fileName: string) => {
  const href = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = href;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(href);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const generateFormData = (object: Record<string, any>) => {
  const formData = new FormData();
  Object.keys(object).forEach((key) => {
    const value = object[key];
    const isArray = Array.isArray(value);
    if (isArray) {
      for (const item of value) {
        formData.append(key, item);
      }
    } else {
      formData.append(key, value);
    }
  });
  return formData;
};
