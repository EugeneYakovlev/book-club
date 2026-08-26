import { homeData } from "@/data/home";

import { Section } from "@/components/layouts/Section"
import { NextBook } from "@/components/books/NextBook"
import { ReadBooks } from "@/components/books/ReadBooks"
import { ClubMembers } from "@/components/members/ClubMembers";

const App = () => {
  const nextBook = homeData.books.find((book) => book.currentlyReading)
  const readBooks = homeData.books.filter((book) => (book.ratings?.length ?? 0) > 0)

  return ( 
    <>
      {nextBook && 
        <Section eyebrow="Наступна книга" title="Читаємо в Вересні">
          <NextBook book={nextBook} />
        </Section>
      }
      <Section eyebrow="Архів" title="Прочитані книги">
        <ReadBooks books={readBooks} />
      </Section>
      <Section eyebrow="учасники" title="Чотири вальта" id="members">
        <ClubMembers members={homeData.members} />
      </Section>
    </>
   )
}
 
export default App;