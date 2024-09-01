import { QueryProvider } from "./features/react-query";
import { HomeScreen } from "./features/react/HomeScreen";

export function App() {
  return (
    <QueryProvider>
      <HomeScreen />
    </QueryProvider>
  );
}
