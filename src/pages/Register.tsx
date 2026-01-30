import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Bike, Mail, Lock, User, Phone, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
    <div className="min-h-screen gradient-hero py-8 px-4">
      <div className="w-full max-w-lg mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shadow-button">
            <Bike className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-foreground">Tu Sitio</span>
        </Link>

        {/* Form */}
        <div className="bg-card rounded-3xl shadow-card-hover p-8">
          <h1 className="text-2xl font-bold text-foreground text-center mb-2">
            Crear cuenta
          </h1>
          <p className="text-muted-foreground text-center mb-8">
            Regístrate para guardar tus datos y hacer pedidos más rápido
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Account info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    name="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-12 h-12 rounded-xl"
                  />
                </div>
                {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Contraseña *
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-12 h-12 rounded-xl"
                  />
                </div>
                {errors.password && <p className="text-sm text-destructive mt-1">{errors.password}</p>}
              </div>
            </div>

            {/* Personal info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nombre completo *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    name="fullName"
                    placeholder="Tu nombre"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="pl-12 h-12 rounded-xl"
                  />
                </div>
                {errors.fullName && <p className="text-sm text-destructive mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Teléfono *
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="612 345 678"
                    value={formData.phone}
                    onChange={handleChange}
                    className="pl-12 h-12 rounded-xl"
                  />
                </div>
                {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Dirección de entrega *
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  name="address"
                  placeholder="Calle, número, piso..."
                  value={formData.address}
                  onChange={handleChange}
                  className="pl-12 h-12 rounded-xl"
                />
              </div>
              {errors.address && <p className="text-sm text-destructive mt-1">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Ciudad *
                </label>
                <Input
                  type="text"
                  name="city"
                  placeholder="Ciudad"
                  value={formData.city}
                  onChange={handleChange}
                  className="h-12 rounded-xl"
                />
                {errors.city && <p className="text-sm text-destructive mt-1">{errors.city}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Código postal *
                </label>
                <Input
                  type="text"
                  name="postalCode"
                  placeholder="12345"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="h-12 rounded-xl"
                />
                {errors.postalCode && <p className="text-sm text-destructive mt-1">{errors.postalCode}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Notas adicionales
              </label>
              <Textarea
                name="notes"
                placeholder="Ej: Timbre roto, dejar en portería..."
                value={formData.notes}
                onChange={handleChange}
                className="rounded-xl resize-none"
                rows={3}
              />
            </div>

            <Button
              type="submit"
              variant="hero"
              size="xl"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Creando cuenta..." : "Crear cuenta"}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </form>

          <p className="text-center text-muted-foreground mt-6">
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
