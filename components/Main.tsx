import { SafeAreaView, StyleSheet, Platform, StatusBar } from 'react-native'

import BarbellViewer from './barbell_viewer_component/BarbellViewer'
import PlatesViewer from './plates_viewer_component/PlatesViewer'

const Main = () => {
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <BarbellViewer />
      <PlatesViewer />
    </SafeAreaView>
  )
}

export default Main

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: 'purple',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
})
