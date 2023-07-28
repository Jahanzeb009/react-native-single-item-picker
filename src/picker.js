import { View, Text, Dimensions, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'

const { width } = Dimensions.get('window')

export const Picker = ({ data, boxHeight, setItem }) => {

    const scrollY = useRef(new Animated.Value(0)).current

    const pickerRef = useRef(null)

    const currentYear = new Date().getFullYear();
    const scrollToIndex = data.indexOf(currentYear);

    useEffect(() => {
        setTimeout(() => {
            pickerRef.current.scrollToIndex({ index: scrollToIndex })
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
                    borderBottomWidth: 1,
                    elevation: 5,
                    shadowOpacity: .2,
                    shadowColor: 'black',
                    backgroundColor: 'white',
                    shadowOffset: { width: 0, height: 0 }
                }} />
            </View>

            <View style={{ height: boxHeight * 5 }}>
                <Animated.FlatList
                    data={data}
                    pagingEnabled
                    ref={pickerRef}
                    getItemLayout={getItemLayout}
                    snapToInterval={boxHeight}
                    showsVerticalScrollIndicator={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: true }
                    )}
                    onMomentumScrollEnd={(event) => {
                        const offsetY = event.nativeEvent.contentOffset.y;
                        const selectedIndex = Math.round(offsetY / boxHeight);
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
                            outputRange: [.4, .7, 1, .7, .4]
                        })

                        const rotateX = scrollY.interpolate({
                            inputRange,
                            outputRange: ['70deg', '40deg', '0deg', '-40deg', '-70deg']
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
