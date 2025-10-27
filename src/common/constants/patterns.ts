export const NotificationBasePrefix = 'notification.';

export const getNotificationPatterns = (name: NotificationPatterns) => {
  return NotificationBasePrefix + name + ':' + process.env.NODE_ENV;
};

export enum NotificationPatterns {
  getAllNotifications = 'getAllNotifications',
  markAsRead = 'markAsRead',
  deleteNotification = 'deleteNotification',
  clearAllNotifications = 'clearAllNotifications',
  email = 'email',
  inApp = 'inApp',
  push = 'push',
  sendNotification = 'sendNotification',
  health = 'health',
  liveness = 'liveness',
}

export enum GatewayPatterns {
  newNotification = 'newNotification',
}

export const GatewayBasePrefix = 'gateway.';
