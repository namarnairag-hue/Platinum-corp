import {
  Watch,
  Gem,
  Smartphone,
  Sparkles,
  Shirt,
  Sun,
  Scissors,
  Leaf,
  ShoppingBag,
  Gem as GemIcon,
  Headphones,
  Camera,
  Laptop,
  Speaker,
  Glasses,
  CakeSlice,
  Coffee,
  Soup,
  Salad,
  Croissant,
  Wine,
  Martini,
  Beer,
  Grape,
  CupSoda,
  GlassWater,
  type LucideIcon,
} from 'lucide-react';

export type Product = {
  id: string;
  name: string;
  desc: string;
  price: number;
  icon: LucideIcon;
};

export type Store = {
  id: string;
  name: string;
  tagline: string;
  type: 'shop' | 'service';
  icon: LucideIcon;
  products: Product[];
};

export const stores: Store[] = [
  {
    id: 'chanel',
    name: 'Chanel',
    tagline: 'Parisian haute couture & fragrance',
    type: 'shop',
    icon: Shirt,
    products: [
      { id: 'ch-1', name: 'Chanel N°5 Parfum', desc: '100ml classic eau de parfum', price: 890000, icon: Sparkles },
      { id: 'ch-2', name: 'Classic Flap Bag', desc: 'Lambskin, quilted, gold-tone chain', price: 24500000, icon: ShoppingBag },
      { id: 'ch-3', name: 'Tweed Jacket', desc: 'Handwoven Parisian tweed', price: 12800000, icon: Shirt },
      { id: 'ch-4', name: 'Les Beiges Powder', desc: 'Healthy glow natural finish', price: 320000, icon: Sun },
      { id: 'ch-5', name: 'Rouge Coco Lipstick', desc: 'Hydrating crème lip colour', price: 210000, icon: Sparkles },
    ],
  },
  {
    id: 'dior',
    name: 'Dior',
    tagline: 'The art of French elegance',
    type: 'shop',
    icon: Scissors,
    products: [
      { id: 'di-1', name: 'Miss Dior Eau de Parfum', desc: '100ml floral chypre fragrance', price: 720000, icon: Sparkles },
      { id: 'di-2', name: 'Lady Dior Bag', desc: 'Cannage lambskin, medium', price: 19800000, icon: ShoppingBag },
      { id: 'di-3', name: 'Dior Homme Suit', desc: 'Tailored wool-silk blend', price: 9400000, icon: Scissors },
      { id: 'di-4', name: 'Dior Surround Mascara', desc: 'Volume and curl couture mascara', price: 185000, icon: Sparkles },
      { id: 'di-5', name: 'Dior Silk Scarf', desc: 'Hand-rolled twill silk square', price: 1650000, icon: Leaf },
    ],
  },
  {
    id: 'harry-winston',
    name: 'Harry Winston',
    tagline: 'King of diamonds since 1932',
    type: 'shop',
    icon: Gem,
    products: [
      { id: 'hw-1', name: 'Winston Cluster Necklace', desc: 'Diamonds set in platinum', price: 89000000, icon: GemIcon },
      { id: 'hw-2', name: 'Emerald Cut Solitaire Ring', desc: '3.02ct certified diamond', price: 145000000, icon: GemIcon },
      { id: 'hw-3', name: 'Midnight Diamond Watch', desc: '18k gold, diamond bezel', price: 67500000, icon: Watch },
      { id: 'hw-4', name: 'Diamond Drop Earrings', desc: 'Pear and marquise cluster', price: 54000000, icon: GemIcon },
    ],
  },
  {
    id: 'piament',
    name: 'Piament',
    tagline: 'Swiss horology & rare creations',
    type: 'shop',
    icon: Watch,
    products: [
      { id: 'pi-1', name: 'Piament Polo Chronograph', desc: 'Automatic, 18k gold case', price: 112000000, icon: Watch },
      { id: 'pi-2', name: 'Limelight Gala Watch', desc: 'Diamond-set mother of pearl dial', price: 88000000, icon: Watch },
      { id: 'pi-3', name: 'Sunlight Gold Cuff', desc: 'Sculpted 18k rose gold bracelet', price: 41000000, icon: GemIcon },
      { id: 'pi-4', name: 'Possession Ring', desc: 'Rotating diamond band', price: 26500000, icon: GemIcon },
      { id: 'pi-5', name: 'Leather Travel Case', desc: 'Calfskin, gold hardware', price: 3800000, icon: ShoppingBag },
    ],
  },
  {
    id: 'graff',
    name: 'Graff',
    tagline: 'The most fabulous jewels in the world',
    type: 'shop',
    icon: Gem,
    products: [
      { id: 'gr-1', name: 'Flame Necklace', desc: '17.44ct rare yellow diamond', price: 260000000, icon: GemIcon },
      { id: 'gr-2', name: 'Laurence Graff Signature Ring', desc: 'Round brilliant, D flawless', price: 178000000, icon: GemIcon },
      { id: 'gr-3', name: 'Butterfly Pendant', desc: 'Pavé diamond silhouette', price: 39500000, icon: GemIcon },
      { id: 'gr-4', name: 'Graff Sniper Chronograph', desc: 'Platinum case, skeleton dial', price: 76000000, icon: Watch },
    ],
  },
  {
    id: 'hermes',
    name: 'Hermes',
    tagline: 'Handcrafted French heritage',
    type: 'shop',
    icon: ShoppingBag,
    products: [
      { id: 'he-1', name: 'Birkin 30 Togo', desc: 'Palladium hardware, gold tone', price: 32000000, icon: ShoppingBag },
      { id: 'he-2', name: 'Kelly 25 Sellier', desc: 'Box calf, gold hardware', price: 28500000, icon: ShoppingBag },
      { id: 'he-3', name: 'Silk Twilly Pair', desc: 'Hand-rolled silk ribbons', price: 890000, icon: Leaf },
      { id: 'he-4', name: 'Oran Sandals', desc: 'H leather, gold-tone H cut', price: 2450000, icon: Glasses },
      { id: 'he-5', name: 'Terre d’Hermes Parfum', desc: '75ml woody mineral fragrance', price: 465000, icon: Sparkles },
      { id: 'he-6', name: 'H Halazou Scarf Ring', desc: 'Palladium plated scarf accessory', price: 1450000, icon: GemIcon },
    ],
  },
  {
    id: 'electron',
    name: 'Electron',
    tagline: 'Cutting-edge technology atelier',
    type: 'shop',
    icon: Smartphone,
    products: [
      { id: 'el-1', name: 'Aurum Pro Laptop 16"', desc: 'Titanium chassis, 32GB / 1TB', price: 8900000, icon: Laptop },
      { id: 'el-2', name: 'Nova X Smartphone', desc: '512GB, sapphire display', price: 4650000, icon: Smartphone },
      { id: 'el-3', name: 'Silence Studio Headphones', desc: 'Adaptive noise cancelling', price: 1250000, icon: Headphones },
      { id: 'el-4', name: 'Leica M12 Camera', desc: 'Full-frame rangefinder, silver chrome', price: 15800000, icon: Camera },
      { id: 'el-5', name: 'Monolith Speaker System', desc: 'Hi-fi wireless gold-accent tower', price: 6700000, icon: Speaker },
    ],
  },
  {
    id: 'beauty',
    name: 'Beauty Cosmetic & Make Up',
    tagline: 'Curated beauty couture',
    type: 'shop',
    icon: Sparkles,
    products: [
      { id: 'be-1', name: 'Gold Radiance Serum', desc: '24k gold-infused firming serum', price: 980000, icon: Sparkles },
      { id: 'be-2', name: 'Velvet Matte Palette', desc: '18-shade couture eye palette', price: 720000, icon: Sun },
      { id: 'be-3', name: 'Silk Foundation SPF30', desc: 'Fluid light finish, all shades', price: 385000, icon: Sun },
      { id: 'be-4', name: 'Luxe Lip Trio', desc: 'Three signature red satin shades', price: 465000, icon: Sparkles },
      { id: 'be-5', name: 'Caviar Night Cream', desc: 'Regenerating overnight treatment', price: 1150000, icon: Sparkles },
    ],
  },
  {
    id: 'restaurant',
    name: 'Restaurant',
    tagline: 'Хоол, дессерт захиалга',
    type: 'service',
    icon: CakeSlice,
    products: [
      { id: 're-1', name: 'Wagyu Tenderloin', desc: 'A5 grade, truffle jus, black garlic', price: 285000, icon: Soup },
      { id: 're-2', name: 'Alaskan King Crab', desc: 'Steamed, beurre blanc sauce', price: 340000, icon: Salad },
      { id: 're-3', name: 'Foie Gras Toast', desc: 'Seared, fig compote, brioche', price: 165000, icon: Croissant },
      { id: 're-4', name: 'Gold Leaf Soufflé', desc: 'Valrhona chocolate, 24k gold leaf', price: 98000, icon: CakeSlice },
      { id: 're-5', name: 'Signature Afternoon Tea', desc: 'For two, vintage porcelain service', price: 185000, icon: Coffee },
      { id: 're-6', name: 'Caviar Tasting Set', desc: 'Oscietra caviar, blini, crème fraîche', price: 420000, icon: Salad },
    ],
  },
  {
    id: 'vin-riche',
    name: 'Vin Riche Lounge',
    tagline: 'Архи, дарс, виски',
    type: 'service',
    icon: Wine,
    products: [
      { id: 'vr-1', name: 'Macallan 25 Sherry Oak', desc: 'Single malt, one pour 50ml', price: 320000, icon: GlassWater },
      { id: 'vr-2', name: 'Hennessy Paradis', desc: 'Rare cognac, crystal glass', price: 285000, icon: Martini },
      { id: 'vr-3', name: 'Château Margaux 2015', desc: 'First growth Bordeaux, bottle', price: 1250000, icon: Wine },
      { id: 'vr-4', name: 'Dom Pérignon 2013', desc: 'Vintage champagne, bottle', price: 890000, icon: Grape },
      { id: 'vr-5', name: 'Beluga Gold Line', desc: 'Russian vodka, bottle service', price: 465000, icon: Beer },
      { id: 'vr-6', name: 'Lounge Reserve Platter', desc: 'Cheese, charcuterie, oysters', price: 245000, icon: CupSoda },
    ],
  },
];

export const formatTugrug = (n: number) =>
  new Intl.NumberFormat('en-US').format(n) + ' ₮';
