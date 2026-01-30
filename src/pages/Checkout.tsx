import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { useProfile } from '@/hooks/useProfile';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { items, totalPrice, clearCart } = useCart();
  const { profile } = useProfile();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: profile?.full_name || '',
    phone: profile?.phone || '',
    address: profile?.address || '',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);

  // Update form when profile loads
  useState(() => {
    if (profile) {
      setFormData(prev => ({
        ...prev,
        name: profile.full_name || prev.name,
        phone: profile.phone || prev.phone,
        address: profile.address || prev.address,
      }));
    }
  });

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-lg text-muted-foreground">Tu carrito está vacío</p>
        <Button onClick={() => navigate('/')}>Volver al menú</Button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Create the order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([{
          user_id: user.id,
          total: totalPrice,
          customer_name: formData.name,
          customer_phone: formData.phone,
          customer_address: formData.address,
          notes: formData.notes || null,
          status: 'pending' as const,
        }])
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_name: item.name,
        product_price: item.price,
        quantity: item.quantity,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Clear cart and show success
      clearCart();
      toast({
        title: '¡Pedido realizado!',
        description: `Tu pedido #${order.id.slice(0, 8).toUpperCase()} ha sido enviado a cocina.`,
      });
      navigate('/');
    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: 'Error',
        description: 'No se pudo realizar el pedido. Inténtalo de nuevo.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al menú
        </Button>

        <h1 className="text-3xl font-bold mb-8">Confirmar Pedido</h1>

        <div className="grid gap-6">
          {/* Order summary */}
          <Card>
            <CardHeader>
              <CardTitle>Resumen del pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-4">
                {items.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span>
                      {item.quantity}x {item.name}
                    </span>
                    <span className="font-medium">
                      {(item.price * item.quantity).toFixed(2)}€
                    </span>
                  </li>
                ))}
              </ul>
              <div className="border-t pt-4 flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-primary">{totalPrice.toFixed(2)}€</span>
              </div>
            </CardContent>
          </Card>

          {/* Delivery form */}
          <Card>
            <CardHeader>
              <CardTitle>Datos de entrega</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Tu nombre"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    placeholder="Tu número de teléfono"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Dirección</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                    placeholder="Dirección de entrega"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notas (opcional)</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Instrucciones especiales, alergias, etc."
                    rows={3}
                  />
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando pedido...
                    </>
                  ) : (
                    `Confirmar pedido - ${totalPrice.toFixed(2)}€`
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
