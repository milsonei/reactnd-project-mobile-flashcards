import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { activityIndicatorStyles } from '../utils/styles'
export default function Loading() {
    return (
        <View style={[activityIndicatorStyles.container, activityIndicatorStyles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
    )
}