"use server";

import { db } from "@/lib/prisma";

export async function savePushSubscription(
  deliveryPersonId: string,
  subscription: PushSubscriptionJSON,
) {
  if (
    !subscription.endpoint ||
    !subscription.keys?.auth ||
    !subscription.keys?.p256dh
  ) {
    return { success: false, error: "Subscription inválida" };
  }

  await db.pushSubscription.upsert({
    where: { endpoint: subscription.endpoint },
    update: {},
    create: {
      deliveryPersonId,
      endpoint: subscription.endpoint,
      auth: subscription.keys.auth,
      p256dh: subscription.keys.p256dh,
    },
  });

  return { success: true };
}
