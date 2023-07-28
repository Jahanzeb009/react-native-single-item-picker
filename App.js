import { View, Text, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Picker } from './src/picker'

const { height } = Dimensions.get('window')
const yearBoxHeight = Math.floor(height * .08)

const App = () => {

  const [selectedYear, setSelectedYear] = useState(null);

  const currentYear = new Date().getFullYear();

  const years = [];

  for (let year = currentYear - 20; year <= currentYear + 20; year++) {
    years.push(year);
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <StatusBar style='dark' />

      <View style={{ flex: .5, alignItems: "center", justifyContent: 'center', }}>
        <Text>selected year : {selectedYear}</Text>
      </View>

      <Picker setItem={setSelectedYear} data={years} boxHeight={yearBoxHeight} />
    </View>
  )
}

export default App