import axios from "axios";

const amiami = axios.create({
  baseURL: "https://api.amiami.moe/v1",
});

export const buscarFiguras = async (keyword = "rem") => {
  try {
    const res = await amiami.get(`/items?keyword=${keyword}`);
    // La API regresa un objeto con propiedad "items"
    return res.data.items || [];
  } catch (error) {
    console.error("Error al consultar AmiAmi:", error);
    return [];
  }
};
