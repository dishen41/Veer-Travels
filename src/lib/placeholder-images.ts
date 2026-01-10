import placeholderData from './placeholder-images.json';

const { placeholderImages } = placeholderData;

export const getImageById = (id: string) => {
  return placeholderImages.find((img) => img.id === id);
};
