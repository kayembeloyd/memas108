import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  Animated,
  StyleSheet,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  Easing,
  View,
  Platform,
  ScrollView,
  BackHandler,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import TextInputUI from "../uicomponents/TextInputUI";
import Icons from "../../assets/icons/Icons";
import DefaultButton from "../uicomponents/DefaultButton";
import MiddleMan from "../../database/MiddleMan";

export default forwardRef(function ScanBottomSheet({ navigation }, ref) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      openSheet: openSheet,
      closeSheet: closeSheet,
    };
  });

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const [isSheetVisible, setSheetVisibility] = useState(false);

  const { height } = useWindowDimensions();
  const sheetAnim = useRef(new Animated.Value(42)).current;

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (isSheetVisible) {
          closeSheet();
          return true;
        } else false;
      }
    );

    return () => backHandler.remove();
  });

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();

    const unsubscribe = navigation.addListener("focus", () => {
      setScanned(false);
      requestPermission();
    });

    return unsubscribe;
  }, [navigation]);

  const openSheet = () => {
    Animated.timing(sheetAnim, {
      toValue:
        height -
        ((Platform.OS === "android") | (Platform.OS === "ios") ? 50 + 24 : 50),
      duration: 100,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
    setSheetVisibility(!isSheetVisible);
  };

  const closeSheet = () => {
    Animated.timing(sheetAnim, {
      toValue: 42,
      duration: 100,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
    setSheetVisibility(!isSheetVisible);
  };

  const updatedEquipment = () => null;

  return (
    <Animated.View
      style={{
        width: "95%",
        maxWidth: 700,
        backgroundColor: "white",
        borderColor: "#4CAF50",
        borderWidth: 2,
        borderBottomWidth: 0,
        height: sheetAnim,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
    >
      <View style={{}}>
        <TouchableOpacity
          style={{
            backgroundColor: "#4CAF50",
            justifyContent: "center",
            alignItems: "center",
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            height: 42,
          }}
          onPress={() => {
            isSheetVisible ? closeSheet() : openSheet();
          }}
        >
          <View>
            <Icons name="drag-handle" />
            <Text
              style={{
                marginTop: 5,
                textAlign: "center",
                fontSize: 16,
                fontWeight: "500",
                color: "#fff",
              }}
            >
              Scan Equipment
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "column", flex: 1 }}>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            height: "100%",
            flex: 1,
          }}
        >
          {isSheetVisible ? (
            <Camera
              style={{
                width: "90%",
                backgroundColor: "black",
                flex: 1,
                flexDirection: "row",
              }}
              type={type}
              onBarCodeScanned={(barCodeScanningResult) => {
                if (!scanned) {
                  const scannedCode = barCodeScanningResult.data;

                  if (scannedCode.startsWith("MEMASCODE")) {
                    const codeComponents = scannedCode.split(":");

                    if (codeComponents.length == 5) {
                      setScanned(true);

                      // Oky
                      const fixedCode =
                        codeComponents[2] +
                        codeComponents[3] +
                        codeComponents[4] +
                        "";

                      MiddleMan.equipmentGet(fixedCode).then((equipment) => {
                        navigation.navigate("EquipmentViewScreen", {
                          equipment: equipment,
                          updateParent: updatedEquipment,
                        });
                      });
                    } else console.log("invalid code 1");
                  } else console.log("invalid code 2");
                }
                /* Sample code
                MEMASCODE:MW:MJ:01:001

                MEMASCODE
                COUNTRY
                DISTRICT 
                BATCH
                EQUIPMENT NUMBER

                MJ01001
                */
              }}
            ></Camera>
          ) : (
            <></>
          )}
        </View>

        {isSheetVisible ? (
          <TextInputUI
            style={{
              backgroundColor: "#fff",
              marginTop: 10,
              marginHorizontal: 10,
            }}
            hint="Machine code"
          />
        ) : (
          <></>
        )}

        {isSheetVisible ? (
          <View style={{ width: "100%", alignItems: "center" }}>
            <DefaultButton
              style={{
                margin: 10,
                width: "60%",
                maxWidth: 700,
              }}
              text={"Ok"}
            />
          </View>
        ) : (
          <></>
        )}
      </View>
    </Animated.View>
  );
}, []);

const styles = StyleSheet.create({
  textInputStyles: {
    backgroundColor: "#fff",
    marginTop: 10,
    marginHorizontal: 10,
    flex: 1,
  },
});
