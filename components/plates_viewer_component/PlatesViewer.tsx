import { StyleSheet, Text, View } from 'react-native'

const Plates_Viewer = () => {
  return (
    <View style={styles.container}>
      <Text>Plates Viewer</Text>
    </View>
  )
}

export default Plates_Viewer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
