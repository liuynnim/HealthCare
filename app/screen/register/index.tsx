import { BlobShape } from "@/app/component/BlobShape";
import { SafeAreaViewStyles } from "@/app/styles/Common";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Register = () => {
  return (
    <SafeAreaView style={SafeAreaViewStyles.SafeAreaView} >
      <View style={{ position: "absolute", width: "100%", height: "100%" }}>
        <BlobShape height={400} width={200} rotate="25deg" rx={80} ry={80} top={0} right={300} />
        <BlobShape height={400} width={200} rotate="70deg" rx={80} ry={120} top={500} right={300} />
        <BlobShape height={400} width={200} rotate="0deg" rx={80} ry={120} top={190} right={-30} />
        <BlobShape height={400} width={200} cx={100} cy={100} rotate="0deg" rx={100} ry={100} top={700} right={-40} />
      </View>
    </SafeAreaView>
  );
};

export default Register;