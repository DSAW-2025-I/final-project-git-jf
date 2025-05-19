import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

export const RestaurantManagement = (): JSX.Element => {
  const navigate = useNavigate();
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);

  useEffect(() => {
    const storedRestaurant = localStorage.getItem("selectedRestaurant");
    if (storedRestaurant) {
      const parsedRestaurant = JSON.parse(storedRestaurant);
      if (parsedRestaurant.id === restaurantId) {
        setRestaurant(parsedRestaurant);
      }
    }
  }, [restaurantId]);

  const handleProductUpdate = (productId: string, updates: Partial<Product>) => {
    if (!restaurant) return;

    setRestaurant(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        products: prev.products.map(product =>
          product.id === productId
            ? { ...product, ...updates }
            : product
        )
      };
    });
  };

  if (!restaurant) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Productos - {restaurant.name}</CardTitle>
              <Button
                variant="outline"
                onClick={() => window.close()}
              >
                Cerrar
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {restaurant.products.map((product) => (
                <Card key={product.id}>
                  <CardContent className="flex items-center gap-4 p-4">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1 space-y-4">
                      {editingProduct === product.id ? (
                        <>
                          <div>
                            <Label>Nombre</Label>
                            <Input
                              value={product.name}
                              onChange={(e) => handleProductUpdate(
                                product.id,
                                { name: e.target.value }
                              )}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label>Precio</Label>
                            <Input
                              type="number"
                              value={product.price}
                              onChange={(e) => handleProductUpdate(
                                product.id,
                                { price: parseInt(e.target.value) || 0 }
                              )}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label>Disponibilidad</Label>
                            <Input
                              type="number"
                              value={product.available}
                              onChange={(e) => handleProductUpdate(
                                product.id,
                                { available: parseInt(e.target.value) || 0 }
                              )}
                              className="mt-1"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <h4 className="font-semibold">{product.name}</h4>
                          <p>Precio: ${product.price.toLocaleString()}</p>
                          <p>Disponible: {product.available}</p>
                        </>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setEditingProduct(
                        editingProduct === product.id ? null : product.id
                      )}
                    >
                      {editingProduct === product.id ? "Guardar" : "Editar"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};