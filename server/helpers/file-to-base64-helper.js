export const filesToBase64 = (files) => {
    return files.map(file => {
        return `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
    });
};