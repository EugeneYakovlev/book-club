const MONTHS_LOCATIVE = [
  'січні', 'лютому', 'березні', 'квітні', 'травні', 'червні',
  'липні', 'серпні', 'вересні', 'жовтні', 'листопаді', 'грудні'
]

export function getMonthLocative(date: string) {
  const month = MONTHS_LOCATIVE[new Date(date).getMonth()]

  if (!month) return ''

  return `${'вф'.includes(month[0]) ? 'у' : 'в'} ${month}`
}

export function formatDiscussionDate(date: string) {
  return new Intl.DateTimeFormat('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(date))
}
