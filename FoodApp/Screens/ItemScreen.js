import { StyleSheet, Text, View,TextInput,Button, Keyboard} from 'react-native'
import {Picker} from '@react-native-picker/picker';
import React, { useState }  from 'react'
import { firebase } from "../firebase";
import { SecondaryButton } from "../components/Button";
import Colors from "../constants/colors";


const ItemScreen = () => {
 


    const[itemName,setItemName] =useState('');
    const[image,setImage] =useState('');
    const[image1,setImage1] =useState('');
    const[image2,setImage2] =useState('');
    const[price,setPrice]   =useState('');
    const[description,setDescription]   =useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('1');


  const todoRef = firebase.firestore().collection("Products");

 //add a new field
 
 const dataAddOn = ()=>{
    // check if we have new field data

          const data = {
            itemName:itemName,
            image:image,image1:image1,image2:image2,
            price:parseInt(price),
            description:description,
            category:category,
            quantity:parseInt(quantity),

        };
        todoRef
        .add(data)
        .then(() => {

        setItemName('');
        setImage('');setImage1('');setImage2('');
        setPrice('');
        setDescription('');
        setCategory('');
        setQuantity(1)

        alert('Added ')
        })
        .catch((error)=>{

            alert(error);
        })


 

 }
  
   

  return (
    <View style={styles.container}>
         <Text style={styles.header}>Add Item</Text>
      <TextInput
        style={styles.TextInput}
        placeholder="Item Name"
        placeholderTextColor={Colors.grey}
        value={itemName}
        onChangeText={(itemName) => setItemName(itemName)} 
        />
        <View style={{ flexDirection:'row' }}>
        <Text style={{ fontSize: 25, fontWeight: "bold",marginLeft:20, }}>Image Url :</Text>
        <View style={{ width:'84%' }}>
        <TextInput
        style={styles.TextInput}
        placeholder=" Item Image1 Url"
        placeholderTextColor={Colors.grey}
        value={image}
        onChangeText={(image) => setImage(image)} 
        />
         <TextInput
        style={styles.TextInput}
        placeholder="Item Image2 Url"
        placeholderTextColor={Colors.grey}
        value={image1}
        onChangeText={(image1) => setImage1(image1)} 
        />
         <TextInput
        style={styles.TextInput}
        placeholder="Item Image3 Url"
        placeholderTextColor={Colors.grey}
        value={image2}
        onChangeText={(image2) => setImage2(image2)} 
        />
        </View>
        </View>
        <TextInput
          style={styles.TextInput}
          placeholder="Price."
          value={price}
          placeholderTextColor={Colors.grey}
          onChangeText={(text) => setPrice(text)} 
          />
          <TextInput
          style={styles.TextInput}
          placeholder="Description"
          value={description}
          placeholderTextColor={Colors.grey}
          onChangeText={(text) => setDescription(text)} 
          />
          
          <View style={styles.TextInput}>
          <Picker 
              selectedValue={category}
              onValueChange={(itemValue) => setCategory(itemValue)}
          >

              <Picker.Item style={{fontSize:22}} label="---Select foodType----"  />
              <Picker.Item style={{fontSize:22}} label="SriLankan" value="SriLankan" />
              <Picker.Item style={{fontSize:22}} label="Indian" value="Indian" />
              <Picker.Item style={{fontSize:22}} label="Chinese" value="Chinese" />
              <Picker.Item style={{fontSize:22}} label="Italian" value="Italian" />
              {/* Add more Picker.Item components as needed */}
          </Picker>
          
          </View>
          <TextInput
          style={{display:'none'}}
          value={quantity}
          placeholderTextColor="#003f5c"
          onChangeText={(quantity) => setQuantity(quantity)} 
          />

          <SecondaryButton
          title='Add data'
          onPress={dataAddOn} />
         
          
      </View>
  )
}

export default ItemScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'

    },
   
    
    header:{
        textAlign: 'center',
        fontSize: 30,
        marginTop:100,
        fontWeight: 'bold',
       
    },
    TextInput:{
        borderWidth:1,
        height:70,
        margin:10,
        borderColor:'black',
        margin:20,
        padding:10,
        fontSize:18,
        fontSize:22,
        borderRadius:6,
        justifyContent:'center'
    },

  

})