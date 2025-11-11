import { useFavoriteStore } from "@/store/useFavoriteStore";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";

interface ClearFavoritesModalProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ClearFavoritesModal({
  isVisible,
  setIsVisible,
}: Readonly<ClearFavoritesModalProps>) {
  const { resetList } = useFavoriteStore();
  const handleReset = () => {
    resetList();
    setIsVisible(false);
  };
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => setIsVisible(false)}
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropOpacity={0.6}
    >
      <View style={styles.modalContent}>
        <Text style={styles.title}>Eliminar lista de favoritos</Text>
        <Text style={styles.subtitle}>
          ¿Seguro que deseas eliminar todos los elementos de tu lista de
          favoritos? Esta acción no se puede deshacer.
        </Text>
        <View style={styles.buttons}>
          <Pressable
            style={styles.cancelButton}
            onPress={() => setIsVisible(false)}
          >
            <Text>Cancelar</Text>
          </Pressable>
          <Pressable style={styles.confirmButton} onPress={handleReset}>
            <Text style={styles.textConfirmButton}>Eliminar todo</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    margin: "auto",
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    color: "#af3737ff",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  cancelButton: {
    backgroundColor: "#c2c2c2ff",
    fontSize: 16,
    borderRadius: 8,
    padding: 8,
  },
  confirmButton: {
    backgroundColor: "#af3737ff",
    fontSize: 16,
    borderRadius: 8,
    padding: 8,
  },
  buttons: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  textConfirmButton: {
    color: "#fefefe",
  },
});
