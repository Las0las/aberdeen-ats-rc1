import { NotificationFeed } from "@/components/notifications/notification-feed";

export default function NotificationsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold text-gray-900">Notifications</h1>
        <p className="text-sm text-gray-500">
          Org-wide activity feed — filter by entity type or time range.
        </p>
      </div>
      <NotificationFeed />
    </div>
  );
}
