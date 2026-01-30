import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, ChefHat, Clock, CheckCircle, Truck } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useUserRole } from '@/hooks/useUserRole';
import { useOrders, Order } from '@/hooks/useOrders';
import { OrderCard } from '@/components/admin/OrderCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const { isStaff, loading: roleLoading } = useUserRole();
  const { orders, loading: ordersLoading, updateOrderStatus } = useOrders(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!roleLoading && user && !isStaff) {
      toast({
        title: 'Acceso denegado',
        description: 'No tienes permisos para acceder al panel de administración.',
        variant: 'destructive',
      });
      navigate('/');
    }
  }, [isStaff, roleLoading, user, navigate, toast]);

  const handleUpdateStatus = async (orderId: string, status: Order['status']) => {
    try {
      await updateOrderStatus(orderId, status);
      toast({
        title: 'Estado actualizado',
        description: `El pedido ha sido marcado como "${status}".`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo actualizar el estado del pedido.',
        variant: 'destructive',
      });
    }
  };

  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user || !isStaff) {
    return null;
  }

  const pendingOrders = orders.filter((o) => o.status === 'pending');
  const preparingOrders = orders.filter((o) => o.status === 'preparing');
  const readyOrders = orders.filter((o) => o.status === 'ready');
  const completedOrders = orders.filter((o) => o.status === 'delivered' || o.status === 'cancelled');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-6 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ChefHat className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Panel de Cocina</h1>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-lg px-4 py-1">
              {pendingOrders.length + preparingOrders.length} pedidos activos
            </Badge>
            <Button variant="secondary" onClick={() => navigate('/')}>
              Ver Menú
            </Button>
            <Button variant="outline" onClick={signOut}>
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto py-6 px-4">
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="pending" className="gap-2">
              <Clock className="h-4 w-4" />
              Pendientes
              {pendingOrders.length > 0 && (
                <Badge variant="destructive">{pendingOrders.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="preparing" className="gap-2">
              <ChefHat className="h-4 w-4" />
              Preparando
              {preparingOrders.length > 0 && (
                <Badge>{preparingOrders.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="ready" className="gap-2">
              <CheckCircle className="h-4 w-4" />
              Listos
              {readyOrders.length > 0 && (
                <Badge variant="secondary">{readyOrders.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="completed" className="gap-2">
              <Truck className="h-4 w-4" />
              Completados
            </TabsTrigger>
          </TabsList>

          {ordersLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <>
              <TabsContent value="pending">
                {pendingOrders.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No hay pedidos pendientes</p>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {pendingOrders.map((order) => (
                      <OrderCard
                        key={order.id}
                        order={order}
                        onUpdateStatus={handleUpdateStatus}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="preparing">
                {preparingOrders.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <ChefHat className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No hay pedidos en preparación</p>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {preparingOrders.map((order) => (
                      <OrderCard
                        key={order.id}
                        order={order}
                        onUpdateStatus={handleUpdateStatus}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="ready">
                {readyOrders.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No hay pedidos listos para entregar</p>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {readyOrders.map((order) => (
                      <OrderCard
                        key={order.id}
                        order={order}
                        onUpdateStatus={handleUpdateStatus}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="completed">
                {completedOrders.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Truck className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No hay pedidos completados hoy</p>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {completedOrders.map((order) => (
                      <OrderCard
                        key={order.id}
                        order={order}
                        onUpdateStatus={handleUpdateStatus}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </>
          )}
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
