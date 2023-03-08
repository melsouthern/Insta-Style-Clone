import { QueryClient, QueryClientProvider } from "react-query";
import AuthNavigation from "./AuthNavigation";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthNavigation />
    </QueryClientProvider>
  );
}
