"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Moon, SunMedium } from "lucide-react";

// ============================================
// TYPES
// ============================================

interface PizzaPrice {
  personal: number;
  large: number;
  gf: number;
}

interface SaladPrice {
  entree: number;
  starter: number;
}

interface MenuItem {
  name: string;
  price: number | PizzaPrice | SaladPrice;
  description: string;
  featured?: boolean;
  spicy?: boolean;
  veg?: boolean;
  addon?: string;
  sauces?: string[];
}

interface MenuData {
  appetizers: MenuItem[];
  sides: MenuItem[];
  burgers: MenuItem[];
  sandwiches: MenuItem[];
  entrees: MenuItem[];
  pizzas: MenuItem[];
  salads: MenuItem[];
  desserts: MenuItem[];
  beverages: MenuItem[];
}

// Type guards
function isPizzaPrice(
  price: number | PizzaPrice | SaladPrice,
): price is PizzaPrice {
  return typeof price === "object" && "personal" in price;
}

function isSaladPrice(
  price: number | PizzaPrice | SaladPrice,
): price is SaladPrice {
  return typeof price === "object" && "entree" in price;
}

// ============================================
// MENU DATA
// ============================================

const menuData: MenuData = {
  appetizers: [
    {
      name: "XLanes Appetizer Platter",
      price: 40,
      description:
        "Assorted platter of chicken strips, French fries, buffalo wings, nachos with cheese sauce, pico de gallo & jalapeños, mozzarella sticks and onion rings.",
      featured: true,
    },
    {
      name: "XLanes Nachos",
      price: 15,
      description:
        "A mountain of freshly fried corn tortilla chips topped with pico de gallo, jalapeños, guacamole, XLanes signature cheese sauce, and sour cream drizzle.",
      addon: "Add: Chicken $3 | Beef $4",
    },
    {
      name: "Philly Cheesesteak Quesadillas",
      price: 16,
      description:
        "Grilled in a flour tortilla with thinly sliced tender beef strips with sautéed mushrooms, onions, and green bell peppers topped with melted provolone, mayo, and a hint of Worcestershire. Served with pico de gallo, green salsa, sour cream.",
    },
    {
      name: "Charred Chicken Quesadillas",
      price: 15,
      description:
        "Tender pieces of chicken smothered in mozzarella and cheddar cheese. Served with pico de gallo, green salsa, sour cream.",
    },
    {
      name: "XLanes Chicken Wings",
      price: 14,
      description:
        "6 pieces of crispy chicken wings served with your choice of bleu cheese or creamy ranch dipping sauce.",
      sauces: [
        "Nude",
        "Sesame",
        "Honey BBQ",
        "BBQ",
        "Buffalo",
        "Asian Chili",
        "Spicy",
        "Cry Baby",
        "Mango Habanero",
        "Garlic & Parmesan",
      ],
    },
    {
      name: "Boneless Wings",
      price: 14,
      description:
        "10 pieces of boneless chicken wings served with blue cheese or ranch.",
      sauces: [
        "Nude",
        "Sesame",
        "Honey BBQ",
        "BBQ",
        "Buffalo",
        "Asian Chili",
        "Spicy",
        "Cry Baby",
        "Mango Habanero",
        "Garlic & Parmesan",
      ],
    },
    {
      name: "Spinach & Artichoke Dip",
      price: 16,
      description:
        "A creamy, warm appetizer featuring a blend of spinach, artichoke hearts, and various cheeses - served with crispy tortilla chips.",
    },
    {
      name: "Fried Calamari",
      price: 16,
      description:
        "Buttermilk-soaked calamari, a mix of rings and tentacles, fried until crispy and tender. Served with marinara and cocktail sauce.",
    },
    {
      name: "Southwest Eggrolls",
      price: 14,
      description:
        "Grilled white meat chicken, corn, black beans, cilantro, and Monterey Jack/cheddar cheese served with chipotle mayo.",
    },
    {
      name: "Bruschetta Tuscany",
      price: 15,
      description:
        "Roma tomatoes, garlic, fresh basil, freshly grated parmigiana, tossed in extra virgin olive oil with crostini.",
    },
    {
      name: "Mozzarella Sticks",
      price: 14,
      description:
        "100% Wisconsin mozzarella cheese lightly coated in seasoned panko, served with homemade marinara.",
    },
    {
      name: "Buffalo Cauliflower Bites",
      price: 14,
      description: "Breaded cauliflower florets tossed in buffalo sauce.",
      veg: true,
    },
    {
      name: "Pretzel Bites",
      price: 14,
      description:
        "Warm pretzel bites, sprinkled with salt. Served with house cheese sauce and Dijon mustard.",
    },
    {
      name: "3 Mini Cheeseburger Sliders",
      price: 17,
      description:
        "Three mini beef patties, American cheese, caramelized onions, pickles and our house spread on a warm Hawaiian roll.",
    },
  ],
  sides: [
    {
      name: "Garlic & Parmesan Fries",
      price: 13,
      description:
        "Our house fries topped with freshly grated parmesan cheese, garlic and Italian parsley.",
    },
    {
      name: "Sweet Potato Fries",
      price: 13,
      description:
        "Crispy sweet potato fries seasoned with a combination of sugar and cinnamon with ranch.",
    },
    {
      name: "Salt and Pepper Fries",
      price: 11,
      description:
        "Crispy fries tossed in salt and fresh ground pepper, served with ranch or ketchup.",
    },
    {
      name: "Tater Tot Dippers",
      price: 12,
      description:
        "A mound of tasty potato tots, seasoned with salt and pepper, served with ranch or ketchup.",
    },
    {
      name: "Loaded Pepperoni Tots",
      price: 14,
      description:
        "A mound of everyone's favorite tater tots topped with XLanes' cheese sauce and crispy pepperoni.",
    },
    {
      name: "Onion Rings",
      price: 13,
      description:
        "Beer-battered onion rings served with creamy ranch and BBQ sauce.",
    },
    {
      name: "Chips and Guacamole",
      price: 9,
      description:
        "Freshly fried tortilla chips served with guacamole and salsa molcajete roja.",
    },
  ],
  burgers: [
    {
      name: "The Boss Burger",
      price: 19,
      description:
        "Two juicy patties, a double layer of American cheese, garnished with Romaine lettuce, red onions, tomatoes, smoked bacon and topped with onion rings.",
      featured: true,
    },
    {
      name: "Classic Cheeseburger",
      price: 17,
      description:
        "½ pound Angus beef patty with American cheese atop fresh romaine lettuce, red onions, tomatoes, and sliced pickles on our buttery brioche bun.",
    },
    {
      name: "Classic Hamburger",
      price: 16,
      description:
        "½ pound Angus beef patty cooked to order with romaine lettuce, tomatoes, red onions, and sliced pickles on our buttery brioche bun.",
    },
    {
      name: "All About That Bacon Cheeseburger",
      price: 18,
      description:
        "A mound of applewood bacon topped on our classic cheeseburger with lettuce, tomatoes, caramelized onions, American cheese, and sliced pickles.",
    },
    {
      name: "Bacon, Swiss & Mushrooms",
      price: 18,
      description:
        "A generous mound of sautéed mushrooms and applewood smoked bacon, caramelized onions, with melted Swiss on our juicy ½ pound Angus beef patty.",
    },
    {
      name: "The Beyond Burger",
      price: 18,
      description:
        "World's first plant-based burger with romaine lettuce, red onions, freshly sliced tomatoes, American cheese, and sliced pickles.",
      veg: true,
    },
  ],
  sandwiches: [
    {
      name: "Hot Honey Crispy Chicken Sandwich",
      price: 18,
      description:
        "Hand battered chicken breast fried, then smothered with our spicy hot honey sauce with Asian cole slaw, light mayo, and sliced pickles. Served with fries.",
      spicy: true,
    },
    {
      name: "The Classic Cheesesteak",
      price: 18,
      description:
        "Thin sliced beef, Worcestershire and mayo with sautéed mushrooms, onions and bell peppers, finished with provolone cheese.",
    },
    {
      name: "Grilled Chicken Sandwich",
      price: 16,
      description:
        "Chargrilled marinated chicken breast, sautéed mushrooms, and provolone cheese on fresh lettuce, tomatoes and red onions on a buttery toasted Brioche bun.",
      addon: "Add applewood bacon $3",
    },
  ],
  entrees: [
    {
      name: "Hot Honey Crispy Strips",
      price: 18,
      description:
        "Hand battered and fried perfectly, drizzled with our very own hot honey sauce over a bed of crispy fries and served with Asian cole slaw.",
      spicy: true,
    },
    {
      name: "Chicken Tenders",
      price: 16,
      description:
        "Four crispy chicken tenders served over a bed of seasoned fries.",
    },
    {
      name: "Fish Tacos",
      price: 18,
      description:
        "3 beer battered crispy fish tacos with a cabbage slaw, pico de gallo, fresh cilantro and chipotle mayo with tortilla chips and salsa fresca.",
    },
    {
      name: "Fettuccini Alfredo",
      price: 15,
      description:
        "Classic white cream sauce with an aromatic twist. Tossed in fettuccini pasta with freshly grated parmesan cheese and parsley.",
      addon: "Add chicken $3",
    },
    {
      name: "Bacon Mac & Cheese",
      price: 15,
      description:
        "Our creamy and cheesy mac & cheese topped with crispy bacon and breadcrumbs.",
    },
    {
      name: "Drunken Chipotle Chicken",
      price: 17,
      description:
        "Tender strips of marinated chicken, sautéed julienned peppers, onions and cilantro, smothered in a creamy adobo chipotle sauce.",
    },
  ],
  pizzas: [
    {
      name: "The Carnivore",
      price: { personal: 17, large: 29, gf: 18 },
      description:
        "This beastly pie is topped with pepperoni, Italian sausage, bacon crisps, Canadian bacon, meatballs, and charred chicken.",
      featured: true,
    },
    {
      name: "The Total Package",
      price: { personal: 17, large: 29, gf: 18 },
      description:
        "Pepperoni, Italian sausage, Canadian bacon, red onions, green peppers, mushrooms, and black olives perfectly packaged with fresh mozzarella cheese.",
    },
    {
      name: "Wicked Buffalo Chicken",
      price: { personal: 17, large: 29, gf: 18 },
      description:
        "Chunks of fried chicken tenders, sharp cheddar cheese, fresh mozzarella, tangy buffalo sauce and ranch drizzle.",
    },
    {
      name: "The M.O.A.P.",
      price: { personal: 16, large: 28, gf: 17 },
      description:
        "This is the mother of all pepperoni pizzas, you're welcome!",
    },
    {
      name: "The Classic Margherita",
      price: { personal: 15, large: 27, gf: 16 },
      description:
        "A true classic Italian pie thinly layered with fresh garlic, basil, herb roasted cherry tomatoes, mozzarella, grated parmesan cheese, alongside the perfect blend of extra virgin olive oil and herb seasoning.",
    },
    {
      name: "Philly Cheesesteak",
      price: { personal: 16, large: 28, gf: 17 },
      description:
        "Thinly sliced tender beef strips with sautéed mushrooms, onion, and bell peppers smothered in provolone cheese.",
    },
    {
      name: "Southwest BBQ Chicken",
      price: { personal: 16, large: 28, gf: 17 },
      description:
        "Charred chicken, bacon crisps, Canadian bacon, red onions, and mozzarella cheese topped with our homemade BBQ sauce and fresh cilantro.",
    },
    {
      name: "Hawaiian Aloha",
      price: { personal: 16, large: 28, gf: 17 },
      description:
        "Canadian bacon, bacon crisps, pineapple chunks, and mozzarella cheese.",
    },
    {
      name: "4 Cheese Sensation",
      price: { personal: 16, large: 28, gf: 17 },
      description:
        "A rich blend of mozzarella, cheddar, parmesan, and provolone cheese with herb seasoning.",
      veg: true,
    },
    {
      name: "Spinach & Artichoke",
      price: { personal: 16, large: 28, gf: 17 },
      description:
        "Everything you love from our popular appetizer is now on our pizza with freshly blanched baby spinach and seasoned artichokes with a blend of 4 cheeses.",
      veg: true,
    },
    {
      name: "The Veggielicious",
      price: { personal: 16, large: 28, gf: 16 },
      description:
        "Fresh mushrooms, red onions, green peppers, black olives, herb roasted cherry tomatoes, fresh spinach, artichokes, EVOO, parmesan and salt/pepper.",
      veg: true,
    },
    {
      name: "The Cry Baby",
      price: { personal: 16, large: 28, gf: 17 },
      description:
        "A flavorful base of red onions, Italian sausages, mushrooms, crisp bacon, Canadian bacon, jalapeños, red pepper flakes, and our in house prepared ghost chili sauce. TRY IF YOU DARE!",
      spicy: true,
    },
  ],
  salads: [
    {
      name: "Mandarin Chicken Salad",
      price: { entree: 15, starter: 11 },
      description:
        "A medley of mixed greens tossed in our homemade sesame dressing, Mandarin oranges, wonton chips, red onions, candied walnuts, herb roasted tomatoes, cucumbers, toasted sesame seeds and grilled chicken.",
    },
    {
      name: "Southwest Chopped BBQ Chicken Salad",
      price: { entree: 15, starter: 11 },
      description:
        "Chopped romaine lettuce, crisp bacon, roasted corn, black beans, herb roasted cherry tomatoes, red onions, cucumbers, cilantro, and a blend of both Cheddar and mozzarella cheese tossed together with BBQ/ranch dressing.",
    },
    {
      name: "Caprese Salad",
      price: { entree: 15, starter: 11 },
      description:
        "A bed of mixed greens tossed in our Italian dressing and layered with fresh mozzarella/tomato slices with fresh basil, freshly cracked black pepper, kosher salt and balsamic drizzle.",
      veg: true,
    },
    {
      name: "XLanes House Salad",
      price: { entree: 14, starter: 10 },
      description:
        "Mixed greens, herb roasted cherry tomatoes, red onions, crisp cucumbers, baby spinach and freshly shaved parmesan cheese tossed in our house vinaigrette.",
      veg: true,
    },
    {
      name: "Classic Caesar Salad",
      price: { entree: 14, starter: 10 },
      description:
        "Crisp Romaine hearts tossed in our homemade Caesar dressing with garlic infused croutons and shaved parmesan cheese.",
    },
  ],
  desserts: [
    {
      name: "XLanes' Cookie Pie",
      price: 10,
      description:
        "A huge warm chocolate chip cookie topped with vanilla ice cream and whipped cream.",
      featured: true,
    },
    {
      name: "Mini Churros",
      price: 10,
      description:
        "Churros tossed in cinnamon and sugar. Caramel dipping sauce.",
    },
  ],
  beverages: [
    {
      name: "Soft Drinks",
      price: 6,
      description:
        "Coke, Diet Coke, Sprite, Ginger Ale, Fanta Orange, Iced Tea, Raspberry Iced Tea, Lemonade",
    },
    {
      name: "Premium",
      price: 6,
      description: "Acqua Panna, Pellegrino, Red Bull",
    },
    {
      name: "Juices",
      price: 4,
      description: "Orange Juice, Pineapple Juice, Cranberry Juice",
    },
  ],
};

export type CategoryKey = keyof MenuData;

export const categories: { id: CategoryKey; label: string }[] = [
  { id: "appetizers", label: "Appetizers" },
  { id: "sides", label: "Sides" },
  { id: "burgers", label: "Burgers" },
  { id: "sandwiches", label: "Sandwiches" },
  { id: "entrees", label: "Entrées" },
  { id: "pizzas", label: "Pizzas" },
  { id: "salads", label: "Salads" },
  { id: "desserts", label: "Desserts" },
  { id: "beverages", label: "Drinks" },
];

// ============================================
// MENU COMPONENT
// ============================================

export default function XLanesMenu() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeCategory, setActiveCategory] =
    useState<CategoryKey>("appetizers");
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowHeader(currentScrollY < lastScrollY || currentScrollY < 50);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const renderPrice = (item: MenuItem) => {
    const { price } = item;

    if (typeof price === "number") {
      return (
        <span
          className={`font-bold text-lg shrink-0 ${darkMode ? "text-rose-500" : "text-rose-600"}`}
        >
          ${price}
        </span>
      );
    }

    return null;
  };

  const renderComplexPrice = (item: MenuItem) => {
    const { price } = item;

    if (typeof price === "number") return null;

    return (
      <div
        className={`mt-3 pt-3 border-t ${darkMode ? "border-slate-700/50" : "border-slate-200"}`}
      >
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {isPizzaPrice(price) && (
            <>
              <span
                className={`text-sm ${darkMode ? "text-slate-300" : "text-slate-700"}`}
              >
                <span
                  className={`font-semibold ${darkMode ? "text-rose-400" : "text-pink-600"}`}
                >
                  10&quot;
                </span>{" "}
                ${price.personal}
              </span>
              <span
                className={`text-sm ${darkMode ? "text-slate-300" : "text-slate-700"}`}
              >
                <span
                  className={`font-semibold ${darkMode ? "text-rose-400" : "text-pink-600"}`}
                >
                  16&quot;
                </span>{" "}
                ${price.large}
              </span>
              <span
                className={`text-sm ${darkMode ? "text-emerald-300" : "text-emerald-400"}`}
              >
                <span className="font-medium">Gluten Free 10&quot;</span> $
                {price.gf}
              </span>
            </>
          )}
          {isSaladPrice(price) && (
            <>
              <span
                className={`text-sm ${darkMode ? "text-slate-300" : "text-slate-700"}`}
              >
                <span
                  className={`font-semibold ${darkMode ? "text-rose-400" : "text-rose-600"}`}
                >
                  Entrée
                </span>{" "}
                ${price.entree}
              </span>
              <span
                className={`text-sm ${darkMode ? "text-slate-300" : "text-slate-700"}`}
              >
                <span
                  className={`font-semibold ${darkMode ? "text-rose-400" : "text-rose-600"}`}
                >
                  Starter
                </span>{" "}
                ${price.starter}
              </span>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${darkMode ? "bg-slate-950" : "bg-pink-50"}`}
    >
      <style>{`
        .glow-pink {
          box-shadow: 0 0 40px rgba(139, 92, 246, 0.3), 0 0 80px rgba(139, 92, 246, 0.1);
        }
        
        .gradient-border {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.5), rgba(59, 130, 246, 0.5));
          padding: 1px;
          border-radius: 16px;
        }
        
        .card-inner-dark {
          background: linear-gradient(145deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.9));
          border-radius: 15px;
        }
        
        .card-inner-light {
          background: #f5f5f5;
          border-radius: 15px;
        }
        
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        .bg-mesh-dark {
          background: 
            radial-gradient(ellipse at 20% 0%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 100%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(99, 102, 241, 0.05) 0%, transparent 70%);
        }
        
        .bg-mesh-light {
          background: #fff;
        }
        
        .tag-spicy {
          background: linear-gradient(135deg, #ef4444, #f97316);
        }
        
        .tag-veg {
          background: linear-gradient(135deg, #22c55e, #84cc16);
        }
        
        .tag-featured {
          background: linear-gradient(135deg, #8b5cf6, #6366f1);
        }
        
        .shine {
          position: relative;
          overflow: hidden;
        }
        
        .shine::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            to right,
            transparent 0%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 100%
          );
          transform: rotate(30deg);
          animation: shine 4s infinite;
        }
        
        @keyframes shine {
          0% { transform: translateX(-100%) rotate(30deg); }
          100% { transform: translateX(100%) rotate(30deg); }
        }
      `}</style>

      {/* Background mesh */}
      <div
        className={`fixed inset-0 ${darkMode ? "bg-mesh-dark" : "bg-mesh-light"} pointer-events-none`}
      />

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div
          className={`backdrop-blur-xl ${
            darkMode
              ? "bg-slate-950/80 border-b border-pink-500/20"
              : "bg-white/80 border-b border-pink-200"
          }`}
        >
          <div className="max-w-lg mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src="/neon-logo-sm.png"
                  alt="xlanes-logo"
                  width={50}
                  height={50}
                />
                <div>
                  <h1
                    className={`font-display text-xl font-bold tracking-tight ${
                      darkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    XLanes
                  </h1>
                  <p
                    className={`text-xs ${darkMode ? "text-rose-500" : "text-rose-600"}`}
                  >
                    Bowl · Dine · Play
                  </p>
                </div>
              </div>

              {/* Dark/Light Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                  darkMode
                    ? "bg-violet-600/30 border border-violet-500/50"
                    : "bg-gray-200 border border-gray-300"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-6 h-6 rounded-full transition-all duration-300 flex items-center justify-center text-sm ${
                    darkMode
                      ? "left-0.5 bg-slate-900 text-violet-400"
                      : "left-7 bg-white text-yellow-500 shadow-md"
                  }`}
                >
                  {darkMode ? (
                    <Moon className="p-1" />
                  ) : (
                    <SunMedium className="p-1" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Category Navigation */}
      <nav
        className={`fixed top-[74px] left-0 right-0 z-40 backdrop-blur-xl transition-all duration-300 ${
          showHeader ? "translate-y-0" : "-translate-y-[74px]"
        } ${darkMode ? "bg-slate-950/60" : "bg-gray-200"}`}
      >
        <div className="max-w-lg mx-auto">
          <div className="flex overflow-x-auto scrollbar-hide py-3 px-2 gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl whitespace-nowrap transition-all duration-300 text-sm font-medium ${
                  activeCategory === cat.id
                    ? darkMode
                      ? "bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg shadow-pink-500/30"
                      : "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-400/40"
                    : darkMode
                      ? "bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-slate-300"
                      : "bg-white/60 text-slate-600 hover:bg-white hover:text-slate-800"
                }`}
              >
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-36 pb-8 px-4 max-w-lg mx-auto relative z-10">
        {/* Category Title */}
        <div className="mb-6">
          <h2
            className={`font-display text-3xl font-bold ${
              darkMode ? "text-white" : "text-slate-900"
            }`}
          >
            {categories.find((c) => c.id === activeCategory)?.label}
          </h2>
          <div
            className={`h-1 w-20 mt-2 rounded-full ${
              darkMode
                ? "bg-gradient-to-r from-pink-500 to-rose-500"
                : "bg-gradient-to-r from-pink-400 to-rose-400"
            }`}
          />
          {(activeCategory === "burgers" ||
            activeCategory === "sandwiches") && (
            <p
              className={`mt-3 text-sm text-center ${darkMode ? "text-amber-500" : "text-amber-600"}`}
            >
              * Served with Fries or House Salad
            </p>
          )}
        </div>

        {/* Build Your Own Pizza Section */}
        {activeCategory === "pizzas" && (
          <div
            className={`mb-6 p-4 rounded-2xl ${
              darkMode
                ? "bg-amber-400/20 border border-amber-300"
                : "bg-rose-300/20 border border-rose-300"
            }`}
          >
            <h3
              className={`font-display text-xl font-bold mb-2 ${
                darkMode ? "text-amber-300" : "text-rose-700"
              }`}
            >
              Build Your Own
            </h3>
            <div
              className={`text-sm ${darkMode ? "text-slate-300" : "text-gray-700"}`}
            >
              <p className="mb-2">
                <span className="font-semibold">10&quot; Cheese</span> $13 ·{" "}
                <span className="font-semibold">16&quot; Cheese</span> $19
              </p>
              <p
                className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}
              >
                Toppings: 10&quot; $1.50 · 16&quot; $2.75 — Black Olives,
                Pineapple, Red Onions, Ham, Artichokes, Pepperoni, Sausage,
                Meatballs, Bacon, Chicken, Mushrooms, Spinach, Cherry Tomatoes,
                Jalapeños
              </p>
            </div>
          </div>
        )}

        {/* Menu Items */}
        <div className="space-y-4">
          {menuData[activeCategory]?.map((item, index) => (
            <div
              key={index}
              className={`gradient-border ${item.featured ? "glow-pink" : ""}`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div
                className={
                  darkMode ? "card-inner-dark p-4" : "card-inner-light p-4"
                }
              >
                {/* Header with name, tags, and simple price */}
                <div className="flex justify-between items-start gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3
                      className={`font-semibold text-base ${darkMode ? "text-white" : "text-slate-900"}`}
                    >
                      {item.name}
                    </h3>
                    {/* Tags */}
                    {item.featured && (
                      <span className="tag-featured text-white text-xs px-2 py-0.5 rounded-full">
                        ⭐ Featured
                      </span>
                    )}
                    {item.spicy && (
                      <span className="tag-spicy text-white text-xs px-2 py-0.5 rounded-full">
                        🌶️ Spicy
                      </span>
                    )}
                    {item.veg && (
                      <span className="tag-veg text-white text-xs px-2 py-0.5 rounded-full">
                        🌱 Veg
                      </span>
                    )}
                  </div>
                  {renderPrice(item)}
                </div>

                {/* Description */}
                <p
                  className={`text-sm leading-relaxed mt-2 ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                >
                  {item.description}
                </p>

                {/* Complex pricing for pizzas/salads */}
                {renderComplexPrice(item)}

                {/* Sauces for wings */}
                {item.sauces && (
                  <div
                    className={`mt-3 pt-3 border-t ${darkMode ? "border-slate-700/50" : "border-slate-200"}`}
                  >
                    <p
                      className={`text-xs ${darkMode ? "text-slate-500" : "text-slate-500"}`}
                    >
                      <span
                        className={`font-medium ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                      >
                        Sauces:
                      </span>{" "}
                      {item.sauces.join(" · ")}
                    </p>
                  </div>
                )}

                {/* Add-ons */}
                {item.addon && (
                  <p
                    className={`mt-2 text-xs italic ${darkMode ? "text-amber-400/80" : "text-amber-600"}`}
                  >
                    {item.addon}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div
          className={`mt-8 text-center text-xs ${
            darkMode ? "text-slate-500" : "text-slate-400"
          }`}
        >
          <p className="mb-1">
            * 20% Service charge added to parties of 4+ & open tabs
          </p>
          <p
            className={`font-medium ${darkMode ? "text-rose-500" : "text-rose-600"}`}
          >
            Burgers & Sandwiches served with Fries or House Salad
          </p>
        </div>
      </main>

      {/* Floating decoration */}
      <div
        className={`fixed bottom-4 right-4 w-24 h-24 rounded-full blur-3xl pointer-events-none ${
          darkMode ? "bg-pink-600/20" : "bg-pink-400/20"
        }`}
      />
    </div>
  );
}
