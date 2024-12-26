const cases = [
  {
    collectionId: "APPLE_WATCH_SERIES_10",
    case: [
      {
        id: "aluminum",
        name: "Aluminum",
        variations: [
          {
            id: "silver",
            name: "Silver Aluminum Case",
            price: 329,
          },
          {
            id: "jetblack",
            name: "Jet Black Aluminum Case",
            price: 359,
          },
        ],
      },
      {
        id: "titanium",
        name: "Titanium",
        variations: [
          {
            id: "natural",
            name: "Natural Titanium Case",
            price: 499,
          },
        ],
      },
    ],
  },

  // Apple Watch Hermès Series 10

  {
    collectionId: "APPLE_WATCH_HERMÈS_SERIES_10",
    case: [
      {
        id: "titanium",
        name: "Titanium",
        variations: [
          {
            id: "silver",
            name: "Silver Titanium Case",
            price: 250,
            
          },
        ],
      },
    ],
  },

  // Apple Watch SE

  {
    collectionId: "APPLE_WATCH_SE",
    case: [
      {
        id: "aluminum",
        name: "Aluminum",
        variations: [
          {
            id: "midnight",
            name: "Midnight Aluminum Case",
            price: 150,
            image: "/images/cases/aluminum_midnight_se.png",
          },
          {
            id: "starlight",
            name: "Starlight Aluminum Case",
            price: 150,
            image: "/images/cases/aluminum_starlight_se.png",
          },
          {
            id: "silver",
            name: "Silver Aluminum Case",
            price: 150,
            image: "/images/cases/aluminum_silver_se.png",
          },
        ],
      },
    ],
  },
];

export default cases;
