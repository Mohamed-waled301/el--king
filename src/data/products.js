export const categories = [
  { id: "cases", name: "كفرات", nameEn: "Cases" },
  { id: "screen", name: "حماية شاشة", nameEn: "Screen Protectors" },
  { id: "chargers", name: "شواحن وكابلات", nameEn: "Chargers & Cables" },
  { id: "audio", name: "سماعات", nameEn: "Earphones & Audio" },
  { id: "camera", name: "اكسسوارات كاميرا", nameEn: "Camera Accessories" },
  { id: "stands", name: "حاملات", nameEn: "Stands & Holders" },
  { id: "powerbank", name: "باور بانك", nameEn: "Power Banks" }
];

export const samsungModels = [
  { value: "s23ultra", label: "Samsung S23 Ultra" },
  { value: "s23plus", label: "Samsung S23+ Ultra" },
  { value: "s24ultra", label: "Samsung S24 Ultra" },
  { value: "s24plus", label: "Samsung S24+" },
  { value: "s25ultra", label: "Samsung S25 Ultra" },
  { value: "s25edge", label: "Samsung S25 Edge" },
  { value: "s26ultra", label: "Samsung S26 Ultra" }
];

export const iphoneModels = [
  { value: "iphone6", label: "iPhone 6" },
  { value: "iphone6plus", label: "iPhone 6 Plus" },
  { value: "iphone6s", label: "iPhone 6s" },
  { value: "iphone6splus", label: "iPhone 6s Plus" },
  { value: "iphone7", label: "iPhone 7" },
  { value: "iphone7plus", label: "iPhone 7 Plus" },
  { value: "iphone8", label: "iPhone 8" },
  { value: "iphone8plus", label: "iPhone 8 Plus" },
  { value: "iphonex", label: "iPhone X" },
  { value: "iphonexs", label: "iPhone XS" },
  { value: "iphonexsmax", label: "iPhone XS Max" },
  { value: "iphonexr", label: "iPhone XR" },
  { value: "iphone11", label: "iPhone 11" },
  { value: "iphone11pro", label: "iPhone 11 Pro" },
  { value: "iphone11promax", label: "iPhone 11 Pro Max" },
  { value: "iphone12", label: "iPhone 12" },
  { value: "iphone12pro", label: "iPhone 12 Pro" },
  { value: "iphone12promax", label: "iPhone 12 Pro Max" },
  { value: "iphone13", label: "iPhone 13" },
  { value: "iphone13pro", label: "iPhone 13 Pro" },
  { value: "iphone13promax", label: "iPhone 13 Pro Max" },
  { value: "iphone14", label: "iPhone 14" },
  { value: "iphone14pro", label: "iPhone 14 Pro" },
  { value: "iphone14promax", label: "iPhone 14 Pro Max" },
  { value: "iphone15", label: "iPhone 15" },
  { value: "iphone15pro", label: "iPhone 15 Pro" },
  { value: "iphone15promax", label: "iPhone 15 Pro Max" },
  { value: "iphone16", label: "iPhone 16" },
  { value: "iphone16pro", label: "iPhone 16 Pro" },
  { value: "iphone16promax", label: "iPhone 16 Pro Max" },
  { value: "iphone17", label: "iPhone 17" },
  { value: "iphone17pro", label: "iPhone 17 Pro" },
  { value: "iphone17promax", label: "iPhone 17 Pro Max" }
];

const unsplashImages = {
  cases: [
    "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop"
  ],
  screen: [
    "https://images.unsplash.com/photo-1553545204-4f7d339aa06a?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=300&h=300&fit=crop"
  ],
  chargers: [
    "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1601944179066-29786cb9d32a?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1623949556303-b0d17d198a7b?w=300&h=300&fit=crop"
  ],
  audio: [
    "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop"
  ],
  camera: [
    "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1617994679330-b0b8c8f1f6d8?w=300&h=300&fit=crop"
  ],
  stands: [
    "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=300&h=300&fit=crop"
  ],
  powerbank: [
    "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?w=300&h=300&fit=crop"
  ]
};

const generateId = () => Math.random().toString(36).substr(2, 9);

const productTemplates = {
  samsung: {
    cases: [
      { n: "Clear Case", a: "كفر شفاف", p: 89, old: 120 },
      { n: "Leather Case (Brown)", a: "كفر جلد بني", p: 149, old: 199 },
      { n: "Military Grade Shockproof", a: "كفر مضاد للصدمات", p: 129, old: 150 },
      { n: "Magnetic Magsafe-style", a: "كفر ماج سيف", p: 169, old: 200 },
      { n: "Wallet Case with Card Slot", a: "كفر محفظة", p: 159, old: 180 },
      { n: "Transparent Matte", a: "كفر شفاف مطفي", p: 79, old: 99 },
      { n: "Carbon Fiber Case", a: "كفر كاربون فايبر", p: 139, old: 160 }
    ],
    screen: [
      { n: "Tempered Glass 9H", a: "اسكرينة زجاج 9H", p: 49, old: 70 },
      { n: "Privacy Screen Protector", a: "اسكرينة خصوصية", p: 69, old: 90 },
      { n: "Curved Full Cover Glass", a: "اسكرينة كيرف كاملة", p: 79, old: 100 },
      { n: "Matte Anti-Glare Film", a: "اسكرينة مطفي", p: 59, old: 80 },
      { n: "UV Liquid Glass", a: "اسكرينة UV", p: 89, old: 120 }
    ],
    chargers: [
      { n: "45W Fast Charger (USB-C)", a: "شاحن سريع 45 وات", p: 199, old: 250 },
      { n: "USB-C to USB-C Cable 1m", a: "كابل 1 متر", p: 59, old: 80 },
      { n: "USB-C to USB-C Braided 2m", a: "كابل 2 متر قماش", p: 89, old: 120 },
      { n: "Wireless Charging Pad 15W", a: "شاحن لاسلكي 15 وات", p: 249, old: 300 },
      { n: "Car Charger Dual USB-C 65W", a: "شاحن سيارة 65 وات", p: 179, old: 220 },
      { n: "Magnetic Wireless Charger", a: "شاحن ماجنتيك", p: 299, old: 350 }
    ],
    audio: [
      { n: "TWS Earbuds Type-C", a: "سماعات TWS", p: 299, old: 350 },
      { n: "Wired Earphones USB-C", a: "سماعات سلكية", p: 129, old: 150 },
      { n: "Sports Bluetooth Earbuds", a: "سماعات رياضية", p: 399, old: 450 },
      { n: "Over-ear Wireless Headphones", a: "سماعة رأس بلوتوث", p: 549, old: 650 },
      { n: "Gaming Headset with Mic", a: "سماعة جيمنج", p: 449, old: 500 }
    ],
    camera: [
      { n: "Camera Lens Protector Ring", a: "حماية عدسة الكاميرا", p: 69, old: 90 },
      { n: "Clip-on Wide Angle Lens", a: "عدسة وايد انجل", p: 149, old: 180 },
      { n: "Macro Lens Clip-on", a: "عدسة ماكرو", p: 129, old: 150 },
      { n: "Phone Tripod Mini", a: "ترايبود صغير", p: 199, old: 250 },
      { n: "Gimbal Stabilizer Mini", a: "مانع اهتزاز (جيمبال)", p: 699, old: 800 }
    ],
    stands: [
      { n: "Desk Stand Adjustable", a: "حامل مكتب متحرك", p: 129, old: 150 },
      { n: "Car Mount Magnetic", a: "حامل سيارة مغناطيسي", p: 149, old: 180 },
      { n: "Ring Stand / Pop Socket", a: "بوب سوكيت / خاتم", p: 49, old: 60 },
      { n: "Bike Mount", a: "حامل دراجة", p: 99, old: 120 }
    ],
    powerbank: [
      { n: "10,000 mAh 22.5W", a: "باور بانك 10,000", p: 349, old: 400 },
      { n: "20,000 mAh 65W PD", a: "باور بانك 20,000", p: 549, old: 650 },
      { n: "Magnetic 5,000 mAh", a: "باور بانك لاسلكي 5,000", p: 399, old: 450 }
    ]
  },
  iphone: {
    cases: [
      { n: "MagSafe Compatible Clear Case", a: "كفر شفاف ماج سيف", p: 99, old: 130 },
      { n: "MagSafe Leather Case", a: "كفر جلد ماج سيف", p: 169, old: 220 },
      { n: "MagSafe Wallet Case", a: "كفر محفظة ماج سيف", p: 179, old: 250 },
      { n: "Silicone Case (Apple-style)", a: "كفر سيليكون", p: 139, old: 170 },
      { n: "Privacy Case (Frosted)", a: "كفر مطفي للخصوصية", p: 119, old: 150 }
    ],
    screen: [
      { n: "Tempered Glass 9H (with tray)", a: "اسكرينة مع قالب تركيب", p: 59, old: 80 },
      { n: "Privacy Tempered Glass", a: "اسكرينة خصوصية", p: 79, old: 100 },
      { n: "Ceramic Screen Protector", a: "اسكرينة سيراميك", p: 89, old: 120 },
      { n: "Anti-Blue Light Glass", a: "اسكرينة ضد الأشعة الزرقاء", p: 69, old: 90 }
    ],
    chargers: [
      { n: "20W USB-C Power Adapter", a: "شاحن 20 وات اصلي", p: 149, old: 190 },
      { n: "MagSafe Charger 15W", a: "شاحن ماج سيف 15 وات", p: 249, old: 300 },
      { n: "Lightning to USB-C Cable", a: "كابل لايتنينج", p: 59, old: 80 },
      { n: "USB-C to USB-C Cable", a: "كابل تايب سي لايفون 15/16/17", p: 59, old: 80 },
      { n: "3-in-1 MagSafe Charging Stand", a: "منصة شحن 3 في 1", p: 449, old: 550 }
    ],
    audio: [
      { n: "TWS Earbuds", a: "سماعات ايربودز", p: 299, old: 350 },
      { n: "Wired Earphones Lightning", a: "سماعات سلكية لايتنينج", p: 129, old: 150 },
      { n: "Sports Bluetooth Earbuds", a: "سماعات رياضية", p: 399, old: 450 },
      { n: "Over-ear Wireless Headphones", a: "سماعة رأس بلوتوث", p: 549, old: 650 },
      { n: "Gaming Headset with Mic", a: "سماعة جيمنج", p: 449, old: 500 }
    ],
    camera: [
      { n: "Camera Lens Protector Ring", a: "حماية عدسة الكاميرا", p: 69, old: 90 },
      { n: "Clip-on Wide Angle Lens", a: "عدسة وايد انجل", p: 149, old: 180 },
      { n: "Macro Lens Clip-on", a: "عدسة ماكرو", p: 129, old: 150 },
      { n: "Phone Tripod Mini", a: "ترايبود صغير", p: 199, old: 250 },
      { n: "Gimbal Stabilizer Mini", a: "مانع اهتزاز (جيمبال)", p: 699, old: 800 }
    ],
    stands: [
      { n: "Desk Stand Adjustable", a: "حامل مكتب متحرك", p: 129, old: 150 },
      { n: "Car Mount Magnetic", a: "حامل سيارة مغناطيسي", p: 149, old: 180 },
      { n: "Ring Stand / Pop Socket", a: "بوب سوكيت / خاتم", p: 49, old: 60 },
      { n: "Bike Mount", a: "حامل دراجة", p: 99, old: 120 }
    ],
    powerbank: [
      { n: "10,000 mAh 22.5W", a: "باور بانك 10,000", p: 349, old: 400 },
      { n: "20,000 mAh 65W PD", a: "باور بانك 20,000", p: 549, old: 650 },
      { n: "Magnetic 5,000 mAh", a: "باور بانك لاسلكي 5,000", p: 399, old: 450 }
    ]
  }
};

let allProducts = [];

['samsung', 'iphone'].forEach(brand => {
  const models = brand === 'samsung' ? samsungModels : iphoneModels;
  
  Object.keys(productTemplates[brand]).forEach(category => {
    productTemplates[brand][category].forEach((item, index) => {
      // Rotate images
      const imgPool = unsplashImages[category] || unsplashImages['cases'];
      const image = imgPool[index % imgPool.length];

      const product = {
        id: generateId(),
        name: item.n,
        nameAr: item.a,
        price: item.p,
        originalPrice: item.old,
        discount: Math.round(((item.old - item.p) / item.old) * 100),
        category: category,
        models: models.map(m => m.value), // All models for simplicity
        brand: brand,
        rating: parseFloat((Math.random() * 1 + 4).toFixed(1)), // 4.0 to 5.0
        reviewCount: Math.floor(Math.random() * 200) + 10,
        inStock: true,
        isNew: index === 0 || Math.random() > 0.8,
        isBestseller: index === 1 || Math.random() > 0.8,
        image: image,
        description: `أفضل جودة لـ ${item.a}، مصمم خصيصاً لأجهزة ${brand === 'samsung' ? 'سامسونج' : 'ايفون'} ليوفر لك حماية وأداء مثالي.`
      };
      allProducts.push(product);
    });
  });
});

export const products = allProducts;
