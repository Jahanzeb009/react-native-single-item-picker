import { View, Text, Dimensions, Animated, TouchableOpacity, Button } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

const { width, height } = Dimensions.get('window')

const Picker = props => {

  const scrollY = useRef(new Animated.Value(0)).current

  const pickerRef = useRef(null)

  const currentYear = new Date().getFullYear();
  const scrollToIndex = props.data.indexOf(currentYear);

  useEffect(() => {
    // Replace 2 with the desired index to scroll to
    // pickerRef.current.scrollToIndex({ index: 5, animated: true })
  }, []);

  console.log(props.data[scrollToIndex])


  const getItemLayout = (data, index) => ({
    length: 50,
    offset: 50 * index,
    index,
  })

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
<View style={{position:'absolute', top:5}} >
  
      <Button title='scrollTo' onPress={()=>{pickerRef.current.scrollToIndex({ index: scrollToIndex, animated: true })}}/>
</View>

      <View style={{ position: 'absolute' }}>
        <View style={{
          width,
          height: 50,
          borderTopWidth: 1,
          borderBottomWidth: 1
          // elevation: 5,
          // shadowOpacity: .2,
          // shadowColor: 'black',
          // backgroundColor: 'white',
          // shadowOffset: { width: 0, height: 0 }
        }} />
      </View>

      <View style={{ height: 250 }}>
        <Animated.FlatList
          data={props.data}
          pagingEnabled
          ref={pickerRef}
          getItemLayout={getItemLayout}

          // initialScrollIndex={8}
          // bounces={false}
          snapToInterval={50}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          onMomentumScrollEnd={(event) => {
            const offsetY = event.nativeEvent.contentOffset.y;
            const selectedIndex = Math.round(offsetY / 50);
            // setSelectedYear(years[selectedIndex]);
            props.setItem(props.data[selectedIndex])
          }}
          contentContainerStyle={{ justifyContent: 'center', alignItems: "center", width, paddingVertical: 100 }}
          renderItem={({ item, index }) => {

            const inputRange = [
              (index - 2) * 50,
              (index - 1) * 50,
              index * 50,
              (index + 1) * 50,
              (index + 2) * 50,
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
                height: 50,
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

const App = () => {

  const [selectedYear, setSelectedYear] = useState(null);

  const currentYear = new Date().getFullYear();

  const years = [];

  for (let year = currentYear - 20; year <= currentYear + 20; year++) {
    years.push(year);
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', }}>

      <View style={{ flex: .5, alignItems: "center", justifyContent: 'center', }}>
        <Text style={{}}>selected year : {selectedYear}</Text>
      </View>
      <Picker setItem={setSelectedYear} data={years} />
    </View>
  )
}

export default App