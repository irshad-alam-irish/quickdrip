export const navigation = {
  categories: [
    {
      id: 'men',
      name: 'MEN',
      featured: [
        { name: 'New Arrivals', href: '#' },
        { name: 'Best Sellers', href: '#' },
        { name: 'Trending Now', href: '#' },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Topwear',
          items: [
            { name: 'T-Shirts', href: '/products/men?subcategory=T-Shirts' },
            { name: 'Casual Shirts', href: '/products/men?subcategory=Shirts' },
            { name: 'Formal Shirts', href: '/products/men?subcategory=Shirts' },
            { name: 'Sweatshirts', href: '/products/men?subcategory=Activewear' },
            { name: 'Sweaters', href: '/products/men?subcategory=Outerwear' },
            { name: 'Jackets', href: '/products/men?subcategory=Jackets' },
            { name: 'Blazers & Coats', href: '/products/men?subcategory=Outerwear' },
          ],
        },
        {
          id: 'bottomwear',
          name: 'Bottomwear',
          items: [
            { name: 'Jeans', href: '/products/men?subcategory=Bottomwear' },
            { name: 'Casual Trousers', href: '/products/men?subcategory=Bottomwear' },
            { name: 'Formal Trousers', href: '/products/men?subcategory=Bottomwear' },
            { name: 'Shorts', href: '/products/men?subcategory=Bottomwear' },
            { name: 'Track Pants', href: '/products/men?subcategory=Activewear' },
          ],
        },
        {
          id: 'footwear',
          name: 'Footwear',
          items: [
            { name: 'Casual Shoes', href: '/products/men?subcategory=Footwear' },
            { name: 'Sports Shoes', href: '/products/men?subcategory=Footwear' },
            { name: 'Formal Shoes', href: '/products/men?subcategory=Footwear' },
            { name: 'Sneakers', href: '/products/men?subcategory=Footwear' },
          ],
        },
      ],
    },
    {
      id: 'women',
      name: 'WOMEN',
      featured: [
        { name: 'New Arrivals', href: '#' },
        { name: 'Trending Now', href: '#' },
      ],
      sections: [
        {
            id: 'indian',
            name: 'Indian & Fusion Wear',
            items: [
              { name: 'Kurtas & Suits', href: '/products/women?subcategory=Indian Wear' },
              { name: 'Kurtis, Tunics & Tops', href: '/products/women?subcategory=Indian Wear' },
              { name: 'Sarees', href: '/products/women?subcategory=Sarees' },
              { name: 'Ethnic Wear', href: '/products/women?subcategory=Indian Wear' },
              { name: 'Leggings, Salwars & Churidars', href: '/products/women?subcategory=Bottomwear' },
            ],
        },
        {
          id: 'western',
          name: 'Western Wear',
          items: [
            { name: 'Dresses', href: '/products/women?subcategory=Dresses' },
            { name: 'Tops', href: '/products/women?subcategory=Tops' },
            { name: 'Tshirts', href: '/products/women?subcategory=Tops' },
            { name: 'Jeans', href: '/products/women?subcategory=Bottomwear' },
            { name: 'Trousers & Capris', href: '/products/women?subcategory=Bottomwear' },
          ],
        },
        {
            id: 'footwear',
            name: 'Footwear',
            items: [
              { name: 'Flats', href: '/products/women?subcategory=Footwear' },
              { name: 'Casual Shoes', href: '/products/women?subcategory=Footwear' },
              { name: 'Heels', href: '/products/women?subcategory=Footwear' },
              { name: 'Boots', href: '/products/women?subcategory=Footwear' },
            ],
          },
      ],
    },
    {
      id: 'kids',
      name: 'KIDS',
      sections: [
        {
          id: 'boys',
          name: 'Boys Clothing',
          items: [
            { name: 'T-Shirts', href: '/products/kids?subcategory=Boys' },
            { name: 'Shirts', href: '/products/kids?subcategory=Boys' },
            { name: 'Shorts', href: '/products/kids?subcategory=Boys' },
            { name: 'Jeans', href: '/products/kids?subcategory=Boys' },
            { name: 'Trousers', href: '/products/kids?subcategory=Boys' },
          ],
        },
        {
          id: 'girls',
          name: 'Girls Clothing',
          items: [
            { name: 'Dresses', href: '/products/kids?subcategory=Girls' },
            { name: 'Tops', href: '/products/kids?subcategory=Girls' },
            { name: 'T-shirts', href: '/products/kids?subcategory=Girls' },
            { name: 'Clothing Sets', href: '/products/kids?subcategory=Girls' },
          ],
        },
      ],
    },
    {
        id: 'home',
        name: 'HOME & LIVING',
        sections: [
            {
                id: 'decor',
                name: 'Home Décor',
                items: [
                    { name: 'Plants & Planters', href: '#' },
                    { name: 'Aromas & Candles', href: '#' },
                    { name: 'Clocks', href: '#' },
                    { name: 'Mirrors', href: '#' }, 
                ]
            }
        ]
    },
    {
        id: 'beauty',
        name: 'BEAUTY',
        sections: [
            {
                id: 'makeup',
                name: 'Makeup',
                items: [
                    { name: 'Lipstick', href: '#' },
                    { name: 'Lip Gloss', href: '#' },
                    { name: 'Lip Liner', href: '#' },
                    { name: 'Mascara', href: '#' }, 
                ]
            }
        ]
    }
  ],
}
