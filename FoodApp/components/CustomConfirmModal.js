import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "../constants/colors";

const CustomConfirmModal = ({ isVisible, onClose, onConfirm,message,title,ConfirmText,CancelText}) => {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.confirmModalContainer}>
        <View style={styles.confirmModal}>
          <Text style={styles.confirmModalTitle}>{title}</Text>
          <Text style={styles.confirmModalText}>
            {message}
          </Text>
          <View style={styles.confirmModalButtons}>

          <TouchableOpacity
              style={[styles.confirmModalButton, styles.confirmButton]}
              onPress={onConfirm}
            >
              <Text style={styles.confirmModalButtonText}>{ConfirmText}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.confirmModalButton, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.confirmModalButtonText}>{CancelText}</Text>
            </TouchableOpacity>
           
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    confirmModalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
      confirmModal: {
        backgroundColor: Colors.white,
        padding: 20,
        borderRadius: 10,
        width: "80%",
      },
      confirmModalTitle: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 10,
      },
      confirmModalText: {
        fontSize: 25,
        marginBottom: 20,
      },
      confirmModalButtons: {
        flexDirection: "row",
        justifyContent: "flex-end",
      },
      confirmModalButton: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginLeft: 10,
      },
      cancelButton: {
        backgroundColor: Colors.primary3,
      },
      confirmButton: {
        backgroundColor: Colors.primary1,
      },
      confirmModalButtonText: {
        color:Colors.white,
        fontSize: 20,
      },
});

export default CustomConfirmModal;
