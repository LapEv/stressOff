import { IIcons } from './interfaces'
import { memo } from 'react'

export const Users = memo((props: IIcons) => {
  return (
    <img
      {...props}
      alt="UsersIcon"
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAANlJREFUSEvtlNEVwUAQRW860AkqQAdUoARUgAooQQeUQAd0ogPO4GOM7M4s8pf9yTnJy7szbyapaPhUDfvTAtyEUxF1gA0wfjkcgAVwdR2NIAU4A12jlXv9fwCk6n3CaAJIN3JuDuxRfF0HK2CZeHkNyPOfANEOQmmVzOAC9EKuSpTboq3ZonnNFuXmkJxBSZFfAWQGM2BoSEdAhizX8LER7YCp87beJBekAbntsUYj1Ukqpo8ZSOsDt6Sn4KQiDAO8L9OyQ796LWocEEynTBZqs8zyXd0C3PTulfohGXnCj98AAAAASUVORK5CYII="
    />
  )
})
