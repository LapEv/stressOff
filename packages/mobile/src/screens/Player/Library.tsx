import { Shadow, TextTitle, Touchable, View } from '@/components'
import { ArrowLeftSVG, LibrarySVG } from 'assets/icons/SVG'
import { ILibrary } from './interfaces'
import { StyleSheet } from 'react-native'

export const Library = ({
  width,
  navigation,
  favesLength,
  itemColor,
  title,
}: ILibrary) => {
  return (
    <Shadow
      style={styles.shadowStyle}
      containerStyle={styles.shadowContainer}
      width={width}>
      <Touchable
        style={styles.touchableScreen}
        onPress={() =>
          navigation.navigate('SectionsTabNavigation', {
            screen: favesLength
              ? 'FavouritesTabNavigation'
              : 'SoundsTabNavigation',
          })
        }>
        <View style={styles.containerIconArrowLeft}>
          <ArrowLeftSVG width="100%" height="100%" fill={itemColor} />
        </View>
        <TextTitle type="title_20b">{title}</TextTitle>
        <View style={styles.containerIconLibrary}>
          <LibrarySVG width="100%" height="100%" fill={itemColor} />
        </View>
      </Touchable>
    </Shadow>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    opacity: 0.5,
  },
  shadowStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
  },
  shadowContainer: {
    marginTop: 7,
  },
  touchableScreen: {
    width: '100%',
    height: 60,
    padding: 15,
    paddingRight: 20,
    borderStyle: 'solid',
    borderRadius: 15,
    opacity: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
  },
  containerIconArrowLeft: {
    width: 30,
    height: 30,
  },
  containerIconLibrary: {
    width: 35,
    height: 35,
  },
})
