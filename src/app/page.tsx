import { Section } from "@/components/layouts/Section"
import { NextBook } from "@/components/books/NextBook"
import { ReadBooks } from "@/components/books/ReadBooks"
import { ClubMembers } from "@/components/members/ClubMembers";

import { getBooksWithStats, getCurrentBook, getMembers } from "@/data/selectors";
import { getMonthLocative } from "@/utils/date";

const App = () => {
  const nextBook = getCurrentBook()
  const readBooks = getBooksWithStats()
  const members = getMembers()

  const nextBookMonth = nextBook ? getMonthLocative(nextBook.discussionDate) : ''

  return (
    <>
      {nextBook &&
        <Section eyebrow="Наступна книга" title={`Читаємо ${nextBookMonth}`}>
          <NextBook book={nextBook} />
        </Section>
      }
      <Section eyebrow="Архів" title="Прочитані книги">
        <ReadBooks books={readBooks} members={members} />
      </Section>
      <Section eyebrow="учасники" title="Чотири вальта" id="members">
        <ClubMembers members={members} />
      </Section>
    </>
   )
}

export default App;
