import { useState } from 'react';
import { ShoppingBag, Lock, X, Check, Gem } from 'lucide-react';
import { stores } from '@/data/catalog';
import { useCart, useOrders, type CartEntry } from '@/hooks/useStoreData';
import StoreView from '@/components/StoreView';
import CartView from '@/components/CartView';
import AdminView from '@/components/AdminView';

type View = { page: 'home' } | { page: 'store'; storeId: string } | { page: 'cart' } | { page: 'admin' };

export default function App() {
  const [view, setView] = useState<View>({ page: 'home' });
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPass, setAdminPass] = useState('');
  const [adminError, setAdminError] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const cart = useCart();
  const { addOrder } = useOrders();

  const activeStore = view.page === 'store' ? stores.find((s) => s.id === view.storeId) : undefined;

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2200);
  };

  const handleCheckout = (name: string, entries: CartEntry[], total: number) => {
    addOrder(name, entries, total);
    cart.clear();
    setView({ page: 'home' });
    showToast('Таны захиалга амжилттай баталгаажлаа. Баярлалаа!');
  };

  const tryAdminLogin = () => {
    if (adminPass === '1234') {
      setShowAdminLogin(false);
      setAdminPass('');
      setAdminError(false);
      setView({ page: 'admin' });
    } else {
      setAdminError(true);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-amber-400/15 bg-neutral-950/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <button
            onClick={() => setView({ page: 'home' })}
            className="flex items-center gap-2.5 text-left"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-400/40 bg-gradient-to-br from-amber-300/20 to-transparent">
              <Gem className="h-5 w-5 text-amber-400" />
            </span>
            <span>
              <span className="gold-text block font-serif text-lg font-bold leading-tight tracking-widest sm:text-xl">
                PLATINUM &amp; CO
              </span>
              <span className="block text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                Luxury Commerce &amp; Services
              </span>
            </span>
          </button>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setView({ page: 'cart' })}
              className="relative flex items-center gap-2 rounded-full border border-amber-400/30 px-3 py-2 text-xs font-medium tracking-wide text-amber-200 transition hover:bg-amber-400/10 sm:px-5 sm:text-sm"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Сагс</span>
              {cart.count > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-r from-amber-300 to-yellow-600 px-1 text-[10px] font-bold text-neutral-950">
                  {cart.count}
                </span>
              )}
            </button>
            <button
              onClick={() => setShowAdminLogin(true)}
              className="flex items-center gap-2 rounded-full border border-neutral-700 px-3 py-2 text-xs font-medium tracking-wide text-neutral-300 transition hover:border-amber-400/40 hover:text-amber-200 sm:px-5 sm:text-sm"
            >
              <Lock className="h-4 w-4" />
              <span className="hidden sm:inline">Админ</span>
            </button>
          </div>
        </div>
      </header>

      <main>
        {view.page === 'home' && (
          <HomeView onSelectStore={(id) => setView({ page: 'store', storeId: id })} />
        )}
        {view.page === 'store' && activeStore && (
          <StoreView
            store={activeStore}
            cart={cart}
            onBack={() => setView({ page: 'home' })}
            onAdded={() => showToast('Сагсанд нэмэгдлээ')}
            onGoCart={() => setView({ page: 'cart' })}
          />
        )}
        {view.page === 'cart' && (
          <CartView
            entries={cart.entries}
            total={cart.total}
            onCheckout={handleCheckout}
            onBack={() => setView({ page: 'home' })}
          />
        )}
        {view.page === 'admin' && <AdminView onBack={() => setView({ page: 'home' })} />}
      </main>

      <footer className="border-t border-amber-400/10 py-10 text-center">
        <p className="gold-text font-serif text-lg tracking-[0.25em]">PLATINUM &amp; CO</p>
        <p className="mt-2 text-xs text-neutral-600">© 2026 Platinum &amp; Co. Улаанбаатар, Монгол</p>
      </footer>

      {/* Admin login modal */}
      {showAdminLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/80 p-4 backdrop-blur-sm">
          <div className="card-lux w-full max-w-sm p-8">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h3 className="font-serif text-xl text-amber-200">Админ нэвтрэх</h3>
                <p className="mt-1 text-xs text-neutral-500">Нууц үгээ оруулна уу</p>
              </div>
              <button
                onClick={() => setShowAdminLogin(false)}
                className="rounded-full p-1 text-neutral-500 transition hover:text-amber-200"
                aria-label="Хаах"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <input
              type="password"
              inputMode="numeric"
              value={adminPass}
              onChange={(e) => {
                setAdminPass(e.target.value);
                setAdminError(false);
              }}
              onKeyDown={(e) => e.key === 'Enter' && tryAdminLogin()}
              placeholder="Нууц үг"
              autoFocus
              className={`w-full rounded-full border bg-neutral-900 px-5 py-3 text-center tracking-[0.4em] text-amber-100 outline-none transition placeholder:tracking-normal placeholder:text-neutral-600 ${
                adminError ? 'border-red-500/60' : 'border-amber-400/25 focus:border-amber-400/60'
              }`}
            />
            {adminError && (
              <p className="mt-2 text-center text-xs text-red-400">Нууц үг буруу байна</p>
            )}
            <button onClick={tryAdminLogin} className="btn-gold mt-5 w-full">
              Нэвтрэх
            </button>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-amber-400/40 bg-neutral-900/95 px-6 py-3 text-sm text-amber-100 shadow-[0_0_40px_-10px_rgba(251,191,36,0.4)]">
          <Check className="h-4 w-4 text-amber-400" />
          {toast}
        </div>
      )}
    </div>
  );
}

function HomeView({ onSelectStore }: { onSelectStore: (id: string) => void }) {
  const shops = stores.filter((s) => s.type === 'shop');
  const services = stores.filter((s) => s.type === 'service');

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
      {/* Hero */}
      <section className="relative overflow-hidden py-14 text-center sm:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(251,191,36,0.15), transparent 70%)',
          }}
        />
        <p className="relative text-[11px] uppercase tracking-[0.5em] text-amber-500/80">
          Улаанбаатарын тансаг зэрэглэлийн ордон
        </p>
        <h1 className="gold-text relative mt-4 font-serif text-4xl font-bold leading-tight sm:text-6xl">
          Премиум худалдаа &amp;
          <br />
          үйлчилгээний ертөнц
        </h1>
        <p className="relative mx-auto mt-5 max-w-xl text-sm leading-relaxed text-neutral-400 sm:text-base">
          Дэлхийн шилдэг брэндүүд, анхны зэрэглэлийн үйлчилгээ — бүгд нэг дор. Сонголтоо хийж,
          тансаг амьдралын хэв маягаа тодорхойл.
        </p>
      </section>

      <Section title="Худалдааны төв" subtitle="Дэлхийн тэргүүлэх брэндүүдийн бутикууд" id="shopping" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {shops.map((s) => (
          <StoreCard key={s.id} storeId={s.id} onClick={onSelectStore} />
        ))}
      </div>

      <Section title="Үйлчилгээний төв" subtitle="Примиум зочломтгой байдлын төвүүд" id="services" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {services.map((s) => (
          <StoreCard key={s.id} storeId={s.id} onClick={onSelectStore} large />
        ))}
      </div>
    </div>
  );
}

function Section({ title, subtitle, id }: { title: string; subtitle: string; id: string }) {
  return (
    <div id={id} className="mb-7 mt-14 first:mt-0">
      <div className="flex items-center gap-4">
        <h2 className="whitespace-nowrap font-serif text-2xl font-semibold text-neutral-100 sm:text-3xl">
          {title}
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-amber-400/50 to-transparent" />
      </div>
      <p className="mt-1.5 text-sm text-neutral-500">{subtitle}</p>
    </div>
  );
}

function StoreCard({
  storeId,
  onClick,
  large,
}: {
  storeId: string;
  onClick: (id: string) => void;
  large?: boolean;
}) {
  const store = stores.find((s) => s.id === storeId);
  if (!store) return null;
  const Icon = store.icon;
  return (
    <button onClick={() => onClick(store.id)} className="card-lux group w-full p-0 text-left">
      <div
        className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-900 to-amber-950/30 ${
          large ? 'h-44 sm:h-52' : 'h-40'
        }`}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(circle at 50% 60%, rgba(251,191,36,0.12), transparent 65%)',
          }}
        />
        <Icon className="h-12 w-12 text-amber-400/70 transition-transform duration-500 group-hover:scale-110" />
      </div>
      <div className="p-5">
        <h3 className="font-serif text-lg font-semibold text-neutral-100 group-hover:text-amber-200">
          {store.name}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-neutral-500">{store.tagline}</p>
        <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-amber-500/80">
          {store.products.length} бүтээгдэхүүн →
        </p>
      </div>
    </button>
  );
}
