export const coffeehouse = document.querySelector('.list-coffeehouse'),
  markers = document.querySelectorAll('#letna, #karlin, #vinohrady, #nusle, #dejvice, #centrum'),
  icons = [
    {
      name: 'CoffeeHouse',
      icon: 'img/coffee-shop.png',
    },
    {
      name: 'My location',
      icon: '../img/pin.svg',
    },
  ],
  photo = []
export const cityLocations = [
  { name: 'Letná' },
  { name: 'Karlín' },
  { name: 'Dejvice' },
  { name: 'Vinohrady' },
  { name: 'Nusle' },
  { name: 'Centrum' },
  { name: 'Berlín' }
]

export const formItems = [
  { name: 'Název kavárny', value: 'name' },
  { name: 'Adresa kavárny', value: 'address' },
  { name: 'Lat', value: 'lat' },
  { name: 'Lng', value: 'lng' },
  { name: 'Otevírací doba', value: 'time' },
  { name: 'Webové stránky', value: 'web' },
  { name: 'Informace', value: 'description' },
]
export const selectItems = [
  {
    name: 'Lokalita',
    value: 'location'
  }
]
export const cities = [
  { name: 'Plzeň' },
  { name: 'Brno' },
  { name: 'Tábor' },
  { name: 'České Budějovice' },
]

// list of coffeehouse
export const listCoffeehouse = [
  {
    name: 'Kofárna',
    time: 'Po - Ne: 8:00 - 19:00',
    address: 'Zborovská 60, Malá Strana',
    phone: '797795678',
    web: 'https://www.facebook.com/kofarna',
    district: ['All', 'Centrum'],
    type: 'coffeehouse',
    content: 'Kavárna a zároveň pražírna Beansmith\'s.',
    lat: 50.08033951568018,
    lng: 14.407263420492933,
    image: ['https://media.istockphoto.com/photos/happy-coffee-cup-picture-id508347326?k=20&m=508347326&s=612x612&w=0&h=phdf_0eKqIbCj2ayXuXRktf8JGugJqFXdi6A8gBL6vU=',
      'https://media.istockphoto.com/photos/happy-coffee-cup-picture-id508347326?k=20&m=508347326&s=612x612&w=0&h=phdf_0eKqIbCj2ayXuXRktf8JGugJqFXdi6A8gBL6vU=',
    ],
  },
  {
    name: 'format.coffee',
    time: 'Po - Ne: 9:00 - 18:00',
    address: 'M. Horákové 26, Praha 7-Letná',
    district: ['All', 'Letná'],
    type: 'coffeehouse',
    content: 'Další kavárna na Letné od Jackieho.',
    lat: 50.099816256123965,
    lng: 14.429540195462284,
    image: ['https://thumbs.dreamstime.com/b/cup-cappuccino-caffee-coffee-latte-art-old-wooden-table-173832323.jpg']
  },
  {
    name: 'Café Tvaroh',
    address: 'Šmeralova 22, Praha 7-Letná',
    district: ['All', 'Letná'],
    time: 'Po - Ne: 9:00 - 19:00',
    content: ' je nenápadná kavárna kousek od Centrum Stromovka.',
    lat: 50.10256728584566,
    lng: 14.422197754862381,
    image: ['https://thumbs.dreamstime.com/b/cup-cappuccino-caffee-coffee-latte-art-old-wooden-table-173832323.jpg']
  },
  {
    name: 'Cafe Letka',
    address:'Letohradská 44, 170 00 Praha 7-Letná',
    district: ['All', 'Letná'],
    time: 'Po - Pá: 8:00 - 18:00, So - Ne: 9:00 - 18:00',
    content: 'Legendární kavárna na Letné.',
    lat: 50.09896095139468,
    lng: 14.425286868749494,
    image: ['https://thumbs.dreamstime.com/b/cup-cappuccino-caffee-coffee-latte-art-old-wooden-table-173832323.jpg']
  },
  {
    name: 'Dos Mundos Café',
    address: 'M. Horákové 600, Holešovice, 170 00 Praha 7',
    district: ['All', 'Letná'],
    time: 'Po - Ne: 9:30 - 19:00',
    content: '',
    lat: 50.106237669557665,
    lng: 14.429093765706273,
    image: ['https://thumbs.dreamstime.com/b/cup-cappuccino-caffee-coffee-latte-art-old-wooden-table-173832323.jpg']
  },
  {
    name: 'Cafe Hrnek',
    address: 'Veletržní 839/49, 170 00 Praha 7-Holešovice',
    district: ['All', 'Letná'],
    time: 'Po - Ne: 10:00 - 18:00',
    content: '',
    lat: 50.10134293265671,
    lng: 14.42821178016424,
    image: ['https://thumbs.dreamstime.com/b/cup-cappuccino-caffee-coffee-latte-art-old-wooden-table-173832323.jpg']
  },
  {
    name: 'Kafe Karlín',
    address: 'Sokolovská 46/51, Praha-Karlín',
    district: ['All', 'Karlín'],
    time: 'Po - Pá: 7:30 - 17:30',
    content: ' pokud jezdíte do Karlína nesmíte ji minout.',
    lat: 50.09300737010227,
    lng:14.445987692151286,
    image: ['https://thumbs.dreamstime.com/b/cup-cappuccino-caffee-coffee-latte-art-old-wooden-table-173832323.jpg']
  },
  {
    name: 'Kafe Kiosek',
    address: 'Roh ulic Evropská a Šolínova, Praha 6 - Dejvice',
    district: ['All', 'Dejvice'],
    time: 'Po - Pá: 7:00 - 18:00, So - Ne: 9:00 - 16:00',
    content: '',
    lat: 50.10123348075611,
    lng: 14.39239431587142,
    image: ['https://thumbs.dreamstime.com/b/cup-cappuccino-caffee-coffee-latte-art-old-wooden-table-173832323.jpg']
  },
  {
    name: 'Kafemat',
    address: 'Dejvická 3, Praha 6-Dejvice',
    district: ['All', 'Dejvice'],
    time: 'Po - Pá: 8:00 - 18:00, So - Ne: 9:00 - 15:00',
    content: '',
    lat: 50.09809293267724,
    lng: 14.40069573866305,
    image: ['https://thumbs.dreamstime.com/b/cup-cappuccino-caffee-coffee-latte-art-old-wooden-table-173832323.jpg']
  },
  {
    name: 'Osada',
    address: 'Osadní 35, 170 00 Praha 7-Holešovice',
    district: ['All'],
    time: 'Po - Pá: 8:00 - 20:00, So - Ne: 9:00 - 16:00',
    content: ', to je kousek Liberce v Praze.',
    lat: 50.10459685147894,
    lng: 14.44628384082367,
    image: ['https://thumbs.dreamstime.com/b/cup-cappuccino-caffee-coffee-latte-art-old-wooden-table-173832323.jpg']
  },
  {
    name: 'Kontejner',
    address: 'Ortenovo nám. 169, 170 00 Praha 7-Holešovice',
    district: ['All', 'Holešovice'],
    time: 'Po - Pá: 8:00 - 18:00, So - Ne: 10:00 - 18:00',
    content: ' je netradiční kavárna, která na tomto místě chyběla.',
    lat: 50.10782923945228,
    lng: 14.448746107986691,
    image: ['https://thumbs.dreamstime.com/b/cup-cappuccino-caffee-coffee-latte-art-old-wooden-table-173832323.jpg']
  },
  {
    name: 'Mezi Srnky',
    address: 'Sázavská 720/19, 120 00 Praha 2-Vinohrady',
    district: ['All', 'Vinohrady'],
    time: 'Po - Pá: 8:00 - 16:00 So - Ne: 9:00 - 16:00',
    content: '',
    lat: 50.076046307224324,
    lng: 14.440395740961378,
    image: ['https://thumbs.dreamstime.com/b/cup-cappuccino-caffee-coffee-latte-art-old-wooden-table-173832323.jpg'],
  },
  {
    name: 'Cafefin',
    address: 'nám. J. z Poděbrad 1407/4, 120 00 Vinohrady',
    district: ['All', 'Vinohrady'],
    time: 'Po - So: 9:00 - 20:00, Ne: 9:00 - 19:00',
    content: '',
    lat: 50.078230491278774,
    lng: 14.448439963363745,
    image: ['https://thumbs.dreamstime.com/b/cup-cappuccino-caffee-coffee-latte-art-old-wooden-table-173832323.jpg']
  },
  {
    name: 'Botanica Coffee Truck',
    address: 'Moskevská 372/35, 101 00 Praha 10-Vršovice',
    district: ['All', 'Vršovice'],
    time: 'Po - Ne: 9:00 - 20:00',
    lat: 50.069417672774016,
    lng: 14.455258250993772,
    image: ['https://thumbs.dreamstime.com/b/cup-cappuccino-caffee-coffee-latte-art-old-wooden-table-173832323.jpg']
  },
  {
    name: '20m2',
    address: 'Bělohorská 29, 169 00 Praha 6',
    district: ['All'],
    time: 'Po - Pá: 7:01 - 19:01, So - 12:01 - 17:01',
    content: '',
    lat: 50.08459124214152,
    lng: 14.375977737345796,
    image: ['https://thumbs.dreamstime.com/b/cup-cappuccino-caffee-coffee-latte-art-old-wooden-table-173832323.jpg'],
  },
  {
    name: 'The Flat Café',
    address: 'Kodaňská 81/4, 101 00 Praha 10-Vršovice',
    district: ['All', 'Vršovice'],
    time: 'Po - Pá: 8:30 - 22:00, So: 9:00 - 23:00, Ne: 9:00 - 16:00',
    content: 'Anglie v Praze',
    lat: 50.071209365923345,
    lng: 14.451311520864516,
    image: ['https://thumbs.dreamstime.com/b/cup-cappuccino-caffee-coffee-latte-art-old-wooden-table-173832323.jpg'],
  },
  {
    name: 'Mamacoffee Jaromírova',
    address: 'Jaromírova 576/34, 128 00 Praha 2-Nusle',
    district: ['Nusle'],
    time: 'Po - Pá: 8:00 - 19:00, So - Ne: 10:00 - 18:00',
    content: 'Pod Nuselským mostem',
    lat: 50.06505704895357,
    lng: 14.42893499158989,
    image: ['https://thumbs.dreamstime.com/b/cup-cappuccino-caffee-coffee-latte-art-old-wooden-table-173832323.jpg']
  },
  {
    name: 'Mamacoffee Jiřího z Poděbrad',
    address: 'nám. J. z Poděbrad 12, 130 00 Praha 3-Vinohrady',
    district: ['Vinohrady'],
    time: 'Po - Pá: 8:00 - 19:00, So - Ne: 9:00 - 19:00',
    content: '',
    lat: 50.07874384511063,
    lng: 14.451214020641554,
    image: ['https://thumbs.dreamstime.com/b/cup-cappuccino-caffee-coffee-latte-art-old-wooden-table-173832323.jpg']
  },
  // až sem
  {
    name: 'Coffe Imrvére',
    address: 'Olšanské nám. 1785, 130 00 Praha 3-Žižkov',
    district: ['All', 'Žižkov'],
    time: 'Po - Pá: 9:00 - 17:00',
    content: '',
    lat: 50.082074825242515,
    lng: 14.459151740227787
  },
  {
    name: 'Megera Café',
    address: 'Dačického 1225/8, 140 00 Praha 4-Nusle',
    district: ['All', 'Nusle'],
    time: 'Po - Pá: 8:00 - 21:00',
    content: '',
    lat: 50.05581497709363,
    lng: 14.433091411718667,
    image: ['https://thumbs.dreamstime.com/b/cup-cappuccino-caffee-coffee-latte-art-old-wooden-table-173832323.jpg']
  },
  {
    name: 'Kafé Atrium',
    address: 'Čajkovského 12, 130 00 Praha 3-Žižkov',
    district: ['All', 'Žižkov'],
    time: 'Po - Ne: 10:00 - 21:00',
    content: '',
    lat: 50.08204423391477,
    lng: 14.453021796882094,
    image: ['https://thumbs.dreamstime.com/b/cup-cappuccino-caffee-coffee-latte-art-old-wooden-table-173832323.jpg']
  },
  {
    name: 'Etapa',
    address: 'Urxova 479/6, 186 00 Karlín',
    district: ['All', 'Karlín'],
    time: 'Po - Pá: 9:00 - 18:00, So - Ne: 9:00 - 17:00',
    content: '',
    lat: 50.09466086737089,
    lng: 14.457777660541346,
    image: ['https://thumbs.dreamstime.com/b/cup-cappuccino-caffee-coffee-latte-art-old-wooden-table-173832323.jpg']
  },
  {
    name: 'Eska',
    address: 'Pernerova 49, 186 00 Karlín',
    district: ['All', 'Karlín'],
    time: 'Po - Pá: 8:00 - 22:00, So - Ne: 9:00 - 22:00',
    content: '',
    lat: 50.091574389863545,
    lng: 14.454573908436654,
    image: ['https://thumbs.dreamstime.com/b/cup-cappuccino-caffee-coffee-latte-art-old-wooden-table-173832323.jpg']
  },
  {
    name: 'EMA espresso bar',
    address: 'Palác Karlín Thámova 289/13 vstup z, Křižíkova, 186 00 Praha 8',
    district: ['All', 'Karlín'],
    time: 'Po - Pá: 8:00 - 18:00, So - Ne: 10:00 - 18:00',
    content: '',
    lat: 50.092620419002,
    lng: 14.451573565601478,
    image: ['https://thumbs.dreamstime.com/b/cup-cappuccino-caffee-coffee-latte-art-old-wooden-table-173832323.jpg']
  },
  {
    name: 'Coffee Room',
    address: 'Korunní 1208/74, 101 00 Vinohrady',
    district: ['Vinohrady'],
    time: 'Po - Pá: 8:00 - 18:00, So - Ne: 9:00 - 17:00',
    content: '',
    lat: 50.075424825594816,
    lng: 14.451322566873111,
    image: ['https://thumbs.dreamstime.com/b/cup-cappuccino-caffee-coffee-latte-art-old-wooden-table-173832323.jpg']
  },
  {
    name: 'Dok Nordbeans',
    address: 'Nákladní 431, 460 07 Liberec',
    district: ['Liberec'],
    time: 'Po - Ne: 8:00 - 18:00',
    content: '',
    lat: 50.75974304434389,
    lng: 15.048204418301879,
    image: ['https://thumbs.dreamstime.com/b/cup-cappuccino-caffee-coffee-latte-art-old-wooden-table-173832323.jpg']
  },
  {
    name: 'Café Datel',
    addres: 'Piaristická 22/8, 370 01 České Budějovice',
    district: ['České Budějovice'],
    time: 'Po - Ne: 8:00 - 22:00',
    content: '',
    lat: 48.97546893398027,
    lng:  14.472968162329774,
    image: [],
  },
];
