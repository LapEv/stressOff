import { View as DefaultView } from 'react-native'
import { IView } from './interfaces'

export const View = (props: IView) => {
  return <DefaultView {...props} />
}
