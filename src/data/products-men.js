export const menProducts = [
    // T-Shirts
    { id: 1, name: 'Oversized Graphic Tee', price: '₹1,299', originalPrice: '₹1,999', category: 'T-Shirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop', description: 'Premium cotton oversized fit with bold graphics', sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['Black', 'White', 'Gray'], isNew: true },
    { id: 2, name: 'Classic V-Neck Tee', price: '₹799', category: 'T-Shirts', image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=600&auto=format&fit=crop', description: 'Essential v-neck tee', sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'White', 'Navy'], isNew: false },
    { id: 3, name: 'Striped Polo Tee', price: '₹1,499', category: 'T-Shirts', image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?q=80&w=600&auto=format&fit=crop', description: 'Classic polo with stripes', sizes: ['M', 'L', 'XL'], colors: ['Navy', 'Green', 'Red'], isNew: true },
    { id: 4, name: 'Pocket Tee', price: '₹899', category: 'T-Shirts', image: 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?q=80&w=600&auto=format&fit=crop', description: 'Casual tee with chest pocket', sizes: ['S', 'M', 'L', 'XL'], colors: ['Olive', 'Black', 'Gray'], isNew: false },
    
    // Shirts
    { id: 5, name: 'Striped Casual Shirt', price: '₹1,799', category: 'Shirts', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop', description: 'Breathable cotton shirt with vertical stripes', sizes: ['S', 'M', 'L', 'XL'], colors: ['Blue', 'Pink', 'Green'], isNew: false },
    { id: 6, name: 'Linen Blend Shirt', price: '₹2,199', category: 'Shirts', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=600&auto=format&fit=crop', description: 'Lightweight linen for summer', sizes: ['M', 'L', 'XL'], colors: ['White', 'Beige', 'Sky Blue'], isNew: true },
    { id: 7, name: 'Denim Shirt', price: '₹1,999', category: 'Shirts', image: 'https://images.unsplash.com/photo-1598032895397-b9c644f5d2e0?q=80&w=600&auto=format&fit=crop', description: 'Classic denim button-down', sizes: ['S', 'M', 'L', 'XL'], colors: ['Blue', 'Black'], isNew: false },
    
    // Jackets
    { id: 8, name: 'Slim Fit Denim Jacket', price: '₹3,499', category: 'Jackets', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop', description: 'Classic denim jacket with modern slim fit', sizes: ['M', 'L', 'XL'], colors: ['Blue', 'Black'], isNew: false },
    { id: 9, name: 'Bomber Jacket', price: '₹4,299', category: 'Jackets', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop', description: 'Classic bomber style', sizes: ['M', 'L', 'XL'], colors: ['Olive', 'Black', 'Navy'], isNew: true },
    { id: 10, name: 'Leather Biker Jacket', price: '₹7,999', category: 'Jackets', image: 'https://images.unsplash.com/photo-1520975867597-0af37a22e31e?q=80&w=600&auto=format&fit=crop', description: 'Genuine leather biker jacket', sizes: ['M', 'L', 'XL'], colors: ['Black', 'Brown'], isNew: true },
    
    // Outerwear
    { id: 11, name: 'Hooded Puffer Jacket', price: '₹4,999', category: 'Outerwear', image: 'https://images.unsplash.com/photo-1544923408-75c5cef46f14?q=80&w=600&auto=format&fit=crop', description: 'Warm puffer jacket with detachable hood', sizes: ['M', 'L', 'XL', 'XXL'], colors: ['Black', 'Navy', 'Burgundy'], isNew: true },
    { id: 12, name: 'Wool Overcoat', price: '₹6,499', category: 'Outerwear', image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=600&auto=format&fit=crop', description: 'Premium wool blend overcoat', sizes: ['M', 'L', 'XL'], colors: ['Charcoal', 'Camel', 'Navy'], isNew: false },
    
    // Bottomwear
    { id: 13, name: 'Cargo Joggers', price: '₹2,199', originalPrice: '₹2,999', category: 'Bottomwear', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600&auto=format&fit=crop', description: 'Utility-inspired joggers with multiple pockets', sizes: ['S', 'M', 'L', 'XL'], colors: ['Olive', 'Black', 'Khaki'], discount: '-27%' },
    { id: 14, name: 'Slim Fit Jeans', price: '₹2,499', category: 'Bottomwear', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=600&auto=format&fit=crop', description: 'Classic slim fit denim', sizes: ['30', '32', '34', '36'], colors: ['Blue', 'Black'], isNew: false },
    { id: 15, name: 'Chino Pants', price: '₹1,899', category: 'Bottomwear', image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=600&auto=format&fit=crop', description: 'Versatile chino trousers', sizes: ['30', '32', '34', '36'], colors: ['Khaki', 'Navy', 'Gray'], isNew: true },
    { id: 16, name: 'Cargo Shorts', price: '₹1,299', category: 'Bottomwear', image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=600&auto=format&fit=crop', description: 'Summer cargo shorts', sizes: ['S', 'M', 'L', 'XL'], colors: ['Khaki', 'Olive', 'Navy'], isNew: false },
    
    // Activewear
    { id: 17, name: 'Performance Track Pants', price: '₹1,599', category: 'Activewear', image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=600&auto=format&fit=crop', description: 'Moisture-wicking track pants for workouts', sizes: ['M', 'L', 'XL'], colors: ['Black', 'Navy', 'Gray'], isNew: true },
    { id: 18, name: 'Sports Hoodie', price: '₹2,299', category: 'Activewear', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop', description: 'Breathable sports hoodie', sizes: ['M', 'L', 'XL'], colors: ['Black', 'Gray', 'Navy'], isNew: true },
    { id: 19, name: 'Compression Tee', price: '₹1,199', category: 'Activewear', image: 'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?q=80&w=600&auto=format&fit=crop', description: 'Compression fit athletic tee', sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'White', 'Navy'], isNew: false },
    
    // Footwear
    { id: 20, name: 'Classic White Sneakers', price: '₹2,799', category: 'Footwear', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop', description: 'Minimalist white sneakers for everyday wear', sizes: ['7', '8', '9', '10', '11'], colors: ['White'], isNew: false },
    { id: 21, name: 'Running Shoes', price: '₹3,499', category: 'Footwear', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop', description: 'Cushioned running shoes', sizes: ['7', '8', '9', '10', '11'], colors: ['Black', 'Blue', 'Red'], isNew: true },
    { id: 22, name: 'Leather Loafers', price: '₹3,999', category: 'Footwear', image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=600&auto=format&fit=crop', description: 'Formal leather loafers', sizes: ['7', '8', '9', '10'], colors: ['Brown', 'Black'], isNew: false },
    
    // Accessories
    { id: 23, name: 'Leather Belt', price: '₹899', category: 'Accessories', image: 'https://images.unsplash.com/photo-1624222247344-550fb60583bb?q=80&w=600&auto=format&fit=crop', description: 'Genuine leather belt with metal buckle', sizes: ['32', '34', '36', '38'], colors: ['Brown', 'Black'], isNew: false },
    { id: 24, name: 'Canvas Backpack', price: '₹2,499', category: 'Accessories', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop', description: 'Durable canvas backpack', sizes: ['One Size'], colors: ['Khaki', 'Navy', 'Black'], isNew: true }
];
