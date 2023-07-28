import { View, Text, Dimensions, Animated, TouchableOpacity, Button } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar'

const { width, height } = Dimensions.get('window')


const Picker = ({ data, boxHeight, setItem }) => {

  const scrollY = useRef(new Animated.Value(0)).current

  const pickerRef = useRef(null)

  const currentYear = new Date().getFullYear();
  const scrollToIndex = data.indexOf(currentYear);

  useEffect(() => {
    setTimeout(() => {
      pickerRef.current.scrollToIndex({ index: scrollToIndex, animated: true })
    }, 100);
  }, []);

  const getItemLayout = (data, index) => ({
    length: boxHeight,
    offset: boxHeight * index,
    index,
  })

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      <View style={{ position: 'absolute' }}>
        <View style={{
          width,
          height: boxHeight,
          borderTopWidth: 1,
          borderBottomWidth: 1
          // elevation: 5,
          // shadowOpacity: .2,
          // shadowColor: 'black',
          // backgroundColor: 'white',
          // shadowOffset: { width: 0, height: 0 }
        }} />
      </View>

      <View style={{ height: boxHeight * 5 }}>
        <Animated.FlatList
          data={data}
          pagingEnabled
          ref={pickerRef}
          getItemLayout={getItemLayout}

          // initialScrollIndex={8}
          // bounces={false}
          snapToInterval={boxHeight}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          onMomentumScrollEnd={(event) => {
            const offsetY = event.nativeEvent.contentOffset.y;
            const selectedIndex = Math.round(offsetY / boxHeight);
            // setSelectedYear(years[selectedIndex]);
            setItem(data[selectedIndex])
          }}
          contentContainerStyle={{ justifyContent: 'center', alignItems: "center", width, paddingVertical: boxHeight * 2 }}
          renderItem={({ item, index }) => {

            const inputRange = [
              (index - 2) * boxHeight,
              (index - 1) * boxHeight,
              index * boxHeight,
              (index + 1) * boxHeight,
              (index + 2) * boxHeight,
            ];

            const scale = scrollY.interpolate({
              inputRange,
              outputRange: [.6, .7, 1, .7, .6]
            })

            const opacity = scrollY.interpolate({
              inputRange,
              outputRange: [.4, .7, 1, .7, .4],
              // extrapolate: 'clamp'
            })

            const rotateX = scrollY.interpolate({
              inputRange,
              outputRange: ['70deg', '40deg', '0deg', '-40deg', '-70deg'],
              extrapolate: 'clamp'
            })

            return (
              <Animated.View style={{
                opacity,
                height: boxHeight,
                alignItems: 'center',
                justifyContent: 'center',
                transform: [
                  { scale },
                  { rotateX }
                ]
              }}>
                <Text style={{ color: 'black', fontSize: width * 0.08 }}>{item}</Text>
              </Animated.View>
            )
          }}
        />

      </View>

    </View>
  )
}


const yearBoxHeight = Math.floor(height * .08)

const App = () => {

  const [selectedYear, setSelectedYear] = useState(null);

  const currentYear = new Date().getFullYear();

  const years = [];

  for (let year = currentYear - 20; year <= currentYear + 20; year++) {
    years.push(year);
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', }}>
      <StatusBar style='dark' />
      <View style={{ flex: .5, alignItems: "center", justifyContent: 'center', }}>
        <Text style={{}}>selected year : {selectedYear}</Text>
      </View>
      <Picker setItem={setSelectedYear} data={years} boxHeight={yearBoxHeight} />
    </View>
  )
}

export default App