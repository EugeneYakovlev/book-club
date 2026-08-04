export const homeData = {
  nextBook: {
    id: 11,
    title: 'Поштамт',
    slug: 'postamp',
    description:
      'Понад дванадцять років свого життя Генрі Чинаскі змарнував на Поштову службу США. У світі, де для нього існує лише три задоволення — випивка, жінки й ставки на іподромі, він примудряється з похмілля щодня виповзати з ліжка, щоб тягати під дощем торби з листами, відбиваючись від злих собак і надокучливих старих, сортувати гори пошти й витримувати начальників-садистів і божевільних співробітників... Написаний 1971 року роман Чарльза Буковскі вже давно став класикою американської літератури.',
    author: 'Чарльз Буковскі',
    cover: '/images/books/postoffice.webp',
    year: 1971,
    discussionDate: '18 Aug 2026'
  },

  readBooks: {
    books: [
      {
        id: 10,
        title: 'Троє в човні, якщо не рахувати собаки',
        slug: 'three-men-in-a-boat',
        author: 'Джером Клапка Джером',
        cover: '/images/books/boa.webp',
        year: 1889,
        discussionDate: '28 Jul 2026',
        ratings: [
          { memberId: 1, rating: { value: 4.25, label: '4+' } },
          { memberId: 2, rating: { value: 3.95, label: '' } },
          { memberId: 3, rating: { value: 3.25, label: '3+' } },
          { memberId: 4, rating: { value: 4, label: '' } }
        ]
      },
      {
        id: 9,
        title: 'Про мишей і людей',
        slug: 'of-mice-and-men',
        author: 'Джон Стейнбек',
        cover: '/images/books/mice.webp',
        year: 1937,
        discussionDate: '23 Jun 2026',
        ratings: [
          { memberId: 1, rating: { value: 3.55, label: '' } },
          { memberId: 2, rating: { value: 3.81, label: '' } },
          { memberId: 3, rating: { value: 3.25, label: '3+' } },
          { memberId: 4, rating: { value: 3, label: '' } }
        ]
      },
      {
        id: 8,
        title: 'Путівник по Галактиці для космотуристів',
        slug: 'hitchhikers-guide-to-the-galaxy',
        author: 'Дуглас Адамс',
        cover: '/images/books/hit.webp',
        year: 1979,
        discussionDate: '19 May 2026',
        ratings: [
          { memberId: 1, rating: { value: 4.42, label: '' } },
          { memberId: 2, rating: { value: 4.2, label: '' } },
          { memberId: 3, rating: { value: 4.25, label: '4+' } },
          { memberId: 4, rating: { value: 4, label: '' } }
        ]
      },
      {
        id: 7,
        title: 'Аліса в Країні Див',
        slug: 'alice-in-wonderland',
        author: 'Льюїс Керрол',
        cover: '/images/books/alice.webp',
        year: 1872,
        discussionDate: '28 Apr 2026',
        ratings: [
          { memberId: 1, rating: { value: 3.5, label: '' } },
          { memberId: 2, rating: { value: 2.49, label: '' } },
          { memberId: 3, rating: { value: 3, label: '' } },
          { memberId: 4, rating: { value: 4, label: '' } }
        ]
      },
      {
        id: 6,
        title: 'Планета Мавп',
        slug: 'planet-of-the-apes',
        author: "П'єр Буль",
        cover: '/images/books/planet.webp',
        year: 1963,
        discussionDate: '31 Mar 2026',
        ratings: [
          { memberId: 1, rating: { value: 3.98, label: '' } },
          { memberId: 2, rating: { value: 3.85, label: '' } },
          { memberId: 3, rating: { value: 4, label: '' } },
          { memberId: 4, rating: { value: 4, label: '' } }
        ]
      },
       {
        id: 5,
        title: 'Убивство Роджера Екройда',
        slug: 'murder-of-roger-ackroyd',
        author: 'Агата Крісті',
        cover: '/images/books/rog.webp',
        year: 1926,
        discussionDate: '10 Mar 2026', // взято кінцеву дату з 24.02.26 / 10.03.26
        ratings: [
          { memberId: 1, rating: { value: 4, label: '' } },
          { memberId: 2, rating: { value: 3.75, label: '' } },
          { memberId: 3, rating: { value: 4.25, label: '4+' } },
          { memberId: 4, rating: { value: 5, label: '' } }
        ]
      },
      {
        id: 4,
        title: 'Маленький принц',
        slug: 'the-little-prince',
        author: 'Антуан де Сент-Екзюпері',
        cover: '/images/books/prince.webp',
        year: 1943,
        discussionDate: '02 Feb 2026',
        ratings: [
          { memberId: 1, rating: { value: 5, label: '' } },
          { memberId: 2, rating: { value: 4.95, label: '' } },
          { memberId: 3, rating: { value: 5, label: '' } },
          { memberId: 4, rating: { value: 5, label: '' } }
        ]
      },
      {
        id: 3,
        title: 'Різдвяна історія',
        slug: 'a-christmas-carol',
        author: 'Чарльз Діккенс',
        cover: '/images/books/carol.webp',
        year: 1843,
        discussionDate: '20 Jan 2026',
        ratings: [
          { memberId: 1, rating: { value: 4.78, label: '' } },
          { memberId: 2, rating: { value: 4.21, label: '' } },
          { memberId: 3, rating: { value: 4.25, label: '4+' } },
          { memberId: 4, rating: { value: 5, label: '' } }
        ]
      },
      {
        id: 2,
        title: 'Ніч у самотньому жовтні',
        slug: 'a-night-in-the-lonesome-october',
        author: 'Роджер Желязни',
        cover: '/images/books/oct.webp',
        year: 1993,
        discussionDate: '12 Dec 2025',
        ratings: [
          { memberId: 1, rating: { value: 4.25, label: '4+' } },
          { memberId: 2, rating: { value: 4.58, label: '' } },
          { memberId: 3, rating: { value: 4.75, label: '5-' } },
          { memberId: 4, rating: { value: 4, label: '' } }
        ]
      },
      {
        id: 1,
        title: 'Чужий',
        slug: 'the-stranger',
        author: 'Альбер Камю',
        cover: '/images/books/str.webp',
        year: 1942,
        discussionDate: '25 Oct 2025',
        ratings: [
          { memberId: 1, rating: { value: 4, label: '' } },
          { memberId: 2, rating: { value: 3, label: '' } },
          { memberId: 3, rating: { value: 3.75, label: '4-' } },
          { memberId: 4, rating: { value: 2.5, label: '2-3, ну 3' } }
        ]
      }
    ]
  },

  members: [
    {
      id: 1,
      name: 'Юджин',
      pic: '/images/members/p1.webp'
    },
    {
      id: 2,
      name: 'Юра',
      pic: '/images/members/p2.webp'
    },
    {
      id: 3,
      name: 'Коля',
      pic: '/images/members/p3.webp'
    },
    {
      id: 4,
      name: 'Макс',
      pic: '/images/members/p4.webp'
    }
  ]
}
