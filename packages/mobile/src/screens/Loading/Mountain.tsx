import { ViewStyle } from 'components'
import { MountainSVG } from '@/assets/icons/SVG'
import { StyleSheet } from 'react-native'

export const Mountaint = () => {
  return (
    <ViewStyle style={styles.container}>
      <MountainSVG width="100%" height="100%" opacity="1" fill={'black'} />
    </ViewStyle>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    opacity: 0.8,
    bottom: '-26%',
  },
})
