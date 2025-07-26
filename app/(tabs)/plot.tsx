import { Collapsible } from "@/components/Collapsible";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Plot } from "@/helpers/parserPolygonFeature.helper";
import { usePlotStore } from "@/stores/plots.store";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

const CollapsibleItem = ({ item }: { item: Plot }) => {
  const { removePlot } = usePlotStore();
  const router = useRouter();

  const [imgBase64, setImgBase64] = useState();
  useEffect(() => {
    if (imgBase64) console.log("LOADED : ", imgBase64.length);
  }, [imgBase64]);

  return (
    <Collapsible title={"_ID : " + item._ID}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 8,
          marginBottom: 8,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#844fffff",
            borderRadius: 8,
            paddingTop: 12,
            paddingBottom: 12,
            paddingLeft: 32,
            paddingRight: 32,
          }}
          onPress={() => {
            router.push({
              pathname: "/",
              params: {
                lat: item.center_coordinates.geometry.coordinates[1],
                lng: item.center_coordinates.geometry.coordinates[0],
              },
            });
          }}
        >
          <ThemedText
            style={{
              fontFamily: "SpaceMono",
              color: "#ffffffff",
              fontWeight: "800",
              letterSpacing: 1,
            }}
          >
            View on Map
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "#e42626ff",
            borderRadius: 8,
            paddingTop: 12,
            paddingBottom: 12,
            paddingLeft: 32,
            paddingRight: 32,
          }}
          onPress={() => {
            removePlot(item._ID);
          }}
        >
          <ThemedText
            style={{
              fontFamily: "SpaceMono",
              color: "#ffffffff",
              letterSpacing: 1,
            }}
          >
            Delete
          </ThemedText>
        </TouchableOpacity>
      </View>

      <ThemedText
        style={{
          fontFamily: "SpaceMono",
          color: "#00ffddff",
          fontWeight: "900",
          letterSpacing: 1,
        }}
      >
        Area :{" "}
        <ThemedText type="defaultSemiBold">
          {item.area.toFixed(0)} m2
        </ThemedText>
      </ThemedText>

      <ThemedText
        style={{
          fontFamily: "SpaceMono",
          color: "#00ffddff",
          fontWeight: "900",
          letterSpacing: 1,
        }}
      >
        Center Coordinates :{" "}
        <ThemedText type="defaultSemiBold">
          {item.center_coordinates.geometry.coordinates[0]}
        </ThemedText>{" "}
        <ThemedText type="defaultSemiBold">
          {item.center_coordinates.geometry.coordinates[1]}
        </ThemedText>
      </ThemedText>

      <ThemedText
        style={{
          fontFamily: "SpaceMono",
          color: "#00ffddff",
          fontWeight: "900",
          letterSpacing: 1,
        }}
      >
        Geo JSON :{" "}
      </ThemedText>
      <View
        style={{
          padding: 20,
          paddingTop: 10,
          paddingBottom: 10,
          backgroundColor: "#434343ff",
          borderRadius: 10,
        }}
      >
        <ThemedText type="defaultSemiBold" style={{ fontSize: 14 }}>
          {JSON.stringify(item.geo_json, null, 2)}
        </ThemedText>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "#844fffff",
          borderRadius: 8,
          paddingTop: 12,
          paddingBottom: 12,
          paddingLeft: 32,
          paddingRight: 32,
          position: "absolute",
          zIndex: 99,
          bottom: 50,
        }}
        onPress={async () => {
          const res = await fetchNDVI();
          setImgBase64(res as any);
        }}
      >
        <ThemedText
          style={{
            fontFamily: "SpaceMono",
            color: "#ffffffff",
            fontWeight: "800",
            letterSpacing: 1,
            fontSize: 40,
          }}
        >
          LOAD NDVI
        </ThemedText>
      </TouchableOpacity>

      {imgBase64 && (
        <Image
          source={{ uri: imgBase64 }}
          style={{ width: 300, height: 300 }}
        />
      )}
    </Collapsible>
  );
};

export default function PlotScreen() {
  const { plots } = usePlotStore();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons
          name="grid"
          size={250}
          color="#808080"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Plots</ThemedText>
      </ThemedView>

      {plots.length ? (
        plots.map((item) => <CollapsibleItem item={item} key={item._ID} />)
      ) : (
        <></>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -70,
    left: 5,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
const raw = JSON.stringify({
  input: {
    bounds: {
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-58.80402184331061, -30.618822036729924],
            [-58.850117878143635, -30.766102322208283],
            [-59.03107007788641, -30.79664774209298],
            [-59.007164315031716, -30.948178524163303],
            [-58.6987121591597, -31.013031635538617],
            [-58.50942292279967, -30.751458576762737],
            [-58.58580010143038, -30.618822036729924],
            [-58.80213454487429, -30.621500103968522],
            [-58.80358508062335, -30.61858913888141],
            [-58.80402184331061, -30.618822036729924],
          ],
        ],
      },
      properties: {
        crs: "http://www.opengis.net/def/crs/OGC/1.3/CRS84",
      },
    },
    data: [
      {
        type: "sentinel-2-l1c",
        dataFilter: {
          timeRange: {
            from: "2018-06-01T00:00:00Z",
            to: "2025-08-31T00:00:00Z",
          },
        },
      },
    ],
  },
  output: {
    width: 512,
    height: 512,
    responses: [
      {
        format: {
          type: "image/jpeg",
        },
      },
    ],
  },
  evalscript:
    '//VERSION=3\nfunction setup(){return{input:["B04","B08"],output:{bands:3}};}const ramp=[[-0.5,0x0c0c0c],[-0.2,0xbfbfbf],[-0.1,0xdbdbdb],[0,0xeaeaea],[0.025,0xfff9cc],[0.05,0xede8b5],[0.075,0xddd89b],[0.1,0xccc682],[0.125,0xbcb76b],[0.15,0xafc160],[0.175,0xa3cc59],[0.2,0x91bf51],[0.25,0x7fb247],[0.3,0x70a33f],[0.35,0x609635],[0.4,0x4f892d],[0.45,0x3f7c23],[0.5,0x306d1c],[0.55,0x216011],[0.6,0x0f540a],[1,0x004400]];const visualizer=new ColorRampVisualizer(ramp);function evaluatePixel(s){return visualizer.process(index(s.B08,s.B04));}',
});

const fetchNDVI = async () => {
  const response = await fetch(
    "https://services.sentinel-hub.com/api/v1/process",
    {
      method: "POST",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ3dE9hV1o2aFJJeUowbGlsYXctcWd4NzlUdm1hX3ZKZlNuMW1WNm5HX0tVIn0.eyJleHAiOjE3NTM0OTA3ODMsImlhdCI6MTc1MzQ4NzE4MywianRpIjoiMjUwMGU4NzUtNjdjMS00MGMwLTliNWMtNmZiM2MxMmZhN2I2IiwiaXNzIjoiaHR0cHM6Ly9zZXJ2aWNlcy5zZW50aW5lbC1odWIuY29tL2F1dGgvcmVhbG1zL21haW4iLCJhdWQiOiJodHRwczovL2FwaS5wbGFuZXQuY29tLyIsInN1YiI6ImJhNmNiMzdkLWFkOTctNDFhYi1iZmUzLTMxOTBiNjdhZTNjOCIsInR5cCI6IkJlYXJlciIsImF6cCI6ImI5YzY1NDM2LTg4ZWQtNGU1Yy1iODdmLTU4M2JmMTg4YjZkMiIsInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsImNsaWVudEhvc3QiOiI1NC44Ni41MC4xMzkiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInBsX3Byb2plY3QiOiI1ZmM2MzZjNi0yNmI0LTRkOWUtYTJiZS1hZGE4ZDRiYWYwODUiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzZXJ2aWNlLWFjY291bnQtYjljNjU0MzYtODhlZC00ZTVjLWI4N2YtNTgzYmYxODhiNmQyIiwiY2xpZW50QWRkcmVzcyI6IjU0Ljg2LjUwLjEzOSIsImNsaWVudF9pZCI6ImI5YzY1NDM2LTg4ZWQtNGU1Yy1iODdmLTU4M2JmMTg4YjZkMiIsImFjY291bnQiOiI1ZmM2MzZjNi0yNmI0LTRkOWUtYTJiZS1hZGE4ZDRiYWYwODUiLCJwbF93b3Jrc3BhY2UiOiJhNjE5YzQ4Zi0wOGMwLTQ1ODAtODNkNC1jMjMzZjJlOWVmNDYifQ.NfXtpCNzroSNKebCRBFQ9X7-egj7-nLlQS7O-Q1VgELqKLXY6nhg4J0JWXi-ei9hImyC88CNjKS43pW3NE8PmPYuB3MaBq7Pj_TvUBFlHGzcwi2cZPqbVxSB-KBpWEpo3yrAEEzioklQwk3DAPQh1n5YSy3YM3hhbSmsSCLFtzlVsGeAyZuRd9SxpunUyIiOVCZZdQdM5N7AYiyKZ1QKTNcT8hg0yISKYNaH94r0DOuL3QELnORZnh3_BODczO2l1MdtnS2L_T2fjiZYAL6dxGK-sPgvsQrczI4vpZ3sjyyBEGtqLPk1el4V0uZFjx6tfREZTngxr9wvg6qFfG_Tkw",
        "Content-Type": "application/json",
      },
      body: raw,
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("NDVI error:", errorText);
    return null;
  }

  const blob = await response.blob();
  console.error("NDVI blob:", blob);

  // Convertir blob a Base64 directamente
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result;

      resolve(base64Data); // data:image/png;base64,...
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
