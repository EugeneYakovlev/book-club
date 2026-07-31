export const homeData = {
  nextBook: {
    id: 11,
    title: 'Поштамт',
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
        author: 'Джером Клапка Джером',
        cover: '/images/books/boa.webp',
        year: 1889,
        discussionDate: '28 Jul 2026',
        ratings: [
          { member: 'Юджин', rating: { value: 4.25, label: '4+' } },
          { member: 'Юра', rating: { value: 3.95, label: '' } },
          { member: 'Коля', rating: { value: 3.25, label: '3+' } },
          { member: 'Макс', rating: { value: 4, label: '' } }
        ]
      },
      {
        id: 9,
        title: 'Про мишей і людей',
        author: 'Джон Стейнбек',
        cover: '/images/books/mice.webp',
        year: 1937,
        discussionDate: '23 Jun 2026',
        ratings: [
          { member: 'Юджин', rating: { value: 3.55, label: '' } },
          { member: 'Юра', rating: { value: 3.81, label: '' } },
          { member: 'Коля', rating: { value: 3.25, label: '3+' } },
          { member: 'Макс', rating: { value: 3, label: '' } }
        ]
      },
      {
        id: 8,
        title: 'Путівник по Галактиці для космотуристів',
        author: 'Дуглас Адамс',
        cover: '/images/books/hit.webp',
        year: 1979,
        discussionDate: '19 May 2026',
        ratings: [
          { member: 'Юджин', rating: { value: 4.42, label: '' } },
          { member: 'Юра', rating: { value: 4.2, label: '' } },
          { member: 'Коля', rating: { value: 4.25, label: '4+' } },
          { member: 'Макс', rating: { value: 4, label: '' } }
        ]
      },
      {
        id: 7,
        title: 'Аліса в Країні Див',
        author: 'Льюїс Керрол',
        cover: '/images/books/alice.webp',
        year: 1872,
        discussionDate: '28 Apr 2026',
        ratings: [
          { member: 'Юджин', rating: { value: 3.5, label: '' } },
          { member: 'Юра', rating: { value: 2.49, label: '' } },
          { member: 'Коля', rating: { value: 3, label: '' } },
          { member: 'Макс', rating: { value: 4, label: '' } }
        ]
      },
      {
        id: 6,
        title: 'Планета Мавп',
        author: "П'єр Буль",
        cover: '/images/books/planet.webp',
        year: 1963,
        discussionDate: '31 Mar 2026',
        ratings: [
          { member: 'Юджин', rating: { value: 3.98, label: '' } },
          { member: 'Юра', rating: { value: 3.85, label: '' } },
          { member: 'Коля', rating: { value: 4, label: '' } },
          { member: 'Макс', rating: { value: 4, label: '' } }
        ]
      },
       {
        id: 5,
        title: 'Убивство Роджера Екройда',
        author: 'Агата Крісті',
        cover: '/images/books/rog.webp',
        year: 1926,
        discussionDate: '10 Mar 2026', // взято кінцеву дату з 24.02.26 / 10.03.26
        ratings: [
          { member: 'Юджин', rating: { value: 4, label: '' } },
          { member: 'Юра', rating: { value: 3.75, label: '' } },
          { member: 'Коля', rating: { value: 4.25, label: '4+' } },
          { member: 'Макс', rating: { value: 5, label: '' } }
        ]
      },
      {
        id: 4,
        title: 'Маленький принц',
        author: 'Антуан де Сент-Екзюпері',
        cover: '/images/books/prince.webp',
        year: 1943,
        discussionDate: '02 Feb 2026',
        ratings: [
          { member: 'Юджин', rating: { value: 5, label: '' } },
          { member: 'Юра', rating: { value: 4.95, label: '' } },
          { member: 'Коля', rating: { value: 5, label: '' } },
          { member: 'Макс', rating: { value: 5, label: '' } }
        ]
      },
      {
        id: 3,
        title: 'Різдвяна історія',
        author: 'Чарльз Діккенс',
        cover: '/images/books/carol.webp',
        year: 1843,
        discussionDate: '20 Jan 2026',
        ratings: [
          { member: 'Юджин', rating: { value: 4.78, label: '' } },
          { member: 'Юра', rating: { value: 4.21, label: '' } },
          { member: 'Коля', rating: { value: 4.25, label: '4+' } },
          { member: 'Макс', rating: { value: 5, label: '' } }
        ]
      },
      {
        id: 2,
        title: 'Ніч у самотньому жовтні',
        author: 'Роджер Желязни',
        cover: '/images/books/oct.webp',
        year: 1993,
        discussionDate: '12 Dec 2025',
        ratings: [
          { member: 'Юджин', rating: { value: 4.25, label: '4+' } },
          { member: 'Юра', rating: { value: 4.58, label: '' } },
          { member: 'Коля', rating: { value: 4.75, label: '5-' } },
          { member: 'Макс', rating: { value: 4, label: '' } }
        ]
      },
      {
        id: 1,
        title: 'Чужий',
        author: 'Альбер Камю',
        cover: '/images/books/str.webp',
        year: 1942,
        discussionDate: '25 Oct 2025',
        ratings: [
          { member: 'Юджин', rating: { value: 4, label: '' } },
          { member: 'Юра', rating: { value: 3, label: '' } },
          { member: 'Коля', rating: { value: 3.75, label: '4-' } },
          { member: 'Макс', rating: { value: 2.5, label: '2-3, ну 3' } }
        ]
      }
    ]
  },

  members: [
    {
      name: 'Юджин',
      pic: '/images/members/p1.webp'
    },
    {
      name: 'Юра',
      pic: '/images/members/p2.webp'
    },
    {
      name: 'Коля',
      pic: '/images/members/p3.webp'
    },
    {
      name: 'Макс',
      pic: '/images/members/p4.webp'
    }
  ]
}
