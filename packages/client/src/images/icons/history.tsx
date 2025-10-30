import { IIcons } from './interfaces'
import { memo } from 'react'

export const History = memo((props: IIcons) => {
  return (
    <img
      {...props}
      alt="History"
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAYFJREFUSEvNlYFNw0AMRV8ngA1gA2ACYAJgAhgBJgA2YANgAmAC6ATABDACTAB6kS+6XHNJWqlST6oqJba///8+Z8aaz2zN9dkYgH3gHDgFdoP1N/AMPAIfNSXGGGwDT8DRiJRvwBnwU8YNAdj1KyDIL3ADWCh1K6i/S2Arih+XbGoAeXElsMhCd9GtDQi81wdSAzDhMPS9mDBpOYi5MmlOH4C0lUZZNLTs/K+SK4jGK5cAAvUCPMTE3IbuJYEagHEpV1kb5n0MNFE92y4KhCEAvXsPow9qAEMFzEnvc9y80U5+/iLRyxNbqtnDKQD6pycdifJJ8N1nzHltPPuGK0k0T5ez9MCAxv0IqK6Ayuh6Ga/z8e4zOc29ki1zVOArpBkc02WK5rHJw1ae2hTlSbLxRl+NrIr72LSa60VtpR1adlI2cCeK3wEvWbJ+ncSeSguxU3wKAxOlbqGhI7AL0VXROWPfgxScVrP/du6+cYxlaANp8haamAqwqvGb801emcE/BTxRGTMqnwgAAAAASUVORK5CYII="
    />
  )
})
