import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors, Fonts, FontSizes } from "../styles/Common";

type Props = {
  label: string;
  theme?: 'primary';
  onPress?: () => void;
}

const Button = ({
  label,
  theme,
  onPress
}: Props) => {
  return (
    <View style={styles.btnContainer}>
      <Pressable style={styles.btn} onPress={onPress}>
        <Text style={styles.btnLabel}>{label}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  btnContainer: {
    width: 130,
    height: 44,
    marginHorizontal: 20,
    borderRadius: 30,
    overflow: "hidden",
  },
  btn: {
    width: '100%',
    height: '100%',
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row',
    backgroundColor: Colors.primary,
  },
  btnLabel: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.medium,
    color: Colors.text_black,
  }
})

export default Button;