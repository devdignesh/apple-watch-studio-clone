export const getImageSize = (size: string) => {
  switch (size) {
    case "46mm":
      return { width: 500, height: 500 }; 
    case "42mm":
      return { width: 450, height: 450 }; 
    case "40mm":
      return { width: 400, height: 400 }; 
    case "44mm":
      return { width: 450, height: 450 }; 
    default:
      return { width: 500, height: 500 }; 
  }
};
