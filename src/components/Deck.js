import React ,{ useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated, FlatList, Image, PanResponder, Dimensions } from 'react-native';

const WIDTH = Dimensions.get('window').width;
const WIDTH_THRESHOLD = 0.25 * WIDTH;

const DATA = [
  { id: 1, text: 'Card #1', uri: 'https://i.ibb.co/3CHD6VG/couple-2.png' },
  { id: 2, text: 'Card #2', uri: 'https://i.ibb.co/QfM6SKm/Mexico.jpg' },
  { id: 3, text: 'Card #3', uri: 'https://i.ibb.co/QfM6SKm/Mexico.jpg' },
  { id: 4, text: 'Card #4', uri: 'https://i.ibb.co/Gsnw8Mf/Whats-App-Image-2021-07-16-at-12-50-26-PM-1.jpg' },
  { id: 5, text: 'Card #5', uri: 'https://i.ibb.co/QfM6SKm/Mexico.jpg' },
  { id: 6, text: 'Card #6', uri: 'https://i.ibb.co/7RtCWL7/Friends-1.png' },
  { id: 7, text: 'Card #7', uri: 'https://i.ibb.co/7RtCWL7/Friends-1.png' },
  { id: 8, text: 'Card #8', uri: 'https://i.ibb.co/7RtCWL7/Friends-1.png' },
];

const Item = ({ title,uri }) => (
  <View style={styles.item }>
    <Image source={{ uri: uri }} style={{ height: 200, width: 300 }}/>
    <Text style={styles.title}>{title}</Text>
  </View>
);


const getStyle = (position) => {

    const rotate = position.x.interpolate({
        inputRange: [-WIDTH * 2,0,WIDTH * 2],
        outputRange: ["-60deg" , "0deg" , "60deg"],
    });

    return {
        ...position.getLayout(),
        transform: [{rotate}]
    }
};

const Deck = (props) => {
    const [ indexD , setIndexD ] = useState(0);
    const renderItem = (item,index) => {
        if (indexD < DATA.length) {
            if(index < indexD) return null;
            if(index === indexD) {
                return (
                        <Animated.View key={item.id} style={getStyle(position)}  {...panResponder.panHandlers}>
                            <Item title={item.text} uri={item.uri}/>
                        </Animated.View>
                );
            }
            return (
                <Animated.View key={item.id} style={styles.cardStyle}>
                    <Item title={item.text} uri={item.uri}/>
                </Animated.View>
            )
        }
        else {
            return <Text> No more items to show .</Text>
        }
    };

    const position = useRef(new Animated.ValueXY()).current;

    const onSwipeLeft = (item) => {
        console.log("lefti");
    };

    const onSwipeRight = (item) => {
        console.log("righty");
    };

    const onSwipeComplete = (direction) => {
        const itemD = DATA[indexD];
        // direction === "right" ? onSwipeLeft(item) : onSwipeRight(item);
        position.setValue({x: 0, y: 0});
        setIndexD(indexD => indexD + 1);
    };
    
    const forceSwipe = (direction) => {
        Animated.timing(position,{
            toValue: {x: direction === 'right' ? WIDTH : -WIDTH ,y: 0},
            duration: 1000,
        }).start(() => onSwipeComplete(direction));
    };


    const panResponder = useRef(
        PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (e , gesture) => {
            position.setValue({ x: gesture.dx, y: gesture.dy});
        },
        onPanResponderRelease: (e, gesture) => {
            if(gesture.dx > WIDTH_THRESHOLD ) {
                console.log("LIKED THE USER");
                forceSwipe("right");
            }
            else if(gesture.dx < - WIDTH_THRESHOLD) {
                console.log("DISLIKED THE USER");
                forceSwipe("left");
            }
            else{
                Animated.spring(position,{
                    toValue: { x: 0 , y: 0},
                    useNativeDriver: false,
                }).start();
            }
        },
    })
    ).current;

    return(
        <View >
            <FlatList
                data={DATA}
                renderItem={({item , index}) => renderItem(item,index)}
                keyExtractor={item => item.id}
            />
        </View>
    )
};

export default Deck;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:  0,
    backgroundColor:'yellow',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    // position: 'absolute',
    // width: WIDTH,
  },
  cardStyle: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 50,
      bottom : 10,
  },
  title: {
    fontSize: 32,
  },
});