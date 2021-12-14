const readAsBinaryString = (file) => {
  const fr = new FileReader();
  return new Promise((resolve, reject) => {
    if (!(file instanceof File)) {
      reject(new Error('Not a file object'));
    }
    fr.onload = (e) => {
      const buffer = e.target.result;
      let binary = '';
      const bytes = new Uint8Array(buffer);
      const len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      resolve(window.btoa(binary));
    };
    fr.readAsArrayBuffer(file);
  });
};

const readAsText = (file) => {
  const fr = new FileReader();
  return new Promise((resolve, reject) => {
    if (!(file instanceof File)) {
      reject(new Error('Not a file object'));
    }
    fr.onload = (e) => {
      const text = e.target.result;
      resolve(text);
    };
    fr.readAsText(file);
  });
};

export { readAsBinaryString, readAsText };

export default readAsText;
