import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Topbar from "../components/Topbar";
import theme from "../styles/theme";
import useAuth from "../hooks/useAuth";
import { WIDTH } from "../constants";

const { colors } = theme;

const Profile = () => {
  const { user } = useAuth();
  const {
    primaryImageUrl,
    secondaryImagesUrl,
    firstName,
    lastName,
    career,
    description,
  } = user;
  return (
    <View style={styles.page}>
      <Topbar displayStyles={styles.topbar}>
        <Text style={styles.topbarText}>Mi perfil</Text>
      </Topbar>
      <ScrollView style={styles.container}>
        <View style={{ padding: 20 }}>
          <View style={styles.row}>
            <Text style={[styles.heading, { marginTop: 0 }]}>
              Foto principal
            </Text>
            <TouchableOpacity>
              <Text style={styles.button}>Cambiar</Text>
            </TouchableOpacity>
          </View>
          <Image source={{ uri: primaryImageUrl }} style={styles.image} />
          <View style={styles.row}>
            <Text style={styles.subheading}>Fotos secundarias</Text>
            <TouchableOpacity>
              <Text style={styles.button}>Actualizar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            {secondaryImagesUrl.map((imageUrl: string) => (
              <Image
                source={{ uri: imageUrl }}
                style={styles.secondaryImage}
                key={imageUrl}
              />
            ))}
          </View>
          <View style={styles.row}>
            <Text style={[styles.subheading, { marginBottom: 0 }]}>
              Información personal
            </Text>
            <Text style={styles.button}>Actualizar</Text>
          </View>
          <View style={styles.row}>
            <View>
              <Text style={styles.label}>Nombre</Text>
              <Text style={styles.text}>{firstName}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.label, { textAlign: "center" }]}>
                Apellido
              </Text>
              <Text style={[styles.text, { textAlign: "center" }]}>
                {lastName}
              </Text>
            </View>
          </View>
          <Text style={styles.label}>Carrera</Text>
          <Text style={styles.text}>{career}</Text>
          <Text style={styles.label}>Bio</Text>
          <Text style={styles.text}>{description}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.bg,
    flex: 1,
  },
  topbar: {
    alignItems: "center",
    justifyContent: "center",
  },
  topbarText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {},
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  heading: {
    fontSize: 20,
    color: colors.textBlack,
    fontWeight: "bold",
    marginVertical: 20,
  },
  subheading: {
    fontSize: 18,
    color: colors.textBlack,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 20,
  },
  label: {
    marginTop: 20,
    color: colors.textDarkGray,
    fontWeight: "bold",
  },
  text: {
    color: colors.textBlack,
    fontSize: 18,
  },
  image: {
    width: WIDTH - 40,
    height: WIDTH - 40,
    borderRadius: 5,
  },
  secondaryImage: {
    width: (WIDTH - 40) / 3,
    height: (WIDTH - 40) / 3,
    borderRadius: 5,
  },
  button: {
    color: colors.textGray,
    fontWeight: "bold",
  },
});
