import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { activityIndicatorStyles } from '../utils/styles'
/**
 * Component that renders an activity indicator while the screen data is loaded
 */
export default function Loading() {
    return (
        <View style={[activityIndicatorStyles.container, activityIndicatorStyles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
    )
}