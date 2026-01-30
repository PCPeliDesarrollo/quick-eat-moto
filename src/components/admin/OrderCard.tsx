import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Clock, CheckCircle, ChefHat, Truck, XCircle, Phone, MapPin, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Order } from '@/hooks/useOrders';

interface OrderCardProps {
  order: Order;
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
}

const statusConfig = {
  pending: {
    label: 'Pendiente',
    icon: Clock,
    color: 'bg-yellow-500',
    badgeVariant: 'secondary' as const,
  },
  preparing: {
    label: 'Preparando',
    icon: ChefHat,
    color: 'bg-orange-500',
    badgeVariant: 'default' as const,
  },
  ready: {
    label: 'Listo',
    icon: CheckCircle,
    color: 'bg-green-500',
    badgeVariant: 'default' as const,
  },
  delivered: {
    label: 'Entregado',
    icon: Truck,
    color: 'bg-blue-500',
    badgeVariant: 'outline' as const,
  },
  cancelled: {
    label: 'Cancelado',
    icon: XCircle,
    color: 'bg-red-500',
    badgeVariant: 'destructive' as const,
  },
};

export const OrderCard = ({ order, onUpdateStatus }: OrderCardProps) => {
  const config = statusConfig[order.status];
  const StatusIcon = config.icon;

  const nextStatus: Record<string, Order['status'] | null> = {
    pending: 'preparing',
    preparing: 'ready',
    ready: 'delivered',
    delivered: null,
    cancelled: null,
  };

  const nextAction = nextStatus[order.status];

  return (
    <Card className="border-l-4" style={{ borderLeftColor: `var(--${order.status === 'pending' ? 'warning' : order.status === 'preparing' ? 'warning' : order.status === 'ready' ? 'success' : 'muted'})` }}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">
            Pedido #{order.id.slice(0, 8).toUpperCase()}
          </CardTitle>
          <Badge variant={config.badgeVariant} className="gap-1">
            <StatusIcon className="h-3 w-3" />
            {config.label}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {format(new Date(order.created_at), "d 'de' MMMM, HH:mm", { locale: es })}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Customer info */}
        <div className="space-y-1 text-sm">
          {order.customer_name && (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>{order.customer_name}</span>
            </div>
          )}
          {order.customer_phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{order.customer_phone}</span>
            </div>
          )}
          {order.customer_address && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{order.customer_address}</span>
            </div>
          )}
        </div>

        {/* Order items */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm">Productos:</h4>
          <ul className="space-y-1">
            {order.items?.map((item) => (
              <li key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.quantity}x {item.product_name}
                </span>
                <span className="text-muted-foreground">
                  {(item.product_price * item.quantity).toFixed(2)}€
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Notes */}
        {order.notes && (
          <div className="bg-muted p-2 rounded text-sm">
            <strong>Notas:</strong> {order.notes}
          </div>
        )}

        {/* Total */}
        <div className="flex justify-between items-center pt-2 border-t">
          <span className="font-bold">Total:</span>
          <span className="text-xl font-bold text-primary">{order.total.toFixed(2)}€</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          {nextAction && (
            <Button
              className="flex-1"
              onClick={() => onUpdateStatus(order.id, nextAction)}
            >
              {nextAction === 'preparing' && 'Empezar a preparar'}
              {nextAction === 'ready' && 'Marcar como listo'}
              {nextAction === 'delivered' && 'Marcar como entregado'}
            </Button>
          )}
          {order.status === 'pending' && (
            <Button
              variant="destructive"
              onClick={() => onUpdateStatus(order.id, 'cancelled')}
            >
              Cancelar
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
