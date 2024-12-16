export const getImageSize = (size: string) => {
  switch (size) {
    case "46mm":
      return { width: 500, height: 500 }; 
    case "42mm":
      return { width: 460, height: 460 }; 
    case "40mm":
      return { width: 440, height: 440 }; 
    case "44mm":
      return { width: 480, height: 480 }; 
    default:
      return { width: 500, height: 500 }; 
  }
};
