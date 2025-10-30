import { IIcons } from './interfaces'
import { memo } from 'react'

export const Basket = memo((props: IIcons) => {
  return (
    <img
      {...props}
      alt="Basket"
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAVBJREFUSEu1le0xBEEQhp+LABEgAkSACMgAESADIkAEyIAIkAERIAJEQL1qWu329sx0qbv+s3V7M/28/bkzFmyzBfsnA9gBHitCWv/9XukBToAL4BY4dJAb4AA4BS5rmWgBloFXQM/dIAqpfwA+gfXynHBaAKk6Bp4AOYtMqdsGrgBFmwasFfW6IHVvFUD3XC2CrrIB0CLVHaVyZBHAcvsFSKFy3DLVSBEuRbUaAp6BjTnNhXxt+TaVitU5Ad5L9KM5SPV1R8BkboYp0iBdA/fA/j8juQP2gCNAgkcRqFgfxbEv/rd773+bHnu/Ys3hHVmh/eRmANZ9L8CmET3AetpPZgYQ3vUAU/HXZkVJBhBGHw3aJI9AD1CtXwSYdEKio6odGAFa34AaqzpDEWC4IRPiR0cmm7e2Tc/KftcCy9o5oHvdbZp1mDrX+yannLQO/QBStFAZr3eyoAAAAABJRU5ErkJggg=="
    />
  )
})
