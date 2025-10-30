import { IIcons } from './interfaces'
import { memo } from 'react'

export const Server = memo((props: IIcons) => {
  return (
    <img
      {...props}
      alt="Server"
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAJdJREFUSEvtk9ENgCAMRB+TOIK6iaPoBDqSo+gGOomGRBIgEiRV4gd8kbS9ttc7xcdPfYxP1gYdMAKNcKsNGIBZ49gb6EAlBDflC9D6DY4rKqXNwbHBUhvY+aG/Q9HvGoTOFaTozSOvRo32DbRMJ6AWKmkH+juZCnHvy6WSjA7lU1ScrCkrTo4Kpzg5SpGTkNXJaaM9zD4BSXUsGU/pTXAAAAAASUVORK5CYII="
    />
  )
})
