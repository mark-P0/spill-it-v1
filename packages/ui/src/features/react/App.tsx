import { QueryProvider } from "../react-query";
import { HomeScreen } from "./HomeScreen";

export function App() {
  return (
    <QueryProvider>
      <HomeScreen />
    </QueryProvider>
  );
}
