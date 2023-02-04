import { NovuProvider, PopoverNotificationCenter, NotificationBell, IMessage } from '@novu/notification-center';
import { useRouter } from 'next/navigation';
import { useSupabase } from './SupabaseProvider';

export const NotificationsCenter = () => {
  const { push } = useRouter();

  const { session } = useSupabase();
  const onNotificationClick = (notification: IMessage) => {
    // your logic to handle the notification click
    if (notification?.cta?.data?.url) {
      push(notification.cta.data.url);
    }
  };

  return (
    <NovuProvider
      subscriberId={session?.user.id ?? ''}
      applicationIdentifier={process.env.NEXT_PUBLIC_NOVU_APP_IDENTIFIER ?? ''}
    >
      <PopoverNotificationCenter onNotificationClick={onNotificationClick} colorScheme="dark">
        {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
      </PopoverNotificationCenter>
    </NovuProvider>
  );
};
