import { useMemo } from 'react';

import { useMessages } from '../queries';

export const useIsLastMessageByAgent = (id: string) => {
  const messages = useMessages(id);
  const isLastMessageByServer = useMemo(
    () => !!messages.length && messages[messages.length - 1].origin === 'AGENT',
    [messages]
  );

  return isLastMessageByServer;
};
