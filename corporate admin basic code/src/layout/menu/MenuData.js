const menu = [
  {
    heading: "Dashboards",
  },
  {
    icon: "cart-fill",
    text: "Dashboard",
    link: "/",
  },
  {
    heading: "Management",
  },
  {
    icon: "box",
    text: "Mystery Box",
    link: "/mystery-box",
    active: false,
  },
  {
    icon: "card-view",
    text: "Products",
    active: false,
    subMenu: [
      {
        text: "Product Lists",
        link: "/product-list",
      }
    ],
  },
  {
    icon: "cc-alt2-fill",
    text: "Orders",
    active: false,
    subMenu: [
      {
        text: "Individual Orders",
        link: "/order-list-individual",
      },
      {
        text: "Corporate Orders",
        link: "/order-list-mystery-box",
      }
    ],
  },
  {
    icon: "file-docs",
    text: "Payment",
    active: false,
    subMenu: [
      {
        text: "Payment List",
        link: "/payment-list",
      }
    ],
  },
  {
    icon: "grid-alt-fill",
    text: "Ratting",
    link: "/rating-list",
    active: false,
  },
];
export default menu;
