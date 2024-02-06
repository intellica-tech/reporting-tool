/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useToasts } from 'src/components/MessageToasts/withToasts';

type UseFetchProps = {
  url: string | null;
  defaultParam?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
};

const useFetch = ({
  url,
  defaultParam = '/api/v1/',
  method = 'GET',
  body,
  headers = {},
}: UseFetchProps) => {
  const { addDangerToast } = useToasts();
  const [data, setData] = useState<any | null>(null);
  const csrf_token = document.querySelector<HTMLInputElement>('#csrf_token');

  useEffect(() => {
    if (url) {
      const fetchData = async () => {
        try {
          const response = await fetch(`${defaultParam}${url}`, {
            method,
            headers: {
              'X-CSRFToken': csrf_token?.value ? csrf_token.value : '',
              ...headers,
            },
            body: method !== 'GET' ? JSON.stringify(body) : undefined,
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const result = await response.json();
          setData(result);
        } catch (error) {
          addDangerToast(error.message);
        }
      };

      fetchData();
    }
  }, [url]);

  return data;
};

export default useFetch;
