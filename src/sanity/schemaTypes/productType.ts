export const productType = {
  name: "product",
  title: "Producto",
  type: "document",
  fields: [
    { name: "title", title: "Título", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },
    { name: "description", title: "Descripción", type: "text" },
    { name: "category", title: "Categoría", type: "string" },
    { name: "price", title: "Precio", type: "number" },
    { name: "stock", title: "Stock", type: "number" },
    { name: "warrantyInformation", title: "Garantía", type: "string" },
    {
      name: "shippingInformation",
      title: "Información de Envío",
      type: "string",
    },
    { name: "availabilityStatus", title: "Disponibilidad", type: "string" },
    {
      name: "rating",
      title: "Calificación",
      type: "number",
      options: { range: { min: 0, max: 5, step: 0.1 } },
    },
    { name: "returnPolicy", title: "Política de Devolución", type: "text" },
    {
      name: "reviews",
      title: "Número de Reseñas",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "reviewerName", title: "Usuario", type: "string" },
            {
              name: "reviewerEmail",
              title: "Correo Electrónico",
              type: "string",
            },
            { name: "comment", title: "Comentario", type: "text" },
            {
              name: "rating",
              title: "Calificación",
              type: "number",
              options: { range: { min: 0, max: 5, step: 0.1 } },
            },
            { name: "date", title: "Fecha", type: "datetime" },
          ],
        },
      ],
    },
    {
      name: "images",
      title: "Imágenes",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
      options: {
        layout: "grid",
      },
    },
  ],
};
