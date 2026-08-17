import { homeData } from "@/data/home";

import { Section } from "@/components/layouts/Section"
import { NextBook } from "@/components/books/NextBook"
import { ReadBooks } from "@/components/books/ReadBooks"
import { ClubMembers } from "@/components/members/ClubMembers";

const App = () => {
  
  return ( 
    <>
      <Section eyebrow="Наступна книга" title="Читаємо в Серпні">
        <NextBook book={homeData.readBooks.books[0]} />
      </Section>
      <Section eyebrow="Архів" title="Прочитані книги">
        <ReadBooks {...homeData.readBooks } />
      </Section>
      <Section eyebrow="учасники" title="Чотири вальта" id="members">
        <ClubMembers members={homeData.members} />
      </Section>
    </>
   )
}
 
export default App;