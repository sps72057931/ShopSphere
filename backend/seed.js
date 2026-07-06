// Seed script - populates MongoDB with an admin user and sample products
// Run with: npm run seed
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const User = require("./models/User");
const Product = require("./models/Product");

const sampleProducts = [
  {
    name: "Wireless Bluetooth Headphones",
    description:
      "Premium over-ear wireless headphones with active noise cancellation, 30-hour battery life, and crystal-clear sound quality. Perfect for music lovers and remote work.",
    price: 2999,
    discountPrice: 2299,
    category: "Electronics",
    brand: "SoundMax",
    stock: 50,
    featured: true,
    images: [{ url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600", public_id: "sample1" }],
    ratings: 4.5,
    numReviews: 120,
  },
  {
    name: "Smart Fitness Watch",
    description:
      "Track your health with heart rate monitoring, sleep tracking, GPS, and 15+ workout modes. Water resistant with a 7-day battery life.",
    price: 4499,
    discountPrice: 3599,
    category: "Electronics",
    brand: "FitTrack",
    stock: 35,
    featured: true,
    images: [{ url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600", public_id: "sample2" }],
    ratings: 4.3,
    numReviews: 89,
  },
  {
    name: "Men's Cotton Casual Shirt",
    description:
      "100% breathable cotton casual shirt, perfect for everyday wear. Available in multiple sizes with a modern slim fit.",
    price: 899,
    discountPrice: 649,
    category: "Fashion",
    brand: "UrbanFit",
    stock: 100,
    featured: true,
    images: [{ url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600", public_id: "sample3" }],
    ratings: 4.1,
    numReviews: 55,
  },
  {
    name: "Women's Running Shoes",
    description:
      "Lightweight running shoes with breathable mesh upper and cushioned sole for maximum comfort during workouts.",
    price: 3299,
    discountPrice: 2599,
    category: "Fashion",
    brand: "RunFast",
    stock: 60,
    featured: true,
    images: [{ url: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600", public_id: "sample4" }],
    ratings: 4.6,
    numReviews: 200,
  },
  {
    name: "Stainless Steel Cookware Set",
    description:
      "10-piece stainless steel cookware set including pots, pans, and lids. Induction compatible and dishwasher safe.",
    price: 5999,
    discountPrice: 4799,
    category: "Home & Kitchen",
    brand: "ChefPro",
    stock: 25,
    featured: false,
    images: [{ url: "https://images.pexels.com/photos/28726706/pexels-photo-28726706.jpeg?auto=compress&cs=tinysrgb&w=600", public_id: "sample5" }],
    ratings: 4.4,
    numReviews: 40,
  },
  {
    name: "Automatic Coffee Maker",
    description:
      "Programmable drip coffee maker with a 12-cup glass carafe, auto shut-off, and reusable filter.",
    price: 2799,
    discountPrice: 2199,
    category: "Home & Kitchen",
    brand: "BrewMate",
    stock: 40,
    featured: true,
    images: [{ url: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600", public_id: "sample6" }],
    ratings: 4.2,
    numReviews: 75,
  },
  {
    name: "Bestselling Fiction Novel",
    description:
      "A gripping page-turner that topped bestseller charts for months. Perfect gift for book lovers.",
    price: 499,
    discountPrice: 349,
    category: "Books",
    brand: "PenguinReads",
    stock: 150,
    featured: false,
    images: [{ url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600", public_id: "sample7" }],
    ratings: 4.7,
    numReviews: 310,
  },
  {
    name: "Kids Building Blocks Set",
    description:
      "200-piece creative building blocks set that boosts imagination and motor skills. Safe, non-toxic material.",
    price: 1299,
    discountPrice: 999,
    category: "Toys",
    brand: "PlaySmart",
    stock: 70,
    featured: true,
    images: [{ url: "https://images.unsplash.com/photo-1560961911-ba7ef651a56c?w=600", public_id: "sample8" }],
    ratings: 4.5,
    numReviews: 65,
  },
  {
    name: "Yoga Mat with Carry Strap",
    description:
      "Extra thick non-slip yoga mat, eco-friendly TPE material, ideal for yoga, pilates, and floor exercises.",
    price: 999,
    discountPrice: 749,
    category: "Sports",
    brand: "ZenFit",
    stock: 80,
    featured: false,
    images: [{ url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600", public_id: "sample9" }],
    ratings: 4.3,
    numReviews: 48,
  },
  {
    name: "Leather Laptop Backpack",
    description:
      "Water-resistant leather backpack with padded laptop compartment, USB charging port, and anti-theft design.",
    price: 2499,
    discountPrice: 1899,
    category: "Fashion",
    brand: "UrbanFit",
    stock: 45,
    featured: true,
    images: [{ url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600", public_id: "sample10" }],
    ratings: 4.6,
    numReviews: 132,
  },
  {
    name: "LED Desk Lamp",
    description:
      "Adjustable LED desk lamp with 5 brightness levels and 3 color modes. USB rechargeable with touch control.",
    price: 1199,
    discountPrice: 899,
    category: "Home & Kitchen",
    brand: "BrightLite",
    stock: 55,
    featured: false,
    images: [{ url: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600", public_id: "sample11" }],
    ratings: 4.0,
    numReviews: 30,
  },
  {
    name: "Portable Bluetooth Speaker",
    description:
      "Compact waterproof Bluetooth speaker with 360-degree sound and 12-hour playtime. Great for outdoor use.",
    price: 1799,
    discountPrice: 1399,
    category: "Electronics",
    brand: "SoundMax",
    stock: 65,
    featured: true,
    images: [{ url: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600", public_id: "sample12" }],
    ratings: 4.4,
    numReviews: 98,
  },
];

const importData = async () => {
  try {
    await connectDB();

    await Product.deleteMany();
    console.log("Existing products removed");

    let admin = await User.findOne({ email: "admin@shopsphere.com" });
    if (!admin) {
      admin = await User.create({
        name: "Admin User",
        email: "admin@shopsphere.com",
        password: "admin123",
        role: "admin",
      });
      console.log("Admin user created: admin@shopsphere.com / admin123");
    } else {
      console.log("Admin user already exists");
    }

    const productsWithCreator = sampleProducts.map((p) => ({
      ...p,
      createdBy: admin._id,
    }));

    await Product.insertMany(productsWithCreator);
    console.log(`${productsWithCreator.length} sample products imported`);

    console.log("Data import complete!");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    console.log("All products destroyed");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
