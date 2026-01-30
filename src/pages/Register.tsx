import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Bike, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().trim().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "Mínimo 6 caracteres" }),
  fullName: z.string().trim().min(2, { message: "Nombre requerido" }).max(100),
  phone: z.string().trim().min(9, { message: "Teléfono requerido" }).max(20),
  address: z.string().trim().min(5, { message: "Dirección requerida" }).max(200),
  city: z.string().trim().min(2, { message: "Ciudad requerida" }).max(100),
  postalCode: z.string().trim().min(4, { message: "Código postal requerido" }).max(10),
});

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = registerSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    const { error } = await signUp(formData.email, formData.password);

    if (error) {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Error al registrarse",
        description: error.message,
      });
      return;
    }

    // Update profile with additional data
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from("profiles").update({
        full_name: formData.fullName,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postal_code: formData.postalCode,
        notes: formData.notes,
      }).eq("user_id", user.id);
    }

    setLoading(false);
    toast({
      title: "¡Cuenta creada!",
      description: "Ya puedes hacer tus pedidos",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen gradient-hero py-6 px-4">
      <div className="w-full max-w-md mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-button">
            <Bike className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">Tu Sitio</span>
        </Link>

        {/* Form */}
        <div className="bg-card rounded-2xl shadow-card-hover p-6">
          <h1 className="text-xl font-bold text-foreground text-center mb-1">
            Crear cuenta
          </h1>
          <p className="text-sm text-muted-foreground text-center mb-6">
            Regístrate para hacer pedidos
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleChange}
                className="h-11"
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label htmlFor="password">Contraseña *</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Mínimo 6 caracteres"
                value={formData.password}
                onChange={handleChange}
                className="h-11"
              />
              {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
            </div>

            {/* Name and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="fullName">Nombre *</Label>
                <Input
                  id="fullName"
                  type="text"
                  name="fullName"
                  placeholder="Tu nombre"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="h-11"
                />
                {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phone">Teléfono *</Label>
                <Input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="612 345 678"
                  value={formData.phone}
                  onChange={handleChange}
                  className="h-11"
                />
                {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
              </div>
            </div>

            {/* Address */}
            <div className="space-y-1.5">
              <Label htmlFor="address">Dirección *</Label>
              <Input
                id="address"
                type="text"
                name="address"
                placeholder="Calle, número, piso..."
                value={formData.address}
                onChange={handleChange}
                className="h-11"
              />
              {errors.address && <p className="text-xs text-destructive">{errors.address}</p>}
            </div>

            {/* City and Postal */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="city">Ciudad *</Label>
                <Input
                  id="city"
                  type="text"
                  name="city"
                  placeholder="Ciudad"
                  value={formData.city}
                  onChange={handleChange}
                  className="h-11"
                />
                {errors.city && <p className="text-xs text-destructive">{errors.city}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="postalCode">C. Postal *</Label>
                <Input
                  id="postalCode"
                  type="text"
                  name="postalCode"
                  placeholder="12345"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="h-11"
                />
                {errors.postalCode && <p className="text-xs text-destructive">{errors.postalCode}</p>}
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-1.5">
              <Label htmlFor="notes">Notas (opcional)</Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="Ej: Timbre roto, portería..."
                value={formData.notes}
                onChange={handleChange}
                className="resize-none"
                rows={2}
              />
            </div>

            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Creando..." : "Crear cuenta"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-5">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
