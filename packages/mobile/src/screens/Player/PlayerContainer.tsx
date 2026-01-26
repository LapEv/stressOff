import { StyleSheet, FlatList } from 'react-native'
import { IPlayerContainer } from './interfaces'
import { ListHeader } from './ListHeader'
import { ListFooter } from './ListFooter'
import { View } from '@/components'
import { SoundItems } from './SoundItems'
import { usePlay } from '@/hooks'

export const PlayerContainer = ({ navigation }: IPlayerContainer) => {
  const [{ soundsPlay }] = usePlay()

  return (
    <View style={styles.pleerContainer}>
      <FlatList
        ListHeaderComponent={
          <ListHeader
            navigation={navigation}
            playingDataSound={soundsPlay.mixedSound}
          />
        }
        ListFooterComponent={<ListFooter />}
        horizontal={false}
        style={{ width: '100%', height: '100%' }}
        data={soundsPlay.mixedSound}
        renderItem={({ item }) => (
          <SoundItems item={item} booked={item.booked} />
        )}
        keyExtractor={item => item._id}
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
