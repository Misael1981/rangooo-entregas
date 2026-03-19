"use client";

import { savePushSubscription } from "@/app/actions/save-push-subscription";
import { useEffect, useCallback } from "react";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

export function PushRegister({
  deliveryPersonId,
}: {
  deliveryPersonId: string;
}) {
  const registerServiceWorker = useCallback(async () => {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      await navigator.serviceWorker.ready;

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
        ),
      });

      await savePushSubscription(
        deliveryPersonId,
        JSON.parse(JSON.stringify(subscription)),
      );

      console.log("✅ Motoca pronto para receber notificações!");
    } catch (err) {
      console.warn("⚠️ Push não configurado:", err);
    }
  }, [deliveryPersonId]);

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      registerServiceWorker();
    }
  }, [registerServiceWorker]);

  return null;
}
