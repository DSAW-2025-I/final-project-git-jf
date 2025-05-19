import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  available: number;
}

interface Restaurant {
  id: string;
  name: string;
  imageUrl: string;
  products: Product[];
}

const initialRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "Arcos",
    imageUrl: "https://images.pexels.com/photos/2290070/pexels-photo-2290070.jpeg",
    products: [
      {
        id: "1",
        name: "Hamburguesa con Trufa",
        price: 35000,
        imageUrl: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg",
        category: "Hamburguesas Especiales",
        available: 30
      },
      {
        id: "2",
        name: "Confit de Pato",
        price: 45000,
        imageUrl: "https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg",
        category: "Platos Principales",
        available: 25
      },
      {
        id: "3",
        name: "Foie Gras",
        price: 38000,
        imageUrl: "https://images.pexels.com/photos/299410/pexels-photo-299410.jpeg",
        category: "Entradas",
        available: 20
      },
      {
        id: "4",
        name: "Risotto de Langosta",
        price: 52000,
        imageUrl: "https://images.pexels.com/photos/725997/pexels-photo-725997.jpeg",
        category: "Platos Principales",
        available: 15
      },
      {
        id: "5",
        name: "Filete Wagyu",
        price: 65000,
        imageUrl: "https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg",
        category: "Platos Principales",
        available: 20
      },
      {
        id: "6",
        name: "Crème Brûlée",
        price: 25000,
        imageUrl: "https://images.pexels.com/photos/3081657/pexels-photo-3081657.jpeg",
        category: "Postres",
        available: 30
      }
    ]
  },
  {
    id: "2",
    name: "Escuela",
    imageUrl: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg",
    products: [
      {
        id: "7",
        name: "Paella de Mariscos",
        price: 48000,
        imageUrl: "https://images.pexels.com/photos/12365244/pexels-photo-12365244.jpeg",
        category: "Platos Principales",
        available: 20
      },
      {
        id: "8",
        name: "Wellington de Res",
        price: 55000,
        imageUrl: "https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg",
        category: "Platos Principales",
        available: 15
      },
      {
        id: "9",
        name: "Tartar de Atún",
        price: 32000,
        imageUrl: "https://images.pexels.com/photos/8969237/pexels-photo-8969237.jpeg",
        category: "Entradas",
        available: 25
      },
      {
        id: "10",
        name: "Costillas de Cordero",
        price: 58000,
        imageUrl: "https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg",
        category: "Platos Principales",
        available: 18
      },
      {
        id: "11",
        name: "Pasta con Trufa",
        price: 42000,
        imageUrl: "https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg",
        category: "Pasta",
        available: 25
      },
      {
        id: "12",
        name: "Soufflé de Chocolate",
        price: 28000,
        imageUrl: "https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg",
        category: "Postres",
        available: 20
      }
    ]
  },
  {
    id: "3",
    name: "Embarcadero",
    imageUrl: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg",
    products: [
      {
        id: "13",
        name: "Ribeye a la Parrilla",
        price: 45000,
        imageUrl: "https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg",
        category: "Carnes",
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
        name: "Salmón a la Parrilla",
        price: 38000,
        imageUrl: "https://images.pexels.com/photos/3655916/pexels-photo-3655916.jpeg",
        category: "Mariscos",
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
        name: "Chuletas de Cerdo",
        price: 35000,
        imageUrl: "https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg",
        category: "Carnes",
        available: 25
      },
      {
        id: "18",
        name: "Lasaña",
        price: 33000,
        imageUrl: "https://images.pexels.com/photos/5949885/pexels-photo-5949885.jpeg",
        category: "Pasta",
        available: 30
      }
    ]
  },
  {
    id: "4",
    name: "Kiosco",
    imageUrl: "https://images.pexels.com/photos/2087748/pexels-photo-2087748.jpeg",
    products: [
      {
        id: "19",
        name: "T-Bone a la Parrilla",
        price: 48000,
        imageUrl: "https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg",
        category: "Cortes Premium",
        available: 20
      },
      {
        id: "20",
        name: "Costillas BBQ",
        price: 42000,
        imageUrl: "https://images.pexels.com/photos/533325/pexels-photo-533325.jpeg",
        category: "Especialidades",
        available: 25
      },
      {
        id: "21",
        name: "Pollo a la Parrilla",
        price: 32000,
        imageUrl: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg",
        category: "Aves",
        available: 30
      },
      {
        id: "22",
        name: "Parrillada Mixta",
        price: 55000,
        imageUrl: "https://images.pexels.com/photos/1251198/pexels-photo-1251198.jpeg",
        category: "Especialidades",
        available: 15
      },
      {
        id: "23",
        name: "Chuletas de Cordero",
        price: 45000,
        imageUrl: "https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg",
        category: "Cortes Premium",
        available: 20
      },
      {
        id: "24",
        name: "Chorizo a la Parrilla",
        price: 28000,
        imageUrl: "https://images.pexels.com/photos/533325/pexels-photo-533325.jpeg",
        category: "Especialidades",
        available: 35
      }
    ]
  },
  {
    id: "5",
    name: "Punto Wok",
    imageUrl: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
    products: [
      {
        id: "25",
        name: "Pad Thai",
        price: 28000,
        imageUrl: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg",
        category: "Fideos",
        available: 35
      },
      {
        id: "26",
        name: "Pollo Kung Pao",
        price: 30000,
        imageUrl: "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg",
        category: "Platos Principales",
        available: 30
      },
      {
        id: "27",
        name: "Chow Mein de Res",
        price: 32000,
        imageUrl: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg",
        category: "Fideos",
        available: 25
      },
      {
        id: "28",
        name: "Cerdo Agridulce",
        price: 29000,
        imageUrl: "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg",
        category: "Platos Principales",
        available: 30
      },
      {
        id: "29",
        name: "Arroz Frito con Camarones",
        price: 26000,
        imageUrl: "https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg",
        category: "Arroces",
        available: 40
      },
      {
        id: "30",
        name: "Plato de Dim Sum",
        price: 25000,
        imageUrl: "https://images.pexels.com/photos/955137/pexels-photo-955137.jpeg",
        category: "Entradas",
        available: 25
      }
    ]
  },
  {
    id: "6",
    name: "Punto Verde",
    imageUrl: "https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg",
    products: [
      {
        id: "31",
        name: "Burrito Clásico de Frijol",
        price: 22000,
        imageUrl: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
        category: "Burritos",
        available: 40
      },
      {
        id: "32",
        name: "Burrito Supremo Vegetariano",
        price: 24000,
        imageUrl: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
        category: "Burritos",
        available: 35
      },
      {
        id: "33",
        name: "Bowl de Burrito con Quinoa",
        price: 26000,
        imageUrl: "https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg",
        category: "Bowls de Burrito",
        available: 30
      },
      {
        id: "34",
        name: "Burrito de Desayuno",
        price: 20000,
        imageUrl: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
        category: "Desayunos",
        available: 45
      },
      {
        id: "35",
        name: "Burrito Picante de Frijol",
        price: 23000,
        imageUrl: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
        category: "Burritos",
        available: 35
      },
      {
        id: "36",
        name: "Burrito de Tofu",
        price: 25000,
        imageUrl: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
        category: "Burritos",
        available: 30
      }
    ]
  }
];

export const POS = (): JSX.Element => {
  const [restaurants] = useState<Restaurant[]>(initialRestaurants);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userType");
    navigate("/login");
  };

  const handleManageProducts = (restaurant: Restaurant) => {
    localStorage.setItem("selectedRestaurant", JSON.stringify(restaurant));
    window.open(`/restaurant/${restaurant.id}/manage`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Restaurantes</h1>
          <Button onClick={handleLogout} variant="outline" className="text-red-600">
            Cerrar Sesión
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <Card key={restaurant.id} className="overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={restaurant.imageUrl}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{restaurant.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full bg-[#d61414] hover:bg-[#b31010] mb-4"
                  onClick={() => handleManageProducts(restaurant)}
                >
                  Gestionar Productos
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};