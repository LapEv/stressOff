import { IIcons } from './interfaces'
import { memo } from 'react'

export const Music = memo((props: IIcons) => {
  return (
    <img
      {...props}
      alt="MusicIcon"
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAS5JREFUSEvFlYttwlAMRQ8TQDdoJ4AN2g3aDVomgE2ACYAN6AbtBO0GhQ1gAtCVbGRFqeK8BPGkiF9yj+1rmwE3PoMb65MBjIB3QK9bYN8mqAzgC3gOor/AxmDHJlgGcDYRRf8GDIPoDtCl32pPG4Df+2Gg16CoTBykjK+nBOAPyxPBdI2D5gqY++cugBjoo4nO7Murbl8Ah7lf9wMo1QUwAfRe7aga6xRlGx+S4I8NVF3LdQaozdR63yFqZeBD1hmgXtYQPYV1oKz++iqRAx4AXwEOOJgn1dZs9Cum7SXSJE5NaQ28AJ82vQ5I+1U1WYss7hoJnqyr4hZN+1U1TpEtTVDiAmrsqys67VemM+paNu1XKSDtVylApUz5VQpQ2VJ+dQE0/VumF1hK6L+bLuaZShkNh78GAAAAAElFTkSuQmCC"
    />
  )
})
