import { StyleSheet } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import SignedInStack from "./Navigation.js";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SignedInStack />
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
