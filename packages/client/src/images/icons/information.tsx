import { IIcons } from './interfaces'
import { memo } from 'react'

export const Information = memo((props: IIcons) => {
  return (
    <div>
      <img
        {...props}
        alt="Information"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAVtJREFUSEu9leExRTEQhb9XCSpABZRABXSASlABKkAHVIAOqIT5ZpI3m7x7k5vh2Zn8yL2bc3ZPdjcrtmyrLeOzhOAcOAIO0jKm97SegOdWkC2CE+Aa2O1k+QlcAZJt2BzBDXCRvL8A9y8paj+bzTFwCewkP30kKmyKIIJ7wH3LJDFT7TaRrv1rAmV5TH8PQ8S9WjCjt+R0GuWqCdTTlOci/04gU5nnTMTYyxFFR6vlDlDzuYttEYiZA1xnEQnugbNG9D2Z/J+zeAAMuOgDa3sfGNG+Js13IZY4BUEvff2HfaJEw4dnNCtwIsESiXpBZIk+8lgZveQeQfOSc5MVdVzJ0CNolmms4980WtFH/z4qzCIOOzV1gP3ZsMtAkURd3b9W49pHyADyWNmYpHWj1VF66QLneT+XhZpLNPTgRDCJXNa4o0Szzu0bQSeBp6bpkmE27LPk0R8GjQd+APhwVhmesgEPAAAAAElFTkSuQmCC"
      />
    </div>
  )
})
