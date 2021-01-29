export default [
  {
    icon: "mdi-apps",
    title: "မူလစာမျက်နှာ",
    path: "/",
  },
  {
    icon: "mdi-account-multiple",
    title: "အဆက်အသွယ်များ",
    path: "/customers",
    visible: [],
  },
  {
    icon: "mdi-store",
    title: "ကုန်ပစ္စည်းများ",
    path: "/products",
    visible: ["admin", "moderator"],
  },
  {
    icon: "mdi-truck",
    title: "အော်ဒါများ",
    path: "/orders",
    visible: [],
  },
  {
    icon: "mdi-cart",
    title: "အမျိုးအစားများ",
    path: "/categories",
    visible: ["admin", "moderator"],
  },
  {
    icon: "mdi-format-color-fill",
    title: "အရောင်များ",
    path: "/colors",
    visible: ["admin", "moderator"],
  },
  {
    icon: "mdi-receipt",
    title: "Invoices",
    path: "/invoices",
    visible: ["admin", "moderator"],
  },
  {
    icon: "mdi-compare",
    title: "အကဲဖြတ်ရန်​",
    path: "/reviews",
    visible: ["admin", "moderator"],
  },
  {
    icon: "mdi-account-multiple ",
    title: "အသုံးပြုသူများ",
    path: "/users",
    visible: ["admin"],
  },
  {
    icon: " mdi-monitor-eye",
    title: "Server Status",
    path: "/about/server",
  },
];
