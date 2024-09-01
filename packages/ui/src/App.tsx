import { HomeScreen } from "./components/screens/HomeScreen";
import { QueryProvider } from "./features/react-query";

export function App() {
  return (
    <QueryProvider>
      <HomeScreen />
    </QueryProvider>
  );
}
