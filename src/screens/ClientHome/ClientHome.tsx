import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

interface Restaurant {
  id: string;
  name: string;
  imageUrl: string;
}

const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "Arcos",
    imageUrl: "https://images.pexels.com/photos/2290070/pexels-photo-2290070.jpeg"
  },
  {
    id: "2",
    name: "Escuela",
    imageUrl: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg"
  },
  {
    id: "3",
    name: "Embarcadero",
    imageUrl: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg"
  },
  {
    id: "4",
    name: "Kiosco",
    imageUrl: "https://images.pexels.com/photos/2087748/pexels-photo-2087748.jpeg"
  },
  {
    id: "5",
    name: "Punto Wok",
    imageUrl: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
  },
  {
    id: "6",
    name: "Punto Verde",
    imageUrl: "https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg"
  }
];

export const ClientHome = (): JSX.Element => {
  const navigate = useNavigate();

  const handleViewProducts = (restaurantId: string) => {
    navigate(`/restaurant/${restaurantId}/products`);
  };

  const handleLogout = () => {
    localStorage.removeItem("userType");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Restaurantes</h1>
          <Button onClick={handleLogout} variant="outline" className="text-red-600">
            Cerrar Sesión
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <Card key={restaurant.id} className="overflow-hidden hover:shadow-lg transition-shadow">
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
                  className="w-full bg-[#d61414] hover:bg-[#b31010]"
                  onClick={() => handleViewProducts(restaurant.id)}
                >
                  Ver Productos
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};