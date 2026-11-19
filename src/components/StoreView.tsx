import { useState } from 'react';
import { ArrowLeft, Minus, Plus, ShoppingBag } from 'lucide-react';
import { formatTugrug, type Store } from '@/data/catalog';
import { useCart, type CartEntry } from '@/hooks/useStoreData';

type Cart = ReturnType<typeof useCart>;

export default function StoreView({
  store,
  cart,
  onBack,
  onAdded,
  onGoCart,
}: {
  store: Store;
  cart: Cart;
  onBack: () => void;
  onAdded: () => void;
  onGoCart: () => void;
}) {
  const Icon = store.icon;
  const cartCount = store.products.reduce((sum, p) => sum + cart.getQty(p.id), 0);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
      <button onClick={onBack} className="btn-ghost mt-6 !px-4 !py-2 text-xs">
        <ArrowLeft className="h-4 w-4" />
        Нүүр хуудас руу буцах
      </button>

      <div className="mt-8 flex items-center gap-4">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-400/30 bg-gradient-to-br from-amber-300/15 to-transparent">
          <Icon className="h-7 w-7 text-amber-400" />
        </span>
        <div>
          <h1 className="font-serif text-3xl font-bold text-neutral-100 sm:text-4xl">{store.name}</h1>
          <p className="mt-1 text-sm text-neutral-500">{store.tagline}</p>
        </div>
      </div>

      <div className="my-8 h-px bg-gradient-to-r from-amber-400/40 via-amber-400/10 to-transparent" />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {store.products.map((p) => (
          <ProductCard
            key={p.id}
            productId={p.id}
            name={p.name}
            desc={p.desc}
            price={p.price}
            Icon={p.icon}
            qty={cart.getQty(p.id)}
            onQty={cart.setQty}
            onAdded={onAdded}
          />
        ))}
      </div>

      {cartCount > 0 && (
        <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2">
          <button onClick={onGoCart} className="btn-gold shadow-xl">
            <ShoppingBag className="h-4 w-4" />
            Сагс руу очих ({cartCount})
          </button>
        </div>
      )}
    </div>
  );
}

function ProductCard({
  productId,
  name,
  desc,
  price,
  Icon,
  qty,
  onQty,
  onAdded,
}: {
  productId: string;
  name: string;
  desc: string;
  price: number;
  Icon: Store['products'][number]['icon'];
  qty: number;
  onQty: Cart['setQty'];
  onAdded: () => void;
}) {
  const [justAdded, setJustAdded] = useState(false);

  const addToCart = () => {
    onQty(productId, qty + 1);
    onAdded();
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div className="card-lux flex flex-col p-5">
      <div className="mb-4 flex h-36 items-center justify-center rounded-xl bg-gradient-to-br from-neutral-900 to-amber-950/25">
        <Icon className="h-11 w-11 text-amber-400/70" />
      </div>
      <h3 className="font-serif text-lg font-semibold text-neutral-100">{name}</h3>
      <p className="mt-1 flex-1 text-xs leading-relaxed text-neutral-500">{desc}</p>
      <p className="gold-text mt-3 font-serif text-lg font-bold">{formatTugrug(price)}</p>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 rounded-full border border-amber-400/20 px-2 py-1">
          <button
            onClick={() => onQty(productId, qty - 1)}
            className="flex h-7 w-7 items-center justify-center rounded-full text-amber-300 transition hover:bg-amber-400/15 active:scale-90"
            aria-label="Хасах"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="min-w-5 text-center text-sm font-semibold text-neutral-100">{qty}</span>
          <button
            onClick={() => onQty(productId, qty + 1)}
            className="flex h-7 w-7 items-center justify-center rounded-full text-amber-300 transition hover:bg-amber-400/15 active:scale-90"
            aria-label="Нэмэх"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
        <button onClick={addToCart} className="btn-gold !px-4 !py-2 text-xs">
          {justAdded ? 'Нэмэгдлээ ✓' : 'Сагсанд нэмэх'}
        </button>
      </div>
    </div>
  );
}
