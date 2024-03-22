/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useToasts } from 'src/components/MessageToasts/withToasts';

type UseFetchProps = {
  url: string | null;
  defaultParam?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  formData?: boolean;
  withoutJson?: boolean;
};

const useFetch = ({
  url,
  defaultParam = '/api/v1/',
  method = 'GET',
  body,
  formData = false,
  headers = {},
  withoutJson = false,
}: UseFetchProps) => {
  const { addDangerToast } = useToasts();
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const csrf_token = document.querySelector<HTMLInputElement>('#csrf_token');

  useEffect(() => {
    let isMounted = true;

    if (url) {
      const fetchData = async () => {
        const contentType = withoutJson
          ? ''
          : { 'Content-Type': 'application/json' };
        try {
          setError(null);
          setLoading(true);
          const response = await fetch(`${defaultParam}${url}`, {
            method,
            headers: {
              ...contentType,
              'X-CSRFToken': csrf_token?.value ? csrf_token.value : '',
              ...headers,
            },
            body:
              method !== 'GET'
                ? formData
                  ? body
                  : JSON.stringify(body)
                : undefined,
          });

          const result = await response.json();

          if (!response.ok) {
            setData(null);
            setError(result);
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          if (isMounted) {
            setData(result);
            setLoading(false);
          }
        } catch (error) {
          addDangerToast(error.message);
          setLoading(false);
        }
      };

      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, error, loading };
};

export default useFetch;
