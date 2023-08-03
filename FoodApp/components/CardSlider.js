import { StyleSheet, Text, View, FlatList ,Image} from "react-native";
import React from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const CardSlider = ({ title, data }) => {

  const navigation = useNavigation();

  const openDetailPage = (item)=>{

    navigation.navigate('ItemDetailScreen',item)

  }

  return (

    
    <View >
      
      <Text style={{ fontSize: 40,fontFamily:'', fontWeight: "bold", color: "black",marginLeft:40,color:'#f07048' }}>
        {title}
      </Text>
      
      <FlatList
        style={styles.cart}
        horizontal
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.Card}  key={item.index} onPress={()=> {openDetailPage(item)}
          }  >
           
            <Image
              source={{ uri: item.image }}
              style={{ width:"95%", height: 200, borderRadius: 10 ,marginTop:10}}
            />
            <Image
              source={{ uri: item.image1 }}
             
            />
            <Image
              source={{ uri: item.image2 }}
              
            />
            <View
              style={{
                height: 200,
                paddingVertical: 20,
                flex: 1,
                justifyContent:'center',
                margin:5, marginBottom:10
                
                
              }}
            >
              <Text
                style={{ fontSize: 35, fontWeight: "bold", color: "black" }} >
                {item.itemName}
              </Text>

               <View style={{height:62}}>

               <Text style={{ fontSize: 25, fontWeight: "bold", color: "grey" }}>
                {item.description}
              </Text>

               </View>
             
              <Text
                style={{ fontSize: 28, fontWeight: "bold", color: "black" }} >
                {'Rs.' + item.price}
              </Text>

              <Text
                style={{ fontSize: 28, fontWeight: "bold", color: "white" }} >
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
 
});
