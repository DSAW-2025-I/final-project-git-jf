import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { ShoppingCart, ArrowLeft } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  available: number;
}

interface CartItem extends Product {
  quantity: number;
  restaurantId: string;
}

const products: Record<string, Product[]> = {
  "1": [ // Arcos - Gourmet Food
    {
      id: "1",
      name: "Truffle Burger",
      price: 35000,
      imageUrl: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg",
      category: "Signature Burgers",
      available: 30
    },
    {
      id: "2",
      name: "Duck Confit",
      price: 45000,
      imageUrl: "https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg",
      category: "Main Courses",
      available: 25
    },
    {
      id: "3",
      name: "Foie Gras",
      price: 38000,
      imageUrl: "https://images.pexels.com/photos/299410/pexels-photo-299410.jpeg",
      category: "Appetizers",
      available: 20
    },
    {
      id: "4",
      name: "Lobster Risotto",
      price: 52000,
      imageUrl: "https://images.pexels.com/photos/725997/pexels-photo-725997.jpeg",
      category: "Main Courses",
      available: 15
    },
    {
      id: "5",
      name: "Wagyu Steak",
      price: 65000,
      imageUrl: "https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg",
      category: "Main Courses",
      available: 20
    },
    {
      id: "6",
      name: "Crème Brûlée",
      price: 25000,
      imageUrl: "https://images.pexels.com/photos/3081657/pexels-photo-3081657.jpeg",
      category: "Desserts",
      available: 30
    }
  ],
  "2": [ // Escuela - Gourmet Food
    {
      id: "7",
      name: "Seafood Paella",
      price: 48000,
      imageUrl: "https://images.pexels.com/photos/12365244/pexels-photo-12365244.jpeg",
      category: "Main Courses",
      available: 20
    },
    {
      id: "8",
      name: "Beef Wellington",
      price: 55000,
      imageUrl: "https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg",
      category: "Main Courses",
      available: 15
    },
    {
      id: "9",
      name: "Tuna Tartare",
      price: 32000,
      imageUrl: "https://images.pexels.com/photos/8969237/pexels-photo-8969237.jpeg",
      category: "Appetizers",
      available: 25
    },
    {
      id: "10",
      name: "Rack of Lamb",
      price: 58000,
      imageUrl: "https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg",
      category: "Main Courses",
      available: 18
    },
    {
      id: "11",
      name: "Truffle Pasta",
      price: 42000,
      imageUrl: "https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg",
      category: "Pasta",
      available: 25
    },
    {
      id: "12",
      name: "Chocolate Soufflé",
      price: 28000,
      imageUrl: "https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg",
      category: "Desserts",
      available: 20
    }
  ],
  "3": [ // Embarcadero - Varied Food with Meat and Pasta
    {
      id: "13",
      name: "Ribeye Steak",
      price: 45000,
      imageUrl: "https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg",
      category: "Meats",
      available: 25
    },
    {
      id: "14",
      name: "Fettuccine Alfredo",
      price: 32000,
      imageUrl: "https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg",
      category: "Pasta",
      available: 30
    },
    {
      id: "15",
      name: "Grilled Salmon",
      price: 38000,
      imageUrl: "https://images.pexels.com/photos/3655916/pexels-photo-3655916.jpeg",
      category: "Seafood",
      available: 20
    },
    {
      id: "16",
      name: "Spaghetti Carbonara",
      price: 30000,
      imageUrl: "https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg",
      category: "Pasta",
      available: 35
    },
    {
      id: "17",
      name: "Pork Chops",
      price: 35000,
      imageUrl: "https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg",
      category: "Meats",
      available: 25
    },
    {
      id: "18",
      name: "Lasagna",
      price: 33000,
      imageUrl: "https://images.pexels.com/photos/5949885/pexels-photo-5949885.jpeg",
      category: "Pasta",
      available: 30
    }
  ],
  "4": [ // Kiosco - Grilled Meats
    {
      id: "19",
      name: "T-Bone Steak",
      price: 48000,
      imageUrl: "https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg",
      category: "Premium Cuts",
      available: 20
    },
    {
      id: "20",
      name: "BBQ Ribs",
      price: 42000,
      imageUrl: "https://images.pexels.com/photos/533325/pexels-photo-533325.jpeg",
      category: "Specialties",
      available: 25
    },
    {
      id: "21",
      name: "Grilled Chicken",
      price: 32000,
      imageUrl: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg",
      category: "Poultry",
      available: 30
    },
    {
      id: "22",
      name: "Mixed Grill Platter",
      price: 55000,
      imageUrl: "https://images.pexels.com/photos/1251198/pexels-photo-1251198.jpeg",
      category: "Specialties",
      available: 15
    },
    {
      id: "23",
      name: "Lamb Chops",
      price: 45000,
      imageUrl: "https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg",
      category: "Premium Cuts",
      available: 20
    },
    {
      id: "24",
      name: "Grilled Sausages",
      price: 28000,
      imageUrl: "https://images.pexels.com/photos/533325/pexels-photo-533325.jpeg",
      category: "Specialties",
      available: 35
    }
  ],
  "5": [ // Punto Wok - Asian Food
    {
      id: "25",
      name: "Pad Thai",
      price: 28000,
      imageUrl: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg",
      category: "Noodles",
      available: 35
    },
    {
      id: "26",
      name: "Kung Pao Chicken",
      price: 30000,
      imageUrl: "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg",
      category: "Main Courses",
      available: 30
    },
    {
      id: "27",
      name: "Beef Chow Mein",
      price: 32000,
      imageUrl: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg",
      category: "Noodles",
      available: 25
    },
    {
      id: "28",
      name: "Sweet & Sour Pork",
      price: 29000,
      imageUrl: "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg",
      category: "Main Courses",
      available: 30
    },
    {
      id: "29",
      name: "Shrimp Fried Rice",
      price: 26000,
      imageUrl: "https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg",
      category: "Rice Dishes",
      available: 40
    },
    {
      id: "30",
      name: "Dim Sum Platter",
      price: 25000,
      imageUrl: "https://images.pexels.com/photos/955137/pexels-photo-955137.jpeg",
      category: "Appetizers",
      available: 25
    }
  ],
  "6": [ // Punto Verde - Burritos
    {
      id: "31",
      name: "Classic Bean Burrito",
      price: 22000,
      imageUrl: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
      category: "Burritos",
      available: 40
    },
    {
      id: "32",
      name: "Veggie Supreme Burrito",
      price: 24000,
      imageUrl: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
      category: "Burritos",
      available: 35
    },
    {
      id: "33",
      name: "Quinoa Burrito Bowl",
      price: 26000,
      imageUrl: "https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg",
      category: "Burrito Bowls",
      available: 30
    },
    {
      id: "34",
      name: "Breakfast Burrito",
      price: 20000,
      imageUrl: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
      category: "Breakfast",
      available: 45
    },
    {
      id: "35",
      name: "Spicy Bean Burrito",
      price: 23000,
      imageUrl: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
      category: "Burritos",
      available: 35
    },
    {
      id: "36",
      name: "Tofu Burrito",
      price: 25000,
      imageUrl: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
      category: "Burritos",
      available: 30
    }
  ]
};

export const RestaurantProducts = (): JSX.Element => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState<Record<string, number>>({});
  const [cartCount, setCartCount] = useState(0);

  const restaurantProducts = products[restaurantId || ""] || [];

  React.useEffect(() => {
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(currentCart.length);
  }, []);

  const handleAddToCart = (product: Product, selectedQuantity: number) => {
    const currentCart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    
    if (currentCart.length > 0 && currentCart[0].restaurantId !== restaurantId) {
      alert("You can only add items from one restaurant at a time. Please clear your cart first.");
      return;
    }

    const existingItemIndex = currentCart.findIndex(item => item.id === product.id);

    if (existingItemIndex >= 0) {
      currentCart[existingItemIndex].quantity += selectedQuantity;
    } else {
      currentCart.push({
        ...product,
        quantity: selectedQuantity,
        restaurantId: restaurantId || ""
      });
    }

    localStorage.setItem("cart", JSON.stringify(currentCart));
    setCartCount(currentCart.length);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/client/home")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Restaurants
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          </div>
          <Button
            variant="outline"
            className="relative"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartCount}
              </span>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurantProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{product.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">
                    ${product.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500">
                    Available: {product.available}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    min="1"
                    max={product.available}
                    value={quantity[product.id] || 1}
                    onChange={(e) => setQuantity({
                      ...quantity,
                      [product.id]: parseInt(e.target.value) || 1
                    })}
                    className="w-24"
                  />
                  <Button
                    className="bg-[#d61414] hover:bg-[#b31010] flex-1"
                    onClick={() => handleAddToCart(product, quantity[product.id] || 1)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};