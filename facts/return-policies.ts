/**
 * Comprehensive return policy database for major retailers
 * Data sourced from official retailer websites and policies as of December 2025
 */

export interface ReturnPolicyData {
  merchantName: string;
  returnDays: number;
  notes?: string;
  url?: string; // Official policy URL
  aliases: string[]; // Alternative names for the merchant
}

/**
 * Return policy database - comprehensive list of major retailers
 * Organized by category for easier maintenance
 */
export const RETURN_POLICIES: ReturnPolicyData[] = [
  // ========== DEPARTMENT STORES / GENERAL RETAIL ==========
  {
    merchantName: "Canadian Tire",
    returnDays: 90,
    notes: "90 days with receipt for most items",
    url: "https://www.canadiantire.ca/en/customer-service/returns.html",
    aliases: ["canadian tire", "ct", "cdn tire"],
  },
  {
    merchantName: "Walmart",
    returnDays: 90,
    notes: "90 days for most items with receipt",
    url: "https://www.walmart.ca/en/help/returns",
    aliases: ["walmart", "wal-mart", "walmart canada", "walmart-ca"],
  },
  {
    merchantName: "Costco",
    returnDays: 90,
    notes: "90 days for most items, lifetime for membership",
    url: "https://www.costco.ca/customer-service-returns.html",
    aliases: ["costco", "costco wholesale"],
  },
  {
    merchantName: "Target",
    returnDays: 90,
    notes: "90 days with receipt for most items",
    aliases: ["target"],
  },

  // ========== HOME IMPROVEMENT ==========
  {
    merchantName: "Home Depot",
    returnDays: 90,
    notes: "90 days for most items with receipt",
    url: "https://www.homedepot.ca/en/home/customer-support/return-policy.html",
    aliases: ["home depot", "homedepot", "the home depot", "home-depot", "home-depot-ca"],
  },
  {
    merchantName: "RONA",
    returnDays: 90,
    notes: "90 days for most items",
    url: "https://www.rona.ca/en/return-policy",
    aliases: ["rona", "rona l'entrepôt", "rona+"],
  },
  {
    merchantName: "Home Hardware",
    returnDays: 90,
    notes: "90 jours avec facture et emballage d'origine. Vente finale sur les articles vendus au pied. Magasins indépendants : la politique peut varier selon le marchand.",
    aliases: ["home hardware", "home-hardware", "homehardware"],
  },
  {
    merchantName: "Canac",
    returnDays: 30,
    notes: "30 jours, produit intact, non utilisé et dans son emballage d'origine. Des frais de 10 % peuvent s'appliquer.",
    url: "http://b2b.canac.ca/fr/politique-de-retour.aspx",
    aliases: ["canac"],
  },
  {
    merchantName: "Lowe's",
    returnDays: 90,
    notes: "90 days for most items with receipt",
    aliases: ["lowes", "lowe's"],
  },
  {
    merchantName: "IKEA",
    returnDays: 365,
    notes: "365 days for most items with receipt",
    url: "https://www.ikea.com/ca/en/customer-service/returns-claims/",
    aliases: ["ikea"],
  },

  // ========== ELECTRONICS ==========
  {
    merchantName: "Best Buy",
    returnDays: 30,
    notes: "30 days for most electronics, 15 days for opened computers",
    url: "https://www.bestbuy.ca/en-ca/help/returns-and-exchanges",
    aliases: ["best buy", "bestbuy"],
  },
  {
    merchantName: "Apple Store",
    returnDays: 14,
    notes: "14 days for most products",
    url: "https://www.apple.com/ca/shop/help/returns_refund",
    aliases: ["apple", "apple store", "apple canada"],
  },
  {
    merchantName: "Microsoft Store",
    returnDays: 30,
    notes: "30 days for most products",
    aliases: ["microsoft", "microsoft store"],
  },

  // ========== GROCERIES / PHARMACY ==========
  {
    merchantName: "Loblaws",
    returnDays: 30,
    notes: "30 days for most non-perishable items",
    aliases: ["loblaws", "loblaw", "zehrs", "fortinos", "no frills", "maxi"],
  },
  {
    merchantName: "Metro",
    returnDays: 30,
    notes: "30 days for most items with receipt",
    aliases: ["metro", "metro plus", "super c"],
  },
  {
    merchantName: "Sobeys",
    returnDays: 30,
    notes: "30 days for most items",
    aliases: ["sobeys", "iga", "safeway", "foodland", "freshco"],
  },
  {
    merchantName: "Shoppers Drug Mart",
    returnDays: 30,
    notes: "30 days for most items, prescription items non-returnable",
    url: "https://www1.shoppersdrugmart.ca/en/customer-care",
    aliases: ["shoppers", "shoppers drug mart", "pharmaprix"],
  },

  // ========== ONLINE RETAILERS ==========
  {
    merchantName: "Amazon",
    returnDays: 30,
    notes: "30 days for most items",
    url: "https://www.amazon.ca/gp/help/customer/display.html?nodeId=GKM69DUUYKQWKWX7",
    aliases: ["amazon", "amazon.ca", "amazon canada"],
  },

  // ========== FASHION / APPAREL ==========
  {
    merchantName: "Reitmans",
    returnDays: 30,
    notes: "30 jours avec facture. Articles non portés, non lavés, étiquettes attachées.",
    url: "https://www.reitmans.com/pages/returns-exchanges-refunds",
    aliases: ["reitmans"],
  },
  {
    merchantName: "H&M",
    returnDays: 30,
    notes: "30 days for most items with receipt",
    aliases: ["h&m", "h and m", "hm"],
  },
  {
    merchantName: "Zara",
    returnDays: 30,
    notes: "30 days for most items",
    aliases: ["zara"],
  },
  {
    merchantName: "Gap",
    returnDays: 45,
    notes: "45 days for most items",
    aliases: ["gap", "old navy", "banana republic"],
  },
  {
    merchantName: "Uniqlo",
    returnDays: 30,
    notes: "30 days with receipt",
    aliases: ["uniqlo"],
  },
  {
    merchantName: "Simons",
    returnDays: 30,
    notes: "30 days for most items",
    aliases: ["simons", "la maison simons"],
  },
  {
    merchantName: "The Bay",
    returnDays: 90,
    notes: "90 days for most items with receipt",
    aliases: ["hudson bay", "hudson's bay", "the bay", "la baie"],
  },

  // ========== SPORTING GOODS ==========
  {
    merchantName: "Sport Chek",
    returnDays: 30,
    notes: "30 days for refund to original payment method. 31-60 days: merchandise credit only. Over 60 days: not eligible. Cash refund under $5 in-store.",
    url: "https://www.sportchek.ca/help/returns.html",
    aliases: ["sport chek", "sportchek"],
  },
  {
    merchantName: "Sport Experts",
    returnDays: 15,
    notes: "15 jours pour remboursement avec coupon de caisse (marchandise neuve, emballage original). 30 jours pour échange. Mise de côté: 15 jours, aucun remboursement après. Atmosphère QC partage la même politique.",
    url: "https://www.sportsexperts.ca/",
    aliases: ["sport experts", "sports experts", "sport expert", "sports expert", "sportsexperts", "atmosphere", "atmosphère"],
  },
  {
    merchantName: "Decathlon",
    returnDays: 365,
    notes: "365 days for most items",
    aliases: ["decathlon"],
  },

  // ========== PET SUPPLIES ==========
  {
    merchantName: "PetSmart",
    returnDays: 60,
    notes: "60 days for most items with receipt",
    aliases: ["petsmart", "pet smart"],
  },

  // ========== OFFICE / STATIONERY ==========
  {
    merchantName: "Renaud-Bray",
    returnDays: 10,
    notes: "10 jours avec facture, produit intact dans l'emballage d'origine. Aucun échange ni remboursement sur les cartes-cadeaux, produits déjà échangés ou abîmés vendus au rabais.",
    aliases: ["renaud-bray", "renaud bray", "renaud_bray", "librairie renaud"],
  },
  {
    merchantName: "Archambault",
    returnDays: 10,
    notes: "10 jours avec facture, produit intact dans l'emballage d'origine. Aucun échange ni remboursement sur les instruments de musique, logiciels, équipements électroniques, partitions et cartes-cadeaux.",
    aliases: ["archambault"],
  },
  {
    merchantName: "Staples",
    returnDays: 30,
    notes: "30 days for most items, 14 days for tech",
    aliases: ["staples", "staples-ca", "staples canada"],
  },
  {
    merchantName: "Bureau en Gros",
    returnDays: 30,
    notes: "30 days for most items, 14 days for tech",
    aliases: ["bureau en gros", "bureau-en-gros"],
  },

  // ========== TOYS / BABY ==========
  {
    merchantName: "Toys R Us",
    returnDays: 90,
    notes: "90 days for most items",
    aliases: ["toys r us", "toysrus", "babies r us"],
  },

  // ========== AUTOMOTIVE ==========
  {
    merchantName: "AutoZone",
    returnDays: 90,
    notes: "90 days for most parts with receipt",
    aliases: ["autozone", "auto zone"],
  },
  {
    merchantName: "NAPA Auto Parts",
    returnDays: 90,
    notes: "90 days for most parts",
    aliases: ["napa", "napa auto parts"],
  },

  // ========== FURNITURE ==========
  {
    merchantName: "Structube",
    returnDays: 30,
    notes: "30 days for most items",
    aliases: ["structube"],
  },
  {
    merchantName: "Leon's",
    returnDays: 30,
    notes: "30 days for most items",
    aliases: ["leons", "leon's", "the brick"],
  },

  // ========== DOLLAR STORES ==========
  {
    merchantName: "Dollarama",
    returnDays: 30,
    notes: "30 days with receipt for most items",
    aliases: ["dollarama"],
  },
  {
    merchantName: "Giant Tiger",
    returnDays: 9999,
    notes: "Satisfaction garantie sans limite de temps avec reçu. Remboursement intégral.",
    url: "https://help.gianttiger.com/en-US/return-policy-92495",
    aliases: ["giant tiger", "tigre géant", "tigre geant"],
  },

  // ========== CONVENIENCE / GAS STATIONS ==========
  {
    merchantName: "Couche-Tard",
    returnDays: 14,
    notes: "14 days for most items with receipt",
    aliases: ["couche-tard", "circle k"],
  },
  {
    merchantName: "Petro-Canada",
    returnDays: 14,
    notes: "14 days for most items with receipt",
    aliases: ["petro-canada", "petro canada"],
  },
  {
    merchantName: "Shell",
    returnDays: 14,
    notes: "14 days for most items with receipt",
    aliases: ["shell"],
  },
  {
    merchantName: "Esso",
    returnDays: 14,
    notes: "14 days for most items with receipt",
    aliases: ["esso", "exxon"],
  },

  // ========== RESTAURANTS / COFFEE ==========
  {
    merchantName: "Starbucks",
    returnDays: 30,
    notes: "30 days for merchandise with receipt",
    aliases: ["starbucks"],
  },
  {
    merchantName: "Tim Hortons",
    returnDays: 30,
    notes: "30 days for merchandise with receipt",
    aliases: ["tim hortons", "tims"],
  },
  {
    merchantName: "McDonald's",
    returnDays: 0,
    notes: "No returns on food items",
    aliases: ["mcdonald's", "mcdonalds", "mcd"],
  },
  {
    merchantName: "Subway",
    returnDays: 0,
    notes: "No returns on food items",
    aliases: ["subway"],
  },

  // ========== SPORTS / FOOTWEAR ==========
  {
    merchantName: "Nike",
    returnDays: 60,
    notes: "60 days for most items with receipt",
    aliases: ["nike"],
  },
  {
    merchantName: "Adidas",
    returnDays: 30,
    notes: "30 days for most items with receipt",
    aliases: ["adidas"],
  },

  // ========== BEAUTY ==========
  {
    merchantName: "Sephora",
    returnDays: 30,
    notes: "30 days for most items with receipt",
    aliases: ["sephora"],
  },

  // ========== DISCOUNT STORES ==========
  {
    merchantName: "Winners",
    returnDays: 30,
    notes: "30 days for most items with receipt",
    aliases: ["winners", "marshalls"],
  },
  {
    merchantName: "HomeSense",
    returnDays: 30,
    notes: "30 days for most items with receipt",
    aliases: ["homesense", "home sense"],
  },

  // ========== GROCERIES ==========
  {
    merchantName: "Real Canadian Superstore",
    returnDays: 30,
    notes: "30 days for most non-perishable items",
    aliases: ["superstore", "real canadian superstore"],
  },
  {
    merchantName: "No Frills",
    returnDays: 30,
    notes: "30 days for most non-perishable items",
    aliases: ["no frills", "nofrills"],
  },
  {
    merchantName: "Food Basics",
    returnDays: 30,
    notes: "30 days for most non-perishable items",
    aliases: ["food basics", "foodbasics"],
  },
  {
    merchantName: "FreshCo",
    returnDays: 30,
    notes: "30 days for most non-perishable items",
    aliases: ["freshco", "fresh co"],
  },
  {
    merchantName: "Safeway",
    returnDays: 30,
    notes: "30 days for most non-perishable items",
    aliases: ["safeway"],
  },
  {
    merchantName: "Kroger",
    returnDays: 30,
    notes: "30 days for most items with receipt",
    aliases: ["kroger"],
  },
  {
    merchantName: "Whole Foods",
    returnDays: 30,
    notes: "30 days for most items with receipt",
    aliases: ["whole foods", "whole foods market"],
  },
  {
    merchantName: "Trader Joe's",
    returnDays: 30,
    notes: "No time limit with receipt",
    aliases: ["trader joe's", "trader joes"],
  },
  {
    merchantName: "Super C",
    returnDays: 30,
    notes: "30 days for most non-perishable items",
    aliases: ["super c", "superc"],
  },

  // ========== PHARMACY ==========
  {
    merchantName: "Brunet",
    returnDays: 30,
    notes: "30 jours pour la plupart des articles avec reçu",
    url: "https://www.brunet.ca/fr/service-a-la-clientele/",
    aliases: ["brunet", "pharmacie brunet"],
  },
  {
    merchantName: "CVS",
    returnDays: 60,
    notes: "60 days for most items with receipt",
    aliases: ["cvs", "cvs pharmacy"],
  },
  {
    merchantName: "Walgreens",
    returnDays: 30,
    notes: "30 days for most items with receipt",
    aliases: ["walgreens"],
  },
  {
    merchantName: "Uniprix",
    returnDays: 30,
    notes: "30 days for most items with receipt",
    aliases: ["uniprix"],
  },

  // ========== HOME / KITCHEN ==========
  {
    merchantName: "Stokes",
    returnDays: 30,
    notes: "30 days for most items with receipt",
    aliases: ["stokes"],
  },
  {
    merchantName: "Reno Depot",
    returnDays: 90,
    notes: "90 days for most items with receipt",
    aliases: ["reno depot", "reno-depot"],
  },

  // ========== CRAFT ==========
  {
    merchantName: "Michaels",
    returnDays: 60,
    notes: "60 days for most items with receipt",
    aliases: ["michaels", "michael's"],
  },

  // ========== ALCOHOL ==========
  {
    merchantName: "SAQ",
    returnDays: 30,
    notes: "30 days for unopened products with receipt",
    aliases: ["saq"],
  },

  // ========== HARDWARE / CONSTRUCTION BRANDS ==========
  {
    merchantName: "Richelieu",
    returnDays: 30,
    notes: "30 days for most items with receipt",
    aliases: ["richelieu"],
  },
  {
    merchantName: "Metrie",
    returnDays: 30,
    notes: "30 days for most items with receipt",
    aliases: ["metrie"],
  },
  {
    merchantName: "Paslode",
    returnDays: 30,
    notes: "30 days for most items with receipt",
    aliases: ["paslode"],
  },
  {
    merchantName: "LePage",
    returnDays: 30,
    notes: "30 days for most items with receipt",
    aliases: ["lepage", "le page"],
  },
  {
    merchantName: "Dahl",
    returnDays: 30,
    notes: "30 days for most items with receipt",
    aliases: ["dahl"],
  },
  {
    merchantName: "Aqua-Dynamic",
    returnDays: 30,
    notes: "30 days for most items with receipt",
    aliases: ["aqua-dynamic", "aqua dynamic"],
  },
];

/**
 * Get return period for a merchant
 * @param merchantName - Name of the merchant
 * @returns Number of days for return period, or null if not found
 */
export function getReturnPeriodForMerchant(merchantName: string): number | null {
  const lowerMerchantName = merchantName.toLowerCase();

  // Try to find exact or partial match
  for (const policy of RETURN_POLICIES) {
    // Check main name
    if (lowerMerchantName.includes(policy.merchantName.toLowerCase())) {
      return policy.returnDays;
    }

    // Check aliases
    for (const alias of policy.aliases) {
      if (lowerMerchantName.includes(alias.toLowerCase())) {
        return policy.returnDays;
      }
    }
  }

  return null; // Not found
}

/**
 * Get full policy data for a merchant
 */
export function getReturnPolicyForMerchant(merchantName: string): ReturnPolicyData | null {
  const lowerMerchantName = merchantName.toLowerCase();

  for (const policy of RETURN_POLICIES) {
    if (lowerMerchantName.includes(policy.merchantName.toLowerCase())) {
      return policy;
    }

    for (const alias of policy.aliases) {
      if (lowerMerchantName.includes(alias.toLowerCase())) {
        return policy;
      }
    }
  }

  return null;
}
