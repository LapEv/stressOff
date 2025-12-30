import { RootState } from '@/store'
import { StyleSheet, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import { IPlayerContainer } from './interfaces'
import { ListHeader } from './ListHeader'
import { ListFooter } from './ListFooter'
import { ISoundStateItems } from '@/store/interfaces'
import { View } from '@/components'
import { SoundItems } from './SoundItems'

export const PlayerContainer = ({ navigation }: IPlayerContainer) => {
  const playingDataSound = useSelector<RootState>(
    state => state.sound.mixedSound,
  ) as ISoundStateItems[]

  return (
    <View style={styles.pleerContainer}>
      <FlatList
        ListHeaderComponent={
          <ListHeader
            navigation={navigation}
            playingDataSound={playingDataSound}
          />
        }
        ListFooterComponent={<ListFooter />}
        horizontal={false}
        style={{ width: '100%', height: '100%' }}
        data={playingDataSound}
        renderItem={({ item }) => (
          <SoundItems item={item} booked={item.booked} />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  pleerContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
})
