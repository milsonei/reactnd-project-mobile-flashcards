import { StyleSheet } from 'react-native'
export const activityIndicatorStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})

export const commomStyles = StyleSheet.create({
  centerVertically: {
    marginTop: "auto",
    marginBottom: "auto"
  },
  centerHorizontally: {
    marginLeft: "auto",
    marginRight: "auto"
  },
  centerText: {
    textAlign: "center"
  },
  centerContent: {
    alignContent:"center"
  },
  maxWidth: {
    width:"100%"
  }
})