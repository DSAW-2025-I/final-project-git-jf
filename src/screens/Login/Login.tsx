import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

const formSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  userType: z.enum(["client", "pos"], {
    required_error: "Por favor seleccione un tipo de usuario",
  }),
  posCode: z.string().optional().refine((val) => {
    if (!val) return true;
    return /^\d{8}$/.test(val);
  }, "El código POS debe tener 8 dígitos")
});

export const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const [showPosCode, setShowPosCode] = React.useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const userType = watch("userType");

  React.useEffect(() => {
    setShowPosCode(userType === "pos");
  }, [userType]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (data.userType === "pos" && (!data.posCode || !/^\d{8}$/.test(data.posCode))) {
      alert("Por favor ingrese un código POS válido de 8 dígitos");
      return;
    }

    localStorage.setItem("userType", data.userType);
    
    if (data.userType === "client") {
      navigate("/client/home");
    } else {
      navigate("/pos");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Iniciar Sesión en FastFood Sabana</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Tipo de Usuario</Label>
              <Select onValueChange={(value) => setValue("userType", value as "client" | "pos")}>
                <SelectTrigger className={errors.userType ? "border-red-500" : ""}>
                  <SelectValue placeholder="Seleccione tipo de usuario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="client">Cliente</SelectItem>
                  <SelectItem value="pos">POS</SelectItem>
                </SelectContent>
              </Select>
              {errors.userType && (
                <p className="text-red-500 text-sm">{errors.userType.message}</p>
              )}
            </div>

            {showPosCode && (
              <div className="space-y-2">
                <Label htmlFor="posCode">Código POS</Label>
                <Input
                  id="posCode"
                  type="text"
                  maxLength={8}
                  pattern="\d{8}"
                  {...register("posCode")}
                  className={errors.posCode ? "border-red-500" : ""}
                  placeholder="Ingrese código de 8 dígitos"
                />
                {errors.posCode && (
                  <p className="text-red-500 text-sm">{errors.posCode.message}</p>
                )}
              </div>
            )}

            <Button type="submit" className="w-full bg-[#d61414] hover:bg-[#b31010]">
              Iniciar Sesión
            </Button>

            <p className="text-center mt-4">
              ¿No tienes una cuenta?{" "}
              <Link to="/register" className="text-[#d61414] hover:underline">
                Regístrate
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};