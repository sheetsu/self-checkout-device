import { onMounted, onUnmounted } from "vue";
import { useEventSource, useEventListener } from "@vueuse/core";

export type SSEKind = "card" | "qr";

export type SSEError = "unauthenticated_employee";

export type SSEType = "scanned_code_response";

export type SSEData = {
  code: string;
  kind: SSEKind;
  response: {
    error?: SSEError;
    full_name?: string;
    id?: number;
  },
  status: number;
  type: SSEType;
};

export const useSSE = (url: string) => {
  const { eventSource, close } = useEventSource(
    url,
    [],
    {
      immediate: true,
      autoReconnect: true,
    }
  );

  let messageCb: ((data: SSEData) => void) | null = null;

  const onMessage = (cb: (data: SSEData) => void): void => {
    messageCb = cb;
  };

  const saveParse = (data: string): SSEData | null => {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error("Error parsing data:", error);
      return null;
    }
  };

  useEventListener(eventSource, "message", (event: MessageEvent<string>) => {
    const data = saveParse(event.data);
    if (!data || !messageCb) return;
    messageCb(data);
  });

  onMounted((): void => {
    console.log("EventSource started");
  });

  onUnmounted((): void => {
    close();
    console.log("EventSource started");
  });

  return { onMessage, close };
};
