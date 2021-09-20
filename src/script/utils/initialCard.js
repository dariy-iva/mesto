const canadaImage = new URL('../../images/canada.jpg', import.meta.url);
const norwayImage = new URL('../../images/norway.jpg', import.meta.url);
const russiaImage = new URL('../../images/russia.jpg', import.meta.url);
const boliviaImage = new URL('../../images/bolivia.jpg', import.meta.url);
const islandImage = new URL('../../images/island.jpg', import.meta.url);
const romaniaImage = new URL('../../images/romania.jpg', import.meta.url);

export const initialCardsItems = [
  {
    mesto: 'Канада',
    link: canadaImage
  },
  {
    mesto: 'Норвегия',
    link: norwayImage
  },
  {
    mesto: 'Россия',
    link: russiaImage
  },
  {
    mesto: 'Боливия',
    link: boliviaImage
  },
  {
    mesto: 'Исландия',
    link: islandImage
  },
  {
    mesto: 'Румыния',
    link: romaniaImage
  },
];