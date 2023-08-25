import { StyleSheet, Text, View, FlatList ,Image} from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/colors";

const CardSlider = ({ title, data }) => {

  const navigation = useNavigation();

  const openDetailPage = (item)=>{

    navigation.navigate('ItemDetailScreen',item)

  }

  return (

    
    <View >
      
      <Text style={{ fontSize: 40,fontFamily:'', fontWeight: "bold",marginLeft:40,color:Colors.primary1 }}>
        {title}
      </Text>
      
      <FlatList
        style={styles.cart}
        horizontal
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.Card,
              // { opacity: item.IsLive === 1 ? 0.5 : 1 }, // Set opacity based on IsLive value
            ]}
            key={item.index}
            onPress={() => { openDetailPage(item);
              // if (item.IsLive !== 1) {
              //   openDetailPage(item);
              // }
            }}
          >
            {item.IsLive == 0 && (
              <View style={styles.outOfStockContainer}>
                <Text style={styles.outOfStockText}>Out of Stock</Text>
              </View>
            )}

            <Image
              source={{ uri: item.image }}
              style={{ width: "95%", height: 280, borderRadius: 10, marginTop: 10 ,opacity: item.IsLive == 0 ? 0.5 : 1 }}
            />
            <Image source={{ uri: item.image1 }} />
            <Image source={{ uri: item.image2 }} />
            <View
              style={{
                height: 200,
                paddingVertical: 20,
                flex: 1,
                justifyContent:'center',
                margin:5, marginBottom:10,
                alignItems:"center"
                
                
              }}
            >
              <Text
                style={{ fontSize: 35, fontWeight: "bold", color: Colors.black ,justifyContent:"center",alignItems:'center' }} >
                {item.itemName}
              </Text>
           

               {/* <View style={{height:62}}>

               <Text style={{ fontSize: 25, fontWeight: "bold", color: "grey" }}>
                {item.description}
              </Text>

               </View> */}
             
              <Text
                style={{ fontSize: 30, fontWeight: "bold", color: Colors.black, justifyContent:"center",alignItems:'center'}} >
                {'Rs.' + item.price}
              </Text>

              <Text
                style={{ fontSize: 28, fontWeight: "bold", color: Colors.white , display:'none' }} >
               {item.quantity}
              </Text>

             
              {/* {item.category=='Indian'? <Text style={{color:'red'}} title="op3" data={option3}>op3</Text>:<Text style={{color:'blue'}}>op2</Text>}  */}
            </View>

            
          </TouchableOpacity>
        )}
      />
    
    </View>
  );
};

export default CardSlider;

const styles = StyleSheet.create({

  
  cart: {
    width: "100%",
   
  },
  Card: {
    borderRadius: 10,
    height: 400,
    width: 400,
    elevation: 25,
    backgroundColor: Colors.white,
    alignItems: "center",
    margin:20,
   
  },
  outOfStockContainer: {
    ...StyleSheet.absoluteFill,
    alignItems:"center",
   // backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 10,
  },
  outOfStockText: {
    fontSize: 50,
    fontWeight: "bold",
    color:'red',
    top:100

  },
 
});
