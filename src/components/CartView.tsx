import { useState } from 'react';
import { ArrowLeft, ShoppingBag, Trash2, BadgeCheck } from 'lucide-react';
import { formatTugrug } from '@/data/catalog';
import type { CartEntry } from '@/hooks/useStoreData';

export default function CartView({
  entries,
  total,
  onCheckout,
  onBack,
}: {
  entries: CartEntry[];
  total: number;
  onCheckout: (name: string, entries: CartEntry[], total: number) => void;
  onBack: () => void;
}) {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [placed, setPlaced] = useState(false);

  const byStore = entries.reduce<Record<string, CartEntry[]>>((acc, e) => {
    (acc[e.store.name] ??= []).push(e);
    return acc;
  }, {});

  const checkout = () => {
    if (!name.trim()) {
      setError(true);
      return;
    }
    onCheckout(name.trim(), entries, total);
    setPlaced(true);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
      <button onClick={onBack} className="btn-ghost mt-6 !px-4 !py-2 text-xs">
        <ArrowLeft className="h-4 w-4" />
        Нүүр хуудас руу буцах
      </button>

      <h1 className="mt-8 font-serif text-3xl font-bold text-neutral-100 sm:text-4xl">
        Таны сагс
      </h1>
      <div className="my-6 h-px bg-gradient-to-r from-amber-400/40 via-amber-400/10 to-transparent" />

      {placed ? (
        <div className="card-lux flex flex-col items-center px-6 py-16 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-amber-400/40 bg-amber-400/10">
            <BadgeCheck className="h-8 w-8 text-amber-400" />
          </span>
          <h2 className="mt-5 font-serif text-2xl text-amber-200">
            Захиалга баталгаажлаа
          </h2>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-neutral-400">
            Таны худалдан авалт хүлээн авлаа. Мэргэжлийн зөвлөх бид тантай удахгүй холбогдоно.
          </p>
          <button onClick={onBack} className="btn-gold mt-7">
            Нүүр хуудас руу буцах
          </button>
        </div>
      ) : entries.length === 0 ? (
        <div className="card-lux flex flex-col items-center px-6 py-16 text-center">
          <ShoppingBag className="h-12 w-12 text-amber-400/40" />
          <p className="mt-4 text-sm text-neutral-400">Сагс хоосон байна</p>
          <button onClick={onBack} className="btn-gold mt-6">
            Худалдаагаа эхлүүлэх
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {Object.entries(byStore).map(([storeName, items]) => (
              <div key={storeName} className="card-lux p-5">
                <h3 className="gold-text font-serif text-base font-semibold tracking-wide">
                  {storeName}
                </h3>
                <div className="mt-3 divide-y divide-neutral-800">
                  {items.map((e) => (
                    <div key={e.productId} className="flex items-center justify-between gap-3 py-3">
                      <div className="flex-1">
                        <p className="text-sm text-neutral-100">{e.product.name}</p>
                        <p className="mt-0.5 text-xs text-neutral-500">
                          {formatTugrug(e.product.price)} × {e.qty}
                        </p>
                      </div>
                      <p className="font-serif text-sm font-semibold text-amber-200">
                        {formatTugrug(e.product.price * e.qty)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="card-lux mt-6 p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-400">Нийт дүн</span>
              <span className="gold-text font-serif text-2xl font-bold">{formatTugrug(total)}</span>
            </div>

            <label className="mt-6 block text-xs uppercase tracking-widest text-neutral-500">
              Өөрийн нэр
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError(false);
              }}
              placeholder="Нэрээ бичнэ үү"
              className={`mt-2 w-full rounded-full border bg-neutral-900 px-5 py-3 text-neutral-100 outline-none transition placeholder:text-neutral-600 ${
                error ? 'border-red-500/60' : 'border-amber-400/25 focus:border-amber-400/60'
              }`}
            />
            {error && <p className="mt-2 text-xs text-red-400">Нэрээ оруулна уу</p>}

            <button onClick={checkout} className="btn-gold mt-6 w-full">
              <BadgeCheck className="h-4 w-4" />
              Худалдан авалт баталгаажуулах
            </button>
          </div>
        </>
      )}
    </div>
  );
}
