/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useToasts } from 'src/components/MessageToasts/withToasts';

type UseFetchProps = {
  url: string | null;
  defaultParam?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  withoutJson?: boolean;
};

const useFetch = ({
  url,
  defaultParam = '/api/v1/',
  method = 'GET',
  body,
  headers = {},
  withoutJson = false,
}: UseFetchProps) => {
  const { addDangerToast } = useToasts();
  const [data, setData] = useState<any | null>(null);
  const csrf_token = document.querySelector<HTMLInputElement>('#csrf_token');

  useEffect(() => {
    let isMounted = true;

    if (url) {
      const fetchData = async () => {
        const contentType = withoutJson
          ? ''
          : { 'Content-Type': 'application/json' };
        try {
          const response = await fetch(`${defaultParam}${url}`, {
            method,
            headers: {
              ...contentType,
              'X-CSRFToken': csrf_token?.value ? csrf_token.value : '',
              ...headers,
            },
            body: method !== 'GET' ? JSON.stringify(body) : undefined,
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const result = await response.json();
          if (isMounted) {
            setData(result);
          }
        } catch (error) {
          addDangerToast(error.message);
        }
      };

      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [url]);

  return data;
};

export default useFetch;
