import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Progress } from "../../components/ui/progress";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  restaurantId: string;
}

type OrderStatus = "created" | "preparing" | "ready" | null;

export const Cart = (): JSX.Element => {
  const navigate = useNavigate();
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [orderStatus, setOrderStatus] = React.useState<OrderStatus>(null);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  const updateQuantity = (productId: string, newQuantity: number) => {
    const updatedCart = cart.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ).filter(item => item.quantity > 0);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleConfirmOrder = () => {
    setOrderStatus("created");
    setProgress(33);

    setTimeout(() => {
      setOrderStatus("preparing");
      setProgress(66);

      setTimeout(() => {
        setOrderStatus("ready");
        setProgress(100);

        setTimeout(() => {
          localStorage.removeItem("cart");
          navigate("/client/home");
        }, 5000);
      }, 5000);
    }, 5000);
  };

  const handleClearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };

  const renderOrderStatus = () => {
    if (!orderStatus) return null;

    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Order Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={progress} className="w-full" />
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${orderStatus === "created" ? "bg-green-500" : "bg-gray-300"}`} />
              <span>Order Created</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${orderStatus === "preparing" ? "bg-green-500" : "bg-gray-300"}`} />
              <span>Preparing Your Order</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${orderStatus === "ready" ? "bg-green-500" : "bg-gray-300"}`} />
              <span>Ready for Pickup</span>
            </div>
          </div>

          {orderStatus === "ready" && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <p className="font-semibold">Your order is ready!</p>
              <p>Please pick up your order at the restaurant counter.</p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <p className="mb-4">Your cart is empty</p>
            <Button
              onClick={() => navigate("/client/home")}
              className="bg-[#d61414] hover:bg-[#b31010]"
            >
              Return to Restaurants
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Shopping Cart</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    ${item.price.toLocaleString()} each
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
            ))}

            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Total:</span>
                <span className="font-bold">
                  ${getTotalPrice().toLocaleString()}
                </span>
              </div>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleClearCart}
                  disabled={!!orderStatus}
                >
                  Clear Cart
                </Button>
                <Button
                  className="flex-1 bg-[#d61414] hover:bg-[#b31010]"
                  onClick={handleConfirmOrder}
                  disabled={!!orderStatus}
                >
                  Confirm Order
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {renderOrderStatus()}
      </div>
    </div>
  );
};