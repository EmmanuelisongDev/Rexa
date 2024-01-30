export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The name of the product',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      description: 'The slug for the product URL',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A short description of the product',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'The price of the product',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'array',
      of: [
        {
          type: 'image',
        },
      ],
      options: {
        hotspot: true,
      },
      description: 'The main product image',
    },
  ],
}
