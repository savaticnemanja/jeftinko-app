export const menuItems = [
  {
    name: "Igračke",
    url: "/toys",
    submenu: [
    { name: "Kocke", url: "/toys/blocks" },
    { 
      name: "Setovi", 
      url: "/toys/sets",
      submenu: [
      { name: "Setovi za devojčice", url: "/toys/sets/sets-for-girls" },
      { name: "Setovi za dečake", url: "/toys/sets/sets-for-boys" }
      ]
    },
    { name: "Lutke", url: "/toys/dolls" },
    { 
      name: "Vozila", 
      url: "/toys/vehicles",
      submenu: [
      { name: "Guralice", url: "/toys/vehicles/ride-on-vehicles" },
      { name: "Vozila na akumulator", url: "/toys/vehicles/electric-vehicles" },
      { name: "Ostalo", url: "/toys/vehicles/other-vehicles" }
      ]
    },
    { name: "Edukativne igre", url: "/toys/educational-games" },
    { name: "Muzičke igračke", url: "/toys/musical-toys" },
    { name: "Autići", url: "/toys/toy-cars" },
    { name: "Plišane igračke", url: "/toys/plush-toys" },
    { name: "Ostalo", url: "/toys/other" },
    ],
  },
  {
    name: "Obuća",
    url: "/footwear",
    submenu: [
    { name: "Patike", url: "/footwear/sneakers" },
    { name: "Sandale", url: "/footwear/sandals" },
    { name: "Baletanke", url: "/footwear/ballet-flats" },
    { name: "Štiklice", url: "/footwear/heels" },
    { name: "Cipele", url: "/footwear/shoes" },
    ],
  },
  {
    name: "Odeća",
    url: "/clothing",
    submenu: [
    { name: "Devojčice", url: "/clothing/clothing-for-girls" },
    { name: "Dečaci", url: "/clothing/clothing-for-boys" }
    ],
  },
  {
    name: "Svečani program",
    url: "/formal-wear",
    submenu: [
    { name: "Haljine", url: "/formal-wear/dresses" },
    { name: "Odela", url: "/formal-wear/suits" },
    { name: "Ostalo", url: "/formal-wear/trousers" },
    ],
  },
  {
    name: "Sve za bebe",
    url: "/babies",
    submenu: [
    { name: "Odeća i obuća", url: "/babies/baby-clothes-and-shoes" },
    { name: "Oprema", url: "/babies/baby-equipment" },
    { name: "Igračke", url: "/babies/baby-toys" },
    ],
  },
  {
    name: "Nameštaj",
    url: "/furniture",
  },
  ];