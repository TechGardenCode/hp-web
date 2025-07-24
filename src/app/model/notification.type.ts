export interface Notification {
  id: string;
  userId: string;
  read: boolean;
  title: string;
  message: string;
  actionUrl: string;
  createdAt: Date;
  updatedAt: Date;
}
