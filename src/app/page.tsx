import { homeData } from "@/data/home";

import { Section } from "@/components/layouts/Section"
import { NextBook } from "@/components/books/NextBook"
import { ReadBooks } from "@/components/books/ReadBooks"

const App = () => {
  
  return ( 
    <>
      <Section eyebrow="Наступна книга" title="Читаємо в Серпні">
        <NextBook book={homeData.nextBook} />
      </Section>
      <Section eyebrow="Архів" title="Прочитані книги">
        <ReadBooks {...homeData.readBooks } />
      </Section>
    </>
   )
}
 
export default App;