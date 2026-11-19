import { ArrowLeft, Package, Clock } from 'lucide-react';
import { formatTugrug } from '@/data/catalog';
import { useOrders } from '@/hooks/useStoreData';

export default function AdminView({ onBack }: { onBack: () => void }) {
  const { orders } = useOrders();

  return (
    <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
      <button onClick={onBack} className="btn-ghost mt-6 !px-4 !py-2 text-xs">
        <ArrowLeft className="h-4 w-4" />
        Нүүр хуудас руу буцах
      </button>

      <div className="mt-8 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-neutral-100 sm:text-4xl">
            Захиалгын түүх
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Нийт {orders.length} захиалга бүртгэлэгдсэн
          </p>
        </div>
        <Package className="h-9 w-9 text-amber-400/60" />
      </div>
      <div className="my-6 h-px bg-gradient-to-r from-amber-400/40 via-amber-400/10 to-transparent" />

      {orders.length === 0 ? (
        <div className="card-lux px-6 py-16 text-center">
          <Package className="mx-auto h-12 w-12 text-amber-400/30" />
          <p className="mt-4 text-sm text-neutral-400">Одоогоор захиалга бүртгэгдээгүй байна</p>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((o) => {
            const byStore = o.lines.reduce<Record<string, typeof o.lines>>((acc, l) => {
              (acc[l.storeName] ??= []).push(l);
              return acc;
            }, {});
            const date = new Date(o.createdAt);
            const dateStr = date.toLocaleString('mn-MN', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            });
            return (
              <div key={o.id} className="card-lux p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-serif text-lg font-semibold text-amber-200">
                      {o.customerName}
                    </p>
                    <p className="mt-0.5 text-[11px] uppercase tracking-widest text-neutral-600">
                      {o.id}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="gold-text font-serif text-xl font-bold">{formatTugrug(o.total)}</p>
                    <p className="mt-0.5 flex items-center justify-end gap-1 text-xs text-neutral-500">
                      <Clock className="h-3 w-3" />
                      {dateStr}
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-3 border-t border-neutral-800 pt-4">
                  {Object.entries(byStore).map(([storeName, lines]) => (
                    <div key={storeName}>
                      <p className="text-xs font-semibold uppercase tracking-widest text-amber-500/80">
                        {storeName}
                      </p>
                      <ul className="mt-1.5 space-y-1">
                        {lines.map((l, i) => (
                          <li key={i} className="flex items-center justify-between text-sm">
                            <span className="text-neutral-300">
                              {l.productName}
                              <span className="ml-2 text-neutral-500">× {l.qty}</span>
                            </span>
                            <span className="text-neutral-400">
                              {formatTugrug(l.price * l.qty)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
