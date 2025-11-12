import { AuthProvider } from "./AuthContext";
import { NotificationProvider } from "./NotificationProvider";
// ...rest of imports

export default function MonsterAgPortal() {
  // ...existing
  return (
    <AuthProvider>
      <NotificationProvider>
        { /* rest of Monster layout */ }
      </NotificationProvider>
    </AuthProvider>
  );
}
