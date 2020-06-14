import useSWR from 'swr'
import axios from 'axios'

export default function useRequest({ key, request, config = {} }) {
  const _key = key || request.url;
  const fetcher = () => axios(request || {}).then(response => response.data);
  return useSWR(_key, fetcher, config);
}
